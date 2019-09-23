import getFor from './for'
import query from './query'
import getUntil, { UntilQuery } from './until'

export interface FromQuery<Breakpoint extends string> {
	[key: Breakpoint]: {
		(): MediaQuery
		toString: () => MediaQuery
		for: {
			[key in MediaType]: () => MediaQuery
		}
		until: UntilQuery
	}
}

export default <Breakpoint>(
	breakpoints: [Breakpoint, number][],
): FromQuery<Breakpoint> =>
	breakpoints.reduce((froms, [fromName, fromWidth], i) => {
		const from = () => query({ from: fromWidth })

		from.toString = () => query({ from: fromWidth })

		from.for = getFor((mediaType: MediaType) =>
			query({ from: fromWidth }, mediaType),
		)

		from.until = getUntil(breakpoints.slice(i + 1), fromWidth)

		return {
			[fromName]: from,
			...froms,
		}
	}, {})
