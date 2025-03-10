<script lang="ts">
	const { columnCount = 6, rowCount = 10, ...props } = $props()
</script>

<tbody>
	{#each { length: rowCount } as row}
		<tr>
			{#each { length: columnCount } as column}
				<td>
					<div class="skeleton h-7 w-full" />
				</td>
			{/each}
		</tr>
	{/each}
</tbody>
