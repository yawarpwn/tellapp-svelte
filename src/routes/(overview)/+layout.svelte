<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import { MenuIcon } from 'lucide-svelte'
	import Sidebar from '$lib/components/ui/Sidebar.svelte'
	import type { Snippet } from 'svelte'
	let { children }: { children: Snippet } = $props()
	import { onNavigate } from '$app/navigation'

	import { page } from '$app/stores'

	let checked = $state(false)
	function closeDrawer() {
		checked = false
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<svelte:head>
	<title>titulo</title>
</svelte:head>
<div class="drawer lg:drawer-open mx-auto max-w-[100rem]">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" bind:checked />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<header
			style="view-transition-name: header;"
			class="navbar bg-base-200 sticky top-0 z-40 h-14 w-full lg:hidden"
		>
			<div class="mx-2 flex-1 px-2">
				<a href="/" class="text-primary text-2xl font-bold"> TellAPP </a>
			</div>

			<div class="flex-none">
				<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<MenuIcon />
				</label>
			</div>
		</header>
		<main class="main relative px-4 py-6 lg:ml-20">
			{@render children()}
		</main>
	</div>
	<div class="drawer-side z-40" style="view-transition-name: sidebar;">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		<aside class="bg-base-100/80 h-screen w-60 border-r border-zinc-800 backdrop-blur-md">
			<Sidebar {closeDrawer} />
		</aside>
	</div>
</div>
<SvelteToast />

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	:root::view-transition-old(root) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(root) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>
