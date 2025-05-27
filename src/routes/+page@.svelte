<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
    import Hero from './components/Hero.svelte'
    import Navbar from './Navbar.svelte'
    import Drawer from './Drawer.svelte';
    import DatePicker from './components/DatePicker.svelte';
    import Apartments from './components/apartments/Main.svelte';
    import Location from './components/Location.svelte';
    import ApartmentShowcase from './components/ApartmentShowcase.svelte';
    import Reviews from './components/Reviews.svelte';
    import Footer from './Footer.svelte';
    import Amenities from './components/Amenities.svelte';


    


    function scrollToElementWithOffset(id) {
        const element = document.getElementById(id);
        const yOffset = -100; // Adjust this value as needed
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // export const prerender = true;
</script>

<svelte:head>
	<title>Rosedene Highland House</title>
</svelte:head>

<div id="dev-banner" class="relative top-0 left-0 w-full z-50 overflow-hidden border-b border-[#C09A5B]/20">
    <div class="relative bg-[#233441] backdrop-blur-lg transform-gpu transition-all duration-700">
        <!-- Animated grid background -->
        <div class="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]">
            <div class="animate-grid-pulse [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(192,154,91,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(192,154,91,0.1)_1px,transparent_1px)] w-full h-full"></div>
        </div>

        <div class="max-w-[85rem] px-4 py-1.5 sm:px-6 lg:px-8 sm:py-2 mx-auto relative"> <!-- Reduced vertical padding -->
            <div class="flex items-center gap-2 sm:gap-3 h-6 sm:h-8"> <!-- Fixed height matching helix -->
                <!-- Animated decoration -->
                <div class="relative flex-shrink-0 top-[1px]"> <!-- Fine-tuned vertical alignment -->
                    <div class="animate-helix-spin w-6 h-6 sm:w-8 sm:h-8 border-2 border-[#C09A5B]/50 rounded-full">
                        <div class="absolute w-1 h-3 sm:h-4 bg-[#C09A5B] left-1/2 -translate-x-1/2 top-0 rounded-full"></div>
                        <div class="absolute w-1 h-3 sm:h-4 bg-[#C09A5B]/80 left-1/2 -translate-x-1/2 bottom-0 rounded-full"></div>
                    </div>
                </div>

                <!-- Text Content -->
                <div class="flex-1 min-w-0">
                    <p class="text-[11px] sm:text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#C09A5B] via-[#D4B67E] to-[#C09A5B] leading-tight"> <!-- Smaller text size -->
                        <span class="font-bold tracking-wide uppercase">This website is currently under development</span>
                        <span class="opacity-90">Crafting your perfect digital journey</span>
                    </p>
                </div>

                <!-- Dismiss Button -->
                <button type="button" 
                        class="ml-2 sm:ml-3 p-1 rounded-full hover:bg-[#C09A5B]/20 transition-all duration-300 group"
                        data-hs-remove-element="#dev-banner">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[#C09A5B] group-hover:text-[#C09A5B]/80 group-hover:rotate-90 transition-all" 
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
            animation: hologram-rise 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
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
    </style>
</div>

<!-- Main Menu -->
<div class="relative bg-[#233441]" id="Home">
    <!-- Background Color is now on the parent container -->
    


    <!-- Content Container (now with transparent background) -->
    <div class="min-h-screen bg-[#233441] text-white relative z-10" id="Home">
        <Hero />
        <Apartments />
        <Amenities />
        <Location />
        <Reviews />
        <Footer />
    </div>
</div>