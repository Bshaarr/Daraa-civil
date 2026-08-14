from pathlib import Path
from PIL import Image, ImageOps

source = Image.open('/home/ubuntu/webdev-static-assets/daraa-civil-affairs-app-icon.png').convert('RGBA')
root = Path('/home/ubuntu/daraa-civil-affairs/android/app/src/main/res')
sizes = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192,
}
for folder, size in sizes.items():
    target = ImageOps.fit(source, (size, size), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    out = root / folder
    out.mkdir(parents=True, exist_ok=True)
    for name in ('ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png'):
        target.save(out / name, optimize=True)
print('Android launcher icons generated')
