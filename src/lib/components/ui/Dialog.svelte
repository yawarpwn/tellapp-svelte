<script lang="ts">
	type Props = {
		showModal: boolean
		children: () => any
	}
	let { children, showModal = $bindable() }: Props = $props()
	let dialog: HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal()
	})
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog?.close()
	}}
	class="modal"
>
	<div class="modal-box p-4">
		{@render children()}
	</div>
</dialog>
