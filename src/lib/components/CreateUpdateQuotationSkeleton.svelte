<script lang="ts">
	import Skeleton from '$lib/components/ui/Skeleton.svelte'
</script>

<div>
	<div class="mt-8 grid gap-4">
		<div class="grid gap-2 lg:grid-cols-2">
			<div class="grid gap-1">
				<Skeleton class="h-4 w-20" />
				<Skeleton class="h-9 w-full" />
			</div>
			<div class="grid gap-1">
				<Skeleton class="h-4 w-20" />
				<Skeleton class="h-9" />
			</div>
		</div>
		<div class="grid gap-1">
			<Skeleton class="h-4 w-20" />
			<Skeleton class="h-9" />
		</div>
		<div class="grid gap-1">
			<Skeleton class="h-4 w-20" />
			<Skeleton class="h-9" />
		</div>
		<!-- Include Igv -->
		<div class="flex justify-between">
			<div class="flex gap-1">
				<Skeleton class="h-9 w-9" />
				<Skeleton class="h-9 w-32" />
			</div>
			<div class="flex gap-2">
				<Skeleton class="h-9 w-10" />
				<Skeleton class="h-9 w-32" />
			</div>
		</div>
		<div class="flex gap-2">
			<Skeleton class="h-10 w-26" />
			<Skeleton class="h-10 w-26" />
			<Skeleton class="h-10 w-26" />
			<Skeleton class="h-10 w-26" />
		</div>
		<div class="flex justify-between">
			<Skeleton class="h-9 w-26" />
			<div class="flex gap-2">
				<Skeleton class="h-9 w-26" />
				<Skeleton class="h-9 w-26" />
			</div>
		</div>
		<Skeleton class="h-40 w-full"></Skeleton>
		<Skeleton class="h-40 w-full"></Skeleton>
		<Skeleton class="h-40 w-full"></Skeleton>
		<Skeleton class="h-40 w-full"></Skeleton>
	</div>
</div>
