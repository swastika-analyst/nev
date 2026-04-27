import os

def main():
    env_file = '.env'
    config_file = 'config.js'
    
    # Check if .env exists
    if not os.path.exists(env_file):
        print(f"Error: {env_file} not found.")
        return

    # Read the OpenRouter key from .env
    openapi_key = None
    with open(env_file, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line.startswith('OPENAPIKEY='):
                openapi_key = line.split('=', 1)[1].strip('"\'')
                break
                
    if not openapi_key:
        print("Error: OPENAPIKEY not found in .env")
        return
        
    # Write to config.js
    config_content = f"""// ─── Configuration ───
// This file is auto-generated from .env
export const OPENAPIKEY = '{openapi_key}';
"""
    
    with open(config_file, 'w', encoding='utf-8') as f:
        f.write(config_content)
        
    print(f"Successfully injected .env variables into {config_file}")

if __name__ == '__main__':
    main()
