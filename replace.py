import os
import glob

replacements = {
    "text-[10px] sm:text-xs": "text-xs sm:text-sm md:text-base",
    "text-xs sm:text-sm": "text-sm sm:text-base",
    "text-[11px] sm:text-xs": "text-sm sm:text-base",
    "text-[9px] sm:text-[10px]": "text-[11px] sm:text-xs",
    "text-xs md:text-sm": "text-sm md:text-base",
    "text-xs sm:text-base": "text-sm sm:text-lg",
    "text-[8px]": "text-[10px]",
    "text-[9px]": "text-[11px]",
    "text-xs leading-relaxed": "text-sm leading-relaxed md:text-base",
    "text-sm sm:text-lg": "text-base sm:text-xl",
    "min-h-[170px]": "min-h-[240px]",
    "px-2 py-0.5": "px-3 py-1",
    "px-2 py-1": "px-3 py-1.5",
    "text-base mb-1.5": "text-lg mb-2",
    "text-lg mb-2": "text-xl mb-3",
}

for filepath in glob.glob("src/sections/Episode*.jsx"):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done replacing.")
