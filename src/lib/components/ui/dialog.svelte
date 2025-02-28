<script lang="ts">
	import { XIcon } from 'lucide-svelte'
	const { children } = $props()
	let modalRef: HTMLDialogElement
</script>

<button
	class="btn"
	onclick={() => {
		modalRef.showModal()
	}}>Clientes</button
>
<dialog bind:this={modalRef} class="modal">
	<div class="modal-box relative max-h-[90dvh]">
		{@render children()}
		<form method="dialog" class="absolute top-2 right-2">
			<!-- if there is a button in form, it will close the modal -->
			<button class="btn btn-xs btn-circle">
				<XIcon />
			</button>
		</form>
	</div>
</dialog>
