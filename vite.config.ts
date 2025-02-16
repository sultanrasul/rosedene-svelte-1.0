import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		// host: '192.168.178.79', 
		host: '192.168.178.105', 
	  },
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep','flowbite', 'preline']
	}
});
