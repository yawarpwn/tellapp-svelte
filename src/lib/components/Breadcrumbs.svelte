<script lang="ts">
	type Props = {
		breadcrumbs: {
			label: string
			href?: string
			icon: any
		}[]
	}

	const { breadcrumbs }: Props = $props()
</script>

<div class="breadcrumbs text-sm">
	<ul>
		{#each breadcrumbs as { label, icon, href }}
			{@const Icon = icon}
			<li>
				{#if href}
					<a {href}>
						<!-- render incon -->
						<Icon size={16} />
						{label}
					</a>
				{:else}
					<span>
						<Icon size={16} />
						{label}</span
					>
				{/if}
			</li>
		{/each}
	</ul>
</div>
