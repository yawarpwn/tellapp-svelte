<script>
	import { goto } from '$app/navigation'

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
		<a href="/">Home</a>
		<a href="/quotations">Cotizaciones</a>
		<a href="/products">Productos</a>
		<button class="btn" onclick={handleClick}>Salir</button>
	</nav>
	<main class="">
		{@render children()}
	</main>
</div>
