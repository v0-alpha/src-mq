import {
	breakpoints,
	extendBreakpoints,
	resetBreakpoints,
	setBreakpoints,
} from './config'
import { fromQuery, fromUntilQuery, untilQuery } from './media-queries'

export const until = Object.entries(breakpoints).reduce(
	(untils, [untilName, untilWidth]) => {
		const getQuery = (): MediaQuery => untilQuery(untilWidth)
		getQuery.for = {
			screen: (): MediaQuery => untilQuery(untilWidth, 'screen'),
			print: (): MediaQuery => untilQuery(untilWidth, 'print'),
			speech: (): MediaQuery => untilQuery(untilWidth, 'speech'),
		}
		return {
			[untilName]: getQuery,
			...untils,
		}
	},
	{},
)

export const from = Object.entries(breakpoints).reduce(
	(froms, [fromName, fromWidth], i) => {
		const getFromQuery = (): MediaQuery => fromQuery(fromWidth)
		;(getFromQuery.until = Object.entries(breakpoints)
			.splice(i + 1)
			.reduce((untils, [untilName, untilWidth], i) => {
				const getUntilQuery = (): MediaQuery =>
					fromUntilQuery(fromWidth, untilWidth)
				getUntilQuery.for = {
					screen: (): MediaQuery =>
						fromUntilQuery(fromWidth, untilWidth, 'screen'),
					print: (): MediaQuery =>
						fromUntilQuery(fromWidth, untilWidth, 'print'),
					speech: (): MediaQuery =>
						fromUntilQuery(fromWidth, untilWidth, 'speech'),
				}
				return {
					[untilName]: getUntilQuery,
					...untils,
				}
			}, {})),
			(getFromQuery.for = {
				screen: (): MediaQuery => fromQuery(fromWidth, 'screen'),
				print: (): MediaQuery => fromQuery(fromWidth, 'print'),
				speech: (): MediaQuery => fromQuery(fromWidth, 'speech'),
			})
		return {
			[fromName]: getFromQuery,
			...froms,
		}
	},

	{},
)

export { resetBreakpoints, setBreakpoints, extendBreakpoints }
