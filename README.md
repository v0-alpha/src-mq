# src-mq

🤓 Legible breakpoints for JavaScript.

[![Build Status](https://travis-ci.org/src-mq/src-mq.svg?branch=master)](https://travis-ci.org/src-mq/src-mq)
[![codecov](https://codecov.io/gh/src-mq/src-mq/branch/master/graph/badge.svg)](https://codecov.io/gh/src-mq/src-mq)

### Example

```js
import { from, until } from 'src-mq'

const styles = {
	p {
		[from.small]: { ... },
		
		[until.large]: { ... },
		
		[from.small.until.large]: { ... },
		
		[from.small.until.large.for.print]: { ... },
	}
}
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

Breakpoint values are output as ems, assuming an em is 16 pixels.

### Media type
`@media all`

## API

### from.[breakpoint]

Apply rules from __breakpoint__, for example:

```css
/* {[from.small]: { ... }} */

@media all and (min-width: 30em) { ... }
```

### until.[breakpoint]

Apply rules until one pixel before __breakpoint__, for example:

```css
/* {[until.large]: { ... }} */

@media all and (max-width: 61.1875em) { ... }
```

### from.[breakpoint1].until.[breakpoint2]

Apply rules from __breakpoint1__ until one pixel before __breakpoint2__, for example:

```css
/* {[from.small.until.large]: { ... }} */

@media all and (min-width: 30em) and (max-width: 61.1875em) { ... }
```

### [...].for.[`screen` | `print` | `speech`]

Apply rules for `screen`, `print` or `speech`, rather than the default `all`, for example:

```css
/* {[from.small.for.screen]: { ... }} */

@media screen and (min-width: 30em) { ... }
```

```css
/* {[until.large.for.print]: { ... }} */

@media print and (min-width: 30em) { ... }
```

```css
/* {[from.small.until.large.for.speech]: { ... }} */

@media speech and (min-width: 30em) and (max-width: 61.1875em) { ... }
```



## Customising breakpoints

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


## Acknowledgements
_src-mq_ is heavily inspired by [sass-mq](https://github.com/sass-mq/sass-mq).

It's extracted from work [originally done at the Guardian](https://github.com/guardian/dotcom-rendering/pull/21) and that is now being rolled into their [Source Design System](https://github.com/guardian/source-components).

Hence the name 💃.
