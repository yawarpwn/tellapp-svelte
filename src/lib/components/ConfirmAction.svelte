<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import { enhance } from '$app/forms'
	import { LoaderCircleIcon } from 'lucide-svelte'
	import type { Snippet } from 'svelte'
	type Props = {
		action: string
		message: string
		trigger: Snippet<[{ openModal: () => void }]>
	}

	const { action, message = 'default message', trigger }: Props = $props()
	let showModal = $state(false)
	let loading = $state(false)

	function closeModal() {
		showModal = false
	}

	function openModal() {
		showModal = true
	}
</script>

{@render trigger({ openModal })}
<Dialog bind:showModal>
	<div class="flex flex-col gap-4 p-2">
		<header class="text-center">{message}</header>
		<div class="flex items-center justify-between">
			<button onclick={closeModal} class="btn" disabled={loading}>Cancelar</button>
			<form
				use:enhance={() => {
					loading = true
					return ({ update }) => {
						loading = false
						update()
					}
				}}
				method="POST"
				{action}
			>
				<button type="submit" class="btn btn-warning" disabled={loading}>
					Aceptar
					{#if loading}
						<LoaderCircleIcon class="animate-spin" />
					{/if}
				</button>
			</form>
		</div>
	</div>
</Dialog>
