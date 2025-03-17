<script lang="ts">
	import { setQuoContext, getQuoContext } from '../test-page/store.svelte'

	setQuoContext()
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
	<pre>
    {JSON.stringify(context, null, 2)}
  </pre>
</div>
