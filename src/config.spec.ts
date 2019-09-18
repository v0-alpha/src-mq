import {
	extendBreakpoints,
	getBreakpoints,
	resetBreakpoints,
	setBreakpoints,
} from './config'

const defaults = [
	['xxSmall', expect.any(Number)],
	['xSmall', expect.any(Number)],
	['small', expect.any(Number)],
	['medium', expect.any(Number)],
	['large', expect.any(Number)],
	['xLarge', expect.any(Number)],
	['xxLarge', expect.any(Number)],
]
const bespoke = { tiny: 5 }

describe('breakpoints', () => {
	test('are defaults without doing anything', () => {
		expect(getBreakpoints()).toEqual(expect.objectContaining(defaults))
	})

	test('can be extended, replaced and reset', () => {
		extendBreakpoints(bespoke)
		expect(getBreakpoints()).toEqual([...defaults, ...Object.entries(bespoke)])

		setBreakpoints(bespoke)
		expect(getBreakpoints()).toEqual(Object.entries(bespoke))

		resetBreakpoints()
		expect(getBreakpoints()).toEqual(defaults)
	})
})
