import {
	breakpoints,
	extendBreakpoints,
	resetBreakpoints,
	setBreakpoints,
} from './config'
import { fromQuery, fromUntilQuery, untilQuery } from './media-queries'

const media: MediaType[] = ['screen', 'print', 'speech']

const setMediaType = (fn: (mediaType: MediaType) => MediaQuery) =>
	media.reduce((mediaTypes, mediaType) => {
		const typeQuery = fn.bind(null, mediaType)

		typeQuery.toString = typeQuery

		return {
			...mediaTypes,
			[mediaType]: typeQuery,
		}
	}, {})

export const until = Object.entries(breakpoints).reduce(
	(untils, [untilName, untilWidth]) => {
		const getQuery = () => untilQuery(untilWidth)

		getQuery.toString = getQuery

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

		getFromQuery.toString = getFromQuery

		getFromQuery.until = Object.entries(breakpoints)
			.splice(i + 1)
			.reduce((untils, [untilName, untilWidth], i) => {
				const getFromUntilQuery = () => fromUntilQuery(fromWidth, untilWidth)

				getFromUntilQuery.toString = getFromUntilQuery

				getFromUntilQuery.for = setMediaType(mediaType =>
					fromUntilQuery(fromWidth, untilWidth, mediaType),
				)

				return {
					[untilName]: getFromUntilQuery,
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
