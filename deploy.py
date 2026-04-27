"""
Deploy ASSEMBLYGPT to Netlify via their API.
Uses the anonymous file-digest deploy endpoint.
"""
import zipfile
import os
import hashlib
import json
import sys
import time

# Fix Windows console encoding
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

try:
    import requests
except ImportError:
    print("Installing requests...")
    os.system("pip install requests")
    import requests

SITE_DIR = os.path.dirname(os.path.abspath(__file__))

# Files to include in the deployment
DEPLOY_FILES = ['index.html', 'style.css', 'main.js', 'chat.js', 'data.js', 'config.js', '_redirects']

def compute_file_sha1(filepath):
    """Compute SHA1 hash of a file."""
    sha1 = hashlib.sha1()
    with open(filepath, 'rb') as f:
        sha1.update(f.read())
    return sha1.hexdigest()

def deploy():
    """Deploy using Netlify's file digest API (no auth needed for new sites)."""
    print("=" * 50)
    print("  NEVIndia AssemblyGPT - Netlify Deployment")
    print("=" * 50)
    print()
    
    # Step 1: Compute file hashes
    files_map = {}
    for fname in DEPLOY_FILES:
        fpath = os.path.join(SITE_DIR, fname)
        if os.path.exists(fpath):
            sha1 = compute_file_sha1(fpath)
            files_map[f"/{fname}"] = sha1
            print(f"  [OK] {fname} ({os.path.getsize(fpath)} bytes)")
        else:
            print(f"  [SKIP] {fname} not found")
    
    print(f"\n  Total files: {len(files_map)}")
    print()
    
    # Step 2: Create a new site with file digest
    print("[1/3] Creating new Netlify site...")
    create_resp = requests.post(
        "https://api.netlify.com/api/v1/sites",
        headers={"Content-Type": "application/json"},
        json={
            "files": files_map
        }
    )
    
    if create_resp.status_code not in (200, 201):
        print(f"  FAILED: HTTP {create_resp.status_code}")
        print(f"  {create_resp.text[:500]}")
        return None
    
    site_data = create_resp.json()
    site_id = site_data.get("id")
    site_url = site_data.get("ssl_url") or site_data.get("url")
    deploy_id = site_data.get("deploy_id")
    required_files = site_data.get("required", [])
    
    print(f"  Site ID: {site_id}")
    print(f"  URL: {site_url}")
    print(f"  Deploy ID: {deploy_id}")
    print(f"  Files to upload: {len(required_files)}")
    print()
    
    # Step 3: Upload required files
    print(f"[2/3] Uploading {len(required_files)} files...")
    for sha1 in required_files:
        # Find the file with this SHA1
        for fname in DEPLOY_FILES:
            fpath = os.path.join(SITE_DIR, fname)
            if os.path.exists(fpath) and compute_file_sha1(fpath) == sha1:
                with open(fpath, 'rb') as f:
                    file_data = f.read()
                upload_resp = requests.put(
                    f"https://api.netlify.com/api/v1/deploys/{deploy_id}/files/{fname}",
                    headers={"Content-Type": "application/octet-stream"},
                    data=file_data
                )
                if upload_resp.status_code in (200, 201):
                    print(f"  [UPLOADED] {fname}")
                else:
                    print(f"  [FAILED] {fname}: HTTP {upload_resp.status_code}")
                    print(f"    {upload_resp.text[:200]}")
                break
    
    print()
    
    # Step 4: Wait for deploy to be ready
    print("[3/3] Waiting for deployment to go live...")
    for i in range(30):
        time.sleep(2)
        status_resp = requests.get(f"https://api.netlify.com/api/v1/deploys/{deploy_id}")
        if status_resp.status_code == 200:
            state = status_resp.json().get("state")
            if state == "ready":
                final_url = status_resp.json().get("ssl_url") or site_url
                print(f"  Status: {state}")
                print()
                print("=" * 50)
                print("  DEPLOYMENT SUCCESSFUL!")
                print(f"  Your app is LIVE at:")
                print(f"  {final_url}")
                print("=" * 50)
                return final_url
            elif state == "error":
                print(f"  Deployment FAILED!")
                error_msg = status_resp.json().get("error_message", "Unknown error")
                print(f"  Error: {error_msg}")
                return None
            else:
                if i % 3 == 0:
                    print(f"  Status: {state}...")
    
    print(f"\n  Deploy may still be processing. Check: {site_url}")
    return site_url

if __name__ == "__main__":
    url = deploy()
    if url:
        print(f"\nOpen this URL in your browser: {url}")
