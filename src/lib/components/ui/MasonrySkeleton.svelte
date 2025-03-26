<script lang="ts">
	import Skeleton from '$lib/components/ui/Skeleton.svelte'
</script>

<div class="flex gap-2">
	<!-- One -->
	<div class="flex w-full flex-col gap-2">
		<Skeleton class="h-[120px] min-w-[150px]" />
		<Skeleton class="h-[150px] min-w-[150px]" />
		<Skeleton class="h-[200px] min-w-[150px]" />
		<Skeleton class="h-[200px] min-w-[150px]" />
		<Skeleton class="h-[100px] min-w-[150px]" />
		<Skeleton class="h-[80px] min-w-[150px]" />
	</div>
	<!-- Two -->
	<div class="flex w-full flex-col gap-2">
		<Skeleton class="h-[220px] w-full min-w-[150px]" />
		<Skeleton class="h-[150px] min-w-[150px]" />
		<Skeleton class="h-[120px] min-w-[150px]" />
		<Skeleton class="h-[100px] min-w-[150px]" />
		<Skeleton class="h-[250px] min-w-[150px]" />
	</div>

	<!-- Tree -->
	<div class="hidden w-full flex-col gap-2 sm:flex">
		<Skeleton class="h-[150px] min-w-[150px]" />
		<Skeleton class="h-[150px] min-w-[150px]" />
		<Skeleton class="h-[120px] min-w-[150px]" />
		<Skeleton class="h-[200px] min-w-[150px]" />
		<Skeleton class="h-[100px] min-w-[150px]" />
		<Skeleton class="h-[120px] min-w-[150px]" />
	</div>

	<!-- Four -->
	<div class="hidden w-full flex-col gap-2 lg:flex">
		<Skeleton class="h-[220px] min-w-[150px]" />
		<Skeleton class="h-[150px] min-w-[150px]" />
		<Skeleton class="h-[120px] min-w-[150px]" />
		<Skeleton class="h-[100px] min-w-[150px]" />
		<Skeleton class="h-[250px] min-w-[150px]" />
	</div>
	<!-- Five -->
	<div class="hidden w-full flex-col gap-2 md:flex">
		<Skeleton class="h-[120px] min-w-[150px]" />
		<Skeleton class="h-[100px] min-w-[150px]" />
		<Skeleton class="h-[120px] min-w-[150px]" />
		<Skeleton class="h-[280px] min-w-[150px]" />
		<Skeleton class="h-[200px] min-w-[150px]" />
	</div>
	<!-- Six -->
	<div class="hidden w-full flex-col gap-2 md:flex">
		<Skeleton class="h-[220px] min-w-[150px]" />
		<Skeleton class="h-[150px] min-w-[150px]" />
		<Skeleton class="h-[120px] min-w-[150px]" />
		<Skeleton class="h-[100px] min-w-[150px]" />
		<Skeleton class="h-[120px] min-w-[150px]" />
		<Skeleton class="h-[100px] min-w-[150px]" />
	</div>
	<!-- Seven -->
	<div class="hidden w-full flex-col gap-2 lg:flex">
		<Skeleton class="h-[120px] min-w-[150px]" />
		<Skeleton class="h-[150px] min-w-[150px]" />
		<Skeleton class="h-[80px] min-w-[150px]" />
		<Skeleton class="h-[150px] min-w-[150px]" />
		<Skeleton class="h-[300px] min-w-[150px]" />
	</div>
</div>
