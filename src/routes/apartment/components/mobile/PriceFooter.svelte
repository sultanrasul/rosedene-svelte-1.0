<script>
    // @ts-nocheck
    
        import NumberTicker from "@/components/NumberTicker.svelte";
        import { CalendarDays, Info, Loader2 } from "lucide-svelte";
        import { fade } from "svelte/transition";
    
        export let displayPrice;
        export let initialPrice;
        export let nights;
        export let childrenAges;
        export let children;
        export let startDate;
        export let endDate;
        export let bookNow;
        export let bookNowLoading;
        export let loading;
        export let error;
    
          // Scroll and flash logic
        function scrollToGuestDetails() {
            // Scroll to component
            const guestDetails = document.getElementById('guestDetails');
            guestDetails?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
    
            // Flash guest control buttons
            const flashButtons = () => {
    
                const elements = document.querySelectorAll('#flashGuestsInput');
            
                // @ts-ignore
                const flash = (element) => {
                element.style.transition = 'border-color 0.5s ease';
                setTimeout(() => {
                    element.style.borderColor = '#C09A5B';
                    setTimeout(() => {
                    element.style.borderColor = '#e5e7eb';
                    setTimeout(() => {
                        element.style.borderColor = '#C09A5B';
                        setTimeout(() => {
                        element.style.borderColor = '#e5e7eb';
                        }, 400);
                    }, 400);
                    }, 400);
                }, 0);
                };
    
                elements.forEach(flash);
    
            };
    
            // Wait for scroll to complete
            setTimeout(flashButtons, 500);
        }
    </script>
    
    
    <footer transition:fade={{  delay: 300, duration: 800 }} class="fixed bottom-0 left-0 z-20 w-full pl-3 pr-3 pb-3 rounded-t-3xl bg-gray-800 border-t border-t-4 border-l-4 border-r-4 border-[#C09A5B] shadow-2xl flex flex-col gap-2 dark:bg-white transition-all duration-200">
        <!-- Error Messages Container -->
        <div class="w-full space-y-2">
            {#if !loading && !error}
                {#if childrenAges.filter(age => age !== -1).length != children}
                    <div class="w-full flex items-center text-sm text-red-500">
                        <Info class="w-4 h-4 mr-2" />
                        <span>Please specify ages for all children</span>
                    </div>
                {/if}
                
                {#if !(startDate && endDate)}
                    <div class="w-full flex items-center text-sm text-red-500">
                        <Info class="w-4 h-4 mr-2" />
                        <span>Please select your dates</span>
                    </div>
                {/if}
            {/if}
        </div>
    
        <!-- Content Container -->
        <div class="w-full flex items-center justify-between">
            <!-- Price Section -->
            <div class="flex flex-col ">
                {#if loading}

                    <div class="flex items-center h-10">
                        <span class="text-gray-700/80">Checking Availability</span>
          
                        <svg width="50" height="12" fill="#C09A5B" viewBox="0 9 24 6" style="display: inline-block; overflow: visible" xmlns="http://www.w3.org/2000/svg">
                            <style>
                            .spinner_b2T7{animation:spinner_xe7Q .8s linear infinite}
                            .spinner_YRVV{animation-delay:-.65s}
                            .spinner_c9oY{animation-delay:-.5s}
                            @keyframes spinner_xe7Q{93.75%,100%{r:3px}46.875%{r:.2px}}
                            </style>
                            <circle class="spinner_b2T7" cx="4" cy="12" r="3"/>
                            <circle class="spinner_b2T7 spinner_YRVV" cx="12" cy="12" r="3"/>
                            <circle class="spinner_b2T7 spinner_c9oY" cx="20" cy="12" r="3"/>
                        </svg>
                    </div>
                {:else if error}
                    <div class="flex items-center text-lg text-red-500">
                        <Info class="w-4 h-4 mr-2" />
                        <h1>Price unavailable</h1>
                    </div>
                {:else}
                    <div class="flex items-baseline gap-1.5">
                        {#key displayPrice}
                            <NumberTicker class="text-4xl font-bold text-[#C09A5B]" duration={1000} initial={initialPrice} value={displayPrice} />
                        {/key}                  
                        <span class="text-sm text-gray-300 dark:text-gray-500">/{nights} nights</span>
                    </div>
                {/if}
            </div>
    
            <!-- Buttons Section -->
            <div class="flex flex-row max-[420px]:flex-col items-end gap-2 max-[420px]:gap-1">
                <button 
                    on:click={scrollToGuestDetails}
                    class="py-2 px-2 text-xs font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors dark:text-gray-700 dark:bg-gray-100 dark:hover:bg-gray-200 whitespace-nowrap"
                >
                    Booking Details
                </button>
                {#if loading}
                    <button 
                        class='w-full p-[6px] rounded-xl font-semibold transition-all duration-200 bg-[#C09A5B]/30 text-gray-400 cursor-not-allowed'
                        disabled
                    >
                        Book Now
                    </button>
                {:else if error}
                    <button 
                        class='w-full p-[6px] rounded-xl font-semibold transition-all duration-200 bg-[#C09A5B]/30 text-gray-400 cursor-not-allowed'
                        disabled
                    >
                        Unable to Book
                    </button>
                {:else if bookNowLoading}
                    <button 
                        class='w-full p-[6px] rounded-xl font-semibold transition-all duration-200 bg-[#C09A5B]/30 text-gray-400 cursor-not-allowed'
                        disabled
                    >
                    <svg width="80" height="12" fill="#C09A5B" viewBox="0 9 24 6" style="display: inline-block; overflow: visible" xmlns="http://www.w3.org/2000/svg">
                        <style>
                          .spinner_b2T7{animation:spinner_xe7Q .8s linear infinite}
                          .spinner_YRVV{animation-delay:-.65s}
                          .spinner_c9oY{animation-delay:-.5s}
                          @keyframes spinner_xe7Q{93.75%,100%{r:3px}46.875%{r:.2px}}
                        </style>
                        <circle class="spinner_b2T7" cx="4" cy="12" r="3"/>
                        <circle class="spinner_b2T7 spinner_YRVV" cx="12" cy="12" r="3"/>
                        <circle class="spinner_b2T7 spinner_c9oY" cx="20" cy="12" r="3"/>
                      </svg> 
                    </button>
                {:else}
                    <button 
                        class={`w-full p-[6px] rounded-xl font-semibold transition-all duration-200
                            ${childrenAges.filter(age => age !== -1).length != children || !(startDate && endDate) ?
                                'bg-[#C09A5B]/30 text-gray-400 cursor-not-allowed' :
                                'bg-[#C09A5B] hover:bg-[#B08A4F] text-white shadow-md hover:shadow-lg'
                            }`}
                        disabled={(childrenAges.filter(age => age !== -1).length != children) || !(startDate && endDate)}
                        on:click={bookNow}
                    >
                        Book Now
                    </button>
                {/if}
            </div>
        </div>
    </footer>