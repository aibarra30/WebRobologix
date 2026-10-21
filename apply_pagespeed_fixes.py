import re

INDEX_PATH = r'C:\Users\PC3\Documents\Antigravity\index.html'
STYLES_PATH = r'C:\Users\PC3\Documents\Antigravity\styles.css'

# 1. Update index.html
with open(INDEX_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# Add <main id="main-content"> right after </header>
if '<main id="main-content">' not in html:
    html = html.replace('</header>', '</header>\n    <main id="main-content">', 1)
    # And close </main> right before <footer>
    html = html.replace('<footer>', '</main>\n\n    <footer>', 1)
    print("Wrapped body content in semantic <main id='main-content'>.")

# Contrast in inline btn-whatsapp: replace #25d366 with #138241
html = html.replace('.btn-whatsapp{background-color:#25d366;border:2px solid #1a9e4a;', '.btn-whatsapp{background-color:#138241;border:2px solid #0f6a35;')

# Contrast in footer text
old_footer_p = '<p>&copy; 2026 Robologix Automation. Todos los derechos reservados. | <a href="programacion-plc-saltillo.html" style="color: var(--text-muted); text-decoration: underline;">Programación de PLC en Saltillo y Ramos Arizpe</a></p>'
new_footer_p = '<p style="color: #cbd5e1; font-size: 0.9rem;">&copy; 2026 Robologix Automation. Todos los derechos reservados. | <a href="programacion-plc-saltillo.html" style="color: #00f3ff; text-decoration: underline;">Programación de PLC en Saltillo y Ramos Arizpe</a></p>'
if old_footer_p in html:
    html = html.replace(old_footer_p, new_footer_p)
    print("Fixed footer copyright text contrast.")

# Optimize Google Fonts display from swap to optional (avoids layout shift when webfont swaps)
html = html.replace('&display=swap', '&display=optional')
print("Switched Google Fonts to display=optional to eliminate font-swap CLS.")

with open(INDEX_PATH, 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update styles.css
with open(STYLES_PATH, 'r', encoding='utf-8') as f:
    css = f.read()

# Replace btn-whatsapp color in styles.css
css = re.sub(
    r'\.btn-whatsapp\s*\{\s*background-color:\s*#25d366;\s*border:\s*2px solid #25d366;',
    '.btn-whatsapp {\n    background-color: #138241;\n    border: 2px solid #0f6a35;',
    css
)
css = re.sub(
    r'\.btn-whatsapp-large\s*\{\s*display:\s*inline-flex;\s*margin-top:\s*1rem;\s*background-color:\s*#25d366;',
    '.btn-whatsapp-large {\n    display: inline-flex;\n    margin-top: 1rem;\n    background-color: #138241;',
    css
)

with open(STYLES_PATH, 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated WhatsApp buttons in styles.css for high contrast WCAG AA pass.")

# 3. Sync to sitio_web_robologix
with open(r'C:\Users\PC3\Documents\Antigravity\sitio_web_robologix\index.html', 'w', encoding='utf-8') as f:
    f.write(html)
with open(r'C:\Users\PC3\Documents\Antigravity\sitio_web_robologix\styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Synced files to sitio_web_robologix.")
