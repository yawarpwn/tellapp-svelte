<script lang="ts">
	import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-svelte'
	import { cn } from '$lib/utils'
	type Props = {
		currentPage: number
		totalPages: number
		query: string
	}
	const { currentPage, query, totalPages }: Props = $props()

	export const generatePagination = (currentPage: number, totalPages: number) => {
		// If the total number of pages is 7 or less,
		// display all pages without any ellipsis.
		if (totalPages <= 6) {
			return Array.from({ length: totalPages }, (_, i) => i + 1)
		}

		// If the current page is among the first 3 pages,
		// show the first 3, an ellipsis, and the last 2 pages.
		if (currentPage <= 2) {
			return [1, 2, '...', totalPages - 1, totalPages]
		}

		// If the current page is among the last 3 pages,
		// show the first 2, an ellipsis, and the last 3 pages.
		if (currentPage >= totalPages - 2) {
			return [1, 2, '...', totalPages - 1, totalPages]
		}

		// If the current page is somewhere in the middle,
		// show the first page, an ellipsis, the current page and its neighbors,
		// another ellipsis, and the last page.
		return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
	}

	const allPages = generatePagination(currentPage, totalPages)

	type PaginationArrowProps = {
		direction: 'left' | 'right'
		page: number
		isDisabled?: boolean
		query: string
	}

	type PaginationNumberProps = {
		page: number | string
		query: string
		isActive: boolean
	}
</script>

<!-- PaginationArrow -->
{#snippet paginationArrow({ direction, page, isDisabled, query }: PaginationArrowProps)}
	{@const className = cn('flex h-10 w-10 justify-center items-center  rounded-md', {
		'cursor-not-allowed opacity-60': isDisabled,
		'hover:bg-base-300': !isDisabled
	})}

	<a href={`quotations?q=${query}&page=${page}`} class={className}>
		{#if direction === 'left'}
			<ArrowLeftIcon class="size-4" />
		{:else}
			<ArrowRightIcon class="size-4" />
		{/if}
	</a>
{/snippet}

<!-- PaginationNumber -->
{#snippet paginationNumber({ isActive, page, query }: PaginationNumberProps)}
	{@const className = cn(
		'flex h-10 w-10 flex items-center justify-center text-sm bg-base-200  rounded-md ',
		{
			'bg-primary border-primary text-primary-content': isActive,
			'hover:bg-base-300 cursor-pointer': !isActive
		}
	)}
	{#if isActive || page === '...'}
		<div class={className}>{page}</div>
	{:else}
		<a href={`quotations?q=${query}&page=${page}`} class={className}>
			{page}
		</a>
	{/if}
{/snippet}

<div class="flex justify-center">
	<nav class="inline-flex items-center gap-2" data-sveltekit-reload>
		{@render paginationArrow({
			direction: 'left',
			page: currentPage - 1,
			isDisabled: currentPage <= 1,
			query
		})}
		<div class="flex gap-2">
			{#each allPages as page}
				{@render paginationNumber({
					page,
					query,
					isActive: page === currentPage
				})}
			{/each}
		</div>
		{@render paginationArrow({
			direction: 'right',
			page: currentPage + 1,
			isDisabled: currentPage >= totalPages,
			query
		})}
	</nav>
</div>
