// import { onDestroy } from 'svelte'
type Toast = {
	id: string
	message: string
	title: string
}
class ToastState {
	toasts = $state<Toast[]>([])
	toastToTimeupMap = new Map<string, number>()
	showToast = $state(false)

	constructor() {
		// onDestroy(() => {
		// 	for (const timeout of this.toastToTimeupMap.values()) {
		// 		clearTimeout(timeout)
		// 	}
		// 	this.toastToTimeupMap.clear()
		// })
	}

	add(title: string, message: string, duration = 5000) {
		const id = crypto.randomUUID()
		this.toasts.push({ id, message, title })

		const timeoutId = setTimeout(() => {
			this.remove(id)
		}, duration)
		this.toastToTimeupMap.set(id, timeoutId)
	}

	remove(id: string) {
		const timeoutId = this.toastToTimeupMap.get(id)
		if (timeoutId) {
			clearTimeout(timeoutId)
			this.toastToTimeupMap.delete(id)
		}
		this.toasts = this.toasts.filter((toast) => toast.id !== id)
	}
}

export const toastState = new ToastState()
export function toast({
	title,
	message,
	duration
}: {
	title: string
	message: string
	duration?: number
}) {
	toastState.add(title, message, duration)
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
