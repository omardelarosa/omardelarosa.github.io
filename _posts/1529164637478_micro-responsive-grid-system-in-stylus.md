---
title:   How To Build A Tiny Grid System with Stylus
author:  omardelarosa
timestamp: 1529164637478
created_at: 1529164637478
published_at: 1529164637478
slug:    micro-responsive-grid-system-in-stylus
ogDescription: an article about building a tiny, responsive grid system using stylus css preprocessr by omar delarosa

---

## Background

Since [I moved my site/blog/etc over to this static, micro-site a while back](https://www.omardelarosa.com/posts/new-blog.html), I haven't given it much ❤️  codewise.  There are a lot of little visual issues, etc. I haven't had time to fix in my personal site that I spend all day fixing during my day job.  Part of the issue is that I didn't design the stylesheets very well for this site and they can take time to reason about and edit.  In an attempt to change that, I've built a micro, responsive grid system here to hopefully make visual updates to this site less painful based on [a pretty decent tutorial I found](https://zellwk.com/blog/responsive-grid-system/).

### How To Build Your Grid System

#### Variables
So for starters, you need to define a few variables.  Think of these as the parameters for your grid system.  These parameters are as follows:

```stylus

// Variables
$GRID_WIDTH = 1200px // How wide is your outer container?
$GUTTER_WIDTH = 20px // How wide are your spaces between cells?
$MAX_COLS = 12 // How many total columns do you need?

// Breakpoint HashMap
$BREAKPOINTS = {
  xs: 0,
  s: 400,
  m: 600,
  l: 800,
  xl: 1080
}
```

##### `$GRID_WIDTH`
So the first parameter above is your `$GRID_WIDTH`, which determines how wide your outer container is.  Think of this as a bound for how big your row can get from side to side.


##### `$GUTTER_WIDTH`
The second parameter above is your `$GUTTER_WIDTH`.  This determines the size of the spaces between each of your cells in the grid.  Be careful adjusting this value, as it goes up, the space in your cells can be reduced.  Keeping this balanced is important.  (NOTE: I've opted for the "split" system that distributes this value across both left/right.  You can read more about this in the post I linked to above's "Method 3: Split gutters (Margin)" section.)


##### `$MAX_COLS`
The third parameter is your `$MAX_COLS` or the maximum number of columns your grid will support.  This can be tricky to select, since it depends on your overall design.  However, I tend to like 12 because it has both 2 and 3 as prime factors.  This allows for more subdivision options that don't require rounding, etc.  Taken in conjunction with my `$GRID_WIDTH` value above, this neatly makes my most atomic cell 100px in size, which is a nice bit to work with.

##### `$BREAKPOINTS`

The `$BREAKPOINTS` mapping helps me abstract out the breakpoints in such a way as to make them trivially configurable later and not have to hard-code numbers elsewhere in my code (only string key names).

#### Mixins

In order to keep this code DRY and easier to work with, I implemented a few helpful mixins.  This also avoids copy-pasting very similar code all over the place.  That being said, you have to be careful not to over-abstract too early and so I kept the mixins to a minimum of 2:

##### `clearfixer()`

```stylus
clearfixer()
  &:after
    display table
    clear both
    content ''
```

The `clearfixer()` mixin generates the pseudo-selector after element that vertically pushes down each cell in a row.  Since they are floating, this is required.  Perhaps in a subsequent iteration I might try to use a different type of system that avoids this, but for now it's simple and more widely supported than alternatives.

##### `columnProperties(n, gutterWidth)`

```stylus
columnProperties(n, gutterWidth)
  w = unit(gutterWidth * n, px)
  width "calc(calc(100% - %s) / %s)" % (w n)
  margin-right (gutterWidth / 2)
  margin-left (gutterWidth / 2)
  float left
```

The `columnProperties(n, gutterWidth)` mixin generates the rules for each `.k-c-{n}` and `.k-c-{n}-{bk}` class.  This allows me to define it in one place and easily scale it out to many breakpoints, etc.  In a sense, this defines the meat of each column's class and makes the necessary calculations based on my input variables.  I've also parameterized them into this mixin to keep it somewhat flexible and usable in any context later.


#### CSS Rules and Classes

So for starters, a few global properties will need to be used in order to make sure our `box-sizing` is universally what we expect.  For the reasoning behind this, I recommend [reading about box-sizing elsewhere.](https://zellwk.com/blog/understanding-css-box-sizing/).  It's a bit out of scope here.

```stylus
html
  box-sizing border-box

  *,
  *:before,
  *:after
    box-sizing inherit
```

Afterwards, a utility class can be setup to define the row container.  I recommend adding a pseudo-vendor prefix.  I used `k-*` to help me distinguish my class names from others brought it via libraries and implement a micro-name-space:

```stylus
.k-row
  max-width $GRID_WIDTH
  margin-left auto
  margin-right auto
  clearfixer()
```

Finally, you are ready to define your `.*-col` classes:

```stylus
.k-col
  // Make standard column defs
  for n in (1..$MAX_COLS)
    &.k-c-{n}
      columnProperties(n, $GUTTER_WIDTH)
  // Make breakpoint specific column defs
  for bk, val in $BREAKPOINTS
    for n in (1..$MAX_COLS)
      @media (min-width: unit(val, px))
        &.k-c-{n}-{bk}
          columnProperties(n, $GUTTER_WIDTH)
```

In the end, this will generate your tiny, highly configurable grid system in ~50 lines of stylus:

Here it is altogether:

```stylus
// --- Variables ---
$GRID_WIDTH = 1200px
$GUTTER_WIDTH = 20px
$MAX_COLS = 12

// For now only two breakpoints are fine
$BREAKPOINTS = {
  xs: 0,
  s: 400,
  m: 600,
  l: 800,
  xl: 1080
}

// --- Mixins ---
// Generates a clearfix for the rows
clearfixer()
  &:after
    display table
    clear both
    content ''

// Applies the column properties
columnProperties(n,gutterWidth)
  w = unit(gutterWidth * n, px)
  width "calc(calc(100% - %s) / %s)" % (w n)
  margin-right (gutterWidth / 2)
  margin-left (gutterWidth / 2)
  float left

// --- Global Rules ---
html
  box-sizing border-box

*,
*:before,
*:after
  box-sizing inherit

.k-row,
.k-wrap
  max-width $GRID_WIDTH
  margin-left auto
  margin-right auto
  clearfixer()

.k-col
  // Make standard column defs
  for n in (1..$MAX_COLS)
    &.k-c-{n}
      columnProperties(n, $GUTTER_WIDTH)
  // Make breakpoint specific column defs
  for bk, val in $BREAKPOINTS
    for n in (1..$MAX_COLS)
      @media (min-width: unit(val, px))
        &.k-c-{n}-{bk}
          columnProperties(n, $GUTTER_WIDTH)
```

For examples on how to use this, you can check out [the source code for this site's grid.styl on Github](https://github.com/omardelarosa/omardelarosa.github.io/blob/master/src/styles/grid.styl) or this Codepen I made using this grid system:

<iframe height='265' scrolling='no' title='Simple CSS Grid' src='//codepen.io/omdel/embed/vrJwJQ/?height=265&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/omdel/pen/vrJwJQ/'>Simple CSS Grid</a> by omar delarosa (<a href='https://codepen.io/omdel'>@omdel</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
