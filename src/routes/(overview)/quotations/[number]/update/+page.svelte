<script lang="ts">
	import type { PageProps } from './$types'
	let { data }: PageProps = $props()
	const { quotation } = data
	const { items, customer, customerId, includeIgv, number, updatedAt, createdAt, credit } =
		quotation
</script>

<h1>Update page</h1>
