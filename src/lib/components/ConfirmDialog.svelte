<script lang="ts">
	import { enhance } from '$app/forms'
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import { Loader2Icon } from 'lucide-svelte'
	type Props = {
		open: boolean
		dialogTitle: string
		dialogDescription: string
		currentAction: string
		loading: boolean
		selectedId: string
		closeModal: () => void
	}

	let {
		open = $bindable(false),
		dialogTitle,
		dialogDescription,
		currentAction,
		loading,
		selectedId,
		closeModal
	} = $props()
</script>

<Dialog bind:open>
	<div>
		<h3 class="text-center text-lg font-bold">{dialogTitle}</h3>
		<p class="py-4 text-center">{dialogDescription}</p>
	</div>
	<footer class="flex justify-between">
		<button disabled={loading} class="btn" onclick={closeModal}> Cancelar</button>
		<form
			method="POST"
			use:enhance={() => {
				loading = true
				return async ({ update }) => {
					await update()
					loading = false
					closeModal()
				}
			}}
			action={currentAction}
		>
			<input name="id" value={selectedId} type="hidden" />
			<button disabled={loading} class="btn btn-primary">
				Aceptar
				{#if loading}
					<Loader2Icon class="size-4 animate-spin" />
				{/if}
			</button>
		</form>
	</footer>
</Dialog>
