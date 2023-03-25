<script lang="ts">
	import type {ActionData, PageData} from './$types'

	export let data: PageData

	export let form: ActionData
</script>

<section class="container grow py-4 px-2 text-xl lg:text-2xl">
	<h1 class="mb-4 text-4xl">Content Creation Advice</h1>
	{#if form?.success}
		<div class="mb-4 flex flex-col gap-4">
			<p class="rounded bg-surface-2 py-4 px-4">{form.question}</p>
			<p class="rounded bg-surface-2 py-4 px-4">{form.answer}</p>
		</div>
	{/if}
	<form method="POST" class="flex max-w-prose flex-col gap-2 lg:gap-4">
		<p>
			Ask famous fictional characters about how to work with the emoji of the day, {data.emoji
				.character}!
		</p>
		<input type="hidden" name="emoji_code" value={data.emoji.code} />
		<label>
			<div class="mb-2">Select who to ask for advice:</div>
			<select
				name="character_id"
				class="w-full rounded-md bg-surface-2 py-2 px-4 ring-inset focus:ring-2 focus:ring-emphasis-hover"
				required
			>
				{#each data.characters as character}
					<option value={character.id}>{character.name} | {character.title} </option>
				{/each}
			</select>
		</label>
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
		<button
			class="relative block w-full rounded bg-gradient-to-br from-primary-400 to-primary-700 px-6 py-4 text-2xl text-white no-underline shadow-low transition-shadow hover:bg-gradient-to-tl hover:shadow-mid active:top-[-1px] md:text-3xl"
			>Ask</button
		>
	</form>
</section>
