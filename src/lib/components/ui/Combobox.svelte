<script lang="ts">
	import { Combobox, type WithoutChildrenOrChild, mergeProps } from 'bits-ui'
	import {
		AppleIcon,
		ArrowUpDownIcon,
		ArrowUpIcon,
		ChartPieIcon,
		CheckIcon,
		MoveDownIcon,
		TruckIcon
	} from 'lucide-svelte'

	type Item = { value: string; label: string }

	type Props = Combobox.RootProps & {
		items: Item[]
		inputProps?: WithoutChildrenOrChild<Combobox.InputProps>
		contentProps?: WithoutChildrenOrChild<Combobox.ContentProps>
	}

	let {
		items,
		value = $bindable(),
		open = $bindable(false),
		inputProps,
		contentProps,
		...restProps
	}: Props = $props()

	let searchValue = $state('')

	const filteredItems = $derived.by(() => {
		if (searchValue === '') return items
		return items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()))
	})

	function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
		searchValue = e.currentTarget.value
	}

	function handleOpenChange(newOpen: boolean) {
		if (!newOpen) searchValue = ''
	}

	const mergedRootProps = $derived(mergeProps(restProps, { onOpenChange: handleOpenChange }))
	const mergedInputProps = $derived(mergeProps(inputProps, { oninput: handleInput }))
</script>

<Combobox.Root bind:value bind:open {...mergedRootProps}>
	<div class="relative">
		<!-- <TruckIcon class="absolute start-3 top-1/2 size-6 -translate-y-1/2 opacity-50" /> -->
		<Combobox.Input
			{...mergedInputProps}
			class="input rounded-9px inline-flex h-9  w-full truncate border pr-11 text-base transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden sm:text-sm"
			placeholder="Agencia sugerida"
			aria-label="Search a fruit"
		/>
	</div>
	<Combobox.Trigger class="absolute end-3 top-1/2 size-6 -translate-y-1/2 cursor-pointer">
		<ArrowUpDownIcon class="size-4" />
	</Combobox.Trigger>
	<Combobox.Portal>
		<Combobox.Content
			{...contentProps}
			class="bg-base-200  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 h-96 max-h-[var(--bits-combobox-content-available-height)] w-[var(--bits-combobox-anchor-width)] min-w-[var(--bits-combobox-anchor-width)] rounded-xl  px-1 py-3 outline-hidden select-none data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
			sideOffset={10}
		>
			<Combobox.ScrollUpButton class="flex w-full items-center justify-center py-1">
				<ArrowUpIcon class="size-3" />
			</Combobox.ScrollUpButton>
			<Combobox.Viewport class="px-1">
				{#each filteredItems as item, i (i + item.value)}
					<Combobox.Item
						value={item.value}
						label={item.label}
						class="rounded-button data-highlighted:bg-base-content/10 flex h-12 w-full items-center py-3 pr-1.5 pl-5 text-sm capitalize outline-hidden select-none"
					>
						{#snippet children({ selected })}
							{item.label}
							{#if selected}
								<div class="ml-auto">
									<CheckIcon />
								</div>
							{/if}
						{/snippet}
					</Combobox.Item>
				{:else}
					<span class="block px-5 py-2 text-sm text-muted-foreground">
						No results found, try again.
					</span>
				{/each}
			</Combobox.Viewport>
			<Combobox.ScrollDownButton class="flex w-full items-center justify-center py-1">
				<MoveDownIcon class="size-3" />
			</Combobox.ScrollDownButton>
		</Combobox.Content>
	</Combobox.Portal>
</Combobox.Root>
