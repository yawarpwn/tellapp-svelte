<script lang="ts">
	import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-svelte'
	import { cn } from '$lib/utils'
	import PaginationNumber from './PaginationNumber.svelte'
	// import { page } from '$app/stores'
	import { pushState, replaceState } from '$app/navigation'
	import { page } from '$app/stores'

	export const generatePagination = (currentPage: number, totalPages: number) => {
		// If the total number of pages is 7 or less,
		// display all pages without any ellipsis.
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1)
		}

		// If the current page is among the first 3 pages,
		// show the first 3, an ellipsis, and the last 2 pages.
		if (currentPage <= 3) {
			return [1, 2, 3, '...', totalPages - 1, totalPages]
		}

		// If the current page is among the last 3 pages,
		// show the first 2, an ellipsis, and the last 3 pages.
		if (currentPage >= totalPages - 2) {
			return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
		}

		// If the current page is somewhere in the middle,
		// show the first page, an ellipsis, the current page and its neighbors,
		// another ellipsis, and the last page.
		return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
	}
	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams($page.url.searchParams)
		params.set('page', pageNumber.toString())
		return `${$page.url.pathname}?${params.toString()}`
	}

	const currentPage = 1
	const totalPages = 200
	const allPages = generatePagination(currentPage, totalPages)

	type PaginationArrowProps = {
		direction: 'left' | 'right'
		href: string
		isDisabled?: boolean
	}

	type PaginationNumberProps = {
		page: number | string
		isActive: boolean
		href: string
	}
</script>

<!-- PaginationArrow -->
{#snippet paginationArrow({ direction, href, isDisabled }: PaginationArrowProps)}
	{@const className = cn('flex h-10 w-10 justify-center items-center border rounded-md', {
		'cursor-not-allowed opacity-60': isDisabled,
		'hover:bg-base-200': !isDisabled
	})}
	<svelte:element this={isDisabled ? 'div' : 'a'} href="/" class={className}>
		{#if direction === 'left'}
			<ArrowLeftIcon class="size-4" />
		{:else}
			<ArrowRightIcon class="size-4" />
		{/if}
	</svelte:element>
{/snippet}

<!-- PaginationNumber -->
{#snippet paginationNumber({ isActive, page, href }: PaginationNumberProps)}
	{@const className = cn(
		'flex h-10 w-10 flex items-center justify-center text-sm border rounded-md ',
		{
			'bg-primary border-primary text-primary-content': isActive
		}
	)}
	{#if isActive}
		<div class={className}>{page}</div>
	{:else}
		<a class={className} {href}>{page}</a>
	{/if}
{/snippet}

<div class="mt-4 flex justify-center">
	<div class="inline-flex items-center gap-2">
		{@render paginationArrow({
			direction: 'left',
			href: createPageURL(currentPage - 1),
			isDisabled: currentPage <= 1
		})}
		<div class="flex gap-2">
			{#each allPages as page}
				{@render paginationNumber({
					page,
					isActive: page === currentPage,
					href: createPageURL(page)
				})}
			{/each}
		</div>
		{@render paginationArrow({
			direction: 'right',
			href: createPageURL(currentPage + 1),
			isDisabled: currentPage >= totalPages
		})}
	</div>
</div>
