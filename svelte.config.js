import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use adapter-node instead of adapter-auto for docker deployment
		adapter: adapter({
			// default options are shown
			out: 'build',
			precompress: false,
			envPrefix: '',
			polyfill: true
		})
	}
};

export default config;
