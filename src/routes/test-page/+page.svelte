<script lang="ts">
	import Modal from '$lib/components/ui/Modal.svelte'
	let showModal = $state(false)
</script>

<Modal bind:open={showModal}>
	{#snippet trigger()}
		<span class="">Abrir</span>
	{/snippet}
	{#snippet title()}
		Desea guardar
	{/snippet}
	<input class="input" placeholder="buscar" />
	<div>Esto es el hio de la modal que jflajflajfalj</div>
</Modal>
