<script lang="ts">
	import PickedEmoji from '$lib/components/PickedEmoji.svelte'
	import type {PageData} from './$types'

	export let data: PageData
</script>

<div class="container flex grow flex-col gap-8 px-2 py-8">
	{#if data.emoji}
		<PickedEmoji
			emoji={data.emoji}
			quotes={data.quotes}
			previousPick={data.previousPick}
			nextPick={data.nextPick}
		/>
		<p>
			You may ask other characters for a quote, but only about the <a href="/">Emoji of the Day</a>!
		</p>
	{:else}
		<section>We somehow could not find an emoji for this date...</section>
	{/if}
</div>
