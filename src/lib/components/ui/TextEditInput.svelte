<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements'

	type Props = {
		value: string | number
		type?: HTMLInputTypeAttribute
		name: string
		as?: 'input' | 'textarea'
		onInputChange: (_value: string) => void
	}

	let inputRef: HTMLInputElement | HTMLTextAreaElement
	const { value, type, onInputChange, name, as = 'input' }: Props = $props()

	let isEditing = $state(false)

	function handleBlur() {
		isEditing = false
	}

	function handleKeyDown(ev: KeyboardEvent) {
		ev.key === 'Enter' && (isEditing = false)
	}
</script>

<div class="relative flex-1">
	<button
		class={[
			'text-base-content/60 flex w-full items-center justify-center border border-transparent px-2 text-center',
			isEditing ? 'opacity-0' : 'opacity-100'
		]}
		ondblclick={async () => {
			isEditing = true

			if (type !== 'number') {
				const end = inputRef.value.length
				inputRef.setSelectionRange(end, end)
			}
			inputRef.focus()
		}}
	>
		{value}
	</button>
	{#if as === 'textarea'}
		<textarea
			bind:this={inputRef}
			oninput={(ev) => onInputChange(ev.currentTarget.value)}
			{name}
			class={[
				'absolute inset-0 resize-none px-2 text-center outline-none',
				isEditing ? 'opacity-100 ' : 'pointer-events-none opacity-0'
			]}
			{value}
			onblur={handleBlur}
			onkeydown={handleKeyDown}
		/>
	{:else}
		<input
			bind:this={inputRef}
			{name}
			class={[
				'absolute inset-0 px-2 text-center outline-none',
				isEditing ? 'opacity-100' : 'pointer-events-none opacity-0'
			]}
			oninput={(ev) => onInputChange(ev.currentTarget.value)}
			{type}
			{value}
			onblur={handleBlur}
			onkeydown={handleKeyDown}
		/>
	{/if}
</div>
