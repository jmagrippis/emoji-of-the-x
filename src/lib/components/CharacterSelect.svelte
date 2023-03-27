<script lang="ts">
	export let characters: {
		id: string
		name: string
		title: string
	}[]
	export let label: string
</script>

<label>
	<div class="mb-2">{label}</div>
	<select
		name="character_id"
		class="w-full rounded-md bg-surface-2 py-2 px-4 ring-inset focus:border-transparent focus:ring-2 focus:ring-emphasis-hover"
		required
	>
		{#each characters as character}
			<option value={character.id}>{character.name} | {character.title} </option>
		{/each}
	</select>
</label>
