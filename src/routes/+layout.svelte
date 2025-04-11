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
		window.HSStaticMethods.autoInit();

	});

	export const prerender = true;

	import { initFlowbite } from 'flowbite'
  import Navbar from './Navbar.svelte';
  import Drawer from './Drawer.svelte';
  import Footer from './Footer.svelte';

	onMount(() => {
		initFlowbite();
		window.HSStaticMethods.autoInit();

		
	})


</script>

<Toaster position="top-right" richColors={true}/>
<ModeWatcher />
<Drawer/>
<!-- <div class="rrlative mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-sans antialiased sm:py-24"> -->
<div class="">

	<!-- Uncomment below to show the website again -->
	<!-- <slot></slot> --> 
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

	:global(body) {
        touch-action: manipulation;
      }
  </style>