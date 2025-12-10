import path from 'node:path';
import adapter from '@sveltejs/adapter-static';
import type { Config } from '@sveltejs/kit';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import type { PreprocessorGroup } from 'svelte/compiler';

export default {
	extensions: ['.svelte', '.svx'],

	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex({
		layout: {
			info: path.join(import.meta.dirname, './src/lib/layouts/InfoLayout.svelte')
		}
	}) as PreprocessorGroup],

	kit: {
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		paths: {
			relative: false
		}
	}
} satisfies Config;
