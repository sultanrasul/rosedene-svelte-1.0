<script>
  // @ts-nocheck
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';
  import { apartments } from '../../apartments';
  import { BedDouble, Wifi, UtensilsCrossed, Ruler, TvMinimal, User, MapPin, Coffee, Check } from "lucide-svelte";
  import BlurFade from '@/components/BlurFade.svelte';

  register();

  export let activeApartmentNumber = "1"; // Default to first apartment
  
  const apartmentsEntries = Object.entries(apartments);
  let activeApartment = apartments[activeApartmentNumber];
  
  // Sample amenities - replace with actual data
  const amenities = [
    { icon: Wifi, label: "Free High-Speed WiFi" },
    { icon: UtensilsCrossed, label: "Fully Equipped Kitchen" },
    { icon: TvMinimal, label: "Smart TV" },
    { icon: Ruler, label: `${activeApartment.sqm}m² Space` },
    { icon: Coffee, label: "Coffee Machine" },
    { icon: BedDouble, label: "Premium Bedding" }
  ];

  const handleApartmentChange = (number) => {
    activeApartmentNumber = number;
    activeApartment = apartments[activeApartmentNumber];
  };
</script>

{#if browser}
<div class="relative px-4 sm:px-8 md:px-20 lg:px-40 w-full overflow-x-hidden bg-[#233441] py-16">
  <!-- Background elements -->
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

  <div class="relative z-50">
    <h2 class="text-4xl max-[489px]:text-2xl font-bold text-[#C09A5B] mb-2">Explore Our Apartments</h2>
    <p class="text-white text-lg max-w-2xl mb-8">Discover the perfect accommodation for your stay with our range of beautifully designed luxury apartments.</p>
    
    <!-- Apartment Selector -->
    <div class="flex flex-wrap gap-2 mb-8">
      {#each apartmentsEntries as [key, apartment]}
        <button 
          class="px-4 py-2 rounded-full text-sm transition-colors duration-200 focus:outline-none whitespace-nowrap {activeApartmentNumber === key ? 'bg-[#C09A5B] text-white' : 'bg-[#1A2733] text-white hover:bg-[#1A2733]/80'}"
          on:click={() => handleApartmentChange(key)}
        >
          {apartment.name.replace('Apartment', '')}
        </button>
      {/each}
    </div>
    
    <BlurFade>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Image -->
        <div class="lg:col-span-2">
          <div class="relative rounded-xl overflow-hidden shadow-xl h-96 md:h-[500px]">
            <img 
              src={`/${activeApartmentNumber}.jpg`} 
              alt={activeApartment.name} 
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div class="absolute top-4 right-4 z-20 bg-gray-800/50 px-3 py-1 rounded-full text-sm text-white flex items-center gap-1 backdrop-blur-sm">
              <svg class="w-4 h-4 fill-current text-[#C09A5B]" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span>4.8</span>
              <span class="text-gray-300">(127)</span>
            </div>
          </div>
        </div>
        
        <!-- Details Panel -->
        <div class="bg-[#1A2733] rounded-xl p-6 shadow-xl flex flex-col">
          <h3 class="text-3xl font-bold text-[#C09A5B] mb-4">{activeApartment.name}</h3>
          
          <div class="flex items-center gap-2 mb-4">
            <MapPin size="18" class="text-[#C09A5B]" />
            <span class="text-white">Prime Location, City Center</span>
          </div>
          
          <!-- Key Features -->
          <div class="flex flex-wrap gap-x-6 gap-y-3 mb-6">
            <div class="flex items-center gap-2">
              <User size="20" class="text-[#C09A5B]" />
              <span class="text-white">{activeApartment.maxGuests} Guests</span>
            </div>
            
            <div class="flex items-center gap-2">
              <BedDouble size="20" class="text-[#C09A5B]" />
              {#if activeApartment.bedrooms === 0}
                <span class="text-white">Studio</span>
              {:else}
                <span class="text-white">{activeApartment.bedrooms} Bedroom{activeApartment.bedrooms > 1 ? "s" : ""}</span>
              {/if}
            </div>
            
            <div class="flex items-center gap-2">
              <Ruler size="20" class="text-[#C09A5B]" />
              <span class="text-white">{activeApartment.sqm}m²</span>
            </div>
          </div>
          
          <p class="text-gray-300 mb-6">
            {activeApartment.description || "Experience luxury living in our meticulously designed apartment. Featuring high-end finishes, modern furnishings, and all the amenities you need for a comfortable stay. Perfect for both business and leisure travelers seeking a premium accommodation experience."}
          </p>
          
          <!-- Amenities -->
          <h4 class="text-xl font-semibold text-white mb-3">Amenities</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {#each amenities as amenity}
              <div class="flex items-center gap-2">
                <svelte:component this={amenity.icon} size="18" class="text-[#C09A5B]" />
                <span class="text-white text-sm">{amenity.label}</span>
              </div>
            {/each}
          </div>
          
          <!-- Pricing and CTA -->
          <div class="mt-auto">
            <div class="flex justify-between items-center mb-4">
              <div>
                <span class="text-3xl font-bold text-white">€159</span>
                <span class="text-gray-400">/night</span>
              </div>
              
              <button 
                on:click={() => { window.location.href = `/apartment?number=${activeApartmentNumber}`; }}
                class="px-6 py-3 text-sm font-semibold text-center text-white bg-[#C09A5B] rounded-lg 
                      hover:bg-[#B08A4F] transition-colors duration-200 transform">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </BlurFade>
    
    <!-- Additional Image Gallery (Optional) -->
    <div class="mt-8">
      <swiper-container
        free-mode={true}
        space-between={12}
        slides-per-view="auto"
        class="!overflow-visible"
      >
        {#each [1, 2, 3, 4, 5] as index}
          <swiper-slide>
            <!-- These would be additional apartment images -->
            <div class="w-48 h-32 rounded-lg overflow-hidden shadow-md cursor-pointer">
              <img 
                src={`/${activeApartmentNumber}/${index}.jpg`} 
                alt={`${activeApartment.name} view ${index}`}
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </swiper-slide>
        {/each}
      </swiper-container>
    </div>
  </div>
</div>
{/if}

<style>
  swiper-slide {
    width: auto !important;
    height: auto !important;
    flex-shrink: 0;
  }
</style>