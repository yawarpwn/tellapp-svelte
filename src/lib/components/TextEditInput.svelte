<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements'

	type Props = {
		value: string | number
		type?: HTMLInputTypeAttribute
		name: string
		as?: 'input' | 'textarea'
		onEdit: (_value: string) => void
	}

	let inputRef: HTMLInputElement | HTMLTextAreaElement

	const { value, type, onEdit, name, as = 'input' }: Props = $props()

	let isEditing = $state(false)
	const isTextarea = as === 'textarea'

	function handleBlur(ev: FocusEvent) {
		const targetElement = ev.target as HTMLInputElement
		onEdit(targetElement.value)
		isEditing = false
	}

	function handleKeyDown(ev: KeyboardEvent) {
		const targetElement = ev.target as HTMLInputElement
		const keyPressed = ev.key
		if (keyPressed === 'Enter') {
			targetElement.blur()
		}
	}
</script>

<div class="relative flex-1">
	<p
		class={[
			'text-base-content/80 w-full  border border-transparent text-center',
			isEditing ? 'opacity-0' : 'opacity-100',
			isTextarea ? 'text-left' : ''
		]}
		onclick={async () => {
			isEditing = true

			if (type !== 'number') {
				const end = inputRef.value.length
				inputRef.setSelectionRange(end, end)
			}
			inputRef.focus()
		}}
	>
		{value}
	</p>
	{#if as === 'textarea'}
		<textarea
			bind:this={inputRef}
			{name}
			class={[
				'absolute inset-0 resize-none text-left outline-none',
				isEditing ? 'opacity-100 ' : 'pointer-events-none opacity-0'
			]}
			{value}
			onblur={handleBlur}
			onkeydown={handleKeyDown}
		></textarea>
	{:else}
		<input
			bind:this={inputRef}
			{name}
			class={[
				'absolute inset-0 border px-2 text-center outline-none',
				isEditing ? 'opacity-100' : 'pointer-events-none opacity-0'
			]}
			oninput={(ev) => onEdit(ev.currentTarget.value)}
			onblur={handleBlur}
			{type}
			{value}
			onkeydown={handleKeyDown}
		/>
	{/if}
</div>
