<script lang="ts">
	import { toast } from '$lib/toaster/toast-state.svelte'
</script>

<form
	onsubmit={(ev) => {
		ev.preventDefault()

		toast({
			title: 'mensaje de pruebita',
			message: 'mensaje de pruebita'
		})
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
