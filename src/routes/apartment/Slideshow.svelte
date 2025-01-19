<script>
    // @ts-nocheck
    
    // @ts-ignore
    import Carousel from 'svelte-carousel';
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { currentPageIndex as sharedCurrentPageIndex } from './store';
    
    let pagesCount;
    let currentPageIndex;
    let screenWidth = 800;
    // @ts-ignore
    /**
     * @type {{ goToNext: () => void; goToPrev: (arg0: { animated: boolean; }) => void; }}
     */
    let carousel; // for calling methods of the carousel instance
    export let images;
    
    const handleNextClick = () => {
        // @ts-ignore
        carousel.goToNext()
    };
    
    const updateWidth = () => {
        screenWidth = window.innerWidth;
    };
    
    onMount(() => {
        currentPageIndex = 0;

        updateWidth(); // Set initial width
        window.addEventListener('resize', updateWidth);
    
        // Cleanup on component destruction
        return () => {
            window.removeEventListener('resize', updateWidth);

        };
        
    });
    </script>


    {#if browser}
        <div class="flex flex-col items-center min-h-screen justify-center">
            <!-- Carousel Section -->
            <div class="w-full flex justify-center">
                <div class="max-w-full" style="max-width: {screenWidth * 0.65}px;"> <!-- Center the carousel -->
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
                        {#each images as image}
                            <div class="flex justify-center items-center duration-700 ease-in-out" data-carousel-item>
                                <img src={image.src} class="rounded-xl max-h-[700px] object-contain w-full" alt="..."> <!-- Set w-full for full width -->
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
    
            <!-- Thumbnails Section (separate from the carousel) -->
            <div class="pt-4 max-h-[300px] overflow-x-auto w-full flex justify-center">
                <div class="flex gap-4">
                    {#each images as image, i}
                        <div class="inline-block">
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                            <img class="h-[120px] w-[120px] object-cover rounded-lg cursor-pointer transition-all"
                                 class:border-4={i === currentPageIndex}
                                 class:border-[#C09A5B]= {i === currentPageIndex} 
                                 class:opacity-100={i === currentPageIndex}
                                 class:opacity-60={i !== currentPageIndex}
                                 on:click={() => { carousel.goTo(i); }} 
                                 src={image.src} alt=""
                            />
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
    