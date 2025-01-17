
<script>
// @ts-nocheck

    // @ts-ignore
    import Carousel from 'svelte-carousel';
    import { browser } from '$app/environment';
    
    let pagesCount;
    let currentPageIndex
    // @ts-ignore
    /**
     * @type {{ goToNext: () => void; goToPrev: (arg0: { animated: boolean; }) => void; }}
     */
    let carousel; // for calling methods of the carousel instance
    
    const handleNextClick = () => {
      // @ts-ignore
      carousel.goToNext()
    }

    export let images;
  </script>
  
  {#if browser}




    <!-- <Carousel bind:this={carousel} >
        {#each images as image}
        <div class=" duration-700 ease-in-out " data-carousel-item>
            <img src={image.src} class="rounded-2xl" alt="...">
        </div>
        {/each}
        
    </Carousel> -->

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div>

            <Carousel bind:this={carousel} arrows={true} dots={false}>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div slot="prev" on:click={ () => {carousel.goToPrev({ animated: true })} } >
                    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                            </svg>
                            <span class="sr-only">Previous</span>
                        </span>
                    </button>
                </div>
                {#each images as image}
                    <div class="flex justify-center items-center duration-700 ease-in-out" data-carousel-item>
                        <img src={image.src} class="rounded-2xl max-h-[500px] object-contain" alt="...">
                    </div>
                {/each}
                <div slot="next" on:click={ () => {carousel.goToNext({ animated: true })} } >
                    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span class="sr-only">Next</span>
                        </span>
                    </button>
                    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div class="flex space-x-[8px]">
                            {#each images as _, i}
                            <button 
                            type="button" 
                            class="w-3 h-3 rounded-full bg-gray-700 opacity-60 hover:opacity-100 transition-all"
                            aria-current={i === currentPageIndex ? 'true' : 'false'} 
                            aria-label={`Slide ${i + 1}`} 
                            data-carousel-slide-to={i}
                            on:click={() => { carousel.goTo(i) }}
                            ></button>
                            {/each}
                        </div>
                    </div>
                </div>
                
                
            </Carousel>

            <div class="grid grid-cols-5 gap-4 pt-2">
                {#each images as image, i}
                    <div>
                        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                        <img class="h-auto max-w-full rounded-lg cursor-pointer" on:click={() => { carousel.goTo(i) }} src={image.src} alt="">
                    </div>
                {/each}
            </div>
        </div>
            {/if}
            
            