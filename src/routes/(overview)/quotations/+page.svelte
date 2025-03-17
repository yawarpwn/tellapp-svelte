<script lang="ts">
	import { CirclePlusIcon, PlusIcon, SearchIcon } from 'lucide-svelte'
	import type { PageProps } from './$types'
	import { page } from '$app/state'
	import QuotationDataTable from '$lib/components/QuotationDataTable.svelte'
	import Pagination from '$lib/components/Pagination.svelte'
	import DataTableSkeleton from '$lib/components/DataTableSkeleton.svelte'

	let { data }: PageProps = $props()
	let query = $state(page.url.searchParams.get('q') || '')
	const currentPage = $derived(page.url.searchParams.get('page') || 1)
	let timeout: ReturnType<typeof setTimeout>
	let form: HTMLFormElement
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center justify-between">
		<form
			bind:this={form}
			method="GET"
			action={page.url.pathname}
			class="relative"
			data-sveltekit-keepfocus
			data-sveltekit-noscroll
		>
			<label>
				<input
					name="q"
					type="text"
					class="input"
					data-sveltekit-replacestate
					placeholder="Buscar..."
					oninput={(ev) => {
						clearTimeout(timeout)
						timeout = setTimeout(() => {
							form.submit()
						}, 300)
					}}
					value={query}
				/>
				<input name="page" value={1} type="hidden" />
			</label>
			<SearchIcon class="absolute top-1/2 right-3.5 size-4.5 -translate-y-1/2" />
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
