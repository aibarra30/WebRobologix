import json
import os
from PIL import Image, ImageDraw, ImageFont

ROOT_DIR = r'C:\Users\PC3\Documents\Antigravity'
ASSETS_DIR = os.path.join(ROOT_DIR, 'assets', 'refacciones')
os.makedirs(ASSETS_DIR, exist_ok=True)

# List of products that have verified REAL photos
real_photos = {
    'RBL-000A': 'assets/refacciones/A02B-0303-K150.png',
    'RBL-000B': 'assets/refacciones/A98L-0031-0026.png',
    'RBL-000C': 'assets/refacciones/3HAC051036-001.png',
    'RBL-011': 'assets/refacciones/PV270.png',
    'RBL-014': 'assets/refacciones/6220-2Z.png',
    'RBL-018': 'assets/refacciones/3HAC022286-001.png',
    'RBL-019': 'assets/refacciones/3HAC051036-001.png',
    'RBL-020A': 'assets/refacciones/R911299915.png',
    'RBL-020B': 'assets/refacciones/R911299915.png',
    'RBL-025': 'assets/refacciones/SRV2KRARK.png',
    'RBL-026': 'assets/refacciones/AP9544.png'
}

def generate_minimal_card(brand, sku, filename):
    W, H = 600, 600
    img = Image.new('RGB', (W, H), color='#090d13')
    draw = ImageDraw.Draw(img)

    # Subtle outer border
    margin = 25
    draw.rectangle([(margin, margin), (W-margin, H-margin)], outline='#15202e', width=2)

    # Cyan corner accents
    c_len = 30
    c_col = '#00f3ff'
    draw.line([(margin, margin), (margin + c_len, margin)], fill=c_col, width=3)
    draw.line([(margin, margin), (margin, margin + c_len)], fill=c_col, width=3)

    draw.line([(W-margin, margin), (W-margin - c_len, margin)], fill=c_col, width=3)
    draw.line([(W-margin, margin), (W-margin, margin + c_len)], fill=c_col, width=3)

    draw.line([(margin, H-margin), (margin + c_len, H-margin)], fill=c_col, width=3)
    draw.line([(margin, H-margin), (margin, H-margin - c_len)], fill=c_col, width=3)

    draw.line([(W-margin, H-margin), (W-margin - c_len, H-margin)], fill=c_col, width=3)
    draw.line([(W-margin, H-margin), (W-margin, H-margin - c_len)], fill=c_col, width=3)

    # Brand at top
    brand_text = brand.upper()
    if brand_text in ['S/D', 'DESCONOCIDO', '']:
        brand_text = 'REFACCIÓN INDUSTRIAL'
    
    font_brand = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 32)
    draw.text((W//2, 135), brand_text, fill='#00f3ff', font=font_brand, anchor='mm')
    draw.line([(W//2 - 50, 175), (W//2 + 50, 175)], fill='#ff6600', width=2)

    # Clean, huge, prominent Part Number in the center
    sku_text = sku.strip()
    if len(sku_text) <= 12:
        fsize = 52
    elif len(sku_text) <= 17:
        fsize = 40
    elif len(sku_text) <= 24:
        fsize = 32
    else:
        fsize = 25
    
    font_sku = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', fsize)
    draw.text((W//2, 335), sku_text, fill='#ffffff', font=font_sku, anchor='mm')

    dest = os.path.join(ASSETS_DIR, filename)
    img.save(dest)
    return 'assets/refacciones/' + filename

# 1. Update productos.json
json_path = os.path.join(ROOT_DIR, 'productos.json')
with open(json_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

updated_cards = 0
for p in products:
    pid = p['id']
    if pid in real_photos and os.path.exists(os.path.join(ROOT_DIR, real_photos[pid])):
        p['imagen'] = real_photos[pid]
        print(f"[{pid}] Conserva foto real: {p['imagen']}")
    else:
        clean_sku = ''.join(c if c.isalnum() or c in '-_' else '_' for c in p['sku'][:16])
        filename = f"SPEC_{pid}_{clean_sku}.png"
        path = generate_minimal_card(p.get('marca', ''), p.get('sku', ''), filename)
        p['imagen'] = path
        updated_cards += 1
        print(f"[{pid}] Generada tarjeta limpia: {path}")

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

# 2. Update refacciones.js (sync defaultProducts)
js_path = os.path.join(ROOT_DIR, 'refacciones.js')
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

start_str = 'const defaultProducts = ['
idx = js_content.find(start_str)
if idx != -1:
    end_idx = js_content.find('];', idx)
    if end_idx != -1:
        new_def = 'const defaultProducts = ' + json.dumps(products, indent=2, ensure_ascii=False) + ';'
        new_js = js_content[:idx] + new_def + js_content[end_idx+2:]
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(new_js)
        print("Sincronizado refacciones.js con éxito!")

print(f"\nFinalizado: {updated_cards} tarjetas limpias generadas con solo Marca y Número de Parte.")
