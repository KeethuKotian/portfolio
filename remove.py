import os, re
for f in ['Episode1_Intro.jsx','Episode6_Final.jsx']:
    p = os.path.join('d:/projects/portfolio2/src/sections', f)
    with open(p, 'r', encoding='utf-8') as file: c = file.read()
    c = re.sub(r'<div className=[\'"]absolute inset-0 z-0 pointer-events-none overflow-hidden[\'"]>\s*<div.*?>\s*<SwordDisplay />\s*</div>\s*</div>', '', c, flags=re.DOTALL)
    c = re.sub(r'import SwordDisplay from [\'"].*?[\'"];\n?', '', c)
    with open(p, 'w', encoding='utf-8') as file: file.write(c)
