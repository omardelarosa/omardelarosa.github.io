---
title:   Simple HTTPS Setup S3 + CloudFlare
author:  omardelarosa
timestamp: 1511974081367
created_at: 1511974081367
published_at: 1511974081367
slug:    static-hosting-saga-2
ogDescription: an article about getting static hosting to work via Amazon S3 and kinda sorta blogging like a hacker

---

After a bit more investigation yesterday, I realized that github pages forces my website headers to always be 30x.  This is not ideal. Furthermore, it makes it tough to use `https` protocol for my custom domain, which [google now favors in search results.](https://thenextweb.com/google/2015/12/17/unsecured-websites-are-about-to-get-hammered-in-googles-search-ranking/)

Thought I was never one to fully [blog like a hacker](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html), I'm now even closer to that hacker-blogging destiny by hosting this page via S3 + CloudFront.  Without going too deep into the "why", I think with the limited time available for personal projects the low devops-y maintenance overhead for using static files instead of WordPress or fancy CMS is the main appeal.

## The Steps

Turns out, this process of getting your static hosting to be HTTPS ready, S3-hosted and search-friendly isn't as painful (or costly) as I'd previously imagined.  Here's the gist:

### 1. Register a domain.

For this, I used Google Domains, which I've gradually been moving all my domains to.  Nothing against, GoDaddy and IWantMyName.com (my former domain management systems), but their UIs are clunky and always trying to sell me more domains.  I wanted something simple an Google Domains delivers.

### 2. Make an S3 Bucket

You can read about [the Amazon S3 bucket-making process elsewhere](http://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html).  The only caveat is to make sure that your bucket name matches your domain.  For example mine is: `omardelarosa.com`.  You will also need a second bucket to redirect the `www`.  For me its `www.omardelarosa`.  This is because of a small, quirk re: AWS S3 which is that CNAME redirects require the domain and bucket name to match.  I'm guessing that's for security purposes.

### 3. Use `awscli` to Sync Up
Anyway, once it's made, I recommend using the `awscli` to sync up your files, which looks like this:

```bash
pip install awscli
cd /path/to/your/project
aws configure
aws s3 sync . s3://yoursite.com/
```

This will transfer all your files from the current directory to your bucket.  In my case, I exclude a few files like `node_modules/` and `.git/`, but use your own judgement.  This is kinda up to you.  Here's what I'm using:

```bash
aws s3 sync . s3://omardelarosa.com/ --exclude "node_modules/*" --exclude ".*"

```

### 4. Update S3 File permissions
You will need to then make an files, directories public on S3 in order to allow browsers to load the files:

<img src="/assets/uploads/2017_11_29_screenshot1.png" width="250" />

### 5. Configure The Bucket for WebHosting
You will then need to configure the S3 Bucket for Web Hosting, which is best explained by [Amazon's own docs on the subject of enabling web hosting](http://docs.aws.amazon.com/AmazonS3/latest/user-guide/static-website-hosting.html).

After this is done, you should be able to visit your website using the raw, AWS S3 bucket hostname:

```
{yoursite-bucket}.s3-website-{yourawsregion}.amazonaws.com
```

### 6. Sign Up For A Free CloudFlare Account

Go to: [https://www.cloudflare.com/a/sign-up](https://www.cloudflare.com/a/sign-up) and sign up.  (No, I don't get commission or affiliates.  It's just got a pretty usable free-tier.)

When this is done, make sure you configure the same domain you registered in step 1 to use CloudFlare's services, making sure to update your nameservers, etc. to theirs.

### 7. SSL
To enable SSL, just find the "Crypto" section in the CloudFlare Dashboard and set the SSL option to "Flexible":

<img src="/assets/uploads/2017_11_29_screenshot2.png" width="250" />

### 8. HTTPS
Finally, to enable HTTPS you will simply need to add a page rule for your domain that enforces HTTPS.  You can see the steps for doing this here on the [CloudFlare documentation for adding HTTPS](https://support.cloudflare.com/hc/en-us/articles/200170536-How-do-I-redirect-all-visitors-to-HTTPS-SSL-).

### 9. Adding a `www` redirect

Once those steps are complete, if you would like to add a `www` redirect.  This can be done fairly simply by adding another S3 bucket called `www.{yoursitebucket-name}` and setting its redirect to your other bucket.  Instructions for that can be found on the [AWS Docs for redirects.](http://docs.aws.amazon.com/AmazonS3/latest/user-guide/redirect-website-requests.html).

## Conclusion

Once all these steps are done, you should have a fully functioning HTTPS static site hosted on S3 and backed (and cached) by CloudFlare.

After doing all this, I set up a few helpful scripts to "deploy" my site.  That script can be found [here on the Github repo for this site.](https://github.com/omardelarosa/omardelarosa.github.io/blob/master/deploy.sh).

In that script I also purge the cache after publishing and send the sitemap to Google.
