<script lang="ts">
	import BodySkeleton from './BodySkeleton.svelte'

	type Props = {
		/**
		 * The number of columns in the table.
		 * @type number
		 */
		columnCount: number

		/**
		 * The number of rows in the table.
		 * @default 10
		 * @type number | undefined
		 */
		rowCount?: number

		/**
		 * The number of searchable columns in the table.
		 * @default 0
		 * @type number | undefined
		 */
		searchableColumnCount?: number

		/**
		 * The number of filterable columns in the table.
		 * @default 0
		 * @type number | undefined
		 */
		filterableColumnCount?: number

		/**
		 * Flag to show the table view options.
		 * @default undefined
		 * @type boolean | undefined
		 */
		showViewOptions?: boolean

		/**
		 * The width of each cell in the table.
		 * The length of the array should be equal to the columnCount.
		 * Any valid CSS width value is accepted.
		 * @default ["auto"]
		 * @type string[] | undefined
		 */
		cellWidths?: string[]

		/**
		 * Flag to show the pagination bar.
		 * @default true
		 * @type boolean | undefined
		 */
		withPagination?: boolean

		/**
		 * Flag to prevent the table cells from shrinking.
		 * @default false
		 * @type boolean | undefined
		 */
		shrinkZero?: boolean
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
		...skeletonProps
	}: Props = $props()
</script>

<div class="flex flex-col gap-2 lg:hidden">
	{#each { length: 13 } as _}
		<div class="skeleton h-[140px]"></div>
	{/each}
</div>
<div class="hidden w-full space-y-2.5 overflow-auto lg:block">
	<div class="rounded-md">
		<table class="table">
			<thead>
				<tr class="hover:bg-transparent">
					{#each { length: columnCount } as _, i}
						<th style="width: {cellWidths[i]};min-width: {cellWidths[i]};">
							<div class="skeleton h-6 w-full flex-1" />
						</th>
					{/each}
				</tr>
			</thead>
			<BodySkeleton {columnCount} {rowCount} />
		</table>
	</div>
</div>
