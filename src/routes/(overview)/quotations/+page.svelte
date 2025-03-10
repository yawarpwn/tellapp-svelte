<script lang="ts">
	import { PlusIcon, SearchIcon } from 'lucide-svelte'
	import type { PageProps } from './$types'
	import { page } from '$app/stores'
	import QuotationDataTable from '$lib/components/QuotationDataTable.svelte'

	let { data }: PageProps = $props()
	let value = $derived($page.url.searchParams.get('q') || '')
	let timeout = $state<null | number>(null)
	let form: HTMLFormElement
</script>

<svelte:head>
	<title>Cotizaciones</title>
</svelte:head>

<div class="flex items-center justify-between">
	<form
		bind:this={form}
		method="GET"
		action={$page.url.pathname}
		class="relative"
		data-sveltekit-keepfocus
	>
		<label>
			<input
				name="q"
				type="text"
				class="input input-primary"
				placeholder="Buscar..."
				oninput={(ev) => {
					if (timeout) {
						clearTimeout(timeout)
					}

					timeout = window.setTimeout(() => {
						form.submit()
					}, 200)
				}}
				{value}
			/>
		</label>
		<SearchIcon class="absolute top-1/2 right-2 -translate-y-1/2" />
	</form>
	<a class="btn btn-primary" href="/quotations/create">
		<PlusIcon />
		Crear</a
	>
</div>
<div class="overflow-x-auto">
	{#await data.quotations}
		<div>loading...</div>
	{:then quotations}
		<QuotationDataTable {quotations} />
	{/await}
</div>
