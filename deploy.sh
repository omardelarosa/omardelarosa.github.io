#!/bin/bash

# deploy to zeit
now --static

# create alias
now alias

# notify google of sitemap change
curl 'http://www.google.com/webmasters/sitemaps/ping?sitemap=https://www.omardelarosa.com/dist/sitemap.xml'
