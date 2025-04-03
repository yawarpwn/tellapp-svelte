<script lang="ts">
	import { CirclePlusIcon, PlusIcon, SearchIcon, XIcon } from 'lucide-svelte'
	import type { PageProps } from './$types'
	import { page } from '$app/state'
	import QuotationDataTable from '$lib/components/QuotationDataTable.svelte'
	import Pagination from '$lib/components/Pagination.svelte'
	import DataTableSkeleton from '$lib/components/DataTableSkeleton.svelte'
	import { enhance } from '$app/forms'

	let { data }: PageProps = $props()
	let query = $state(page.url.searchParams.get('q') || '')
	const currentPage = $derived(page.url.searchParams.get('page') || 1)
	//TODO: mejorar codigo - no recarga el form con method GET
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center justify-between">
		<form
			method="GET"
			action={page.url.pathname}
			class="relative max-w-[200px] md:max-w-[350px]"
			data-sveltekit-reload
		>
			<label class="input pr-1">
				<input name="page" value={1} type="hidden" />
				<input name="q" type="search" class="" placeholder="Buscar..." value={query} />
				<button type="submit" class="btn btn-sm btn-square">
					<SearchIcon class="h-[1em]" />
				</button>
			</label>
		</form>
		<a class="btn btn-primary" href="/quotations/create">
			<CirclePlusIcon />
			Crear</a
		>
	</div>
	{#await data.dataPromise}
		<DataTableSkeleton
			columnCount={6}
			rowCount={20}
			cellWidths={['20px', '50px', '350px', '80px', '80px', '80px']}
		/>
	{:then data}
		<QuotationDataTable quotations={data.items} />
		<Pagination
			totalPages={Math.ceil(data.meta.totalItems / 13)}
			{query}
			currentPage={Number(currentPage)}
		/>
	{:catch error}
		<div>
			{error.message}
			algo salio mal
		</div>
	{/await}
</div>
