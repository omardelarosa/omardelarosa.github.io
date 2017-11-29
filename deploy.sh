#!/bin/bash

# push to github
echo "Pushing to Github..."
git push origin master

# sync with S3
echo "Syncing S3..."
aws s3 sync . s3://nabisco/ --exclude "node_modules/*" --exclude ".*"

# purge cloudflare cache
echo "Purging CloudFlare cache..."
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
     -H "X-Auth-Email: $CLOUDFLARE_AUTH_EMAIL" \
     -H "X-Auth-Key: $CLOUDFLARE_AUTH_API_KEY" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'
echo "\n"

echo "Uploading site maps to Google"
# notify google of sitemap change
curl 'http://www.google.com/webmasters/sitemaps/ping?sitemap=https://www.omardelarosa.com/dist/sitemap.xml'
