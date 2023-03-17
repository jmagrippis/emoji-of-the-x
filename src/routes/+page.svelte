<script lang="ts">
	import type {PageData} from './$types'

	export let data: PageData
</script>

<section
	class="container flex grow flex-col items-center justify-center gap-8 py-4 px-2 text-9xl lg:gap-12"
>
	<h2 class="text-[65cqw] lg:text-[55cqw]">
		{data.emoji.character}
	</h2>
	<p class="text-4xl">{data.emoji.name}</p>
</section>

<style lang="postcss">
	section {
		container-type: inline-size;
	}
</style>
