import {
	breakpoints,
	extendBreakpoints,
	resetBreakpoints,
	setBreakpoints,
} from '../src/config'

const defaults = {
	xxSmall: expect.any(Number),
	xSmall: expect.any(Number),
	small: expect.any(Number),
	medium: expect.any(Number),
	large: expect.any(Number),
	xLarge: expect.any(Number),
	xxLarge: expect.any(Number),
}

const bespoke = { tiny: 5 }

describe('breakpoints', () => {
	test('are defaults without doing anything', () => {
		expect(breakpoints).toEqual(expect.objectContaining(defaults))
	})
	test('can be extended, replaced and reset', () => {
		extendBreakpoints(bespoke)
		expect(breakpoints).toEqual(
			expect.objectContaining({ ...defaults, ...bespoke }),
		)
		setBreakpoints(bespoke)
		expect(breakpoints).toEqual(bespoke)
		resetBreakpoints()
		expect(breakpoints).toEqual(expect.objectContaining(defaults))
	})
})
