<script lang="ts">
	import { Dialog, type WithoutChild } from 'bits-ui'
	import X from 'lucide-svelte/icons/x'
	import type { Snippet } from 'svelte'

	type Props = Dialog.RootProps & {
		title?: Snippet
		trigger?: Snippet
		description?: Snippet
		contentProps?: WithoutChild<Dialog.ContentProps>
	}

	let {
		children,
		open = $bindable(false),
		title,
		trigger,
		description,
		contentProps,
		...restProps
	}: Props = $props()
</script>

<Dialog.Root bind:open {...restProps}>
	<!-- <Dialog.Trigger -->
	<!-- 	class="rounded-input bg-dark text-background -->
	<!--   shadow-mini hover:bg-dark/95 focus-visible:ring-foreground focus-visible:ring-offset-background inline-flex -->
	<!--   h-12 items-center justify-center px-[21px] text-[15px] font-semibold whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-[0.98]" -->
	<!-- > -->
	<!-- 	{@render trigger?.()} -->
	<!-- </Dialog.Trigger> -->
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			{...contentProps}
			class="bg-base-100 border-neutral/10 shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border p-3 outline-hidden sm:max-w-[490px] md:w-full"
		>
			<Dialog.Title
				class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
			>
				{@render title?.()}
			</Dialog.Title>
			<Dialog.Description class="text-foreground-alt text-sm">
				{@render description?.()}
			</Dialog.Description>
			{@render children?.()}
			<!-- <Dialog.Close -->
			<!-- 	class="focus-visible:ring-foreground focus-visible:ring-offset-background absolute top-5 right-5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-[0.98]" -->
			<!-- > -->
			<!-- 	<div> -->
			<!-- 		<X class="text-foreground size-5" /> -->
			<!-- 		<span class="sr-only">Close</span> -->
			<!-- 	</div> -->
			<!-- </Dialog.Close> -->
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
