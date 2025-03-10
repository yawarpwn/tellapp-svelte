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

<div class="w-full space-y-2.5 overflow-auto">
	<div class="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
		<div class="flex flex-1 items-center space-x-2"></div>
		<div class="h-7 w-12 md:w-24" />
	</div>
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
}
