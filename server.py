import http.server
import socketserver
import json
import sqlite3
import os
import secrets
import urllib.parse
import mimetypes

PORT = int(os.environ.get("PORT", 8000))
DATA_DIR = os.environ.get("DATA_DIR", "./data")

os.makedirs(DATA_DIR, exist_ok=True)
DB_PATH = os.path.join(DATA_DIR, "trench_crusade.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE,
                    avatar TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )''')
    c.execute('''CREATE TABLE IF NOT EXISTS sessions (
                    token TEXT PRIMARY KEY,
                    user_id INTEGER,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )''')
    c.execute('''CREATE TABLE IF NOT EXISTS warbands (
                    id TEXT PRIMARY KEY,
                    user_id INTEGER,
                    name TEXT,
                    data TEXT,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )''')
    c.execute('''CREATE TABLE IF NOT EXISTS campaigns (
                    id TEXT PRIMARY KEY,
                    user_id INTEGER,
                    name TEXT,
                    data TEXT,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )''')
    conn.commit()
    conn.close()

init_db()

class MasterHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def get_session_user(self):
        auth_header = self.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None
        token = auth_header.split(' ')[1]
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute('''SELECT users.id, users.username, users.avatar FROM sessions
                     JOIN users ON sessions.user_id = users.id
                     WHERE sessions.token = ?''', (token,))
        row = c.fetchone()
        conn.close()
        if row:
            return {"id": row[0], "username": row[1], "avatar": row[2]}
        return None

    def send_json(self, data, status=200):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def serve_image_file(self, rel_path):
        filename = os.path.basename(rel_path)
        candidates = [
            os.path.join(".", rel_path.lstrip("/")),
            os.path.join(".", "game_engine", "images", filename),
            os.path.join(".", "warband_builder", "images", filename),
            os.path.join(".", "images", filename)
        ]
        for candidate in candidates:
            if os.path.exists(candidate) and os.path.isfile(candidate):
                mime, _ = mimetypes.guess_type(candidate)
                mime = mime or "image/jpeg"
                with open(candidate, "rb") as f:
                    content = f.read()
                self.send_response(200)
                self.send_header("Content-Type", mime)
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return True
        return False

    def do_POST(self):
        parsed_path = urllib.parse.urlparse(self.path).path
        content_len = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_len) if content_len > 0 else b'{}'
        
        try:
            req_data = json.loads(body.decode('utf-8'))
        except Exception:
            req_data = {}

        if parsed_path in ['/api/auth/login', '/api/auth/register', '/api/auth/username']:
            username = req_data.get('username', '').strip()
            avatar = req_data.get('avatar', '🎖️')

            if not username:
                return self.send_json({"error": "Username required"}, 400)

            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            c.execute('SELECT id, username, avatar FROM users WHERE LOWER(username) = LOWER(?)', (username,))
            row = c.fetchone()

            if not row:
                c.execute('INSERT INTO users (username, avatar) VALUES (?, ?)', (username, avatar))
                user_id = c.lastrowid
            else:
                user_id, username, avatar = row

            token = secrets.token_hex(32)
            c.execute('INSERT INTO sessions (token, user_id) VALUES (?, ?)', (token, user_id))
            conn.commit()
            conn.close()
            return self.send_json({"token": token, "user": {"id": user_id, "username": username, "avatar": avatar}})

        elif parsed_path == '/api/auth/profile':
            user = self.get_session_user()
            if not user:
                return self.send_json({"error": "Unauthorized"}, 401)

            new_name = req_data.get('username', '').strip()
            new_avatar = req_data.get('avatar', '').strip()

            if not new_name:
                return self.send_json({"error": "Username cannot be empty"}, 400)

            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            try:
                c.execute('UPDATE users SET username = ?, avatar = ? WHERE id = ?', (new_name, new_avatar or user['avatar'], user['id']))
                conn.commit()
            except sqlite3.IntegrityError:
                conn.close()
                return self.send_json({"error": "Username already taken"}, 400)

            conn.close()
            return self.send_json({"user": {"id": user['id'], "username": new_name, "avatar": new_avatar or user['avatar']}})

        elif parsed_path == '/api/warbands':
            user = self.get_session_user()
            if not user:
                return self.send_json({"error": "Unauthorized"}, 401)

            w_id = req_data.get('id', f"w_{secrets.token_hex(8)}")
            w_name = req_data.get('name', 'Untitled Warband')
            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            c.execute('''INSERT OR REPLACE INTO warbands (id, user_id, name, data, updated_at)
                         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)''', (w_id, user['id'], w_name, json.dumps(req_data)))
            conn.commit()
            conn.close()
            return self.send_json({"success": True, "id": w_id})

        else:
            return self.send_json({"error": "Not Found"}, 404)

    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path).path

        if parsed_path.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg')):
            if self.serve_image_file(parsed_path):
                return

        if parsed_path == '/api/auth/me':
            user = self.get_session_user()
            if user:
                return self.send_json({"user": user})
            return self.send_json({"error": "Unauthenticated"}, 401)

        elif parsed_path == '/api/auth/profile':
            user = self.get_session_user()
            if not user:
                return self.send_json({"error": "Unauthorized"}, 401)

            new_name = req_data.get('username', '').strip()
            new_avatar = req_data.get('avatar', '').strip()

            if not new_name:
                return self.send_json({"error": "Username cannot be empty"}, 400)

            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            try:
                c.execute('UPDATE users SET username = ?, avatar = ? WHERE id = ?', (new_name, new_avatar or user['avatar'], user['id']))
                conn.commit()
            except sqlite3.IntegrityError:
                conn.close()
                return self.send_json({"error": "Username already taken"}, 400)

            conn.close()
            return self.send_json({"user": {"id": user['id'], "username": new_name, "avatar": new_avatar or user['avatar']}})

        elif parsed_path == '/api/warbands':
            user = self.get_session_user()
            if not user:
                return self.send_json({"error": "Unauthorized"}, 401)
            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            c.execute('SELECT data FROM warbands WHERE user_id = ? ORDER BY updated_at DESC', (user['id'],))
            rows = c.fetchall()
            conn.close()
            warbands = [json.loads(r[0]) for r in rows]
            return self.send_json({"warbands": warbands})

        else:
            super().do_GET()

if __name__ == "__main__":
    print(f"[SERVER] TRENCH CRUSADE MASTER SERVER RUNNING ON PORT {PORT}")
    print(f"[DATA] PERSISTENT VOLUME DATA DIR: {os.path.abspath(DATA_DIR)}")
    with socketserver.TCPServer(("", PORT), MasterHandler) as httpd:
        httpd.serve_forever()
