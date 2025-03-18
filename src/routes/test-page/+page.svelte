<script lang="ts">
	import { Toaster } from '$lib/toaster'
	import { getToastState } from '$lib/toaster/toast-state.svelte'

	const toastState = getToastState()
</script>

<form
	onsubmit={(ev) => {
		ev.preventDefault()
		const formDate = new FormData(ev.currentTarget)
		const title = formDate.get('title') as string
		const msg = formDate.get('msg') as string

		console.log('test toast')
		toastState.add(title, msg)
	}}
	class="mx-auto mt-16 flex w-1/4 flex-col gap-4 rounded-md border p-4"
>
	<label class="grid gap-2">
		title
		<input class="input" name="title" />
	</label>
	<label class="grid gap-2">
		message
		<input class="input" placeholder="messg" name="msg" />
	</label>
	<button class="btn">Enviar</button>
</form>
<Toaster />
