import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

content = open("index.html", encoding="utf-8").read()

matches = re.findall(r'.{0,100}Soluciones para.{0,100}', content, re.IGNORECASE)
print(f"Encontradas {len(matches)} coincidencias para 'Soluciones para':")
for m in matches:
    print(m)
