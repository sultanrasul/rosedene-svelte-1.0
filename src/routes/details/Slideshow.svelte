  <script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';

  register();

  const spaceBetween = 0;
  let progress;
  const onProgress = (e) => {
    progress = e.detail[1];
  };
  const onSlideChange = (e) => {
    console.log('slide changed')
  }


  
  let swiper;
  export let images = 0;
  export let apartmentNumber;
  let navigationData = {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  }

  </script>



<div class="h-full"> <!-- Added h-full here -->
  <swiper-container 
    class="h-full w-full"
    slides-per-view={1}
    space-between={spaceBetween}
    centered-slides={true}
    pagination={{
      clickable: true,
      el: ".swiper-pagination",
    }}
    navigation={{
      nextEl: '.button-next',
      prevEl: '.button-prev',
    }}
    on:swiperprogress={onProgress}
    on:swiperslidechange={onSlideChange}
    keyboard={true}
  >
    {#each Array.from({ length: images }, (_, i) => i) as i}
      <swiper-slide key={i} class="h-full"> <!-- Added h-full -->
        <img 
          src={`/${apartmentNumber}/${i}.jpg`} 
          alt={`Image ${i + 1}`} 
          class="w-full h-full object-cover rounded-xl" 
        />
      </swiper-slide>
    {/each}
  </swiper-container>
  <!-- Next Button -->
  <button 
    type="button" 
    class="button-next absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 disabled:opacity-50 disabled:cursor-default cursor-pointer group focus:outline-none"
    data-carousel-next
    disabled={progress >= 1}
  >
    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C09A5B] group-hover:bg-[#C09A5B]/80 group-focus:ring-4 group-focus:ring-[#C09A5B] group-disabled:opacity-50">
      <svg class="w-3 h-3 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
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
  <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C09A5B] group-hover:bg-[#C09A5B]/80 group-focus:ring-4 group-focus:ring-[#C09A5B] group-disabled:opacity-50">
    <svg class="w-3 h-3 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
    </svg>
    <span class="sr-only">Previous</span>
  </span>
  </button>

</div>

<style>
  /* Add these styles to ensure Swiper elements respect heights */
  swiper-container {
    --swiper-navigation-size: 24px;
    --swiper-pagination-bottom: 8px;
  }
  swiper-slide {
    height: 100% !important;
  }
</style>


