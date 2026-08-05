import os, re, json

prods_dir = 'productos'
slugs = [d for d in os.listdir(prods_dir) if os.path.isdir(os.path.join(prods_dir, d))]

print(f"Found {len(slugs)} product folders")

# Read existing productos.json to merge metadata
with open('productos.json', 'r', encoding='utf-8', errors='ignore') as f:
    existing_prods = json.load(f)

existing_dict = {p['slug']: p for p in existing_prods}

updated_prods = []

for slug in sorted(slugs):
    html_path = os.path.join(prods_dir, slug, 'index.html')
    pdata = existing_dict.get(slug, {'slug': slug})
    
    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
            html = f.read()
        
        # Title
        t_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
        if t_match:
            pdata['title'] = t_match.group(1).strip()
        
        # Find images in assets/images/
        imgs = re.findall(r'/assets/images/[a-zA-Z0-9_-]+\.(?:webp|png|jpg|jpeg|svg)', html)
        if not imgs:
            imgs = re.findall(r'assets/images/[a-zA-Z0-9_-]+\.(?:webp|png|jpg|jpeg|svg)', html)
        
        if imgs:
            # Deduplicate preserving order
            unique_imgs = list(dict.fromkeys(imgs))
            # Fix leading slash
            unique_imgs = [img if img.startswith('/') else '/' + img for img in unique_imgs]
            pdata['imagen_local'] = unique_imgs[0]
            pdata['imagenes'] = unique_imgs
    
    # Ensure default fields exist
    if not pdata.get('nombre'):
        pdata['nombre'] = slug.upper().replace('-', ' ')
    if not pdata.get('linea'):
        pdata['linea'] = "ACCESORIOS Y OTROS"
    if not pdata.get('precio'):
        pdata['precio'] = "Consultar"
    if not pdata.get('imagen_local'):
        pdata['imagen_local'] = "/assets/images/U8LFRrUZtP2kBLhJTaqAU2t8sw.webp"
        
    updated_prods.append(pdata)

print(f"Total products updated: {len(updated_prods)}")

# Check how many now have valid local images
has_img = sum(1 for p in updated_prods if p.get('imagen_local'))
print(f"Products with local image: {has_img}/{len(updated_prods)}")

# Write updated productos.json
with open('productos.json', 'w', encoding='utf-8') as f:
    json.dump(updated_prods, f, ensure_ascii=False, indent=2)

print("Updated productos.json written successfully.")
