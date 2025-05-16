<script>
	import '../app.css';
	import '@fontsource/merriweather/300.css';
	import '@fontsource/merriweather/400.css';
	import '@fontsource/merriweather/700.css';
	import '@fontsource/merriweather/900.css';
	import { afterNavigate, onNavigate } from "$app/navigation";
	import { onMount, tick } from 'svelte';
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

	let currentRoute = '';
	let previousRoute = '';
	$: currentRoute = $page.url.pathname;

	let show = true;

	$: if (currentRoute !== previousRoute) {
		console.log(currentRoute)


		transitionToNewPage();
		previousRoute = currentRoute;
	} else {
		console.log(currentRoute);
	}

	async function transitionToNewPage() {
		console.log(show)

		show = false;          // Hide current content
		await tick();          // Let DOM react
		show = true;           // Show new content
	}



	import { initFlowbite } from 'flowbite'
	import Navbar from './Navbar.svelte';
	import Drawer from './Drawer.svelte';
	import Footer from './Footer.svelte';
	import { page } from '$app/stores';

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
	export const router = false;

</script>

<Drawer/>
<Toaster position="top-right" richColors={true}/>
<ModeWatcher />
<!-- <div class="rrlative mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-sans antialiased sm:py-24"> -->

<!-- Uncomment below to show the website again -->
{#if show}
	<slot></slot> 
{/if}

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