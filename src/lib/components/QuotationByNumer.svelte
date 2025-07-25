<script lang="ts">
	import { EditIcon, ExternalLinkIcon, FilesIcon, TrashIcon } from 'lucide-svelte'
	import { formatDateToLocal, formatNumberToLocal, getIgv } from '$lib/utils'
	import DownloadAndShareButton from '$lib/components/DownloadAndShareButton.svelte'
	import ToggleRegularCustomerButton from '$lib/components/ToggleRegularCustomerButton.svelte'
	import ConfirmAction from '$lib/components/ConfirmAction.svelte'
	import CopyText from '$lib/components/CopyText.svelte'
	import type { QuotationClient } from '$lib/types'

	type Props = {
		quotation: QuotationClient
	}
	const { quotation }: Props = $props()
	const { formatedTotal, formatedSubTotal, formatedIgv } = getIgv(quotation.items)
</script>

<div class="mt-2 flex flex-col gap-6">
	<header class="flex justify-end">
		<div class="flex gap-1">
			<a class="btn btn-sm" href={`/quotations/${quotation.number}/update`}>
				<EditIcon size={18} />
				<span class="hidden lg:block">Editar</span>
			</a>
			<DownloadAndShareButton {quotation} />
			<ConfirmAction action={`?/destroy`} message={`Eliminar la cotización ${quotation.number}?`}>
				{#snippet trigger({ openModal })}
					<button onclick={openModal} class="btn btn-sm flex items-center gap-2">
						<TrashIcon size={18} />
						<span class="hidden lg:block">Eliminar</span>
					</button>
				{/snippet}
			</ConfirmAction>

			<ConfirmAction
				shootConfetti
				action={`?/duplicate`}
				message={`Duplicar la cotización ${quotation.number}?`}
			>
				{#snippet trigger({ openModal })}
					<button onclick={openModal} class="btn btn-sm flex items-center gap-2">
						<FilesIcon size={18} />
						<span class="hidden lg:block">Duplicar</span>
					</button>
				{/snippet}
			</ConfirmAction>
			{#if quotation.customerId && quotation.customer}
				<ToggleRegularCustomerButton
					isRegular={quotation.customer?.isRegular}
					customerId={quotation.customerId}
				/>
			{/if}
		</div>
	</header>

	<div class="flex justify-end">
		<div class="text-right">
			<h2 class="text-2xl font-semibold md:text-3xl">Cotización</h2>
			<div class="mt-1 flex justify-end gap-1 text-2xl">
				<span class="text-primary">#</span>
				<span
					class="from-primary to-secondary bg-gradient-to-r bg-clip-text font-bold text-transparent"
				>
					{String(quotation.number).padStart(4, '0')}
				</span>
			</div>
		</div>
	</div>

	<div class="mt-6 grid gap-3 sm:grid-cols-2">
		<div>
			<h3 class="text-lg font-semibold">{quotation.customer?.name ?? 'SIN NOMBRE'}</h3>
			<address class="text-muted-foreground mt-2 not-italic">
				{quotation.customer?.address ?? 'SIN DIRECCION'}
			</address>
			<p class="text-muted-foreground mt-2">{quotation.customer?.ruc ?? 'SIN RUC'}</p>
		</div>
		<div class="space-y-2 sm:text-right">
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
				<dl class="grid gap-x-3 sm:grid-cols-6">
					<dt class="col-span-3 font-semibold">Fecha:</dt>
					<dd class="col-span-3">{formatDateToLocal(quotation.createdAt)}</dd>
				</dl>
				<dl class="grid gap-x-3 sm:grid-cols-6">
					<dt class="col-span-3 font-semibold">Actualizado:</dt>
					<dd class="col-span-3">
						{quotation.updatedAt && formatDateToLocal(quotation.updatedAt)}
					</dd>
				</dl>

				<dl class="grid gap-x-3 sm:grid-cols-6">
					<dt class="col-span-3 font-semibold">Tiempo de entrega:</dt>
					<dd class="col-span-3">{quotation.deadline} día(s)</dd>
				</dl>
				<dl class="grid gap-x-3 sm:grid-cols-6">
					<dt class="col-span-3 font-semibold">Codición de Pago</dt>
					<dd class="col-span-3">
						{quotation.credit ? `${quotation.credit} días` : '50% Adelanto '}
					</dd>
				</dl>
				<dl class="grid gap-x-3 sm:grid-cols-6">
					<dt class="col-span-3 font-semibold">Validez</dt>
					<dd class="col-span-3">
						{quotation.validityDays + ' días'}
					</dd>
				</dl>
			</div>
		</div>
	</div>
	{#if quotation.observations}
		<div>
			<p>OBSERVACIONES:</p>
			<p>{quotation.observations}</p>
		</div>
	{/if}
	<div class="rounded-box border-base-content/5 bg-base-10 overflow-x-auto border">
		<table class="table-zebra table [&_td]:p-2">
			<thead>
				<tr>
					<th>DESCRIPCION</th>
					<th class="text-center">LINK</th>
					<th class="text-center">U/M</th>
					<th class="text-center">CANT</th>
					<th class="text-center">P.BASE</th>
					<th class="text-center">P.UNIT</th>
					<th class="text-center">MONTO</th>
				</tr>
			</thead>
			<tbody class="font-mono">
				{#each quotation.items as item}
					<tr>
						<td>
							<div class="w-full min-w-[350px]">
								<CopyText text={item.description} unitSize={item.unitSize} />
							</div>
						</td>
						<td class="text-center">
							{#if item.link}
								<a target="_blank" class="flex justify-center" href={item.link}>
									<ExternalLinkIcon size={18} class="text-primary" />
								</a>
							{/if}
						</td>
						<td class="text-center">{item.unitSize}</td>
						<td class="text-center">{item.qty.toString().padStart(2, '0')}</td>
						<td class="text-center">
							<CopyText text={(item.price / 1.18).toFixed(4)} />
						</td>
						<td class="text-center">{formatNumberToLocal(item.price)}</td>
						<td class="text-center">
							{formatNumberToLocal(item.price * item.qty)}
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot class="justify-end">
				<tr>
					<td colSpan={6}>
						<div class="flex justify-end">
							<span>SUBTOTAL</span>
						</div>
					</td>
					<td>
						<div class="flex justify-center">
							<span>{formatedSubTotal}</span>
						</div>
					</td>
				</tr>
				<tr>
					<td colSpan={6}>
						<div class="flex justify-end">
							<span>IGV</span>
						</div>
					</td>
					<td>
						<div class="flex justify-center">
							<span>{formatedIgv}</span>
						</div>
					</td>
				</tr>
				<tr>
					<td colSpan={6}>
						<div class="flex justify-end">
							<span>TOTAL</span>
						</div>
					</td>
					<td>
						<div class="flex justify-center">
							<span>{formatedTotal}</span>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
