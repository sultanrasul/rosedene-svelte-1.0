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
		initFlowbite();
		window.HSStaticMethods.autoInit();
		// Only execute if the route actually changed
		if (to?.url.pathname !== lastPath) {
		window.scrollTo(0, 0);
		lastPath = to?.url.pathname || '';
		}
	});

	export const prerender = true;

	import { initFlowbite } from 'flowbite'
  import Navbar from './Navbar.svelte';
  import Drawer from './Drawer.svelte';

	onMount(() => {

		initFlowbite();
		
	})


</script>

<Toaster position="top-right" richColors={true}/>
<ModeWatcher />
<Drawer/>
<!-- <div class="rrlative mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-sans antialiased sm:py-24"> -->
<div class="">

	<slot></slot>
</div>


<style>
    :global(.swiper-pagination-bullet) {
      background: #C09A5B !important;
      opacity: 0.5 !important;
      width: 10px;
      height: 10px;
    }
    
    :global(.swiper-pagination-bullet-active) {
      opacity: 1 !important;
      background: #C09A5B !important;
    }
  </style>