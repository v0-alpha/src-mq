import query from './query'

describe('fromQuery', () => {
	test('generates min-widths without media type', () => {
		expect(query({ from: 160 })).toBe(
			'@media all and (min-width: 10em) and (max-width: none)',
		)
	})
	test('generates min-widths with media type', () => {
		expect(query({ from: 160 }, 'print')).toBe(
			'@media print and (min-width: 10em) and (max-width: none)',
		)
	})
	test('generates max-widths without media type', () => {
		expect(query({ until: 160 })).toBe(
			'@media all and (min-width: none) and (max-width: 9.9375em)',
		)
	})
	test('generates max-widths with media type', () => {
		expect(query({ until: 160 }, 'print')).toBe(
			'@media print and (min-width: none) and (max-width: 9.9375em)',
		)
	})
	test('generates max-widths without media type', () => {
		expect(query({ from: 16, until: 160 })).toBe(
			'@media all and (min-width: 1em) and (max-width: 9.9375em)',
		)
	})
	test('generates max-widths with media type', () => {
		expect(query({ from: 16, until: 160 }, 'print')).toBe(
			'@media print and (min-width: 1em) and (max-width: 9.9375em)',
		)
	})
})
