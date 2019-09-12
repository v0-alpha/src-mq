const asEms = (pixels: number): string => `${pixels / 16}em`

type QueryProps = {
	from?: number
	until?: number
}

const query = ({ from, until }: QueryProps, media = 'all') =>
	[
		`@media ${media}`,
		`(min-width: ${from ? asEms(from) : 'none'})`,
		`(max-width: ${until ? asEms(until - 1) : 'none'})`,
	].join(' and ')

export default query
