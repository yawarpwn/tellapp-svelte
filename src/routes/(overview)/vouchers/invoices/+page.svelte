<script lang="ts">
	import { formatDateToLocal } from '$lib/utils'

	const invoices = [
		{
			id: 1,
			createdAt: new Date(),
			customer: {
				ruc: '20610555536',
				name: 'Sociedad de Comercio',
				id: 1,
				address: 'Calle 123'
			},
			items: [
				{
					name: 'Item 1',
					quantity: 1,
					price: 100
				},
				{
					name: 'Item 2',
					quantity: 2,
					price: 50
				}
			]
		}
	]
</script>

<div class="mb-8 flex justify-between">
	<form>
		<input class="input" type="search" placeholder="Buscar" />
	</form>
</div>

<table class="table-zebra hidden lg:table [&_td]:p-1.5">
	<!-- head -->
	<thead>
		<tr>
			<th>Fecha</th>
			<th>Serie</th>
			<th>Nro</th>
			<th>Cliente</th>
			<th>Monto</th>
			<th>XML</th>
			<th>PDF</th>
			<th>SUNAT</th>
		</tr>
	</thead>
	<tbody>
		{#each invoices as { id, customer, items, createdAt }}
			<tr class="hover:bg-base-200 data-[active=true]:bg-base-200">
				<td>{formatDateToLocal(createdAt)}</td>
				<td class=""> FE </td>
				<td>0001</td>
				<td>
					<span class="inline-block min-w-[80px]">{customer.name} </span>
					<p>{customer.ruc}</p>
				</td>
				<td> S/ 100.00 </td>
				<td> D </td>
				<td> D </td>
				<td>D</td>
			</tr>
		{:else}
			<tr class="">
				<td class="h-94 text-center" colspan="6">No hay cotizaciones</td>
			</tr>
		{/each}
	</tbody>
</table>
