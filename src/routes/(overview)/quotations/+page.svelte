<script lang="ts">
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<div class="overflow-x-auto">
	<div class="flex items-center justify-end">
		<a class="btn" href="/quotations/create">Crear</a>
	</div>
	{#await data.quotations}
		<div>loading...</div>
	{:then quotations}
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th>Nro</th>
					<th>Client</th>
					<th>Job</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<!-- row 1 -->
				{#each quotations as { id, number, customer }}
					<tr>
						<th>{number}</th>
						<td>
							<p>
								{customer?.name || ''}
							</p>
							<p>{customer?.ruc || 'SIN RUC'}</p>
						</td>
						<td>Quality Control Specialist</td>
						<td>
							<a class="btn btn-xs" href={`/quotations/${number}`}>Ver</a>
							<a class="btn btn-xs" href={`/quotations/${number}/update`}>Editar</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/await}
</div>
