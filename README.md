# src-mq

Legible breakpoints for JavaScript.

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

Breakpoint values are converted to ems, assuming an em is 16 pixels.

### @media type
The default is `all`.

## Usage

There are two ways of applying breakpoints:

- `from` (applies from `breakpoint.value`)
- `until` (applies until `breakpoint.value - 1`)

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

### @media types

Both techniques can chain an optional `for()` method, allowing you set a custom media type for an individual query:

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

## Custom breakpoints

Breakpoints can be replaced, extended or restored:

```js
import {
	setBreakpoints,
	extendBreakpoints,
	resetBreakpoints,
} from 'src-mq'

/*
breakpoints are the default set:
	- xxSmall (320 pixels)
	- xSmall (375 pixels)
	- small (480 pixels)
	- medium (740 pixels)
	- large (980 pixels)
	- xLarge (1140 pixels)
	- xxLarge (1300 pixels)
*/

setBreakpoints({ tiny: 1, massive: 10000000 })

/*
breakpoints have been replaced:
	- tiny (1 pixel)
	- massive (10000000 pixels)
e.g. { [from.tiny.until.massive]: { … } }
*/

extendBreakpoints({ infinitesimal: 0.00000001 })

/*
breakpoints have been extended:
	- infinitesimal (0.00000001 pixels)
	- tiny (1 pixel)
	- massive (10000000 pixels)
e.g. { [from.infinitesimal.until.tiny]: { … } }
*/

resetBreakpoints()

/*
breakpoints have been restored to the default set:
	- xxSmall (320 pixels)
	- xSmall (375 pixels)
	- small (480 pixels)
	- medium (740 pixels)
	- large (980 pixels)
	- xLarge (1140 pixels)
	- xxLarge (1300 pixels)
*/
```


## Prior art
`src-mq` is heavily inspired by [sass-mq](https://github.com/sass-mq/sass-mq).

It's extracted from work [originally done at the Guardian](https://github.com/guardian/dotcom-rendering/pull/21) as part of the new rendering tier, and now being rolled into their [Source Design System](https://github.com/guardian/source-components).

Hence the name 💃.
