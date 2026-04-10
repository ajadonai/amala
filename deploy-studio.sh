#!/bin/bash
# ═══════════════════════════════════════════════════
# Deploy Sanity Studio to womeninfocus.sanity.studio
# 
# Run ONCE from the project root:
#   chmod +x deploy-studio.sh
#   ./deploy-studio.sh
# ═══════════════════════════════════════════════════

echo "Deploying Sanity Studio to womeninfocus.sanity.studio..."
echo ""

npx sanity deploy

echo ""
echo "Done! Amala can now manage content at:"
echo "  https://womeninfocus.sanity.studio"
