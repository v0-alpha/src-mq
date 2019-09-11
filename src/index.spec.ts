import { from, until } from './index'

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
})

describe('from', () => {
	test('is a map of functions that return breakpoint media queries', () => {
		expect(from.small()).toBe('@media all and (min-width: 30em)')
	})
	test('is a map of functions that return breakpoint media queries when coerced into a string', () => {
		expect(String(from.small)).toBe('@media all and (min-width: 30em)')
	})

	test('can chain an `until` map of functions that return breakpoint media queries', () => {
		expect(from.small.until.medium()).toBe(
			'@media all and (min-width: 30em) and (max-width: 46.1875em)',
		)
	})

	test('can chain an `until` map of functions that return breakpoint media queries when coerced into a string', () => {
		expect(String(from.small.until.medium)).toBe(
			'@media all and (min-width: 30em) and (max-width: 46.1875em)',
		)
	})

	test('can chain a `for` map of functions that return media queries scoped by media type', () => {
		expect(from.small.for.print()).toBe('@media print and (min-width: 30em)')
		expect(from.small.until.medium.for.print()).toBe(
			'@media print and (min-width: 30em) and (max-width: 46.1875em)',
		)
	})

	test('can chain a `for` map of functions that return media queries scoped by media type when coerced into a string', () => {
		expect(String(from.small.for.print)).toBe(
			'@media print and (min-width: 30em)',
		)
		expect(String(from.small.until.medium.for.print)).toBe(
			'@media print and (min-width: 30em) and (max-width: 46.1875em)',
		)
	})
})
