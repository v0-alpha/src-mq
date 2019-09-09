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

Restricts styles to media as wide as or wider than __breakpoint__, for example:

```css
/* {[from.small]: { ... }} */

@media all and (min-width: 30em) { ... }
```

When used without further refinement, it yields the media query we've constructed up to this point.

#### Optional refinement

##### `.until`

See __.until__ below.

##### `.for`

See __.for__ below.

<hr />

### `until` / `.until`

Type: `Object.<breakpoint>`

Restricts styles to media narrower than __breakpoint__, for example:

```css
/* {[until.large]: { ... }} */

@media all and (max-width: 61.1875em) { ... }
```

```css
/* {[from.small.until.large]: { ... }} */

@media all and (min-width: 30em) and (max-width: 61.1875em) { ... }
```

When used without further refinement, it yields the media query we've constructed up this point.

#### Optional refinement

##### `.for`

Optional refinement of `fromBreakpointName`. See __.for__ below.


### `.for`

Type: `Object.(screen | print | speech)`

Overrides the default media type of `all`, and restricts styles to media of types:

- `screen`
- `print`
- `speech`

For example:

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
