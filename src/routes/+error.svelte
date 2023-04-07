<script lang="ts">
	import {page} from '$app/stores'

	$: message = $page.error?.message ?? 'Unknown error, how unexpected!'
</script>

<section class="container flex grow flex-col items-center justify-center px-2 py-4">
	<h1 class="mb-4 text-4xl">We’ve had an error 😱</h1>
	<div class="flex max-w-prose flex-col items-center gap-2 text-xl lg:gap-4 lg:text-2xl">
		{#if message.toLowerCase().includes('not found')}
			<p>We couldn’t find data for <strong>{$page.url.pathname}</strong>...</p>
		{:else}
			<p>{message}</p>
		{/if}
		<p><a href="/">Go back to the homepage?</a></p>
	</div>
</section>
