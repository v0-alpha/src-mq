import { from, until } from './index'

describe('until', () => {
	test('is an object that provides breakpoint media queries', () => {
		expect(`${until.small}`).toBe('@media all and (max-width: 29.9375em)')
	})
})

describe('from', () => {
	test('is a weird old beast', () => {
		expect(`${from.small}`).toBe('@media all and (min-width: 30em)')
		expect(`${from.small.until.medium}`).toBe(
			'@media all and (min-width: 30em) and (max-width: 46.1875em)',
		)
	})
})

describe('custom media', () => {
	test('can be applied to `until`', () => {
		expect(until.small.for('print')).toBe(
			'@media print and (max-width: 29.9375em)',
		)
	})
	test('can be applied to `from`', () => {
		expect(from.small.for('print')).toBe('@media print and (min-width: 30em)')
		expect(from.small.until.medium.for('print')).toBe(
			'@media print and (min-width: 30em) and (max-width: 46.1875em)',
		)
	})
})
