<script>
    // @ts-nocheck
    
    // @ts-ignore
    import Carousel from 'svelte-carousel';
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { currentPageIndex as sharedCurrentPageIndex } from './store';
    import { json } from '@sveltejs/kit';
    
    let currentPageIndex;
    // @ts-ignore
    /**
     * @type {{ goToNext: () => void; goToPrev: (arg0: { animated: boolean; }) => void; }}
     */
    let carousel; // for calling methods of the carousel instance
    export let images = 0;
    export let apartmentNumber;
    let loaded;
    
    const handleNextClick = () => {
        // @ts-ignore
        if (carousel) {
            carousel.goToNext();
        }
    };

      let carouselData = {
        "loadingClasses": "opacity-0",
        "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500",
        // "isSnap": true
      }

      let data = { "loadingClasses": "opacity-0", "slidesQty": { "xs": 1, "lg": 3 }, "isCentered": true, "isSnap": true }

    
    
    </script>
    
    <!-- Slider -->
    <div id="snap" data-carousel={JSON.stringify(data)} class="relative w-full" >
      <div class="carousel flex vertical-scrollbar snap-x snap-mandatory overflow-x-auto">
        <div class="carousel-body h-full gap-2 opacity-0">

        <div class="carousel-slide snap-center">
          <div class="bg-base-200 flex h-full justify-center ">
            <img src="/10/0.jpg" alt="test"
                 class="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>
        <div class="carousel-slide snap-center">
          <div class="bg-base-200 flex h-full justify-center ">
            <img src="/10/1.jpg" alt="test"
                 class="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>
        <div class="carousel-slide snap-center">
          <div class="bg-base-200 flex h-full justify-center ">
            <img src="/10/2.jpg" alt="test"
                 class="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>
        <div class="carousel-slide snap-center">
          <div class="bg-base-200 flex h-full justify-center ">
            <img src="/10/3.jpg" alt="test"
                 class="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>
        <div class="carousel-slide snap-center">
          <div class="bg-base-200 flex h-full justify-center ">
            <img src="/10/4.jpg" alt="test"
                 class="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>
        <div class="carousel-slide snap-center">
          <div class="bg-base-200 flex h-full justify-center ">
            <img src="/10/5.jpg" alt="test"
                 class="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>
        <div class="carousel-slide snap-center">
          <div class="bg-base-200 flex h-full justify-center ">
            <img src="/10/6.jpg" alt="test"
                 class="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>
        <div class="carousel-slide snap-center">
          <div class="bg-base-200 flex h-full justify-center ">
            <img src="/10/7.jpg" alt="test"
                 class="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>

        </div>
      </div>
    
      <!-- Previous Slide -->
      <button type="button" class="carousel-prev">
        <span class="size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow">
          <span class="icon-[tabler--chevron-left] size-5 cursor-pointer rtl:rotate-180"></span>
        </span>
        <span class="sr-only">Previous</span>
      </button>
      <!-- Next Slide -->
      <button type="button" class="carousel-next">
        <span class="sr-only">Next</span>
        <span class="size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow">
          <span class="icon-[tabler--chevron-right] size-5 cursor-pointer rtl:rotate-180"></span>
        </span>
      </button>
    </div>
<!-- End Slider -->
