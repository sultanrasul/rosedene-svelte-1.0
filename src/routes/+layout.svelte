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
	<div id="dev-banner" class=" relative top-0 left-0 w-full z-50 overflow-hidden ">
		<div class="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 border-t border-purple-400/20 backdrop-blur-lg transform-gpu transition-all duration-700">
			<!-- Animated grid background -->
			<div class="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]">
				<div class="animate-grid-pulse [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(192,154,91,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(192,154,91,0.1)_1px,transparent_1px)] w-full h-full"></div>
			</div>
	
			<!-- Floating particles -->
			<div class="absolute inset-0 overflow-hidden">
				<div class="animate-particle-flow absolute -top-20 left-1/4 w-1 h-1 bg-purple-400 rounded-full shadow-lg"></div>
				<div class="animate-particle-flow absolute -top-40 left-1/3 w-1 h-1 bg-blue-400 rounded-full shadow-lg delay-150"></div>
				<div class="animate-particle-flow absolute -top-20 right-1/4 w-1 h-1 bg-pink-400 rounded-full shadow-lg delay-300"></div>
			</div>
	
			<div class="max-w-[85rem] px-4 py-3 sm:px-6 lg:px-8 mx-auto relative">
				<div class="flex items-center gap-4">
					<!-- Animated DNA-like helix -->
					<div class="relative flex-shrink-0">
						<div class="animate-helix-spin w-8 h-8 border-2 border-purple-400 rounded-full">
							<div class="absolute w-1 h-4 bg-purple-400 left-1/2 -translate-x-1/2 top-0 rounded-full"></div>
							<div class="absolute w-1 h-4 bg-blue-400 left-1/2 -translate-x-1/2 bottom-0 rounded-full"></div>
						</div>
					</div>
	
					<!-- Text Content -->
					<div class="flex-1">
						<p class="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
							<span class="font-bold tracking-wide">CODE IN PROGRESS</span> • 
							<span class="opacity-90">This digital experience is currently being synthesized</span>
						</p>
						<p class="text-xs mt-1 text-purple-200/80">
							<span class="inline-block mr-2">✦ Features evolving daily</span>
							<span class="inline-block">✦ Temporary instability expected</span>
						</p>
					</div>
	
					<!-- Dismiss Button -->
					<button type="button" 
							class="ml-4 p-2 rounded-full hover:bg-purple-800/50 transition-all duration-300 group"
							data-hs-remove-element="#dev-banner">
						<svg class="w-5 h-5 text-purple-300 group-hover:text-purple-100 group-hover:scale-110 transition-transform" 
							 viewBox="0 0 24 24" fill="none" stroke="currentColor" 
							 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M18 6 6 18"/>
							<path d="m6 6 12 12"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	
		<style>
			/* Entrance animation */
			#dev-banner {
				animation: hologram-rise 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
			}
	
			@keyframes hologram-rise {
				0% {
					transform: translateY(100%) skewY(2deg);
					opacity: 0;
				}
				100% {
					transform: translateY(0) skewY(0);
					opacity: 1;
				}
			}
	
			/* Particle animation */
			@keyframes particle-flow {
				to { transform: translateY(-150vh) rotate(180deg); }
			}
			.animate-particle-flow {
				animation: particle-flow 8s linear infinite;
			}
	
			/* Grid pulse */
			@keyframes grid-pulse {
				0%, 100% { opacity: 0.3; }
				50% { opacity: 0.15; }
			}
			.animate-grid-pulse {
				animation: grid-pulse 3s ease-in-out infinite;
			}
	
			/* Helix spin */
			@keyframes helix-spin {
				to { transform: rotate(360deg); }
			}
			.animate-helix-spin {
				animation: helix-spin 8s linear infinite;
			}
	
			/* Custom gradient text */
			.bg-gradient-code-text {
				background-image: linear-gradient(45deg, #8A7BEC 10%, #50B9D1 90%);
			}
		</style>
	</div>
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

	:global(body) {
        touch-action: manipulation;
      }
  </style>