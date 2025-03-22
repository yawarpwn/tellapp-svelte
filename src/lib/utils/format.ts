export function formatDateToLocal(date: Date | string, options?: Intl.DateTimeFormatOptions) {
	const formatter = new Intl.DateTimeFormat('es-PE', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		...options
	})
	return formatter.format(new Date(date))
}

export function formatNumberToLocal(price: number) {
	return new Intl.NumberFormat('es-PE', {
		style: 'currency',
		currency: 'PEN'
	}).format(price)
}

export function getFormatedDate(date: string | Date) {
	const currentDate = date ? new Date(date) : new Date()
	const year = currentDate.getFullYear()
	const month = currentDate.getMonth() + 1
	const day = currentDate.getDate()

	const formatedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
	return formatedDate
}
