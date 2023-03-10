<script lang="ts">
	import type {PageData} from './$types'

	export let data: PageData
</script>

<section class="container flex grow flex-col items-center justify-center gap-8 py-4 px-2 text-9xl">
	<h2>
		{data.emoji.character}
	</h2>
	<p class="text-4xl">{data.emoji.shortName}</p>
</section>

<style lang="postcss">
	section {
		container-type: inline-size;
	}

	h2 {
		font-size: 60cqw;
	}
</style>
