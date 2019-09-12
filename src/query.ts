const asEms = (pixels: number): string => `${pixels / 16}em`

type QueryProps = {
	from?: number
	until?: number
}

const query = ({ from, until }: QueryProps, media = 'all') =>
	[
		`@media ${media}`,
		from ? `(min-width: ${asEms(from)})` : null,
		until ? `(max-width: ${asEms(until - 1)})` : null,
	]
		.filter(Boolean)
		.join(' and ')

export default query
