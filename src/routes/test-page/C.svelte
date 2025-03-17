<script lang="ts">
	import { getQuoContext } from './store.svelte'

	const context = getQuoContext()

	const selectedItem = $derived(
		context.quotation.items.find((item) => item.id === context.selectedItemId.value)
	)
</script>

<div>
	<button
		class="btn btn-accent"
		onclick={() => {
			context.addItem({
				id: 1,
				name: 'Tarea 1'
			})
		}}
	>
		add item</button
	>
</div>
<h2>SelectedItem: {selectedItem?.id}</h2>

<!-- <input type="checkbox" class="checkbox" bind:checked={quotationStore.showModal} /> -->
<!-- <div class="card"> -->
<!-- <input class="input" bind:value={quotationStore.quotation.number} /> -->
<!-- </div> -->
<button class="btn" onclick={() => context.openModal()}> open Modal </button>
{#each context.quotation.items as item}
	<div>
		{item.name}
		<button class="btn btn-accent" onclick={() => context.onSelectItem(item.id)}> edit</button>
	</div>
{/each}

<!-- <button class="btn" onclick={() => context.openModal()}> selet </button> -->
