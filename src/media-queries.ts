const asEms = (pixels: number) => `${pixels / 16}em`

const query = (mediaType: string = 'all') => `@media ${mediaType}`

const minWidth = (width: number) => `(min-width: ${asEms(width)})`
const maxWidth = (width: number) => `(max-width: ${asEms(width - 1)})`

export const fromQuery = (from: number, mediaType?: string) =>
	`${query(mediaType)} and ${minWidth(from)}`

export const untilQuery = (until: number, mediaType?: string) =>
	`${query(mediaType)} and ${maxWidth(until)}`

export const fromUntilQuery = (
	from: number,
	until: number,
	mediaType?: string,
) => `${query(mediaType)} and ${minWidth(from)} and ${maxWidth(until)}`
