<script lang="ts">
	import { EditIcon, EyeIcon, MoreHorizontal, PlusIcon, SearchIcon, StarIcon } from 'lucide-svelte'
	import { formatDateToLocal, getIgv } from '$lib/utils'
	import type { QuotationClient } from '$lib/types'
	import FloatingBar from './FloatingBar.svelte'

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
			<tr class="hover:bg-base-200" onclick={() => (selectedRowId = id)}>
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
		{:else}
			<tr class="">
				<td class="h-94 text-center" colspan="6">No hay cotizaciones</td>
			</tr>
		{/each}
	</tbody>
</table>
