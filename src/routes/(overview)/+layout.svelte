<script lang="ts">
	import { goto } from '$app/navigation'
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import { type Icon as IconType, ShoppingCartIcon, HomeIcon, TruckIcon } from 'lucide-svelte'
	import { enhance } from '$app/forms'

	type MenuItem = {
		name: string
		href: string
		icon: typeof IconType
	}
	const menuItems: MenuItem[] = [
		{
			name: 'Cotizaciones',
			href: '/',
			icon: HomeIcon
		},
		{
			name: 'Productos',
			href: '/products',
			icon: ShoppingCartIcon
		},
		{
			name: 'Agencias',
			href: '/agencies',
			icon: TruckIcon
		}
	]

	let { children } = $props()

	const handleClick = async () => {
		const res = await fetch('/api/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})

		if (!res.ok) return
		goto('/')
	}
</script>

<div class="container mx-auto">
	<nav class="flex items-center gap-4">
		{#each menuItems as item}
			{@const Icon = item.icon}
			<a href={item.href}>
				<span>
					{item.name}
				</span>
				<Icon />
			</a>
		{/each}
		<button class="btn" onclick={handleClick}>Salir</button>
		<form method="POST" use:enhance action="/actions?/logout">
			<button> Logout </button>
		</form>
	</nav>
	<main class="">
		{@render children()}
	</main>
</div>
<SvelteToast />
