<script>
  import { onMount } from 'svelte';

  let swiper;
  export let images = 0;
  export let apartmentNumber;

  onMount(() => {
    swiper = new Swiper(".default-carousel", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });
</script>

<div class="w-full relative">
  <div class="swiper default-carousel swiper-container">
    <div class="swiper-wrapper">
      {#each Array.from({ length: images }, (_, i) => i) as i}
        <div class="swiper-slide" key={i}>
          <div class="bg-indigo-50 rounded-2xl flex justify-center items-center relative">
            <img src={`/${apartmentNumber}/${i}.jpg`} alt={`Image ${i + 1}`} class="w-full h-auto object-cover rounded-lg" />
          </div>
        </div>
      {/each}
    </div>
    <!-- Navigation Buttons -->
    <button id="slider-button-left" class="swiper-button-prev group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full absolute top-1/2 left-5 transform -translate-y-1/2 hover:bg-indigo-600" data-carousel-prev>
      <svg class="h-5 w-5 text-indigo-600 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10.0002 11.9999L6 7.99971L10.0025 3.99719" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <button id="slider-button-right" class="swiper-button-next group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full absolute top-1/2 right-5 transform -translate-y-1/2 hover:bg-indigo-600" data-carousel-next>
      <svg class="h-5 w-5 text-indigo-600 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M5.99984 4.00012L10 8.00029L5.99748 12.0028" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    
    <div class="swiper-pagination"></div>
  </div>
</div>

<style>
  .swiper-wrapper {
    width: 100%;
    height: max-content !important;
    position: relative;
  }

  /* Full-width image style */
  .swiper-slide img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  /* Navigation buttons on top of the image */
  .swiper-button-prev, .swiper-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10; /* Ensure buttons are on top of the image */
  }

  .swiper-pagination-bullet {
    background: #4f46e5;
  }
</style>
