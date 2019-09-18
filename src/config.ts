const defaults: Breakpoints = {
	xxSmall: 320,
	xSmall: 375,
	small: 480,
	medium: 740,
	large: 980,
	xLarge: 1140,
	xxLarge: 1300,
}

let breakpoints: BreakpointsList = Object.entries(defaults)

export const extendBreakpoints = (userBreakpoints: Breakpoints): void => {
	breakpoints = [...breakpoints, ...Object.entries(userBreakpoints)]
}

export const setBreakpoints = (userBreakpoints: Breakpoints): void => {
	breakpoints = Object.entries(userBreakpoints)
}

export const resetBreakpoints = (): void => {
	breakpoints = Object.entries(defaults)
}

export const getBreakpoints = (): BreakpointsList => breakpoints
