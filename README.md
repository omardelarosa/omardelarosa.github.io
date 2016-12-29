# Personal Website

This personal website runs on a custom markdown-based CMS centered around using webpack to statically build most things ahead of time.  This in turn favors traditional HTML-page for navigation over relatively static content over client-side routing (which has its place, but this isn't one of them).

## Installtion and Setup

The following commands will server the static site on `http://localhost:8085`

```javascript
npm install
npm start
```

## Development

For local development, use:
```javascript
npm run dev
```

## Creating a new post

```
node ./create-post.js

```
