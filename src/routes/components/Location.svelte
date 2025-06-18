<script>
  import BoxReveal from "@/components/BoxReveal.svelte";

    export let city = "Inverness";
    export let tagline = "Gateway to the Scottish Highlands";
    let mapConsent = false;

	function loadMap() {
		mapConsent = true;
	}
</script>



<div class="relative min-h-screen bg-[#233441] overflow-hidden">
    <!-- Background Layers -->
    <div class="absolute inset-0 z-0">
        <!-- Primary Background -->
        <img
            src="/lochness.png"
            alt="Scenic background"
            class="w-full h-full object-cover opacity-40 transition-opacity duration-1000"
            style="mask-image: linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%);"
        />

        <!-- Gradient Transition Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#233441] via-[#233441]/40 to-transparent"
             style="top: 55%"></div>

        <!-- Edge Blur Effect -->
        <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#233441] via-[#233441]/70 to-transparent backdrop-blur-[2px]"></div>
    </div>

    <!-- Content Section -->
    <div class="relative z-20 pt-32 pb-56 px-6 max-w-7xl mx-auto">
        <!-- Animated Content Container -->
        <div class="bg-transition grid lg:grid-cols-2 gap-12 items-start">
            <div class="max-w-3xl">
                <!-- Header -->
                <div class="mb-12 space-y-6">
                    <BoxReveal boxColor={"#C09A5B"} duration={0.5}>
                        <span class="text-[#C09A5B] uppercase tracking-widest text-sm font-medium">
                            Premium Highland Stays
                        </span>
                    </BoxReveal>
                    <BoxReveal boxColor={"#C09A5B"} duration={0.5}>
                        <h1 class="text-5xl md:text-6xl font-bold text-white leading-tight">
                            Discover {city}<br>
                            <span class="text-[#C09A5B]">{tagline}</span>
                        </h1>
                    </BoxReveal>
                </div>

                <!-- Interactive Section -->
                <div class="space-y-8">
                    <!-- <button class="group flex items-center gap-3 px-6 py-4 bg-[#C09A5B]/10 backdrop-blur-sm rounded-xl border border-[#C09A5B]/20 hover:bg-[#C09A5B]/20 transition-all">
                        <svg class="w-6 h-6 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span class="text-white/90 font-medium">Explore Interactive Map</span>
                        <span class="ml-auto text-[#C09A5B] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </button> -->

                    <!-- Description -->
                     <BoxReveal boxColor={"#C09A5B"} duration={0.5}>
                         <p class="text-lg text-white/80 leading-relaxed max-w-2xl">
                             Where misty lochs meet ancient castles. Cruise Loch Ness' mysterious waters, 
                             wander through 14th-century ruins, and savor world-class whisky as the 
                             Highland breeze whispers tales of Norse kings and mythical creatures.
                         </p>
                     </BoxReveal>
                </div>
            </div>

        <!-- Right Column - Location Map -->
         <BoxReveal boxColor={"#C09A5B"} duration={0.5} width="full">
             <div class="bg-[#233441]/50 backdrop-blur-sm rounded-2xl p-4 border border-[#C09A5B]/20 relative">
                 <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                     
                     <div class="text-3xl font-semibold text-white inline-flex">
                         <span>                      
                             <svg class="w-10 h-10 pr-2 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                             </svg>
                         </span>
                         <h3 class="pt-1">Our Location</h3> 
     
                     </div>
                     
                     <!-- Location Badge - Moves to its own line on small screens -->
                     <div class="bg-[#C09A5B]/90 backdrop-blur-sm px-4 py-2 rounded-lg mt-2 sm:mt-0">
                         <p class="text-sm font-medium text-white">Rosedene Highland House</p>
                         <p class="text-xs text-white">IV2 4QW • 18 min walk to City Centre</p>
                     </div>
                 </div>
                 
     
                 <!-- Map Container -->
                <div class="relative h-[500px] rounded-xl overflow-hidden bg-[#1f2d3a] border border-[#C09A5B]/20">
                    <!-- Static Map Background with Blur -->
                    {#if !mapConsent}
                        <img
                            src="/blurred-map.png"
                            alt="Map preview"
                            class="absolute inset-0 w-full h-full object-cover filter blur scale-105 transition duration-500"
                        />
                        <div class="absolute inset-0 flex items-center justify-center text-center px-6 
                                    bg-gradient-to-b from-transparent via-black/30 to-black/50">
                            <div class="space-y-4 max-w-md mx-auto">
                                <p class="text-white text-sm sm:text-base">
                                    This map is provided by Google and may set cookies. By clicking <strong>“Load Map”</strong>, you consent to cookies.
                                </p>

                                <button on:click={loadMap} 
                                        class="px-6 py-2 bg-[#C09A5B] text-white font-semibold rounded-lg 
                                            hover:bg-[#b3874e] transition-all duration-300 
                                            shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                    Load Map
                                </button>
                            </div>
                        </div>
                    {:else}
                        <!-- svelte-ignore a11y_missing_attribute -->
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7372.50179950599!2d-4.2331814622549455!3d57.465740049978514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488f71faaed71d69%3A0xeca808584e8190e2!2sRosedene%20Highland%20House!5e0!3m2!1sen!2suk!4v1741047505489!5m2!1sen!2suk"
                            class="absolute inset-0 w-full h-full border-0 transition-opacity duration-700"
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            allowfullscreen
                        ></iframe>
                    {/if}
                </div>
                    
                 <style>
                     .clip-marker {
                         clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                     }
                 </style>
             </div>
         </BoxReveal>

        </div>
    </div>

    <!-- Bottom Transition Guard -->
    <div class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#233441] to-transparent z-30 pointer-events-none"></div>
</div>

<style>
    .bg-transition {
        animation: smoothReveal 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes smoothReveal {
        0% { 
            opacity: 0;
            transform: translateY(20px);
        }
        100% { 
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Edge smoothing for modern browsers */
    @supports (mask-image: linear-gradient(black, white)) {
        img {
            -webkit-mask-image: linear-gradient(
                to top,
                transparent 0%,
                black 15%,
                black 85%,
                transparent 100%
            );
            mask-image: linear-gradient(
                to top,
                transparent 0%,
                black 15%,
                black 85%,
                transparent 100%
            );
        }
    }
</style>