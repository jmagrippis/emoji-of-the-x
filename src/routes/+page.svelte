<script lang="ts">
	import type {PageData} from './$types'

	export let data: PageData
</script>

{#if data.emoji}
	<section
		class="container flex grow flex-col items-center justify-center gap-8 py-4 px-2 text-9xl md:gap-12"
	>
		<h2 class="text-[65cqw] lg:text-[55cqw] xl:text-[45cqw] 2xl:text-[40cqw]">
			{data.emoji.character}
		</h2>
		<p class="text-4xl">{data.emoji.name}</p>
		{#each data.quotes as quote}
			<figure class="flex flex-col gap-4">
				<blockquote class="text-xl leading-8 lg:text-2xl lg:leading-10">
					<p>
						{quote.content}
					</p>
				</blockquote>
				<figcaption class="flex gap-2 text-base">
					<div>-</div>
					{#if quote.character}
						<div>{quote.character.name}</div>
						<div class="text-copy-muted">({quote.character.title})</div>
					{:else}
						<div>unknown</div>
					{/if}
				</figcaption>
			</figure>
		{/each}
	</section>
{:else}
	<section>No emoji for today! Please try again shortly!</section>
{/if}

<style lang="postcss">
	section {
		container-type: inline-size;
	}
</style>
