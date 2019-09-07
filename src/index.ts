import {
	breakpoints,
	Breakpoints,
	extendBreakpoints,
	resetBreakpoints,
	setBreakpoints,
} from './config'
import { fromQuery, fromUntilQuery, untilQuery } from './media-queries'

type Until = {
	[key in Breakpoints]: {
		toString: () => string
		for: (arg0: string) => string
	}
}

type From = {
	[key in Breakpoints]: {
		toString: () => string
		until: Until
		for: (arg0: string) => string
	}
}

export const until = Object.entries(breakpoints).reduce(
	(untils, [untilName, untilWidth]) => ({
		[untilName]: {
			toString: () => untilQuery(untilWidth), // this piece of freaky genius by @SiAdcock
			for: (type: string) => untilQuery(untilWidth, type),
		},
		...untils,
	}),
	{},
) as Until

export const from = Object.entries(breakpoints).reduce(
	(froms, [fromName, fromWidth], i) => ({
		[fromName]: {
			toString: () => fromQuery(fromWidth), // this piece of freaky genius by @SiAdcock
			for: (type: string) => fromQuery(fromWidth, type),
			until: Object.entries(breakpoints)
				.splice(i + 1)
				.reduce(
					(untils, [untilName, untilWidth], i) => ({
						[untilName]: {
							toString: () => fromUntilQuery(fromWidth, untilWidth), // this piece of freaky genius by @SiAdcock
							for: (type: string) =>
								fromUntilQuery(fromWidth, untilWidth, type),
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
