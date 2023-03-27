<script lang="ts">
	export let className: string = ''
</script>

<svg class={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
		opacity=".25"
	/>
	<circle cx="12" cy="2.5" r="1.5" />
</svg>

<style>
	circle {
		transform-origin: center;
		animation: spin 0.75s linear infinite;
	}
	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
</style>
