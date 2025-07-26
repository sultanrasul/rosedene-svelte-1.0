<script>
    import { onMount } from 'svelte';
    import { register } from 'swiper/element/bundle';
    import { browser } from '$app/environment';
  
    register();
  
    let progress = 0;
    const spaceBetween = 0;

    export let amountOfPictures;

    /**
   * @type {import("swiper/element/bundle").SwiperContainer}
   */
    let swiperInstance;
    let currentIndex = 0;
  
    const onProgress = (e) => {
        progress = e.detail[1];
    };

    const onSlideChange = (e) => {
      swiperInstance = e.target;
      currentIndex = e.detail[0].activeIndex
    };
  
    /**
   * @param {number} index
   */
    export function goToSlide(index) {
      if (swiperInstance) {
        swiperInstance.swiper.slideTo(index);
      }
    }
  </script>
  
  <!-- Modal Overlay -->
  <div id="hs-scale-animation-modal-slideshow"
    class="hs-overlay hidden fixed inset-0 z-[100] pointer-events-none max-h-[95vh] focus:outline-none [--overlay-backdrop:static]"
    
    role="dialog"
    tabindex="-1"
    aria-labelledby="hs-scale-animation-modal-label"

  >
    <!-- Modal Wrapper -->
    <div
      class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 pointer-events-auto w-full h-full flex flex-col">
  
      <!-- Top Header Bar -->
      <div class="flex justify-between items-center px-6 py-4  backdrop-blur-md z-20">
        <h2 class="text-xl font-semibold text-white-800">Gallery</h2>
        <!-- Close Button -->
        <button type="button" aria-label="Close" 
            class="ml-2 sm:ml-4 p-1 sm:p-2 rounded-full hover:bg-[#C09A5B]/20 transition-all duration-300 group bg-white/80 hover:bg-white text-gray-800"
            data-hs-overlay="#hs-scale-animation-modal-slideshow">
            <svg class="w-7 h-7  text-[#C09A5B] group-hover:text-[#C09A5B]/80 group-hover:rotate-90 transition-all" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
            </svg>
        </button>
      </div>
  
      <!-- Main Image Section -->
      <div class="flex-1 flex items-center justify-center relative overflow-hidden">
        {#if browser}
          <swiper-container

            bind:this={swiperInstance}
            slides-per-view={1}
            space-between={spaceBetween}
            centered-slides={true}
            pagination={{ clickable: true, el: '.swiper-pagination' }}
            navigation={{ nextEl: '.button-next', prevEl: '.button-prev' }}
            on:swiperprogress={onProgress}
            on:swiperslidechange={onSlideChange}
            keyboard={true}
            class="w-full h-full flex items-center justify-center"
          >
            {#each { length: amountOfPictures } as _, i}
              <swiper-slide key={i}>
                <div class="flex justify-center items-center h-full w-full ">
                  <img
                    src={`/gallery/${i+1}.jpg`}
                    alt={`Image ${i + 1}`}
                    class="max-h-full max-w-full object-contain rounded-xl"
                  />
                </div>
              </swiper-slide>
            {/each}
          </swiper-container>
  
          <!-- Navigation Buttons -->
          <button 
                type="button" 
                class="button-next absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 disabled:opacity-50 disabled:cursor-default cursor-pointer group focus:outline-none"
                data-carousel-next
                disabled={progress >= 1}
            >
                <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#C09A5B] group-hover:bg-[#C09A5B]/80 group-focus:ring-4 group-focus:ring-[#C09A5B] group-disabled:opacity-50">
                <svg class="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="sr-only">Next</span>
                </span>
            </button>

            <!-- Previous Button -->
            <button 
                type="button" 
                class="button-prev absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 disabled:opacity-50 disabled:cursor-default cursor-pointer group focus:outline-none"
                data-carousel-prev
                disabled={progress <= 0}    
                >
                <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#C09A5B] group-hover:bg-[#C09A5B]/80 group-focus:ring-4 group-focus:ring-[#C09A5B] group-disabled:opacity-50">
                <svg class="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span class="sr-only">Previous</span>
                </span>
            </button>
  
          <!-- Pagination Dots -->
          <div class="swiper-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 !text-[#C09A5B] z-10"></div>
        {/if}
      </div>
  
      <!-- Thumbnails Section (separate from the carousel) -->
      <!-- <div class="pt-4 overflow-x-auto w-full flex justify-center">
        <div class="flex gap-3 px-4">
          {#each { length: amountOfPictures } as _, i}
            <div class="inline-block">
              <img
                src={`/gallery/${i+1}.jpg`}
                alt={`Thumbnail ${i + 1}`}
                on:click={() => goToSlide(i)}
                class="h-[64px]  object-cover rounded-md cursor-pointer transition-all duration-200
                      hover:opacity-80
                      {i === currentIndex ? 'border-2 border-[#C09A5B] opacity-100' : 'opacity-60'}"
              />
            </div>
          {/each}
        </div>
      </div> -->
  
    </div>
  </div>
  