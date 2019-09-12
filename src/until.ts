import getFor from './for'
import query from './query'

export interface UntilQuery {
	[key: string]: {
		(): MediaQuery
		toString(): MediaQuery
		for: {
			[key in MediaType]: () => MediaQuery
		}
	}
}

export default (breakpoints: BreakpointsList, from?: number): UntilQuery =>
	breakpoints.reduce((untils, [untilName, untilWidth]) => {
		const until = () => query({ until: untilWidth, from })

		until.toString = () => query({ until: untilWidth, from })

		until.for = getFor((mediaType: MediaType) =>
			query({ until: untilWidth, from }, mediaType),
		)

		return {
			[untilName]: until,
			...untils,
		}
	}, {})
