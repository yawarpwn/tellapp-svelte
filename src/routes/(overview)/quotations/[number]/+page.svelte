<script lang="ts">
	import type { PageProps } from './$types'
	let { data }: PageProps = $props()
	const { quotation } = data
	const { items, customer, customerId, includeIgv, number, updatedAt, createdAt, credit } =
		quotation
</script>

<table class="table">
	<!-- head -->
	<thead>
		<tr>
			<th>Descripcion</th>
			<th>Acciones</th>
		</tr>
	</thead>
	<tbody>
		<!-- row 1 -->
		{#each items as item}
			<tr>
				<td>{item.description}</td>
				<td>
					<a class="btn btn-xs" href={`/quotations/${number}`}>Ver</a>
					<a class="btn btn-xs" href={`/quotations/${number}/edit`}>Editar</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
