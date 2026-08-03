import os
import re
import sys
import unicodedata
import fitz

# Configure UTF-8 stdout
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

pdf_dir = r'C:\Users\vp\Downloads\tc-1.0.2'

CHAR_MAP = {
    # Quotes and apostrophes
    '‘': "'", '’': "'", '‛': "'", '′': "'", '`': "'",
    '“': '"', '”': '"', '„': '"', '‟': '"', '″': '"',
    # Dashes
    '–': '-', '—': '-', '―': '-', '−': '-', '‐': '-', '‑': '-',
    # Ellipsis
    '…': '...',
    # Bullets & Shapes
    '•': '*', '◦': '*', '▪': '*', '▫': '*', '▸': '*', '►': '*', '■': '*', '●': '*', '◆': '*', '◇': '*', '★': '*', '☆': '*',
    # Icons & Symbols
    '▶': '>', '†': '[+]', '‡': '[++]', '👑': '[CROWN]', '≠': '!=', '☼': '[SUN]',
    '♠': '[SPADES]', '♣': '[CLUBS]', '♥': '[HEARTS]', '♦': '[DIAMONDS]',
    '°': ' deg', '½': '1/2', '⅓': '1/3', '¼': '1/4', '¾': '3/4', '©': '(C)', 'ª': 'a', 'º': 'o', '¶': '[PARAGRAPH]', '§': '[SECTION]',
    # Ligatures
    'ﬀ': 'ff', 'ﬃ': 'ffi', 'ﬁ': 'fi', 'ﬂ': 'fl', 'ﬆ': 'st', 'æ': 'ae', 'œ': 'oe', 'Æ': 'AE', 'Œ': 'OE'
}

def clean_text(text):
    if not text:
        return ''
    
    # Fix version number font quirks like 1`0`2 -> 1.0.2
    text = re.sub(r'(?<=\d)`(?=\d)', '.', text)
    
    res = []
    for ch in text:
        if ch in CHAR_MAP:
            res.append(CHAR_MAP[ch])
        elif ord(ch) > 127:
            nfkd = unicodedata.normalize('NFKD', ch)
            ascii_ch = ''.join([c for c in nfkd if not unicodedata.combining(c)])
            if ascii_ch and all(32 <= ord(c) <= 126 for c in ascii_ch):
                res.append(ascii_ch)
            else:
                res.append(f'[U+{ord(ch):04X}]')
        else:
            res.append(ch)
            
    cleaned = ''.join(res)
    cleaned = re.sub(r'[\r\t\f\v]', ' ', cleaned)
    
    lines = [re.sub(r' +', ' ', line).strip() for line in cleaned.split('\n')]
    
    final_lines = []
    empty_count = 0
    for line in lines:
        if not line:
            empty_count += 1
            if empty_count <= 2:
                final_lines.append(line)
        else:
            empty_count = 0
            final_lines.append(line)
            
    return '\n'.join(final_lines)

def process_pdfs():
    files = [f for f in os.listdir(pdf_dir) if f.lower().endswith('.pdf')]
    print(f"Found {len(files)} PDF files in {pdf_dir}\n")
    
    for filename in files:
        pdf_path = os.path.join(pdf_dir, filename)
        txt_filename = os.path.splitext(filename)[0] + '.txt'
        txt_path = os.path.join(pdf_dir, txt_filename)
        
        doc = fitz.open(pdf_path)
        total_pages = len(doc)
        
        output_parts = []
        output_parts.append('=' * 80)
        output_parts.append(f'DOCUMENT: {filename}')
        output_parts.append(f'TOTAL PAGES: {total_pages}')
        output_parts.append('=' * 80 + '\n')
        
        for i, page in enumerate(doc):
            page_num = i + 1
            raw_text = page.get_text()
            page_text = clean_text(raw_text)
            
            output_parts.append('=' * 80)
            output_parts.append(f'--- [TAG: DOCUMENT="{filename}" | PAGE={page_num}/{total_pages}] ---')
            output_parts.append('=' * 80 + '\n')
            output_parts.append(page_text)
            output_parts.append('\n')
            
        full_content = '\n'.join(output_parts)
        with open(txt_path, 'w', encoding='utf-8') as f:
            f.write(full_content)
            
        file_size_kb = os.path.getsize(txt_path) / 1024
        print(f"✓ Converted: {filename} -> {txt_filename} ({total_pages} pages, {file_size_kb:.1f} KB)")

if __name__ == '__main__':
    process_pdfs()
