import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { QuotationItem } from '$lib/types'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

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

export async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
	const response = await fetch(url, {
		...options,
		headers: {
			'X-API-KEY': 'supersecretkey',
			...options?.headers
		}
	})
	console.info(
		`OK:${response.ok} - statusCode:${response.status} - ${response.url} - ${response.statusText}`
	)
	if (!response.ok) {
		throw new Error(`Error en la peticion: ${url} - ${response.statusText}`)
	}
	// await new Promise((r) => setTimeout(r, 3000))
	return response.json() as T
}

export async function fakePromise(time = 1000) {
	return new Promise((resolve) => {
		setTimeout(resolve, time)
	})
}

export function resizeImageFile(
	file: File,
	maxWidth: number,
	maxHeight: number,
	quality = 0.7
): Promise<File> {
	return new Promise((resolve, reject) => {
		const img = new Image()
		const url = URL.createObjectURL(file)

		img.onload = () => {
			let { width, height } = img

			if (width > maxWidth || height > maxHeight) {
				const aspectRatio = width / height
				if (width > height) {
					width = maxWidth
					height = maxWidth / aspectRatio
				} else {
					height = maxHeight
					width = maxHeight * aspectRatio
				}
			}

			const canvas = document.createElement('canvas')
			canvas.width = width
			canvas.height = height
			const ctx = canvas.getContext('2d')
			ctx?.drawImage(img, 0, 0, width, height)

			canvas.toBlob(
				(blob) => {
					if (blob) {
						const resizedFile = new File([blob], file.name, {
							type: file.type,
							lastModified: Date.now()
						})
						resolve(resizedFile)
					} else {
						reject(new Error('No se pudo crear el Blob de la imagen redimensionada'))
					}
				},
				file.type,
				quality
			)

			URL.revokeObjectURL(url)
		}

		img.onerror = (error) => reject(error)
		img.src = url
	})
}

export const cache = {
	set: (key: string, value: object) => {
		localStorage.setItem(key, JSON.stringify(value))
	},
	get: (key: string) => {
		if (localStorage.getItem(key)) {
			return JSON.parse(localStorage.getItem(key) as string)
		}
		return null
	},
	delete: (key: string) => {
		localStorage.removeItem(key)
	}
}
