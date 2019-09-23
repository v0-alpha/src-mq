import { getBreakpoints } from './config'
import getFrom from './from'

type CustomBreakpoint = 'small' | 'medium' | 'large'
const customBreakpoints: {
	[key in CustomBreakpoint]: number
} = {
	small: 480,
	medium: 740,
	large: 980,
}

const from = getFrom<CustomBreakpoint>(Object.entries(customBreakpoints))

describe('from', () => {
	test('is a map of functions that return breakpoint media queries', () => {
		expect(from.small()).toBe(
			'@media all and (min-width: 30em) and (max-width: none)',
		)
		expect(from).toBe('@media all and (min-width: 30em) and (max-width: none)')
	})
	test('is a map of functions that return breakpoint media queries when coerced into a string', () => {
		expect(String(from.small)).toBe(
			'@media all and (min-width: 30em) and (max-width: none)',
		)
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
		expect(from.small.for.print()).toBe(
			'@media print and (min-width: 30em) and (max-width: none)',
		)
		expect(from.small.until.medium.for.print()).toBe(
			'@media print and (min-width: 30em) and (max-width: 46.1875em)',
		)
	})

	test('can chain a `for` map of functions that return media queries scoped by media type when coerced into a string', () => {
		expect(String(from.small.for.print)).toBe(
			'@media print and (min-width: 30em) and (max-width: none)',
		)
		expect(String(from.small.until.medium.for.print)).toBe(
			'@media print and (min-width: 30em) and (max-width: 46.1875em)',
		)
	})
})
