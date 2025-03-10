<header class="flex justify-end gap-x-2">
	<div class="flex gap-2">
		<div class="skeleton h-8 w-8 rounded-md lg:w-24" />
		<div class="skeleton h-8 w-8 rounded-md lg:w-24" />
		<div class="skeleton h-8 w-8 rounded-md lg:w-24" />
		<div class="skeleton h-8 w-8 rounded-md lg:w-24" />
		<div class="skeleton h-8 w-8 rounded-md lg:w-24" />
		<div class="skeleton h-8 w-8 rounded-md lg:w-24" />
	</div>
</header>
<div class="container mx-auto px-4 py-8">
	<div class="overflow-hidden rounded-lg shadow">
		<div class="flex justify-end">
			<div class="text-right">
				<h2 class="text-2xl font-semibold md:text-3xl">Cotización</h2>
				<div class="mt-1 flex justify-end gap-1 text-xl text-yellow-500">
					# <div class="skeleton h-8 w-10" />
				</div>
			</div>
		</div>

		<div class="mt-6 grid gap-3 sm:grid-cols-2">
			<div class="flex flex-col gap-2">
				<div class="skeleton h-16" />
				<div class="skeleton h-16" />
				<div class="skeleton h-6" />
			</div>
			<div class="space-y-2 sm:text-right">
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
					<dl class="grid items-center gap-x-3 sm:grid-cols-6">
						<dt class="col-span-3 font-semibold">Fecha:</dt>
						<dd class="col-span-3">
							<div class="skeleton h-10 w-full" />
						</dd>
					</dl>
					<dl class="grid items-center gap-x-3 sm:grid-cols-6">
						<dt class="col-span-3 font-semibold">Actualizado:</dt>
						<dd class="col-span-3">
							<div class="skeleton h-10 w-full" />
						</dd>
					</dl>

					<dl class="grid items-center gap-x-3 sm:grid-cols-6">
						<dt class="col-span-3 font-semibold">Tiempo de entrega:</dt>
						<dd class="col-span-3">
							<div class="skeleton h-10 w-full" />
						</dd>
					</dl>
					<dl class="grid items-center gap-x-3 sm:grid-cols-6">
						<dt class="col-span-3 font-semibold">Codición de Pago</dt>
						<dd class="col-span-3">
							<div class="skeleton h-10 w-full" />
						</dd>
					</dl>
				</div>
			</div>
		</div>
		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr>
						<th>DESCRIPCION</th>
						<th>U/M</th>
						<th>CANT</th>
						<th>P.BASE</th>
						<th>P.UNIT</th>
						<th>MONTO</th>
					</tr>
				</thead>
				<tbody>
					{#each { length: 7 } as _}
						<tr>
							<td>
								<div class="skeleton h-20 min-w-[250px]"></div>
							</td>
							<td>
								<div class="skeleton h-20" />
							</td>
							<td>
								<div class="skeleton h-20" />
							</td>
							<td>
								<div class="skeleton h-20" />
							</td>
							<td>
								<div class="skeleton h-20" />
							</td>
							<td>
								<div class="skeleton h-20" />
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
