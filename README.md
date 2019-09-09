# src-mq

🤓 Legible breakpoints for JavaScript.

[![Build Status](https://travis-ci.org/src-mq/src-mq.svg?branch=master)](https://travis-ci.org/src-mq/src-mq)
[![codecov](https://codecov.io/gh/src-mq/src-mq/branch/master/graph/badge.svg)](https://codecov.io/gh/src-mq/src-mq)

### Example

```js
import { from, until } from 'src-mq'

const styles = {

	[from.small]: { ... },

	[until.large]: { ... },

	[from.small.until.large]: { ... },

	[from.small.until.large.for.screen]: { ... },

}
```

## API

### `from`

Type: `Object.<breakpoint>`

- set a minimum width of __breakpoint__
- when used as a string, it yields a media query

##### Example

```css
/* {[from.small]: { ... }} */

@media all and (min-width: 30em) { ... }
```

#### Refinement

The scope of the query can be restricted by chaining further refinements:

##### `.until`

Set a maximum width. See __until__ below.

##### `.for`

Set an explicit media type. See __for__ below.

### `until`

Type: `Object.<breakpoint>`

- set a maximum width of __breakpoint__ − 1px
- can be chained to the result of a __from__
- when used as a string, it yields a media query

##### Example

```css
/* {[until.large]: { ... }} */

@media all and (max-width: 61.1875em) { ... }
```

```css
/* {[from.small.until.large]: { ... }} */

@media all and (min-width: 30em) and (max-width: 61.1875em) { ... }
```

#### Refinement

As with __from__, the scope of the query can be restricted by chaining a further refinement:

##### `.for`

Set an explicit media type. See __for__ below.


### `.for`

Type: `Object.(screen | print | speech)`

- can only be used as a refinment of __from__ or __until__
- overrides the default media type (`all`), with any of the following:
 - `screen`
 - `print`
 - `speech`

##### Example

```css
/* {[from.small.for.screen]: { ... }} */

@media screen and (min-width: 30em) { ... }
```

```css
/* {[until.large.for.print]: { ... }} */

@media print and (max-width: 61.1875em) { ... }
```

```css
/* {[from.small.until.large.for.speech]: { ... }} */

@media speech and (min-width: 30em) and (max-width: 61.1875em) { ... }
```

## Defaults

### Breakpoints

- `xxSmall` (320 pixels)
- `xSmall` (375 pixels)
- `small` (480 pixels)
- `medium` (740 pixels)
- `large` (980 pixels)
- `xLarge` (1140 pixels)
- `xxLarge` (1300 pixels)

_Breakpoint values are output to CSS as ems, assuming 1em = 16px._

### Media type
`@media all`


## Overriding defaults

The default set of breakpoints can be replaced, extended or restored:

```js
import {
	setBreakpoints,
	extendBreakpoints,
	resetBreakpoints,
} from 'src-mq'

// Breakpoints are the default set:
//
// 	- xxSmall (320 pixels)
// 	- xSmall (375 pixels)
// 	- small (480 pixels)
// 	- medium (740 pixels)
// 	- large (980 pixels)
// 	- xLarge (1140 pixels)
// 	- xxLarge (1300 pixels)
//
// You can do [from.small.until.medium] etc.

setBreakpoints({ tiny: 1, massive: 10000000 })

// Breakpoints have been replaced:
//
// 	- tiny (1 pixel)
// 	- massive (10000000 pixels)
//
// Now you can do [from.tiny.until.massive],
// but not [from.small.until.medium] etc.

extendBreakpoints({ infinitesimal: 0.00000001 })

// Breakpoints have been extended:
//
// 	- infinitesimal (0.00000001 pixels)
// 	- tiny (1 pixel)
// 	- massive (10000000 pixels)
//
// Now you can do [from.infinitesimal.until.massive] etc.

resetBreakpoints()

// Breakpoints have been restored to the default set:
//
// 	- xxSmall (320 pixels)
// 	- xSmall (375 pixels)
// 	- small (480 pixels)
// 	- medium (740 pixels)
// 	- large (980 pixels)
// 	- xLarge (1140 pixels)
// 	- xxLarge (1300 pixels)
//
// Now you can do [from.small.until.medium],
// but not [from.tiny.until.massive] etc.

```

## Complex queries
By design, _src-mq_ is limited to media type and min/max-width expressions.

To generate more complex queries than this, you can concatenate its output with any valid media feature expressions, for example:

```css
/* {[from.small + " and (prefers-reduced-motion: reduce)"]: { ... }} */

@media all and (min-width: 30em) and (prefers-reduced-motion: reduce) { ... }
```


## Acknowledgements
_src-mq_ is heavily inspired by [sass-mq](https://github.com/sass-mq/sass-mq).

It's extracted from work [originally done at the Guardian](https://github.com/guardian/dotcom-rendering/pull/21) and that is now being rolled into their [Source Design System](https://github.com/guardian/source-components).

Hence the name 💃.
