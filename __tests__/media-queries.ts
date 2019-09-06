import { fromQuery, fromUntilQuery, untilQuery } from '../src/media-queries'

describe('fromQuery', () => {
	test('generates min-widths without media type', () => {
		expect(fromQuery(160)).toBe('@media all and (min-width: 10em)')
	})
	test('generates min-widths with media type', () => {
		expect(fromQuery(160, 'print')).toBe('@media print and (min-width: 10em)')
	})
})

describe('untilQuery', () => {
	test('generates max-widths without media type', () => {
		expect(untilQuery(160)).toBe('@media all and (max-width: 9.9375em)')
	})
	test('generates max-widths with media type', () => {
		expect(untilQuery(160, 'print')).toBe(
			'@media print and (max-width: 9.9375em)',
		)
	})
})

describe('fromUntilQuery', () => {
	test('generates max-widths without media type', () => {
		expect(fromUntilQuery(16, 160)).toBe(
			'@media all and (min-width: 1em) and (max-width: 9.9375em)',
		)
	})
	test('generates max-widths with media type', () => {
		expect(fromUntilQuery(16, 160, 'print')).toBe(
			'@media print and (min-width: 1em) and (max-width: 9.9375em)',
		)
	})
})
