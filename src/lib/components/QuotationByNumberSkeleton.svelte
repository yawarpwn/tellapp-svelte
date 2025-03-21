<script lang="ts">
	import Skeleton from '$lib/components/ui/Skeleton.svelte'
</script>

<header class="flex flex-col items-end gap-2">
	<div class="flex gap-2">
		<Skeleton class="h-8 w-9  lg:w-24" />
		<Skeleton class="h-8 w-8  lg:w-24" />
		<Skeleton class="h-8 w-9  lg:w-24" />
		<Skeleton class="h-8 w-9  lg:w-24" />
		<Skeleton class="h-8 w-9  lg:w-24" />
		<Skeleton class="h-8 w-9  lg:w-24" />
	</div>
	<Skeleton class="h-8 w-40" />
	<Skeleton class="h-8 w-20" />
</header>
<div class="overflow-hidden rounded-lg shadow">
	<div class="mt-6 grid gap-3 sm:grid-cols-2 lg:gap-40">
		<div class="flex flex-col gap-2">
			<Skeleton class=" h-16" />
			<Skeleton class=" h-16" />
			<Skeleton class="h-6 w-60" />
		</div>
		<div class="sm:text-right">
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
				<dl class="grid items-center gap-2 sm:grid-cols-6">
					<dt class="col-span-3 font-semibold">
						<Skeleton class="h-6 w-40" />
					</dt>
					<dd class="col-span-3">
						<div class="skeleton h-10 w-full" />
					</dd>
				</dl>
				<dl class="grid items-center gap-x-3 sm:grid-cols-6">
					<dt class="col-span-3 font-semibold">
						<Skeleton class="h-6 w-40" />
					</dt>
					<dd class="col-span-3">
						<div class="skeleton h-10 w-full" />
					</dd>
				</dl>

				<dl class="grid items-center gap-2 sm:grid-cols-6">
					<dt class="col-span-3 font-semibold">
						<Skeleton class="h-6 w-40" />
					</dt>
					<dd class="col-span-3">
						<div class="skeleton h-10 w-full" />
					</dd>
				</dl>
				<dl class="grid items-center gap-2 sm:grid-cols-6">
					<dt class="col-span-3 font-semibold">
						<Skeleton class="h-6 w-40" />
					</dt>
					<dd class="col-span-3">
						<div class="skeleton h-10 w-full" />
					</dd>
				</dl>
			</div>
		</div>
	</div>
	<div class="overflow-x-auto">
		<table class="table [&_td]:p-1">
			<thead>
				<tr>
					<th>
						<Skeleton class="h-6 w-60" />
					</th>
					<th>
						<Skeleton class="h-6 w-20" />
					</th>
					<th>
						<Skeleton class="h-6 w-20" />
					</th>
					<th>
						<Skeleton class="h-6 w-20" />
					</th>
					<th>
						<Skeleton class="h-6 w-20" />
					</th>
					<th>
						<Skeleton class="h-6 w-20" />
					</th>
				</tr>
			</thead>
			<tbody>
				{#each { length: 7 } as _}
					<tr>
						<td>
							<div class="skeleton h-20 min-w-[250px]"></div>
						</td>
						<td>
							<div class="skeleton h-20" />
						</td>
						<td>
							<div class="skeleton h-20" />
						</td>
						<td>
							<div class="skeleton h-20" />
						</td>
						<td>
							<div class="skeleton h-20" />
						</td>
						<td>
							<div class="skeleton h-20" />
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
