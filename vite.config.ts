import {sveltekit} from '@sveltejs/kit/vite'
import {defineConfig} from 'vitest/config'
import svg from '@poppanator/sveltekit-svg'

const svgPlugin = svg({
	svgoOptions: {
		multipass: true,
		plugins: [
			{
				name: 'preset-default',
				params: {
					overrides: {
						removeViewBox: false,
					},
				},
			},
			'removeDimensions',
		],
	},
})

export default defineConfig({
	plugins: [sveltekit(), svgPlugin],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
