import json, os

with open('productos.json', 'r', encoding='utf-8', errors='ignore') as f:
    prods = json.load(f)

print(f"Total products: {len(prods)}")

# List images in assets/images
images_in_dir = set(os.listdir('assets/images')) if os.path.exists('assets/images') else set()
print(f"Total images in assets/images: {len(images_in_dir)}")

missing_local = 0
for p in prods:
    img = p.get('imagen_local', '')
    if not img:
        print(f"Empty local img for {p['slug']}, orig: {p.get('imagen_url_original')}")
        missing_local += 1
    else:
        basename = os.path.basename(img)
        if basename not in images_in_dir:
            print(f"Image file not found on disk for {p['slug']}: {img}")

print(f"Missing local images count: {missing_local}")
