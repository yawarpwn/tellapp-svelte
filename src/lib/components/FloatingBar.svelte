<script lang="ts">
	import type { QuotationClient } from '$lib/types'
	import { EditIcon, EyeIcon, TrashIcon, XIcon } from 'lucide-svelte'
	type Props = {
		quotation: QuotationClient
		clearSelectedRow: () => void
	}
	const { quotation, clearSelectedRow }: Props = $props()
</script>

<div class="fixed inset-x-0 bottom-10 z-40 w-full p-4">
	<div class="w-full">
		<div
			class="bg-base-200/90 mx-auto flex w-fit items-center gap-2 rounded-md p-2 shadow-2xl backdrop-blur-md [&>a]:shrink-0 [&>button]:shrink-0"
		>
			<div class="flex h-9 items-center rounded-md border border-dashed pr-1 pl-2.5">
				<span>#{quotation.number}</span>
				<div class="mr-1 ml-2 w-px bg-orange-500" />
				<button class="btn btn-xs btn-ghost" onclick={clearSelectedRow}>
					<XIcon class="size-4" />
				</button>
			</div>

			<a class="btn btn-xs btn-ghost" href={`/quotations/${quotation.number}`}>
				<EyeIcon class="size-4" />
			</a>
			<a class="btn btn-xs btn-ghost" href={`/quotations/${quotation.number}/update`}>
				<EditIcon class="size-4" />
			</a>
		</div>
	</div>
</div>
