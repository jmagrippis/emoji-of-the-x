<script lang="ts">
	import {enhance} from '$app/forms'
	import BigButton from '$lib/components/BigButton.svelte'
	import CharacterSelect from '$lib/components/CharacterSelect.svelte'
	import Spinner from '$lib/components/Spinner.svelte'
	import type {PageData} from './$types'

	export let data: PageData

	let formState: 'idle' | 'loading' | 'success' | 'error' = 'idle'
</script>

<div class="container flex grow flex-col gap-8 py-8 px-2">
	{#if data.emoji}
		<section class="flex grow flex-col items-center justify-center gap-8 text-9xl md:gap-12">
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
		{#if data.remainingCharacters}
			<section class="text-xl">
				<h2 class="mb-2 text-2xl">Ask another character about {data.emoji.character}!</h2>
				<form
					method="POST"
					action="?/quote"
					class="flex flex-col gap-4"
					use:enhance={() => {
						formState = 'loading'

						return async ({result, update}) => {
							formState = result.type === 'error' ? 'error' : 'success'
							update()
						}
					}}
				>
					<input type="hidden" name="emoji_code" value={data.emoji.code} />
					<CharacterSelect characters={data.remainingCharacters} label="Choose your character:" />
					<BigButton disabled={formState === 'loading'}>
						{#if formState !== 'loading'}
							Ask!
						{:else}
							<Spinner className="w-8" />
						{/if}
					</BigButton>
				</form>
			</section>
		{/if}
	{:else}
		<section>No emoji for today! Please try again shortly!</section>
	{/if}
</div>

<style lang="postcss">
	section {
		container-type: inline-size;
	}
</style>
