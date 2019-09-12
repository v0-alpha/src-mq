const asEms = (pixels: number): string => `${pixels / 16}em`

type QueryProps = {
	from?: number
	until?: number
}

type Query = ({ from, until }: QueryProps, media?: MediaType) => string

const query: Query = ({ from, until }, media = 'all') =>
	[
		`@media ${media}`,
		from ? `(min-width: ${asEms(from)})` : null,
		until ? `(max-width: ${asEms(until - 1)})` : null,
	]
		.filter(Boolean)
		.join(' and ')

export default query
