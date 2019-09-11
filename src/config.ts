const defaults: Breakpoints = {
	xxSmall: 320,
	xSmall: 375,
	small: 480,
	medium: 740,
	large: 980,
	xLarge: 1140,
	xxLarge: 1300,
}

let breakpoints: Breakpoints = defaults

export const extendBreakpoints = (userBreakpoints: Breakpoints) =>
	(breakpoints = { ...breakpoints, ...userBreakpoints })

export const setBreakpoints = (userBreakpoints: Breakpoints) =>
	(breakpoints = userBreakpoints)

export const resetBreakpoints = () => (breakpoints = defaults)

export { breakpoints }
