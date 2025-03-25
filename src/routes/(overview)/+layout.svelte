<script lang="ts">
	import { MenuIcon } from 'lucide-svelte'
	import { Toaster } from 'svelte-sonner'
	import Sidebar from '$lib/components/Sidebar.svelte'
	import type { LayoutProps } from './$types'
	const { children }: LayoutProps = $props()
	import { onNavigate } from '$app/navigation'
	import Logo from '$lib/components/Logo.svelte'
	import { page } from '$app/state'

	let checked = $state(false)
	function closeDrawer() {
		checked = false
	}

	onNavigate((navigation) => {
		if (
			!document.startViewTransition ||
			navigation.to?.url.pathname === navigation.from?.url.pathname
		)
			return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<svelte:head>
	<title>{page.data?.metadata?.title} | Tell Señales</title>
</svelte:head>
<div class="drawer lg:drawer-open mx-auto max-w-[100rem]">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" bind:checked />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<header
			style="view-transition-name: header;"
			class="navbar bg-base-200 sticky top-0 z-40 min-h-14 w-full px-3 lg:hidden"
		>
			<div class="flex-1">
				<a href="/" class="">
					<Logo />
				</a>
			</div>

			<div class="">
				<label for="my-drawer-3" aria-label="open sidebar" class="cursor-pointer">
					<svg
						class=""
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="14"
						viewBox="0 0 20 14"
						fill="none"
						><path
							d="M19 2H6C5.448 2 5 1.552 5 1C5 0.448 5.448 0 6 0H19C19.552 0 20 0.448 20 1C20 1.552 19.552 2 19 2ZM20 7C20 6.448 19.552 6 19 6H1C0.448 6 0 6.448 0 7C0 7.552 0.448 8 1 8H19C19.552 8 20 7.552 20 7ZM20 13C20 12.448 19.552 12 19 12H10C9.448 12 9 12.448 9 13C9 13.552 9.448 14 10 14H19C19.552 14 20 13.552 20 13Z"
							fill="white"
						></path></svg
					>
				</label>
			</div>
		</header>
		<main class="main relative overflow-x-hidden px-3 py-2 lg:ml-20 lg:py-8">
			{@render children()}
		</main>
	</div>
	<div class="drawer-side z-40" style="view-transition-name: sidebar;">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		<aside class="bg-base-100/90 h-screen w-60 border-r border-zinc-800 backdrop-blur-md">
			<Sidebar {closeDrawer} />
		</aside>
	</div>
</div>

<!-- Toaster -->
<Toaster
	theme="dark"
	position="bottom-right"
	closeButton
	toastOptions={{
		unstyled: true,
		classes: {
			toast: 'bg-base-300 p-4 rounded-md ',
			title: 'text-red-400',
			description: 'text-red-400',
			actionButton: 'bg-zinc-400',
			cancelButton: 'bg-orange-400',
			closeButton: 'bg-lime-400',
			error: 'bg-warning text-warning-content',
			success: 'bg-success text-success-content'
		}
	}}
/>

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
