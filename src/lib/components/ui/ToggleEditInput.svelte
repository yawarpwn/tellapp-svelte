<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements'

	type Props = {
		value: string | number
		type: HTMLInputTypeAttribute
		name: string
		as?: 'input' | 'textarea'
		onInputChange: (_value: string) => void
	}

	let inputRef: HTMLInputElement | HTMLTextAreaElement
	const { value, type, onInputChange, name, as }: Props = $props()

	let isEditing = $state(false)
</script>

<div class="relative h-full flex-1">
	{#if as === 'textarea'}
		<textarea
			bind:this={inputRef}
			oninput={(ev) => onInputChange(ev.currentTarget.value)}
			{name}
			class={[
				'absolute inset-0 resize-none px-2 text-center align-middle ring ring-neutral-700 outline-none',
				isEditing ? 'opacity-100' : 'opacity-0'
			]}
			{value}
			onblur={() => {
				isEditing = false
			}}
			onkeydown={(ev) => ev.key === 'Enter' && (isEditing = false)}
		/>
	{:else}
		<input
			bind:this={inputRef}
			{name}
			class={[
				'absolute inset-0 h-full w-full px-2 ring ring-neutral-700 outline-none ',
				isEditing ? 'opacity-100' : 'opacity-0'
			]}
			oninput={(ev) => onInputChange(ev.currentTarget.value)}
			{type}
			{value}
			onblur={() => {
				isEditing = false
			}}
			onkeydown={(ev) => ev.key === 'Enter' && (isEditing = false)}
		/>
	{/if}

	<button
		class={[
			'absolute inset-0 flex w-full  items-center border border-transparent px-2',
			isEditing ? 'hidden' : 'block'
		]}
		onclick={async () => {
			isEditing = true
			console.log(inputRef)
			const end = inputRef.value.length
			inputRef.setSelectionRange(end, end)
			inputRef.focus()
		}}
	>
		<span>
			{value}
		</span>
	</button>
</div>
