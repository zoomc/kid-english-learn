#!/bin/bash
# 从本机部署到 Cloudflare（需要先 `npx wrangler login` 一次）
#   scripts/deploy.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
[ -d node_modules ] || npm ci --no-audit --no-fund
node -e "global.window={};require('./public/js/phonics-data.js');if(!window.PHONICS.levels.length)process.exit(1)"
npx wrangler deploy
BASE="https://english.zoomlab.top"
for i in $(seq 1 12); do
  curl -fsS "$BASE/" | grep -q '宝贝英语乐园' && { echo "deployed: $BASE"; exit 0; }
  echo "not ready, retry $i"; sleep 5
done
exit 1
