import {
	extendBreakpoints,
	getBreakpoints,
	resetBreakpoints,
	setBreakpoints,
} from './config'
import getFrom from './from'
import getUntil from './until'

const breakpoints = getBreakpoints()

export const until = getUntil(breakpoints)

export const from = getFrom(breakpoints)

export { resetBreakpoints, setBreakpoints, extendBreakpoints }
