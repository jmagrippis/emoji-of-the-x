<script lang="ts">
	import {enhance} from '$app/forms'
	import BigButton from '$lib/components/BigButton.svelte'
	import CharacterSelect from '$lib/components/CharacterSelect.svelte'
	import PickedEmoji from '$lib/components/PickedEmoji.svelte'
	import Spinner from '$lib/components/Spinner.svelte'
	import type {PageData} from './$types'

	export let data: PageData

	let formState: 'idle' | 'loading' | 'success' | 'error' = 'idle'
</script>

<div class="container flex grow flex-col gap-8 px-2 py-8">
	{#if data.emoji}
		<PickedEmoji
			emoji={data.emoji}
			quotes={data.quotes}
			previousPick={data.previousPick}
			nextPick={null}
		/>

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
