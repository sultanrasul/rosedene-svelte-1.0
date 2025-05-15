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
	afterNavigate(() => {
		if (typeof initFlowbite === 'function') {
			initFlowbite();
		}

		// Init Preline
		if (window?.HSStaticMethods?.autoInit) {
			requestAnimationFrame(() => {
				window.HSStaticMethods.autoInit();
			});
		}

	});



	import { initFlowbite } from 'flowbite'
	import Navbar from './Navbar.svelte';
	import Drawer from './Drawer.svelte';
	import Footer from './Footer.svelte';

	onMount(() => {
		if (typeof initFlowbite === 'function') {
			initFlowbite();
		}

		// Init Preline
		if (window?.HSStaticMethods?.autoInit) {
			requestAnimationFrame(() => {
				window.HSStaticMethods.autoInit();
			});
		}

		
	})

	export const prerender = false;
	export const ssr = false;

</script>

<Drawer/>
<Toaster position="top-right" richColors={true}/>
<ModeWatcher />
<!-- <div class="rrlative mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-sans antialiased sm:py-24"> -->

<!-- Uncomment below to show the website again -->
<slot></slot> 

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

	:global(body) {
        touch-action: manipulation;
      }
  </style>