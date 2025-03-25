<script lang="ts">
	import BodySkeleton from './BodySkeleton.svelte'
	import Skeleton from '$lib/components/ui/Skeleton.svelte'

	type Props = {
		columnCount: number
		rowCount?: number
		searchableColumnCount?: number
		filterableColumnCount?: number
		showViewOptions?: boolean
		cellWidths?: string[]
		withPagination?: boolean
		shrinkZero?: boolean
		showSearchbox?: boolean
	}

	const {
		columnCount,
		rowCount = 10,
		searchableColumnCount = 0,
		filterableColumnCount = 0,
		showViewOptions = false,
		cellWidths = ['auto'],
		withPagination = true,
		shrinkZero = false,
		showSearchbox = false,
		...skeletonProps
	}: Props = $props()
</script>

{#if showSearchbox}
	<div class="mb-4 flex items-center justify-between gap-2">
		<Skeleton class="h-10 w-[200px]" />
		<Skeleton class="h-10 w-[100px]" />
	</div>
{/if}
<div class="flex flex-col gap-2 lg:hidden">
	{#each { length: 13 } as _}
		<Skeleton class="h-[140px]" />
	{/each}
</div>
<div class="hidden w-full space-y-2.5 overflow-auto lg:block">
	<div class="rounded-md">
		<table class="table">
			<thead>
				<tr class="hover:bg-transparent">
					{#each { length: columnCount } as _, i}
						<th style="width: {cellWidths[i]};min-width: {cellWidths[i]};">
							<Skeleton class="skeleton h-6 w-full flex-1" />
						</th>
					{/each}
				</tr>
			</thead>
			<BodySkeleton {columnCount} {rowCount} />
		</table>
	</div>
</div>
