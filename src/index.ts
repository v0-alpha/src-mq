import {
	breakpoints,
	Breakpoints,
	extendBreakpoints,
	resetBreakpoints,
	setBreakpoints,
} from './config'
import { fromQuery, fromUntilQuery, untilQuery } from './media-queries'

/*
`from` and `until` are objects with overridden `toString` methods,
so that they can be coerced into media query strings _or_ provide
further refinement of the query. this freaky genius was thought up
by @SiAdcock.

e.g.:

const styles = {
	[from.small]: {
		color: 'red'
	},
	[from.small.until.large]: {
		color: 'blue'
	},
	[from.small.until.large.for('print')]: {
		color: 'black'
	},
}
*/

type Until = {
	[key in Breakpoints]: {
		toString: () => string
		for: (mediaType: string) => string
	}
}

type From = {
	[key in Breakpoints]: {
		toString: () => string
		until: Until
		for: (mediaType: string) => string
	}
}

export const until = Object.entries(breakpoints).reduce(
	(untils, [untilName, untilWidth]) => ({
		[untilName]: {
			toString: () => untilQuery(untilWidth),
			for: (mediaType: string) => untilQuery(untilWidth, mediaType),
		},
		...untils,
	}),
	{},
) as Until

export const from = Object.entries(breakpoints).reduce(
	(froms, [fromName, fromWidth], i) => ({
		[fromName]: {
			toString: () => fromQuery(fromWidth),
			for: (mediaType: string) => fromQuery(fromWidth, mediaType),
			until: Object.entries(breakpoints)
				.splice(i + 1)
				.reduce(
					(untils, [untilName, untilWidth], i) => ({
						[untilName]: {
							toString: () => fromUntilQuery(fromWidth, untilWidth),
							for: (mediaType: string) =>
								fromUntilQuery(fromWidth, untilWidth, mediaType),
						},
						...untils,
					}),
					{},
				),
		},
		...froms,
	}),

	{},
) as From

export { resetBreakpoints, setBreakpoints, extendBreakpoints }
