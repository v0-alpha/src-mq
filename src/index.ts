import { breakpoints, resetBreakpoints, setBreakpoints } from './config'
import { fromQuery, fromUntilQuery, untilQuery } from './media-queries'

type Breakpoints = keyof typeof breakpoints

type Until = { [key in Breakpoints]: string }

type From = {
	[key in Breakpoints]: {
		toString: () => string
		until: Until
	}
}

export const until = Object.entries(breakpoints).reduce(
	(untils, [untilName, untilWidth]) => ({
		[untilName]: untilQuery(untilWidth),
		...untils,
	}),
	{},
) as Until

export const from = Object.entries(breakpoints).reduce(
	(froms, [fromName, fromWidth], i) => ({
		[fromName]: {
			until: Object.entries(breakpoints)
				.splice(i + 1)
				.reduce(
					(untils, [untilName, untilWidth], i) => ({
						[untilName]: fromUntilQuery(fromWidth, untilWidth),
						...untils,
					}),
					{},
				),
			toString: () => fromQuery(fromWidth),
		},
		...froms,
	}),

	{},
) as From

export { resetBreakpoints, setBreakpoints }
