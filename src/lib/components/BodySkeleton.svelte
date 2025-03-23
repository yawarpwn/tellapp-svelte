<script lang="ts">
	const { columnCount = 6, rowCount = 10, ...props } = $props()
	import Skeleton from '$lib/components/ui/Skeleton.svelte'
</script>

<tbody>
	{#each { length: rowCount } as row}
		<tr>
			{#each { length: columnCount } as column}
				<td>
					<Skeleton class="h-7 w-full" />
				</td>
			{/each}
		</tr>
	{/each}
</tbody>
