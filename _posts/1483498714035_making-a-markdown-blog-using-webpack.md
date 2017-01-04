---
title:   Making a Markdown Blog Using Webpack  
author:  omardelarosa  
timestamp: 1483498714035  
created_at: 1483498714035  
published_at: 1483504269673  
slug:    making-a-markdown-blog-using-webpack  
ogDescription: an article about making a static-file blog using webpack and html-webpack-plugin by omar delarosa  
  
---
## A Brief Background
When I started working on this site, my first hunch was to use that [classic static website builder, Jekyll](https://jekyllrb.com/).  It's simplicity and tight github integration seemed great.  However, there's just one issue:  it's not easily integrated with [Webpack](https://webpack.github.io/) and the rest of the modern front-end dev stack.  In fact, it seems written for Ruby on Rails devs--but let's save that for another post.

Shortly after starting to look beyond Jekyll, I started fiddling around with the [`html-webpack-plugin`](https://github.com/ampedandwired/html-webpack-plugin) and realized:  wait a minute I think I can make a perfectly suitable blog with just this.

## Configuring Webpack
So if you're not already familiar with webpack, it relies on a `webpack.config.js` (or whatever you wanna name it) file that usually takes a form along the lines of:

```javascript
const path = require('path');

module.exports = {
	// Your precompiled JS file(s) for bundling.
	entry: {
		// A main entry bundle.
		main: './src/main.js',
		// Some other random bundle.
		secondary: './src/something-else.js'
	},
	
	// Your post-compiled assets path.
	output: path.join(__dirname, 'dist'),
	
	// Your module-loading configuration.
	module: {
		
		// Loader/transpiler config.
		loaders: [
			// A sample babel loader that processes your fancy, ES2019-next-rc-11 or whatever.
			{
			  test: /\.js$/, loader: 'babel'
			}
		]
	},
	
	// And this mysterious array.
	plugins: [
	
		// Why am I here??????

	]
};
```

Well the bulk of this file doesn't need much changing.  In fact, you can leave most of it as is.  The part that matters is that ever-so-mysterious `Array` of `plugins`.

## Plugins for `plugins`
So for starters, let's come back to the [`html-webpack-plugin`](https://github.com/ampedandwired/html-webpack-plugin).  If you aren't familiar with what it does, here's what it does:

1. Injests an `Object` of options, such as `title`, metadata etc.
2. Injects the proper `<link>` and/or `<script>` tags associated with your webpack bundle.
3. Spits out a `.html` file based on your options.

So given a template like this:

```jade
html
  head
    title= htmlWebpackPlugin.options.title 
    meta(charset='utf-8')
  body
    #main-container Hello world!
```

And a `webpack.config.js` (using [`pug`](https://pugjs.org/api/getting-started.html) for templates) that looks something like this:

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// ...
	
	plugins: [
		new HtmlWebpackPlugin({
			// A string identifying where the template is located.
			// and optionally which webpack loaders to use. 
			template: 'pug!templates/index.pug',
			
			// Do you wanna make some cache? $$$
			cache: true,

			// Specifying that only the "main" bundle should be inserted.
			chunks: [ 'main' ],
			
			// The contents of your <title></title> tag.
			title: 'The Main Page',
			
			// The location and source of your output file.
			filename: 'pages/index.html'
		})
	]
	
	// ...
}

```

Sounds pretty simple right?  It's deceptively simple.  Like webpack itself, this plugin's [minimal API surface area](https://www.youtube.com/watch?v=4anAwXYqLG8) is where its power lies--and also in its ability to receive (and potentially render) arbitrary options.

## Arbitrary Options and Loops
The secret to making a blog from all this is is learning to combine two features of the `html-webpack-plugin`:

1. The fact that you can pass as many of them as you want.
2. The arbitrary options object.

So feature #1 is best harnessed with [the `Array` spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) which is available in most post-ES6 flavors of JavaScript:

```javascript
const arr = [ ...[1, 2, 3 ], ...[4, 5, 6] ];
```

*NOTE: For the remainder of this process, I recommend a relatively modern version of NodeJS (I'm using 6.5.0 at the time of writing this).*

Given the above `webpack.config.js`, you can create a bunch of HTML pages simply by list generation and iteration.  Here's an example using [`lodash.times`](https://lodash.com/docs/4.17.4#times):

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
// https://lodash.com/docs/4.17.4#times
const times = require('lodash/times');

const makeHtmlConfig = (n) => ({
	template: 'pug!templates/index.pug',
	cache: true,
	chunks: [ 'main' ],
	title: `Page Number ${n}`,
	filename: `pages/page_${n}.html`
});

module.exports = {
	// ...
	
	plugins: [
		// Instead of one HtmlWebpackPlugin, how about a hundred?
		...times(100, makeHtmlConfig)
	]
	
	// ...
}
```
The above code should spit out 100 pages based on your `pug` template, each with a different `<title></title>` and filename.

That's obviously pretty useless.  However, by harnessing feature #2 from the list above, you can do some useful stuff.

## Injecting Arbitrary HTML In A Template
Because `html-webpack-plugin` takes an plain `Object` as its input, you can add additional key/value pairs very easily using our above looping system.  However, the nicest part of all is that this data is all available inside the template from the `htmlWebpackPlugin.options` object.  (Along with a few others outlined in [its documention](https://github.com/ampedandwired/html-webpack-plugin#writing-your-own-templates)).

So if I were to add the following changes to my `makeHtmlConfig` function:

```javascript
const makeHtmlConfig = (n) => ({
	template: 'pug!templates/index.pug',
	cache: true,
	chunks: [ 'main' ],
	title: `Page Number ${n}`,
	filename: `pages/page_${n}.html`,
	bodyText: `The number is ${n}`
});
```
And make the following changes to my source template:

```jade
html
  head
    title= htmlWebpackPlugin.options.title 
    meta(charset='utf-8')
  body
    #main-container= htmlWebpackPlugin.options.bodyText
```

It would create a bunch of HTML pages with `<div>` elements in their `<body>` node's taking the following form:

```html
// pages/page_1.html
<div id='main-container'>The number is 1</div>

// pages/page_2.html
<div id='main-container'>The number is 2</div>

// pages/page_3.html
<div id='main-container'>The number is 3</div>
```

This alone a blog does not make, though.

## Adding Markdown

Now adding markdown is one of the easier parts.  To do this, just add several markdown files in the `./md` directory.

Then make the following modifications to the `webpack.config.js` file:

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const marked = require('marked');
const fs = require('fs');

// Assuming I add a bunch of .md files in my ./md dir.
const MARKDOWN_FILE_DIR = './md';

/*
* Generates an Array with the following data:
* [
*   { 
*     filename: '{markdownFilename}.md',
*     markdown: '{ markdownString }`
*   }
* ]
*/
const markdownFilesData = fs
   // Read directory contents
	.readdirSync(MARKDOWN_FILE_DIR)
	// Take only .md files
	.filter(filename => /\.md$/.test(filename))
	// Normalize file data.
	.map(filename => {
		return {
			markdown: fs.readFileSync(
			  path.join(MARKDOWN_FILE_DIR, mdFilename)
			),
			filename 
		}
	});

const makeHtmlConfig = ({ filename, markdown }) => ({
	template: 'pug!templates/index.pug',
	cache: true,
	chunks: [ 'main' ],
	title: `Page Number ${n}`,
	filename: `pages/${filename}.html`,
	// Parses the markdown string and converts to HTML string
	bodyHTML: marked(markdown)
});

module.exports = {
	// ...
	
	plugins: [
		// map the above function to the array of file data
		...markdownFiles.map(makeHtmlConfig)
	]
	
	// ...
}
```

Afterwards, let's make a simple modifcation to the `pug` template to allow it to receive the HTML produced with the previous process and render the unescaped HTML string in the `div.#main-container`:

```jade
html
  head
    title= htmlWebpackPlugin.options.title 
    meta(charset='utf-8')
  body
    #main-container= !{htmlWebpackPlugin.options.bodyHTML}
```

And voila!  You should now be able to add posts in Markdown to the `md/` directory and build the blog into static HTML pages using:

```shell
$ webpack --config webpack.config.js
```

## Examples
To see a working example of this, just check out the following files in the source code of this very website:

- [`build/base.webpack.config.js`](https://github.com/omardelarosa/omardelarosa.github.io/blob/master/build/base.webpack.config.js)
- [`build/prod.webpack.config.js`](https://github.com/omardelarosa/omardelarosa.github.io/blob/master/build/prod.webpack.config.js) 
- [`_posts/`](https://github.com/omardelarosa/omardelarosa.github.io/tree/master/_posts)
- [`posts/`](https://github.com/omardelarosa/omardelarosa.github.io/tree/master/posts)
- [`templates/blog.pug`](https://github.com/omardelarosa/omardelarosa.github.io/blob/master/templates/blog.pug)

Although there are a couple other things going on in the webpack configs for this project (such as a distinction between static `pages` and `posts`), the principles are basically the same as the above examples.