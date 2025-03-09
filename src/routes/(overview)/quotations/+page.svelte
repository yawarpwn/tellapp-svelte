<script lang="ts">
	import { EditIcon, EyeIcon, MoreHorizontal, PlusIcon, SearchIcon, StarIcon } from 'lucide-svelte'
	import type { PageProps } from './$types'
	import { enhance } from '$app/forms'
	import { formatDateToLocal, getIgv } from '$lib/utils'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	let value = $derived($page.url.searchParams.get('q') || '')
	let timeout = $state<null | number>(null)

	let { data }: PageProps = $props()

	function handleSearch(ev: SubmitEvent) {
		ev.preventDefault()
		const targetElmeent = ev.target as HTMLFormElement
		const url = new URLSearchParams()
		url.set('q', value)
		goto(`/quotations?${url.toString()}`, {
			keepFocus: true
		})
	}

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

					timeout = setTimeout(() => {
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
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th></th>
					<th>Nro</th>
					<th>Client</th>
					<th>Monto</th>
					<th>Fecha</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<!-- row 1 -->
				{#each quotations as { id, number, customer, items, createdAt, customerId }}
					{@const { formatedTotal } = getIgv(items)}
					<tr>
						<td>
							{#if customerId && customer}
								{#if customer.isRegular}
									<StarIcon size={16} fill="var(--color-primary)" />
								{:else}
									<StarIcon size={16} />
								{/if}
							{/if}
						</td>
						<td>{number}</td>
						<td class="min-w-[250px]">
							<p>
								{customer?.name || ''}
							</p>
							<p>{customer?.ruc || 'SIN RUC'}</p>
						</td>
						<td>{formatedTotal}</td>
						<td>
							<span class="inline-block min-w-[80px]">
								{formatDateToLocal(createdAt, {
									day: 'numeric',
									month: 'short'
								})}
							</span>
						</td>
						<td>
							<div class="flex gap-2">
								<a class="btn btn-xs btn-ghost" href={`/quotations/${number}`}>
									<EyeIcon class="size-4" />
								</a>
								<a class="btn btn-xs btn-ghost" href={`/quotations/${number}/update`}>
									<EditIcon class="size-4" />
								</a>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/await}
</div>
