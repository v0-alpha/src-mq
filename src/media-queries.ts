const asEms = (pixels: number): string => `${pixels / 16}em`

const query = (mediaType: MediaType = 'all'): string => `@media ${mediaType}`

const minWidth = (width: number): string => `(min-width: ${asEms(width)})`
const maxWidth = (width: number): string => `(max-width: ${asEms(width - 1)})`

export const fromQuery = (from: number, mediaType?: MediaType): MediaQuery =>
	`${query(mediaType)} and ${minWidth(from)}`

export const untilQuery = (until: number, mediaType?: MediaType): MediaQuery =>
	`${query(mediaType)} and ${maxWidth(until)}`

export const fromUntilQuery = (
	from: number,
	until: number,
	mediaType?: MediaType,
): MediaQuery =>
	`${query(mediaType)} and ${minWidth(from)} and ${maxWidth(until)}`
