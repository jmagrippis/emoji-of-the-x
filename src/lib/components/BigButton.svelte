<script lang="ts">
	export let disabled = false
</script>

<button
	{disabled}
	class="relative flex w-full items-center justify-center rounded bg-gradient-to-br from-primary-400 to-primary-700 px-6 py-4 text-2xl text-white no-underline shadow-low transition-shadow hover:bg-gradient-to-tl hover:shadow-mid active:top-[-1px] md:text-3xl"
	><slot /></button
>
