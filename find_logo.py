import re

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

sources = re.findall(r'(?:src|srcset)=["\']([^"\']+)["\']', html)
print(f"Total image sources found: {len(sources)}")
for s in sources[:20]:
    print(" -", s[:100])
