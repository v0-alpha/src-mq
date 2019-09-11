const defaults = {
	xxSmall: 320,
	xSmall: 375,
	small: 480,
	medium: 740,
	large: 980,
	xLarge: 1140,
	xxLarge: 1300,
}

let breakpoints = defaults

export const extendBreakpoints = userBreakpoints =>
	(breakpoints = { ...breakpoints, ...userBreakpoints })

export const setBreakpoints = userBreakpoints => (breakpoints = userBreakpoints)

export const resetBreakpoints = () => (breakpoints = defaults)

export type Breakpoints = keyof typeof breakpoints
export { breakpoints }
