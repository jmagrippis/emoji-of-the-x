<script lang="ts">
	import {enhance} from '$app/forms'
	import BigButton from '$lib/components/BigButton.svelte'
	import CharacterSelect from '$lib/components/CharacterSelect.svelte'
	import Spinner from '$lib/components/Spinner.svelte'
	import type {ActionData, PageData} from './$types'

	export let data: PageData

	export let form: ActionData

	let formState: 'idle' | 'loading' | 'success' | 'error' = 'idle'
</script>

<section class="container grow px-2 py-4 text-xl lg:text-2xl">
	<h1 class="mb-4 text-4xl">Content Creation Advice</h1>
	{#if form?.question && form?.answer}
		<div class="mb-4 flex flex-col gap-4">
			<p class="self-end rounded bg-surface-3 px-4 py-4">{form.question}</p>
			<p class="max-w-prose self-start rounded bg-surface-2 px-4 py-4">{form.answer}</p>
			{#if form?.art}
				<img src={form.art.src} alt={form.art.title} class="shadow self-start rounded" />
				<p class="max-w-prose self-start rounded bg-surface-2 px-4 py-4">
					👆 This sketch should help 🤞
				</p>
			{/if}
		</div>
	{/if}
	<form
		method="POST"
		class="flex max-w-prose flex-col gap-2 lg:gap-4"
		use:enhance={() => {
			formState = 'loading'

			return async ({result, update}) => {
				formState = result.type === 'error' ? 'error' : 'success'
				update()
			}
		}}
	>
		<p>
			Ask famous fictional characters about how to work with the emoji of the day, {data.emoji
				.character}!
		</p>
		<input type="hidden" name="emoji_code" value={data.emoji.code} />
		<CharacterSelect characters={data.characters} label="Select whom to ask for advice:" />
		<label class="mb-2">
			<span class="mb-2 block">What type of content will you be making?</span>
			<fieldset class="flex flex-col gap-2">
				{#each data.contentTypes as contentType}
					<div class="flex items-center">
						<input
							id={contentType}
							name="content_type"
							type="radio"
							value={contentType}
							class="mr-3 h-4 w-4 focus:ring-emphasis"
							required
						/>
						<label for={contentType} class="capitalize">{contentType}</label>
					</div>
				{/each}
			</fieldset>
		</label>
		<BigButton disabled={formState === 'loading'}>
			{#if formState !== 'loading'}
				Ask!
			{:else}
				<Spinner className="w-8" />
			{/if}
		</BigButton>
	</form>
</section>
