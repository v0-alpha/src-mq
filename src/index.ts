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

interface Until {
	[key: string]: {
		(): MediaQuery
		toString(): MediaQuery
		for: {
			[key in MediaType]: () => MediaQuery
		}
	}
}

export const until: Until = Object.entries(breakpoints).reduce(
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

interface From {
	[key: string]: {
		(): MediaQuery
		toString(): MediaQuery
		until: Until
		for: {
			[key in MediaType]: () => MediaQuery
		}
	}
}

export const from: From = Object.entries(breakpoints).reduce(
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
