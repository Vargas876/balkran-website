import os
import re
import json
import csv
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from io import BytesIO
from PIL import Image

BASE_URL = "https://balkrann.framer.website"
OUTPUT_DIR = os.getcwd()
IMAGES_DIR = os.path.join(OUTPUT_DIR, "assets", "images")
os.makedirs(IMAGES_DIR, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch_url(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        return response.read()

print("1. Obteniendo sitemap.xml...")
sitemap_xml = fetch_url(f"{BASE_URL}/sitemap.xml")
root = ET.fromstring(sitemap_xml)
urls = [e.text for e in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]

print(f"Total de páginas encontradas: {len(urls)}")

# Map to store downloaded image URLs to local WebP relative path
# e.g., "https://framerusercontent.com/images/ABC.png?width=500" -> "assets/images/ABC.webp"
url_to_local_webp = {}
downloaded_images_cache = {}

def get_or_download_image(img_url):
    # Strip query string for base key
    base_img_id = img_url.split('/')[-1].split('?')[0]
    filename_without_ext = os.path.splitext(base_img_id)[0]
    webp_filename = f"{filename_without_ext}.webp"
    local_webp_path = os.path.join(IMAGES_DIR, webp_filename)
    relative_webp_path = f"/assets/images/{webp_filename}"

    if img_url in url_to_local_webp:
        return url_to_local_webp[img_url], relative_webp_path

    if filename_without_ext not in downloaded_images_cache:
        print(f"   [Imagen] Descargando y convirtiendo a WebP: {filename_without_ext}")
        try:
            raw_bytes = fetch_url(img_url)
            img = Image.open(BytesIO(raw_bytes))
            # Convert RGBA/P to RGB if needed, or keep RGBA for WebP transparency
            if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                img = img.convert("RGBA")
            else:
                img = img.convert("RGB")
            img.save(local_webp_path, "WEBP", quality=85, optimize=True)
            downloaded_images_cache[filename_without_ext] = relative_webp_path
        except Exception as e:
            print(f"   ⚠️ Error descargando/convirtiendo {img_url}: {e}")
            return img_url, img_url
    
    rel_path = downloaded_images_cache[filename_without_ext]
    url_to_local_webp[img_url] = rel_path
    return rel_path, rel_path

products_data = []

print("\n2. Procesando cada página, descargando imágenes y extrayendo datos...")

for idx, page_url in enumerate(urls, 1):
    path = page_url.replace(BASE_URL, "").strip("/")
    print(f"[{idx}/{len(urls)}] Procesando: {page_url}")
    
    try:
        html_bytes = fetch_url(page_url)
        html_str = html_bytes.decode('utf-8', errors='ignore')
    except Exception as e:
        print(f" ⚠️ Error leyendo {page_url}: {e}")
        continue

    # Extract all framerusercontent.com/images/... URLs
    img_matches = re.findall(r'https://framerusercontent\.com/images/[^\s"<>&\'\)]+', html_str)
    unique_page_imgs = list(dict.fromkeys(img_matches))

    # Replace image URLs in HTML with local WebP path
    modified_html = html_str
    for img_url in unique_page_imgs:
        local_rel, _ = get_or_download_image(img_url)
        modified_html = modified_html.replace(img_url, local_rel)

    # Save local HTML
    if path == "":
        local_html_path = os.path.join(OUTPUT_DIR, "index.html")
    else:
        page_dir = os.path.join(OUTPUT_DIR, path.replace("/", os.sep))
        os.makedirs(page_dir, exist_ok=True)
        local_html_path = os.path.join(page_dir, "index.html")

    with open(local_html_path, "w", encoding="utf-8") as f:
        f.write(modified_html)

    # Extract CMS data if it's a product page
    if "/productos/" in page_url:
        slug = path.replace("productos/", "")
        
        # Simple extraction heuristics based on HTML content text nodes
        nombre_match = re.search(r'<h1[^>]*>([^<]+)</h1>', html_str)
        nombre = nombre_match.group(1).strip() if nombre_match else slug.upper()
        
        # Categoría / Línea
        linea_match = re.search(r'LÍNEA [^<]+|ACCESORIOS|KIT [^<]+', html_str, re.IGNORECASE)
        linea = linea_match.group(0).strip() if linea_match else ""
        
        # Precio
        precio_match = re.search(r'\$\s*[\d\.\,]+', html_str)
        precio = precio_match.group(0).strip() if precio_match else ""

        # Main product image
        main_img = unique_page_imgs[0] if unique_page_imgs else ""
        local_main_img = url_to_local_webp.get(main_img, main_img)

        # Alcance
        alcance_match = re.search(r'Hasta\s+\d+\s*km|\d+\s*km', html_str, re.IGNORECASE)
        alcance = alcance_match.group(0).strip() if alcance_match else ""

        # Energua (Joules)
        joules_match = re.search(r'\d+(\.\d+)?\s*J(ulios)?', html_str, re.IGNORECASE)
        joules = joules_match.group(0).strip() if joules_match else ""

        # Voltaje / Alimentacion
        voltaje_match = re.search(r'110V|12V|220V|Solar', html_str, re.IGNORECASE)
        voltaje = voltaje_match.group(0).strip() if voltaje_match else ""

        product_item = {
            "slug": slug,
            "nombre": nombre,
            "linea": linea,
            "precio": precio,
            "imagen_local": local_main_img,
            "imagen_url_original": main_img,
            "alcance": alcance,
            "joules": joules,
            "voltaje": voltaje,
            "url": page_url
        }
        products_data.append(product_item)

print(f"\n3. Guardando base de datos de productos ({len(products_data)} ítems)...")

# Write productos.json
json_path = os.path.join(OUTPUT_DIR, "productos.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(products_data, f, ensure_ascii=False, indent=2)

# Write productos.csv
csv_path = os.path.join(OUTPUT_DIR, "productos.csv")
if products_data:
    keys = products_data[0].keys()
    with open(csv_path, "w", newline="", encoding="utf-8-sig") as f:
        dict_writer = csv.DictWriter(f, fieldnames=keys)
        dict_writer.writeheader()
        dict_writer.writerows(products_data)

print(f"✅ Descarga finalizada con éxito!")
print(f" Total imágenes WebP guardadas en {IMAGES_DIR}: {len(downloaded_images_cache)}")
print(f" Base de datos creada: productos.json y productos.csv")
