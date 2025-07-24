<script lang="ts">
	import {
		FilesIcon,
		HomeIcon,
		type Icon as IconType,
		ImageUpIcon,
		PictureInPictureIcon,
		PrinterIcon,
		ShoppingCartIcon,
		SquareArrowRightIcon,
		PaperclipIcon,
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
		},
		{
			name: 'Marca Agua',
			href: '/watermarks',
			icon: ImageUpIcon
		},
		{
			name: 'Señales',
			href: '/signals',
			icon: SquareArrowRightIcon
		},

		{
			name: 'Certificados',
			href: '/certificate',
			icon: PaperclipIcon
		}
	]
</script>

<div class="flex p-4">
	<Logo />
</div>
<ul class="menu w-full gap-4 px-4 py-0">
	{#each menuItems as item}
		{@const Icon = item.icon}
		{@const isActive = page.url.pathname.startsWith(item.href)}
		<li>
			<a
				class={`flex items-center gap-3 ${isActive ? 'menu-active' : ''}`}
				href={item.href}
				onclick={closeDrawer}
			>
				<Icon class="size-5" />
				<span>
					{item.name}
				</span>
			</a>
		</li>
	{/each}
	<Logout />
</ul>
