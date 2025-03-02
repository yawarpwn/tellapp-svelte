<script lang="ts">
	type Props = {
		showModal: boolean
		children: () => any
	}
	let { children, showModal = $bindable() }: Props = $props()
	let dialog: HTMLDialogElement | null = $state(null)

	$effect(() => {
		if (showModal) {
			dialog?.showModal()
		} else {
			dialog?.close()
		}
	})

	$inspect(showModal)
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog?.close()
	}}
	class="modal"
>
	<div class="modal-box">
		{@render children()}
	</div>
</dialog>

<!-- <style> -->
<!-- 	dialog { -->
<!-- 		max-width: 32em; -->
<!-- 		border-radius: 0.2em; -->
<!-- 		border: none; -->
<!-- 		padding: 0; -->
<!-- 	} -->
<!-- 	dialog::backdrop { -->
<!-- 		background: rgba(0, 0, 0, 0.3); -->
<!-- 	} -->
<!-- 	dialog > div { -->
<!-- 		padding: 1em; -->
<!-- 		border: 1px solid lime; -->
<!-- 	} -->
<!-- 	dialog[open] { -->
<!-- 		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); -->
<!-- 	} -->
<!-- 	@keyframes zoom { -->
<!-- 		from { -->
<!-- 			transform: scale(0.95); -->
<!-- 		} -->
<!-- 		to { -->
<!-- 			transform: scale(1); -->
<!-- 		} -->
<!-- 	} -->
<!-- 	dialog[open]::backdrop { -->
<!-- 		animation: fade 0.2s ease-out; -->
<!-- 	} -->
<!-- 	@keyframes fade { -->
<!-- 		from { -->
<!-- 			opacity: 0; -->
<!-- 		} -->
<!-- 		to { -->
<!-- 			opacity: 1; -->
<!-- 		} -->
<!-- 	} -->
<!-- 	button { -->
<!-- 		display: block; -->
<!-- 	} -->
<!-- </style> -->
