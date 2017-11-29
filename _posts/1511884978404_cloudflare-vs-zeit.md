---
title:   Static Hosting Updates 1
author:  omardelarosa  
timestamp: 1511884978404  
created_at: 1511884978404  
published_at: 1511884978404  
slug:    cloudflare-vs-zeit  
ogDescription: an article about life, technology and/or music by omar delarosa  
  
---
So during this past Thanksgiving holiday, about the only time of year I sit down and work on personal projects these days, I went to go write a blog post and noticed that this site was down and probably had been for a while. Seems like when I switched over to using [Zeit Now](zeit.co/now) over GH Pages for easier DNS management, etc, my last deployment failed.  However, I didn't immediately notice and so I guess the site had been down since at least 2 months ago.

I spent this morning getting it back up and running and moved it off Zeit and back to GH Pages.  Sadly, I lost some of the HTTPS features that Zeit had to automatically manage the domains etc.  The only advantage I had by using Zeit was easier HTTPS setup, but I quickly realized that CloudFlare's free tier is pretty much just as a robust and even adds a lot more controls.  Thanks to [cvan](https://gist.github.com/cvan) on Github, I found [this really nice Gist that explains the process](https://gist.github.com/cvan/8630f847f579f90e0c014dc5199c337b).