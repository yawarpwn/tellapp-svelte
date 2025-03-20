import { writable, get } from 'svelte/store'
type Toast = {
	id: string
	message: string
}
function createToastState() {
	let toasts = writable<Toast[]>([])
	console.log('toasts', toasts)
	let toastToTimeupMap = new Map<string, number>()

	function addToast(message: string, duration = 5000) {
		const id = crypto.randomUUID()
		toasts.update((toast) => [{ id, message }, ...toast])

		const timeoutId = setTimeout(() => {
			removeToast(id)
		}, duration)
		toastToTimeupMap.set(id, timeoutId)
	}

	function removeToast(id: string) {
		const timeoutId = toastToTimeupMap.get(id)
		if (timeoutId) {
			clearTimeout(timeoutId)
			toastToTimeupMap.delete(id)
		}
		toasts.update((prev) => prev.filter((toast) => toast.id !== id))
	}

	function reset() {
		toasts.set = []
		for (const timeoutId of toastToTimeupMap.values()) {
			clearTimeout(timeoutId)
		}
		toastToTimeupMap.clear()
	}

	return {
		toasts,
		addToast,
		removeToast,
		reset
	}
}

export const toastState = createToastState()

type options = {
	duration?: number
}
export function toast(message: string, opts?: options) {
	toastState.addToast(message)
}

// const TOAST_KEY = Symbol('TOAST')
//
// export function setToastState() {
// 	return setContext(TOAST_KEY, new ToastState())
// }
//
// export function getToastState() {
// 	return getContext<ReturnType<typeof setToastState>>(TOAST_KEY)
// }
