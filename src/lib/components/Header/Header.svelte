<script lang="ts">
	import {browser} from '$app/environment'
	import {applyAction, enhance} from '$app/forms'
	import {page} from '$app/stores'

	import ThemeToggleIcon from './ThemeToggleIcon.svelte'
	import type {Theme} from '../../../hooks.server'
	import YouTubeIcon from '$lib/icons/youtube.svg?component'
	import {theme} from '$lib/stores/theme'

	$: logoTag = $page.url.pathname === '/' ? 'h1' : 'div'

	const deriveNextTheme = (theme: Theme): Theme => {
		switch (theme) {
			case 'dark':
				return 'light'
			case 'light':
				return 'dark'
			case 'auto':
			default:
				if (!browser) return 'auto'
				return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark'
		}
	}
	$: nextTheme = deriveNextTheme($theme)
</script>

<header class="bg-surface-2">
	<div class="container flex items-center justify-between px-2 py-4">
		<svelte:element this={logoTag}><a href="/">Emoji of the...</a></svelte:element>
		<nav class="flex items-center gap-4">
			<a href="/advice">Advice</a>
			<a href="/about">About</a>
			<a
				href="https://www.youtube.com/@jmagrippis"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="YouTube"
			>
				<YouTubeIcon title="Johnny’s YouTube channel" class="w-7 hover:text-emphasis-hover" />
			</a>
			<form
				method="POST"
				action="/?/theme"
				use:enhance={async () => {
					$theme = nextTheme

					return async ({result}) => {
						await applyAction(result)
					}
				}}
			>
				<input name="theme" value={nextTheme} hidden />
				<button class="w-8">
					<ThemeToggleIcon />
				</button>
			</form>
		</nav>
	</div>
</header>
