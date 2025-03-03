<script lang="ts">
	let pending = $state(false)
	import { Loader2Icon, SearchIcon } from 'lucide-svelte'
	import { toast } from '@zerodevx/svelte-toast'
	import { enhance } from '$app/forms'
	import { quotation } from '$lib/stores/quotation.svelte'
</script>

<form
	use:enhance={() => {
		pending = true
		// `formElement` is this `<form>` element
		// `formData` is its `FormData` object that's about to be submitted
		// `action` is the URL to which the form is posted
		// calling `cancel()` will prevent the submission
		// `submitter` is the `HTMLElement` that caused the form to be submitted
		return async ({ result, update }) => {
			if (result.type === 'error') {
				toast.push('NO se pudo encontrar el ruc')
			}
			if (result.type === 'success' && result.data) {
				const fondCustomer = result.data as {
					id: string
					name: string
					ruc: string
					address: string
					isRegular: boolean
				}
				quotation.customerId = fondCustomer.id
				quotation.customer = {
					...quotation.customer,
					id: fondCustomer.id,
					name: fondCustomer.name,
					ruc: fondCustomer.ruc,
					address: fondCustomer.address,
					isRegular: fondCustomer.isRegular
				}
				update()
			}

			pending = false
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
		}
	}}
	method="POST"
	action="/actions?/search"
	class="col-span-6 grid gap-2"
>
	<label class="label" for="ruc"> Ruc </label>
	<div class="relative">
		<input
			id="ruc"
			name="ruc"
			class="input w-full"
			value={quotation.customer?.ruc || ''}
			placeholder="20610555536"
		/>
		<button type="submit" class="absolute top-1/2 right-2 -translate-y-1/2">
			{#if pending}
				<Loader2Icon class="animate-spin" />
			{:else}
				<SearchIcon />
			{/if}
		</button>
	</div>
</form>
