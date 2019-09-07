import { from, until } from '../src/index'

describe('until', () => {
	test('is an object that provides breakpoint media queries', () => {
		expect(until.small).toBe('@media all and (max-width: 29.9375em)')
	})
})

describe('from', () => {
	test('is a weird old beast', () => {
		// you woulnd't need to coerce the property to a
		// string like this in JS, but you do in ts
		expect({ [String(from.small)]: 'x' }).toEqual({
			'@media all and (min-width: 30em)': 'x',
		})
		expect({ [from.small.until.medium]: 'x' }).toEqual({
			'@media all and (min-width: 30em) and (max-width: 46.1875em)': 'x',
		})
	})
})
