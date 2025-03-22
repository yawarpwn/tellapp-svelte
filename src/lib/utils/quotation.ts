import type { QuotationItem } from '$lib/types'
import { formatNumberToLocal } from './format'

export function getIgv(items: QuotationItem[]) {
	if (!items) {
		return { total: 0, subTotal: 0, igv: 0 }
	}

	const calcTotal = items.reduce((acc, curr) => {
		const result = (acc += curr.price * curr.qty)
		return result
	}, 0)

	const totalItems = items.reduce((acc, curr) => {
		const items = (acc += curr.qty)
		return items
	}, 0)

	const total = calcTotal
	const subTotal = total / 1.18
	const igv = subTotal * 0.18

	return {
		total: total.toFixed(2),
		subTotal: subTotal.toFixed(2),
		igv: igv.toFixed(2),
		formatedTotal: formatNumberToLocal(total),
		formatedIgv: formatNumberToLocal(igv),
		formatedSubTotal: formatNumberToLocal(subTotal),
		totalItems
	}
}
