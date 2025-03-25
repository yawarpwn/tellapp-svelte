<script lang="ts">
	import {
		FilesIcon,
		HomeIcon,
		type Icon as IconType,
		PrinterIcon,
		ShoppingCartIcon,
		TruckIcon
	} from 'lucide-svelte'
	import Logo from '$lib/components/Logo.svelte'
	import Logout from '$lib/components/Logout.svelte'
	import { page } from '$app/state'

	const { closeDrawer } = $props()

	type MenuItem = {
		name: string
		href: string
		icon: typeof IconType
	}
	const menuItems: MenuItem[] = [
		{
			name: 'Cotizaciones',
			href: '/quotations',
			icon: FilesIcon
		},
		{
			name: 'Productos',
			href: '/products',
			icon: ShoppingCartIcon
		},
		{
			name: 'Etiquetas',
			href: '/labels',
			icon: PrinterIcon
		},
		{
			name: 'Agencias',
			href: '/agencies',
			icon: TruckIcon
		}
	]
</script>

<div class="flex p-4">
	<Logo />
</div>
<ul class="menu w-ful gap-2 px-4 py-0">
	{#each menuItems as item}
		{@const Icon = item.icon}
		{@const isActive = page.url.pathname.startsWith(item.href)}
		<li>
			<a
				class={`flex items-center gap-2 ${isActive ? 'menu-active' : ''}`}
				href={item.href}
				onclick={closeDrawer}
			>
				<span class="">
					<Icon />
				</span>
				<span>
					{item.name}
				</span>
			</a>
		</li>
	{/each}
	<Logout />
</ul>
