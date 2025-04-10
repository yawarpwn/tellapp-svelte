<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import { enhance } from '$app/forms'
	import { LoaderCircleIcon } from 'lucide-svelte'
	import { shootCoffeti } from '$lib/confetti'
	import type { Snippet } from 'svelte'
	type Props = {
		action: string
		message: string
		shootConfetti?: boolean
		id?: string
		trigger: Snippet<[{ openModal: () => void }]>
	}

	const { action, message = 'default message', trigger, id, shootConfetti }: Props = $props()
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
{#if showModal}
	<Dialog bind:open={showModal}>
		<div class="flex flex-col gap-4 p-2">
			<header class="text-center">{message}</header>
			<div class="flex items-center justify-between">
				<button onclick={closeModal} class="btn" disabled={loading}>Cancelar</button>
				<form
					use:enhance={() => {
						loading = true
						return async ({ update }) => {
							await update()
							if (shootConfetti) {
								shootCoffeti()
							}
							showModal = false
							loading = false
						}
					}}
					method="POST"
					{action}
				>
					<input name="id" type="hidden" value={id} />
					<button type="submit" class="btn btn-primary" disabled={loading}>
						Aceptar
						{#if loading}
							<LoaderCircleIcon class="animate-spin" />
						{/if}
					</button>
				</form>
			</div>
		</div>
	</Dialog>
{/if}
