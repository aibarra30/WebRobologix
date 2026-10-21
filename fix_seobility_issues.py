import os
import re

INDEX_PATH = r'C:\Users\PC3\Documents\Antigravity\index.html'

with open(INDEX_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Favicon & Apple Touch Icon
favicons = """    <!-- Favicon & Apple Touch Icons (Seobility & Móvil) -->
    <link rel="icon" type="image/png" sizes="32x32" href="favicon.png">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
"""
if 'apple-touch-icon.png' not in html:
    html = html.replace(
        '<link rel="canonical" href="https://rbl-automation.com/" />',
        '<link rel="canonical" href="https://rbl-automation.com/" />\n' + favicons
    )
    print('Added favicon and apple-touch-icon tags.')

# 2. Fix repeated bold phrase & 109-char bold tag
# Search for the paragraph
old_phrase_regex = r'<p>Con su grado de <strong>Maestría en Gestión de Negocios de Manufactura</strong> e <strong>Ingeniería en Automatización</strong>, ha liderado proyectos de integración para empresas de clase mundial como <strong>Chrysler, Martinrea, Plastic Omnium, Android Industries, Tennessee Rand, Lincoln Electric y RAM Manufacturing</strong>\.</p>'
new_phrase = '<p>Con su grado de posgrado en gestión industrial e ingeniería en automatización, ha liderado proyectos de integración para empresas de clase mundial como Chrysler, Martinrea, Plastic Omnium, Android Industries, Tennessee Rand, Lincoln Electric y RAM Manufacturing.</p>'

if re.search(old_phrase_regex, html):
    html = re.sub(old_phrase_regex, new_phrase, html)
    print('Fixed bold tag warnings (eliminated repeated phrase and long bold block).')
else:
    # Try exact string search
    target = 'Chrysler, Martinrea, Plastic Omnium, Android Industries, Tennessee Rand, Lincoln Electric y RAM Manufacturing'
    if f'<strong>{target}</strong>' in html:
        html = html.replace(f'<strong>{target}</strong>', target)
        html = html.replace('Con su grado de <strong>Maestría en Gestión de Negocios de Manufactura</strong>', 'Con su grado de posgrado en gestión industrial')
        print('Fixed bold tags via string replacement.')

# 3. Optimize FAQ H3 headings to div with same styles
# Each FAQ item has:
# <h3 style="font-family: var(--font-heading); font-size: 1.05rem; ...">
#    <span>N.</span>
#    <span>Question</span>
# </h3>
html = re.sub(
    r'<h3 (style="font-family: var\(--font-heading\); font-size: 1\.05rem;[^>]*>)(\s*<span[^>]*>[^<]*</span>\s*<span>[^<]*</span>\s*)</h3>',
    r'<div class="faq-question" \1\2</div>',
    html
)
print('Optimized FAQ H3 headings to clean semantic div containers.')

with open(INDEX_PATH, 'w', encoding='utf-8') as f:
    f.write(html)

# Also sync to sitio_web_robologix
SITIO_PATH = r'C:\Users\PC3\Documents\Antigravity\sitio_web_robologix\index.html'
with open(SITIO_PATH, 'w', encoding='utf-8') as f:
    f.write(html)

print('All Seobility optimizations applied and synced!')
