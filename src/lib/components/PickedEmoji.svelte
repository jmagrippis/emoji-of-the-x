<script lang="ts">
	import ArrowBack from '$lib/icons/arrow-back.svg?component'
	import ArrowForward from '$lib/icons/arrow-forward.svg?component'

	type Emoji = {
		character: string
		name: string
	}
	type Character = {
		name: string
		title: string
	}
	type Quote = {
		content: string
		character: Character | null
	}

	export let emoji: Emoji
	export let quotes: Quote[]
	export let previousPick: string | null
	export let nextPick: string | null
</script>

<section class="flex grow flex-col items-center justify-center gap-8 text-9xl md:gap-12">
	<h2 class="mt-4 text-[65cqw] lg:mt-6 lg:text-[55cqw] xl:text-[45cqw] 2xl:text-[40cqw]">
		{emoji.character}
	</h2>
	<div class="grid w-full grid-cols-12 items-center gap-4 text-center">
		<div class="col-span-2 lg:col-span-3">
			{#if previousPick}
				<a
					href={previousPick}
					class="flex items-center gap-2 text-lg no-underline hover:text-emphasis-hover"
					aria-label="See the previous emoji!"
					><ArrowBack class="w-10 shrink-0" /><span class="hidden sm:inline">previous</span><span
						class="hidden md:inline">emoji</span
					></a
				>
			{/if}
		</div>
		<p class="col-span-8 text-4xl lg:col-span-6">{emoji.name}</p>
		<div class="col-span-2 lg:col-span-3">
			{#if nextPick}
				<a
					href={nextPick}
					class="flex items-center justify-end gap-2 text-lg no-underline hover:text-emphasis-hover"
					aria-label="See the next emoji!"
				>
					<span class="hidden sm:inline">next</span><span class="hidden md:inline">emoji</span>
					<ArrowForward class="w-10 shrink-0" /></a
				>
			{/if}
		</div>
	</div>
	{#each quotes as quote}
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

<style lang="postcss">
	section {
		container-type: inline-size;
	}
</style>
