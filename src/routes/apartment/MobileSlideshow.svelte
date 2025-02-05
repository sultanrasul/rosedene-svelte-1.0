<script>
    // @ts-nocheck
    
    // @ts-ignore
    import Carousel from 'svelte-carousel';
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { currentPageIndex as sharedCurrentPageIndex } from './store';

    
    let currentPageIndex;
    // @ts-ignore
    /**
     * @type {{ goToNext: () => void; goToPrev: (arg0: { animated: boolean; }) => void; }}
     */
    let carousel; // for calling methods of the carousel instance
    export let images = 0;
    export let apartmentNumber;
    
    const handleNextClick = () => {
        // @ts-ignore
        carousel.goToNext()
    };
    


    </script>


       <div class="flex flex-col items-center justify-center z-[1]">
            <!-- Carousel Section -->
            <div class="w-full flex justify-center">
                <div class="max-w-full"> <!-- Center the carousel -->
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <Carousel on:pageChange={event => currentPageIndex = event.detail} bind:this={carousel} arrows={true} dots={false}>
                        <!-- Carousel navigation buttons -->
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div slot="prev" on:click={() => { carousel.goToPrev({ animated: true }) }}>
                            <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#C09A5B] group-hover:bg-[#C09A5B]/80 group-focus:ring-4 group-focus:ring-[#C09A5B]">
                                    <svg class="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                                    </svg>
                                    <span class="sr-only">Previous</span>
                                </span>
                            </button>
                        </div>
    
                        <!-- Carousel slides -->
                        {#each Array(images).fill().map((_, i) => i) as i}
                            <div class="flex justify-center items-center duration-700 ease-in-out" data-carousel-item>
                            <img src={`/${apartmentNumber}/${i}.jpg`} class="rounded-xl  object-contain w-full" alt="...">
                            </div>
                        {/each}
    
                        <!-- Forward button -->
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <div slot="next" on:click={() => { carousel.goToNext({ animated: true }) }}>
                            <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#C09A5B] group-hover:bg-[#C09A5B]/80 group-focus:ring-4 group-focus:ring-[#C09A5B]">
                                    <svg class="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <span class="sr-only">Next</span>
                                </span>
                            </button>
                        </div>
                    </Carousel>
                </div>
            </div>
    
        </div>
    