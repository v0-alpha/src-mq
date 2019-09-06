const asEms = (pixels: number) => `${pixels / 16}em`

const query = (features: string, mediaType: string = 'all') =>
	`@media ${mediaType} and ${features}`

export const fromQuery = (from: number, mediaType?: string) =>
	query(`(min-width: ${asEms(from)})`, mediaType)

export const untilQuery = (until: number, mediaType?: string) =>
	query(`(max-width: ${asEms(until - 1)})`, mediaType)

export const fromUntilQuery = (
	from: number,
	until: number,
	mediaType?: string,
) =>
	query(
		`(min-width: ${asEms(from)}) and (max-width: ${asEms(until - 1)})`,
		mediaType,
	)
