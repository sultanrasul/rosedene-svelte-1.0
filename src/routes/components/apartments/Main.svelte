<script>
// @ts-nocheck

  import { browser } from '$app/environment';

  // @ts-nocheck
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';
  import { apartments } from '../../apartments';
  import Card from './Card.svelte';
  import BlurFade from '@/components/BlurFade.svelte';
  import WordPullUp from '@/components/WordPullUp.svelte';
  import GradualSpacing from '@/components/GradualSpacing.svelte';

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
  export let images = 4;
  export let apartmentNumber = 1;

  const apartmentsEntries = Object.entries(apartments);

  </script>



{#if browser}

<div class="relative pt-16 px-4 sm:px-8 md:px-20 lg:px-40 w-full overflow-x-hidden bg-[#233441]">
      <!-- Background Layers -->
      <div class="absolute inset-0 z-0">
        <!-- Primary Background -->
        <img 
            src={"/clouds.png"}
            alt="Scenic background"
            class="w-full h-full object-cover opacity-30 transition-opacity duration-1000"
            style="mask-image: linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%);"
        />

        <!-- Gradient Transition Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#233441] via-[#233441]/40 to-transparent"
             style="top: 55%"></div>

        <!-- Edge Blur Effect -->
        <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#233441] via-[#233441]/70 to-transparent backdrop-blur-[2px]"></div>
    </div>
  
  <!-- Gradient Overlay (Smooth Transition Effect) -->

  <div class="relative flex flex-col max-[498px]:items-center sm:flex-row sm:justify-between items-center mb-4 z-50 gap-4 max-[498px]:gap-2">
    <GradualSpacing
      class="text-4xl max-[400px]:text-3xl max-[330px]:text-2xl font-bold text-[#C09A5B] text-center max-[498px]:order-1"
      words="View All 10 Apartments"
    />
    
    <div class="flex max-[498px]:order-2 max-[498px]:justify-center max-[498px]:mt-2">
      <!-- Previous Button -->
      <button 
        type="button" 
        class="button-prev flex items-center justify-center h-full px-4 disabled:opacity-50 disabled:cursor-default cursor-pointer group focus:outline-none"
      >
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C09A5B] group-hover:bg-[#C09A5B]/80 group-focus:ring-4 group-focus:ring-[#C09A5B] group-disabled:opacity-50">
          <svg class="w-3 h-3 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      
      <!-- Next Button -->
      <button 
        type="button" 
        class="button-next flex items-center justify-center h-full px-4 disabled:opacity-50 disabled:cursor-default cursor-pointer group focus:outline-none"
      >
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C09A5B] group-hover:bg-[#C09A5B]/80 group-focus:ring-4 group-focus:ring-[#C09A5B] group-disabled:opacity-50">
          <svg class="w-3 h-3 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
  </div>

  <swiper-container  
      free-mode={true}
      keyboard={true}
      space-between={16}
      slides-per-view="auto"
      navigation-next-el=".button-next"
      navigation-prev-el=".button-prev"
      on:swiperprogress={(e) => progress = e.detail[1]}
      on:swiperslidechange={() => console.log('slide changed')}
      class="!overflow-visible"
  >
    {#each apartmentsEntries as [key, apartment], i}
      <swiper-slide key={key}>
          <div>
              <BlurFade delay={i * 0.1/45} > 
                  <Card 
                      apartmentName={apartment.name} 
                      price={159} 
                      nights={2} 
                      apartmentNumber={key}
                  />
              </BlurFade>
          </div>
      </swiper-slide>
    {/each}
  </swiper-container>
</div>
{/if}

<style>
  swiper-container {
        --swiper-scrollbar-size: 0;
        padding: 1rem 0;
    }

    swiper-slide {
        width: auto !important;
        height: auto !important;
        flex-shrink: 0;
    }
  :global(.swiper-pagination-bullet) {
    background: #C09A5B !important;
    opacity: 0.5 !important;
    width: 10px;
    height: 10px;
  }
  
  :global(.swiper-pagination-bullet-active) {
    opacity: 1 !important;
    background: #C09A5B !important;
  }
</style>