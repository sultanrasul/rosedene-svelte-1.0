import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		// host: '192.168.178.79', 
		// host: '192.168.178.63', 
	  },
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['svelte-sonner']
	},
	optimizeDeps: {
		include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep','flowbite', 'preline']
	}
});
