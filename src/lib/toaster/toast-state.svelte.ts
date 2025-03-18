import { getContext, onDestroy, setContext } from 'svelte'
type Toast = {
	id: string
	message: string
	title: string
}
class ToastState {
	toasts = $state<Toast[]>([])
	toastToTimeupMap = new Map<string, number>()

	constructor() {
		onDestroy(() => {
			for (const timeout of this.toastToTimeupMap.values()) {
				clearTimeout(timeout)
			}
			this.toastToTimeupMap.clear()
		})
	}

	add(title: string, message: string, duration = 500) {
		const id = crypto.randomUUID()
		this.toasts.push({ id, message, title })

		const timeout = setTimeout(() => {
			console.log('this', this)
			this.remove(id)
		}, duration)

		this.toastToTimeupMap.set(id, timeout)
	}

	remove(id: string) {
		const timeoutId = this.toastToTimeupMap.get(id)
		if (timeoutId) {
			clearTimeout(timeoutId)
			this.toastToTimeupMap.delete(id)
		}
		this.toasts.filter((toast) => toast.id !== id)
	}
}

const TOAST_KEY = Symbol('TOAST')

export function setToastState() {
	return setContext(TOAST_KEY, new ToastState())
}

export function getToastState() {
	return getContext<ReturnType<typeof setToastState>>(TOAST_KEY)
}
