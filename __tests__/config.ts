import { breakpoints, resetBreakpoints, setBreakpoints } from '../src/config'

const defaults = {
	xxSmall: expect.any(Number),
	xSmall: expect.any(Number),
	small: expect.any(Number),
	medium: expect.any(Number),
	large: expect.any(Number),
	xLarge: expect.any(Number),
	xxLarge: expect.any(Number),
}

describe('breakpoints', () => {
	test('are defaults without doing anything', () => {
		expect(breakpoints).toEqual(expect.objectContaining(defaults))
	})
	test('can be updated by user', () => {
		setBreakpoints({ tiny: 5 })
		expect(breakpoints).toEqual({ tiny: 5 })
	})

	test('can be reset to default', () => {
		setBreakpoints({ tiny: 5 })
		resetBreakpoints()
		expect(breakpoints).toEqual(expect.objectContaining(defaults))
	})
})
