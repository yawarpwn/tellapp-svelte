<script lang="ts">
	import { getQuoContext, setQuoContext } from './store.svelte'
	// import A from './A.svelte'
	// import B from './B.svelte'
	import C from './C.svelte'

	setQuoContext({
		number: 500,
		items: [
			{
				id: 2,
				name: 'Tarea 2'
			}
		]
	})
	const context = getQuoContext()
</script>

<ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box flex-row">
	<li>
		<a href="/test-page">test-page</a>
	</li>
	<li>
		<a href="/test-page-2">test-page2</a>
	</li>
</ul>
<div>
	<div class="card bg-base-300">
		<div class="card-body">
			<pre>
        {JSON.stringify(context, null, 2)}
      </pre>
		</div>
	</div>
</div>

<C />
