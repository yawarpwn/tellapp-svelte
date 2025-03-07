<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import { MenuIcon } from 'lucide-svelte'
	import Sidebar from '$lib/components/ui/Sidebar.svelte'
	let { children } = $props()

	let checked = $state(false)
	function closeDrawer() {
		checked = false
	}

	$inspect(checked)
</script>

<div class="drawer bg-base-200 lg:drawer-open mx-auto max-w-[100rem]">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" bind:checked />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<header class="navbar bg-base-300 w-full lg:hidden">
			<div class="mx-2 flex-1 px-2">
				<a href="/" class="text-primary text-2xl font-bold"> TellAPP </a>
			</div>

			<div class="flex-none">
				<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<MenuIcon />
				</label>
			</div>
		</header>
		<main class="px-2 lg:ml-20">
			{@render children()}
		</main>
	</div>
	<div class="drawer-side z-40">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		<aside class="bg-base-200/60 h-screen w-60 border-r border-zinc-800 backdrop-blur-md">
			<Sidebar {closeDrawer} />
			<!-- <div -->
			<!-- 	class="bg-base-100 pointer-events-none sticky bottom-0 flex h-40 [mask-image:linear-gradient(transparent,#000000)]" -->
			<!-- ></div> -->
		</aside>
	</div>
</div>
<SvelteToast />
