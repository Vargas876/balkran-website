import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from io import BytesIO
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = os.getcwd()
IMAGES_DIR = os.path.join(ROOT_DIR, "assets", "images")
os.makedirs(IMAGES_DIR, exist_ok=True)

BASE_URL = "https://balkrann.framer.website"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

print("1. Escaneando sitemap.xml para obtener todas las URLs con sus variantes de alta resolución...")
req = urllib.request.Request(f"{BASE_URL}/sitemap.xml", headers=headers)
with urllib.request.urlopen(req) as resp:
    sitemap_xml = resp.read()

root = ET.fromstring(sitemap_xml)
urls = [e.text for e in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]

# Map of img_id -> (best_url, max_width)
best_image_urls = {}

for idx, page_url in enumerate(urls, 1):
    try:
        req = urllib.request.Request(page_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        
        # Find all URLs matching framerusercontent.com/images/...
        matches = re.findall(r'https://framerusercontent\.com/images/([a-zA-Z0-9_-]+)\.([a-zA-Z0-9]+)(\?[^"\'<>\s\)]*)?', html)
        for img_id, ext, query in matches:
            query_str = query or ""
            # Extract width if present
            w_match = re.search(r'width=(\d+)', query_str)
            if w_match:
                width = int(w_match.group(1))
            else:
                scale_match = re.search(r'scale-down-to=(\d+)', query_str)
                width = int(scale_match.group(1)) if scale_match else 500

            full_url = f"https://framerusercontent.com/images/{img_id}.{ext}{query_str}"
            
            if img_id not in best_image_urls or width > best_image_urls[img_id][1]:
                best_image_urls[img_id] = (full_url, width)
    except Exception as e:
        print(f"Error procesando {page_url}: {e}")

print(f"\n2. Descargando {len(best_image_urls)} imágenes en su MÁXIMA RESOLUCIÓN DISPONIBLE...")

downloaded = 0
for idx, (img_id, (best_url, max_w)) in enumerate(best_image_urls.items(), 1):
    webp_path = os.path.join(IMAGES_DIR, f"{img_id}.webp")
    print(f"[{idx}/{len(best_image_urls)}] Descargando HD ({max_w}px): {img_id}...")
    
    try:
        req = urllib.request.Request(best_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            
        img = Image.open(BytesIO(data))
        if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")
            
        img.save(webp_path, "WEBP", quality=95, optimize=True)
        downloaded += 1
        print(f"   ↳ Guardado nítido: {img.size[0]}x{img.size[1]}px en {img_id}.webp")
    except Exception as e:
        print(f"   ⚠️ Error descargando {best_url}: {e}")

print(f"\n✅ Proceso completado. {downloaded} imágenes en ULTRA ALTA RESOLUCIÓN guardadas como WebP.")
