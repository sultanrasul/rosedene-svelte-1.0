<script>
	import '../app.css';
	import '@fontsource/merriweather/300.css';
	import '@fontsource/merriweather/400.css';
	import '@fontsource/merriweather/700.css';
	import '@fontsource/merriweather/900.css';
	import { afterNavigate } from "$app/navigation";
	import { onMount } from 'svelte';
	import { Toaster} from 'svelte-sonner'


	import { ModeWatcher, setMode } from 'mode-watcher';

	let lastPath = '';

	setMode('dark');
	afterNavigate(({ to }) => {
		// Only execute if the route actually changed
		if (to?.url.pathname !== lastPath) {
		window.scrollTo(0, 0);
		initFlowbite();
		window.HSStaticMethods.autoInit();
		lastPath = to?.url.pathname || '';
		}
	});

	export const prerender = true;

	import { initFlowbite } from 'flowbite'
  import Navbar from './Navbar.svelte';

	onMount(() => {

		initFlowbite();
		
	})


</script>

<Toaster position="top-right" richColors={true}/>
<ModeWatcher />
<!-- <div class="rrlative mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-sans antialiased sm:py-24"> -->
<div class="">

	<slot></slot>
</div>
