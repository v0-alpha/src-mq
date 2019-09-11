import {
	breakpoints,
	extendBreakpoints,
	resetBreakpoints,
	setBreakpoints,
} from './config'
import { fromQuery, fromUntilQuery, untilQuery } from './media-queries'

const setMediaType = fn => ({
	screen: fn.bind(null, 'screen'),
	print: fn.bind(null, 'print'),
	speech: fn.bind(null, 'speech'),
})

export const until = Object.entries(breakpoints).reduce(
	(untils, [untilName, untilWidth]) => {
		const getQuery = () => untilQuery(untilWidth)
		getQuery.for = setMediaType(mediaType => untilQuery(untilWidth, mediaType))
		return {
			[untilName]: getQuery,
			...untils,
		}
	},
	{},
)

export const from = Object.entries(breakpoints).reduce(
	(froms, [fromName, fromWidth], i) => {
		const getFromQuery = () => fromQuery(fromWidth)
		getFromQuery.until = Object.entries(breakpoints)
			.splice(i + 1)
			.reduce((untils, [untilName, untilWidth], i) => {
				const getUntilQuery = () => fromUntilQuery(fromWidth, untilWidth)
				getUntilQuery.for = setMediaType(mediaType =>
					fromUntilQuery(fromWidth, untilWidth, mediaType),
				)

				return {
					[untilName]: getUntilQuery,
					...untils,
				}
			}, {})
		getFromQuery.for = setMediaType(mediaType =>
			fromQuery(fromWidth, mediaType),
		)
		return {
			[fromName]: getFromQuery,
			...froms,
		}
	},

	{},
)

export { resetBreakpoints, setBreakpoints, extendBreakpoints }
