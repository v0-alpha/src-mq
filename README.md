# src-mq

🤓 Lucid breakpoints for JavaScript.

[![Build Status](https://travis-ci.com/v0-alpha/src-mq.svg?branch=master)](https://travis-ci.com/v0-alpha/src-mq)
[![codecov](https://codecov.io/gh/v0-alpha/src-mq/branch/master/graph/badge.svg)](https://codecov.io/gh/v0-alpha/src-mq)
![npm type definitions](https://img.shields.io/npm/types/src-mq)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/src-mq)

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

#### Tagged templates
To use _src-mq_ in a tagged template, you will need to explicitly call it as a function.

For example, this is how you would use it with [Emotion](https://emotion.sh)'s `css`:

```js
import { from, until } from 'src-mq'
import css from 'emotion'

const className = css`
	${from.small()} { ... },

	${until.large()} { ... },

	${from.small.until.large()} { ... },

	${from.small.until.large.for.screen()} { ... },
`
```

## API

### `from<breakpoint>`

Type: `function`

Returns a media query scoped to:

- a minimum width of **breakpoint**

```scss
/* {[from.small]: { ... }} */

@media all and (min-width: 30em) and (max-width: none) { ... }
```

### `from<breakpoint>.for[screen, print, speech]`

Type: `function`

Returns a media query scoped to:

- a minimum width of **breakpoint**
- the specified media type

```scss
/* {[from.small.for.screen]: { ... }} */

@media screen and (min-width: 30em) and (max-width: none) { ... }
```

### `until<breakpoint>`

Type: `function`

Returns a media query scoped to:

- a maximum width of **breakpoint** − 1px

```scss
/* {[until.large]: { ... }} */

@media all and (min-width: none) and (max-width: 61.1875em) { ... }
```

### `until<breakpoint>.for[screen, print, speech]`

Type: `function`

Returns a media query scoped to:

- a maximum width of **breakpoint** − 1px
- the specified media type

```scss
/* {[until.large.for.screen]: { ... }} */

@media screen and (min-width: none) and (max-width: 61.1875em) { ... }
```

### `from<fromBreakpoint>.until<untilBreakpoint>`

Type: `function`

Returns a media query scoped to:

- a minimum width of **fromBreakpoint**
- a maximum width of **untilBreakpoint** − 1px

```scss
/* {[from.small.until.large]: { ... }} */

@media all and (min-width: 30em) and (max-width: 61.1875em) { ... }
```

### `from<fromBreakpoint>.until<untilBreakpoint>.for[screen, print, speech]`

Type: `function`

Returns a media query scoped to:

- a minimum width of **fromBreakpoint**
- a maximum width of **untilBreakpoint** − 1px
- the specified media type

```scss
/* {[from.small.until.large.for.screen]: { ... }} */

@media screen and (min-width: 30em) and (max-width: 61.1875em) { ... }
```

## Defaults

_src-mq_ provides a reasonable set of defaults:

#### Media type

`all`

#### Breakpoints

- `xxSmall` (320 pixels)
- `xSmall` (375 pixels)
- `small` (480 pixels)
- `medium` (740 pixels)
- `large` (980 pixels)
- `xLarge` (1140 pixels)
- `xxLarge` (1300 pixels)

_Breakpoint pixel values are converted ems in the CSS, assuming 1em = 16px._

## Overriding breakpoints

The default breakpoints can be replaced, extended or restored:

```js
import { setBreakpoints, extendBreakpoints, resetBreakpoints } from 'src-mq'

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

By design, _src-mq_ is limited to media type and min/max-width feature expressions.

To generate more complex queries than this, you can concatenate its output with any other valid feature expressions, for example:

```scss
/* {[from.small.for.screen + " and (prefers-reduced-motion: reduce)"]: { ... }} */

@media screen and (min-width: 30em) and (max-width: none) and (prefers-reduced-motion: reduce) { ... }
```

## Acknowledgements

_src-mq_ is heavily inspired by [sass-mq](https://github.com/sass-mq/sass-mq).

It's extracted from work [originally done at the Guardian](https://github.com/guardian/dotcom-rendering/pull/21) and that is now being rolled into their [Source Design System](https://github.com/guardian/source-components).

Hence the name 💃.
