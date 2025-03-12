<script lang="ts">
	type Props = {
		showModal: boolean
		closeModal?: () => void
		children: () => any
	}
	let { children, showModal = $bindable(), closeModal }: Props = $props()
	let dialog: HTMLDialogElement

	$effect(() => {
		if (showModal) {
			dialog.showModal()
		} else {
			dialog.close()
		}
	})
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={() => {
		if (closeModal) {
			closeModal()
		} else {
			showModal = false
		}
	}}
	class="modal"
>
	<div class="modal-box p-4">
		{@render children()}
	</div>
</dialog>
