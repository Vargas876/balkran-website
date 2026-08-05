import re

with open('contacto/index.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Extract text snippets inside tags
matches = re.findall(r'>([^<>{}\n]{3,100})<', content)
clean = []
for m in matches:
    t = m.strip()
    if t and not t.startswith('var') and not t.startswith('{') and not t.startswith('@') and not t.startswith('http'):
        clean.append(t)

print("TEXT SNIPPETS:")
for text in clean[:100]:
    print("-", text)
