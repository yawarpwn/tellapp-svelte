<script lang="ts">
	import { EditIcon, EyeIcon, MoreHorizontal, PlusIcon, SearchIcon, StarIcon } from 'lucide-svelte'
	import { formatDateToLocal, getIgv } from '$lib/utils'
	import type { QuotationClient } from '$lib/types'
	import FloatingBar from '$lib//components/FloatingBar.svelte'
	import Pagination from '$lib/components/Pagination.svelte'

	type Props = {
		quotations: QuotationClient[]
	}
	const { quotations }: Props = $props()

	let selectedRowId = $state<string | null>(null)
	const selectedRow = $derived(quotations.find((quo) => quo.id === selectedRowId))
</script>

{#if selectedRow}
	<FloatingBar clearSelectedRow={() => (selectedRowId = null)} quotation={selectedRow} />
{/if}
<div class="overflow-x-auto">
	<div class="flex flex-col gap-2 lg:hidden">
		{#each quotations as { id, number, customer, items, createdAt, customerId }}
			{@const { formatedTotal } = getIgv(items)}
			<article class="card bg-base-200 shadow">
				<div class="card-body p-4">
					<div class="flex justify-between gap-8">
						<div>
							<p class="font-medium">
								{customer?.name || 'SIN RUC'}
							</p>
							<span class="text-base-content/70">{customer?.ruc}</span>
						</div>
						<span class="text-primary text-lg">#{number}</span>
					</div>
					<div class="bg-base-content/20 h-px"></div>
					<div class="flex items-center justify-between">
						<div>
							<div class="text-lg font-bold">
								{formatedTotal}
							</div>
							<div>
								{formatDateToLocal(createdAt)}
							</div>
						</div>
						<div class="flex items-center gap-2">
							{#if customerId && customer}
								<StarIcon
									size={16}
									class={customer.isRegular ? 'text-primary ' : 'text-base-content/20'}
									fill={customer.isRegular ? 'var(--color-primary)' : 'transparent'}
								/>
							{/if}
							<a
								class="btn btn-sm btn-square"
								href={`/quotations/${number}`}
								data-sveltekit-preload-data
							>
								<EyeIcon class="size-4" />
							</a>
							<a
								class="btn btn-sm btn-square"
								data-sveltekit-preload-data
								href={`/quotations/${number}/update`}
							>
								<EditIcon class="size-4" />
							</a>
						</div>
					</div>
				</div>
			</article>
		{/each}
	</div>
	<table class="table-zebra hidden lg:table [&_td]:p-1.5">
		<!-- head -->
		<thead>
			<tr>
				<th></th>
				<th>Nro</th>
				<th>Cliente</th>
				<th>Monto</th>
				<th>Fecha</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			<!-- row 1 -->
			{#each quotations as { id, number, customer, items, createdAt, customerId }}
				{@const { formatedTotal } = getIgv(items)}
				<tr
					data-active={id === selectedRowId ? 'true' : 'false'}
					class="hover:bg-base-200 data-[active=true]:bg-base-200"
					onclick={() => (selectedRowId = id)}
				>
					<td>
						<div class="flex items-center justify-center">
							{#if customerId && customer}
								<StarIcon
									size={16}
									class={customer.isRegular ? 'text-primary ' : 'text-base-content/20'}
									fill={customer.isRegular ? 'var(--color-primary)' : 'transparent'}
								/>
							{/if}
						</div>
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
							<a
								class="btn btn-square btn-sm"
								href={`/quotations/${number}`}
								data-sveltekit-preload-data
							>
								<EyeIcon class="size-4" />
							</a>
							<a
								class="btn btn-sm btn-square"
								data-sveltekit-preload-data
								href={`/quotations/${number}/update`}
							>
								<EditIcon class="size-4" />
							</a>
						</div>
					</td>
				</tr>
			{:else}
				<tr class="">
					<td class="h-94 text-center" colspan="6">No hay cotizaciones</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
