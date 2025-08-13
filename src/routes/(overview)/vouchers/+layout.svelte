<script lang="ts">
	import { page } from '$app/state'
	const routes = [
		{
			name: 'Facturas',
			path: '/vouchers/invoices'
		},
		{
			name: 'Boletas',
			path: '/vouchers/tickets'
		},
		{
			name: 'Nota Crédito',
			path: '/vouchers/credit-notes'
		},
		{
			name: 'Nota Débito',
			path: '/vouchers/debit-notes'
		}
	]
</script>

<ul class="flex gap-4 overflow-x-auto py-4">
	{#each routes as route}
		{@const isActive = route.path === page.url.pathname}
		<a class="btn" class:btn-primary={isActive} href={route.path}>{route.name}</a>
	{/each}
</ul>
<slot />
