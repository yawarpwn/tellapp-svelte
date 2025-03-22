<script lang="ts">
	import type { PageProps } from './$types'

	const { form, data }: PageProps = $props()
</script>

<h1>B page</h1>
{#await data.products}
	<div>loading...</div>
{:then productsFullfiel}
	<div>{productsFullfiel}</div>
{:catch error}
	<div>Error</div>
	<div>{JSON.stringify(error)}</div>
{/await}
