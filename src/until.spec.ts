import { getBreakpoints } from './config'
import getUntil from './until'

const until = getUntil(getBreakpoints())

describe('until', () => {
	test('is a map of functions that return breakpoint media queries', () => {
		expect(until.small()).toBe('@media all and (max-width: 29.9375em)')
	})

	test('is a map of functions that return breakpoint media queries when coerced into a string', () => {
		expect(String(until.small)).toBe('@media all and (max-width: 29.9375em)')
	})

	test('can chain a `for` map of functions that return media queries scoped by media type', () => {
		expect(until.small.for.print()).toBe(
			'@media print and (max-width: 29.9375em)',
		)
	})

	test('can chain a `for` map of functions that return media queries scoped by media type when coerced into a string', () => {
		expect(String(until.small.for.print)).toBe(
			'@media print and (max-width: 29.9375em)',
		)
	})
})
