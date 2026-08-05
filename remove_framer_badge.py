import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = os.getcwd()
total_files_fixed = 0

badge_css = "<style>#__framer-badge-container, .__framer-badge { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }</style></head>"

for root, dirs, files in os.walk(ROOT_DIR):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()

                new_content = content

                # Remove HTML element for framer badge
                new_content = re.sub(r'<div id="__framer-badge-container".*?</div>\s*</div>\s*</div>', '', new_content, flags=re.DOTALL)
                new_content = re.sub(r'<div id="__framer-badge-container".*?</div>', '', new_content, flags=re.DOTALL)
                new_content = re.sub(r'<a[^>]*__framer-badge[^>]*>.*?</a>', '', new_content, flags=re.DOTALL)
                new_content = re.sub(r'<!-- Made in Framer.*?-->', '', new_content, flags=re.DOTALL)

                # Inject CSS override in <head> to permanently suppress badge
                if "</head>" in new_content and "#__framer-badge-container { display: none !important" not in new_content:
                    new_content = new_content.replace("</head>", badge_css, 1)

                if new_content != content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    total_files_fixed += 1
            except Exception as e:
                print(f"Error en {file_path}: {e}")

print(f"✅ 'Made in Framer' eliminado por completo de todos los archivos HTML ({total_files_fixed} archivos modificados).")
