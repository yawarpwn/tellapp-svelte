<script lang="ts">
	import { CirclePlusIcon, PlusIcon, SearchIcon, XIcon } from 'lucide-svelte'
	import type { PageProps } from './$types'
	import { page } from '$app/state'
	import { navigating } from '$app/state'
	import QuotationDataTable from '$lib/components/QuotationDataTable.svelte'
	import Pagination from '$lib/components/Pagination.svelte'
	import DataTableSkeleton from '$lib/components/DataTableSkeleton.svelte'

	let { data }: PageProps = $props()
	let query = $state(page.url.searchParams.get('q') || '')
	const currentPage = $derived(page.url.searchParams.get('page') || 1)
	let formEl: HTMLFormElement
	let timeoutId: ReturnType<typeof setTimeout>
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center justify-between">
		<form
			bind:this={formEl}
			method="GET"
			action={page.url.pathname}
			class="relative"
			data-sveltekit-keepfocus
		>
			<label class="input">
				<SearchIcon class="h-[1em] opacity-50" />
				<input
					name="q"
					type="search"
					class=""
					placeholder="Buscar..."
					value={query}
					oninput={(ev) => {
						query = (ev.target as HTMLInputElement).value
						if (timeoutId) {
							clearTimeout(timeoutId)
						}

						timeoutId = setTimeout(() => {
							formEl.submit()
						}, 500)
					}}
				/>
				<input name="page" value={1} type="hidden" />
				{#if query}
					<button
						type="button"
						onclick={(ev) => {
							query = ''
						}}
						class="bg-base-100 text-base-content/50 hover:text-base-content cusrsor-pointer hover:bg-base-300 absolute right-1 z-10 flex size-6 items-center justify-center rounded-full"
					>
						<XIcon class="h-[1em]" />
					</button>
				{/if}
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
