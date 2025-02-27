<script lang="ts">
	let { customers, quotation } = $props()
	let modalRef: HTMLDialogElement
	console.log(customers)
</script>

<button
	class="btn"
	onclick={() => {
		modalRef.showModal()
	}}>Clientes</button
>
<dialog bind:this={modalRef} class="modal">
	<div class="modal-box max-h-[90dvh]">
		clientes
		<ul>
			{#each customers as { name }}
				<li>
					>
					<button
						class="btn"
						onclick={() => {
							quotation = {}

							modalRef.close()
						}}
					>
						{name}
					</button>
				</li>
			{/each}
		</ul>
		<form method="dialog">
			<!-- if there is a button in form, it will close the modal -->
			<button class="btn">Close</button>
		</form>
	</div>
</dialog>
