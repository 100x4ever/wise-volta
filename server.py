import http.server
import socketserver
import json
import sqlite3
import hashlib
import os
import secrets
import urllib.parse

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
                    password_hash TEXT,
                    salt TEXT,
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

def hash_password(password, salt=None):
    if not salt:
        salt = secrets.token_hex(16)
    hashed = hashlib.sha256((password + salt).encode('utf-8')).hexdigest()
    return hashed, salt

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

    def do_POST(self):
        parsed_path = urllib.parse.urlparse(self.path).path
        content_len = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_len) if content_len > 0 else b'{}'
        
        try:
            req_data = json.loads(body.decode('utf-8'))
        except Exception:
            req_data = {}

        if parsed_path == '/api/auth/register':
            username = req_data.get('username', '').strip()
            password = req_data.get('password', '').strip()
            avatar = req_data.get('avatar', '🎖️')

            if not username or not password:
                return self.send_json({"error": "Username and password required"}, 400)

            pwd_hash, salt = hash_password(password)
            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            try:
                c.execute('INSERT INTO users (username, password_hash, salt, avatar) VALUES (?, ?, ?, ?)',
                          (username, pwd_hash, salt, avatar))
                user_id = c.lastrowid
                token = secrets.token_hex(32)
                c.execute('INSERT INTO sessions (token, user_id) VALUES (?, ?)', (token, user_id))
                conn.commit()
                conn.close()
                return self.send_json({"token": token, "user": {"id": user_id, "username": username, "avatar": avatar}})
            except sqlite3.IntegrityError:
                conn.close()
                return self.send_json({"error": "Username already exists"}, 400)

        elif parsed_path == '/api/auth/login':
            username = req_data.get('username', '').strip()
            password = req_data.get('password', '').strip()

            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            c.execute('SELECT id, password_hash, salt, avatar FROM users WHERE username = ?', (username,))
            row = c.fetchone()

            if not row:
                conn.close()
                return self.send_json({"error": "Invalid username or password"}, 401)

            user_id, stored_hash, salt, avatar = row
            check_hash, _ = hash_password(password, salt)
            if check_hash != stored_hash:
                conn.close()
                return self.send_json({"error": "Invalid username or password"}, 401)

            token = secrets.token_hex(32)
            c.execute('INSERT INTO sessions (token, user_id) VALUES (?, ?)', (token, user_id))
            conn.commit()
            conn.close()
            return self.send_json({"token": token, "user": {"id": user_id, "username": username, "avatar": avatar}})

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

        elif parsed_path == '/api/campaigns':
            user = self.get_session_user()
            if not user:
                return self.send_json({"error": "Unauthorized"}, 401)

            c_id = req_data.get('id', f"c_{secrets.token_hex(8)}")
            c_name = req_data.get('name', 'Untitled Campaign')
            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            c.execute('''INSERT OR REPLACE INTO campaigns (id, user_id, name, data, updated_at)
                         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)''', (c_id, user['id'], c_name, json.dumps(req_data)))
            conn.commit()
            conn.close()
            return self.send_json({"success": True, "id": c_id})

        else:
            return self.send_json({"error": "Not Found"}, 404)

    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path).path

        if parsed_path == '/api/auth/me':
            user = self.get_session_user()
            if user:
                return self.send_json({"user": user})
            return self.send_json({"error": "Unauthenticated"}, 401)

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

        elif parsed_path == '/api/campaigns':
            user = self.get_session_user()
            if not user:
                return self.send_json({"error": "Unauthorized"}, 401)
            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            c.execute('SELECT data FROM campaigns WHERE user_id = ? ORDER BY updated_at DESC', (user['id'],))
            rows = c.fetchall()
            conn.close()
            campaigns = [json.loads(r[0]) for r in rows]
            return self.send_json({"campaigns": campaigns})

        else:
            super().do_GET()

if __name__ == "__main__":
    print(f"[SERVER] TRENCH CRUSADE MASTER SERVER RUNNING ON PORT {PORT}")
    print(f"[DATA] PERSISTENT VOLUME DATA DIR: {os.path.abspath(DATA_DIR)}")
    with socketserver.TCPServer(("", PORT), MasterHandler) as httpd:
        httpd.serve_forever()
