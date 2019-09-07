# src-mq

🤓 Legible breakpoints for JavaScript.

[![Build Status](https://travis-ci.org/src-mq/src-mq.svg?branch=master)](https://travis-ci.org/src-mq/src-mq)
[![codecov](https://codecov.io/gh/src-mq/src-mq/branch/master/graph/badge.svg)](https://codecov.io/gh/src-mq/src-mq)

## Defaults

### Breakpoints

- `xxSmall` (320 pixels)
- `xSmall` (375 pixels)
- `small` (480 pixels)
- `medium` (740 pixels)
- `large` (980 pixels)
- `xLarge` (1140 pixels)
- `xxLarge` (1300 pixels)

_n.b. breakpoint values are converted to ems, assuming an em is 16 pixels._

### @media type
The default is `all`.

## Usage

There are two ways of applying breakpoints:

- `from`
- `until`

```js
import { from, until } from 'src-mq'

const styles = {

	[until.medium]: {
		color: 'green',
	},

	[from.large]: {
		color: 'red',
	},

}
```

_n.b. `from`  applies from the breakpoint, `until` applies until the breakpoint minus one pixel._

### Ranges

`from` can also chain an `until`, to apply styles _between_ two breakpoints:

```js
import { from } from 'src-mq'

const styles = {

	[from.small.until.medium]: {
		color: 'blue',
	},

}
```

### Custom @media types

Both techniques can chain an optional `for()` method, allowing you set a media type per query:

```js
import { from, until } from 'src-mq'

const styles = {

	[until.medium.for('print')]: {
		color: 'green',
	},

	[from.large.for('screen and print')]: {
		color: 'red',
	},

}
```

## Using your own breakpoints

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

It's extracted from work [originally done at the Guardian](https://github.com/guardian/dotcom-rendering/pull/21) that is now being rolled into their [Source Design System](https://github.com/guardian/source-components).

Hence the name 💃.
