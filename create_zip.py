import zipfile
import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

SITE_DIR = os.path.dirname(os.path.abspath(__file__))
ZIP_PATH = os.path.join(SITE_DIR, 'assemblygpt-deploy.zip')

DEPLOY_FILES = ['index.html', 'style.css', 'main.js', 'chat.js', 'predictor.js', 'data.js', 'config.js', '_redirects']

print("Creating deployment ZIP file...")
with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zf:
    for fname in DEPLOY_FILES:
        fpath = os.path.join(SITE_DIR, fname)
        if os.path.exists(fpath):
            zf.write(fpath, fname)
            size = os.path.getsize(fpath)
            print(f"  Added: {fname} ({size:,} bytes)")

zip_size = os.path.getsize(ZIP_PATH)
print(f"\nZIP created: {ZIP_PATH}")
print(f"ZIP size: {zip_size:,} bytes ({zip_size/1024:.1f} KB)")
