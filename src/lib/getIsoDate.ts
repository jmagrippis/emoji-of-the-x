export const getIsoDate = (date: Date) => {
	const [isoDate] = date.toISOString().split('T')

	return isoDate
}
