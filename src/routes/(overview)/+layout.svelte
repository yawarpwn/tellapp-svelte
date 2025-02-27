<script>
	import { goto } from '$app/navigation'

	let { children } = $props()

	const handleClick = async () => {
		const res = await fetch('/api/logout', {
			method: 'POST'
		})

		if (!res.ok) return
		goto('/')
	}
</script>

<nav class="flex items-center gap-4">
	<a href="/">Home</a>
	<a href="/quotations">Cotizaciones</a>
	<a href="/products">Productos</a>
	<button onclick={handleClick}>Salir</button>
</nav>

{@render children()}
