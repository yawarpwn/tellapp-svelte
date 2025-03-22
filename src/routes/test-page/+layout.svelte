<script lang="ts">
	const { children } = $props()
	import { navigating, page } from '$app/state'
</script>

<ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box flex-row gap-4">
	<li>
		<a href="/test-page/a" class={page.url.pathname === '/test-page/a' ? 'menu-active' : ''}>
			example a
		</a>
	</li>
	<li aria-current="page">
		<a
			href="/test-page/b"
			class={page.url.pathname === '/test-page/b' ? 'menu-active' : ''}
			aria-current="page"
		>
			example b
		</a>
	</li>
</ul>
{#if navigating.to}
	<div>navigatingg to {navigating.to.url.pathname}</div>
{/if}
<main class="px-4">
	{@render children()}
</main>
