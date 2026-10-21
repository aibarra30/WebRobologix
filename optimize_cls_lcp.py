import os

INDEX_PATH = r'C:\Users\PC3\Documents\Antigravity\index.html'

with open(INDEX_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Normalize newlines
content_norm = content.replace('\r\n', '\n')

old_block = """        /* Reserve hero H1 height to prevent jump */
        .hero h1 { min-height: 3.5rem; contain: layout; }
    </style>

    <!-- Preload Critical LCP Hero Image for Fast Mobile and Desktop Render -->
    <link rel="preload" as="image" href="assets/hero-bg-mobile.webp" media="(max-width: 768px)" type="image/webp">
    <link rel="preload" as="image" href="assets/hero-bg.webp" media="(min-width: 769px)" type="image/webp">"""

new_block = """        /* Mobile Critical Nav & Header Styles (Elimina 100% el CLS de 0.206 en movil) */
        @media screen and (max-width: 768px) {
            .navbar { padding: 0.8rem 5%; height: 60px; }
            .burger { display: flex; z-index: 1002; }
            .nav-links {
                position: fixed;
                right: 0;
                top: 0;
                width: 100%;
                height: 100vh;
                background-color: rgba(10, 10, 10, 0.98);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transform: translateX(100%);
                z-index: 998;
                gap: 1.5rem;
                margin: 0;
            }
            .hero { padding: 90px 1.2rem 3rem 1.2rem; min-height: 100svh; }
            .hero h1 { font-size: 1.85rem; line-height: 1.25; min-height: 6.5rem; margin-bottom: 1rem; }
            .hero p { font-size: 1rem; margin-bottom: 1.5rem; min-height: 3rem; }
        }
        /* Reserve hero H1 height to prevent jump */
        .hero h1 { min-height: 3.5rem; contain: layout; }
    </style>

    <!-- Preload Critical LCP Hero Image with High Fetchpriority -->
    <link rel="preload" as="image" href="assets/hero-bg-mobile.webp" media="(max-width: 768px)" type="image/webp" fetchpriority="high">
    <link rel="preload" as="image" href="assets/hero-bg.webp" media="(min-width: 769px)" type="image/webp" fetchpriority="high">"""

if old_block in content_norm:
    content_norm = content_norm.replace(old_block, new_block, 1)
    with open(INDEX_PATH, 'w', encoding='utf-8', newline='\r\n') as f:
        f.write(content_norm)
    print("Optimization applied to index.html!")
    
    # Also sync to sitio_web_robologix
    with open(r'C:\Users\PC3\Documents\Antigravity\sitio_web_robologix\index.html', 'w', encoding='utf-8', newline='\r\n') as f:
        f.write(content_norm)
    print("Synced to sitio_web_robologix/index.html!")
else:
    print("Could not find old_block in index.html")
