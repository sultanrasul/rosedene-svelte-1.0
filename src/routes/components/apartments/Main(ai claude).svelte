<script>
  // @ts-nocheck
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';
  import { apartments } from '../../apartments';
  import BlurFade from '@/components/BlurFade.svelte';
  
  register();
  
  let progress;
  let activeIndex = 0;
  let swiperInstance;
  
  const onProgress = (e) => {
    progress = e.detail[1];
  };
  
  const onSlideChange = (e) => {
    if (swiperInstance) {
      activeIndex = swiperInstance.activeIndex;
    }
  };
  
  onMount(() => {
    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl) {
      swiperInstance = swiperEl.swiper;
    }
  });
  
  const apartmentsEntries = Object.entries(apartments);
  
  function viewApartmentDetails(apartmentNumber) {
    window.location.href = `/apartment?number=${apartmentNumber}`;
  }
</script>

{#if browser}
<div class="relative px-4 sm:px-8 md:px-20 lg:px-40 w-full overflow-x-hidden bg-[#233441] pt-10 pb-16">
  <!-- Background Layers -->
  <div class="absolute inset-0 z-0">
    <img 
      src={"/clouds.png"}
      alt="Scenic background"
      class="w-full h-full object-cover opacity-30 transition-opacity duration-1000"
      style="mask-image: linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%);"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-[#233441] via-[#233441]/40 to-transparent"
         style="top: 55%"></div>
    <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#233441] via-[#233441]/70 to-transparent backdrop-blur-[2px]"></div>
  </div>

  <!-- Featured Apartment Section Header -->
  <div class="relative flex justify-between items-center mb-4 z-50">
    <div>
      <h2 class="text-4xl max-[489px]:text-2xl font-bold text-[#C09A5B]">Luxury Apartments</h2>
      <p class="text-white/80 mt-1 max-w-lg">Discover our collection of 10 thoughtfully designed spaces for your perfect stay</p>
    </div>

    <div class="flex gap-2">
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

  <!-- Main Carousel -->
  <div class="relative z-10">
    <swiper-container  
      free-mode={false}
      keyboard={true}
      space-between={16}
      slides-per-view="auto"
      navigation-next-el=".button-next"
      navigation-prev-el=".button-prev"
      on:swiperprogress={onProgress}
      on:swiperslidechange={onSlideChange}
      class="!overflow-visible"
      centeredSlides={true}
      loop={true}
      effect="coverflow"
      coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2, slideShadows: false }}
    >
      {#each apartmentsEntries as [key, apartment], i}
        <swiper-slide key={key}>
          <div class={`transition-all duration-300 ${activeIndex === i ? 'scale-100' : 'scale-90 opacity-70'}`}>
            <BlurFade>
              <div class="flex flex-col cursor-pointer w-[360px] h-[500px] rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden snap-center group relative">
                <img 
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={`/${key}.jpg`} 
                  alt={apartment.name}
                  loading="lazy"
                />
                
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/20"></div>
                
                <div class="absolute top-4 right-4 z-20 bg-gray-800/50 px-3 py-1 rounded-full text-sm text-white flex items-center gap-1 backdrop-blur-sm">
                  <svg class="w-4 h-4 fill-current text-[#C09A5B]" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span>4.8</span>
                  <span class="text-gray-300">(127)</span>
                </div>
                
                <div class="absolute bottom-0 left-0 right-0 p-6 space-y-3 text-white z-20">
                  <div class="space-y-2">
                    <h3 class="text-2xl font-bold leading-tight">{apartment.name.replace('Apartment','')}</h3>
                    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#C09A5B]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        <span>{apartment.maxGuests} Guests</span>
                      </div>
                      
                      <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#C09A5B]"><path d="M2 2v5"></path><path d="M19 20h5"></path><path d="M22 2h-5"></path><path d="M17 22h5"></path><path d="M2 22h5"></path><path d="M2 12h20"></path><path d="M2 2h20v20H2z"></path></svg>
                        <span>{apartment.size} m²</span>
                      </div>
                      
                      <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#C09A5B]"><path d="M20 10V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v3"></path><path d="M2 18v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"></path><path d="M4 14h16a2 2 0 0 1 2 2v2H2v-2a2 2 0 0 1 2-2Z"></path></svg>
                        {#if apartment.bedrooms == 0}
                          <span>Studio</span>
                        {:else}
                          <span>{apartment.bedrooms} Bedroom{apartment.bedrooms > 1 ? "s": ""}</span>
                        {/if}
                      </div>
                    </div>
                    
                    <div class="pt-3 mt-2">
                      <p class="text-white/80 text-sm line-clamp-2 mb-4">
                        {apartment.description || "Experience luxury and comfort in our perfectly situated apartment with stunning views and modern amenities."}
                      </p>
                      
                      <div class="flex items-center justify-between">
                        <div>
                          <span class="text-[#C09A5B] font-bold text-2xl">€159</span>
                          <span class="text-white/70 text-sm">/night</span>
                        </div>
                        
                        <button 
                          on:click={() => viewApartmentDetails(key)}
                          class="py-2 px-4 text-sm font-semibold text-center text-white bg-[#C09A5B] rounded-lg 
                                hover:bg-[#B08A4F] transition-colors duration-200 transform group-hover:scale-[1.02]">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </swiper-slide>
      {/each}
    </swiper-container>
  </div>
  
  <!-- Quick Preview of Active Apartment -->
  {#if apartmentsEntries[activeIndex]}
    {@const [key, activeApartment] = apartmentsEntries[activeIndex]}
    <div class="relative z-20 mt-8 mx-auto max-w-4xl bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 text-white">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-[#C09A5B] mb-2">Apartment Highlights</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#C09A5B]"><rect width="20" height="12" x="2" y="6" rx="2"></rect><circle cx="12" cy="12" r="2"></circle></svg>
              <span>Smart TV</span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#C09A5B]"><path d="M6 18h8"></path><path d="M15 18h3"></path><path d="M12 8v10"></path><path d="M20.5 8h-17"></path><path d="M20.5 12h-5"></path><path d="M4 12h8"></path><path d="M15.5 3l-4.5 5 4.5 5"></path></svg>
              <span>Free WiFi</span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#C09A5B]"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path><line x1="6" x2="18" y1="17" y2="17"></line></svg>
              <span>Air Conditioning</span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#C09A5B]"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a1.98 1.98 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"></path><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"></path></svg>
              <span>Full Kitchen</span>
            </div>
          </div>
        </div>
        
        <div class="flex-1">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-xl font-bold text-[#C09A5B]">Availability</h3>
            <p class="text-white/80 text-sm">From €159/night</p>
          </div>
          <button 
            on:click={() => viewApartmentDetails(key)}
            class="w-full py-3 text-sm font-semibold text-center text-white bg-[#C09A5B] rounded-lg 
                    hover:bg-[#B08A4F] transition-colors duration-200 mb-2">
            Check Availability & Book
          </button>
          <p class="text-white/60 text-xs text-center">Free cancellation up to 48 hours before arrival</p>
        </div>
      </div>
    </div>
  {/if}
</div>
{/if}

<style>
  swiper-container {
    --swiper-scrollbar-size: 0;
    padding: 1rem 0 2rem 0;
  }

  swiper-slide {
    width: auto !important;
    height: auto !important;
    flex-shrink: 0;
    transition: all 0.3s ease;
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