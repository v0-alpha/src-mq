const media: MediaType[] = ['screen', 'print', 'speech']

type For = {
	[keys in MediaType]: {
		(): MediaQuery
		toString(): MediaQuery
	}
}

export default (fn: Function) =>
	media.reduce((mediaTypes, mediaType) => {
		const typeQuery = fn.bind(null, mediaType)
		typeQuery.toString = typeQuery
		return {
			...mediaTypes,
			[mediaType]: typeQuery,
		}
	}, {}) as For
