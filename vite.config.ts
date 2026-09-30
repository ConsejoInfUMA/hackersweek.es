import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit({
      // See https://svelte.dev/docs/kit/adapters for more information about adapters.
      adapter: adapter({
        fallback: '404.html'
      }),

      extensions: ['.svelte', '.svx'],

      paths: {
        base: process.argv.includes('dev') ? '' : process.env.BASE_PATH as '/'
      },

      // Consult https://svelte.dev/docs/kit/integrations
      // for more information about preprocessors
      preprocess: mdsvex({
        layout: {
          article: path.join(import.meta.dirname, './src/lib/layouts/ArticleLayout.svelte'),
          main: path.join(import.meta.dirname, './src/lib/layouts/MainLayout.svelte')
        }
      })
    })
  ],
	build: {
		target: 'esnext'
	}
});
