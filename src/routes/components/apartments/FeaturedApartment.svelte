<script>
    // @ts-nocheck
    import { BedDouble, Wifi, UtensilsCrossed, Ruler, TvMinimal, User, MapPin } from "lucide-svelte";
    
    export let apartmentNumber;
    export let apartment;
    
    // Sample amenities - you should replace with actual data from your apartment object
    const amenities = [
      { icon: Wifi, label: "Free WiFi" },
      { icon: UtensilsCrossed, label: "Fully Equipped Kitchen" },
      { icon: TvMinimal, label: "Smart TV" },
      { icon: Ruler, label: `${apartment.sqm}m² Space` }
    ];
  </script>
  
  <div class="bg-[#1A2733] rounded-xl overflow-hidden shadow-xl">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
      <!-- Image Section -->
      <div class="relative h-64 md:h-full overflow-hidden">
        <img 
          src={`/${apartmentNumber}.jpg`} 
          alt={apartment.name} 
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
      
      <!-- Content Section -->
      <div class="p-6 md:p-8 text-white flex flex-col">
        <h3 class="text-3xl font-bold text-[#C09A5B] mb-2">{apartment.name}</h3>
        
        <div class="flex items-center gap-2 mb-4 text-sm">
          <MapPin size="16" class="text-[#C09A5B]" />
          <span>Central Location, 2 min from Metro</span>
        </div>
        
        <div class="flex items-center gap-4 mb-6">
          <div class="flex items-center gap-2">
            <User size="20" class="text-[#C09A5B]" />
            <span>{apartment.maxGuests} Guests</span>
          </div>
          
          <div class="flex items-center gap-2">
            <BedDouble size="20" class="text-[#C09A5B]" />
            {#if apartment.bedrooms === 0}
              <span>Studio</span>
            {:else}
              <span>{apartment.bedrooms} Bedroom{apartment.bedrooms > 1 ? "s" : ""}</span>
            {/if}
          </div>
        </div>
        
        <p class="text-gray-300 mb-6">
          {apartment.description || "A beautifully designed apartment in the heart of the city. Perfect for both short and long stays, offering comfort and convenience with stunning views."}
        </p>
        
        <div class="grid grid-cols-2 gap-3 mb-6">
          {#each amenities as amenity}
            <div class="flex items-center gap-2">
              <svelte:component this={amenity.icon} size="18" class="text-[#C09A5B]" />
              <span class="text-sm">{amenity.label}</span>
            </div>
          {/each}
        </div>
        
        <div class="mt-auto flex justify-between items-center">
          <div>
            <span class="text-2xl font-bold">€159</span>
            <span class="text-gray-400">/night</span>
          </div>
          
          <button 
            on:click={() => { window.location.href = `/apartment?number=${apartmentNumber}`; }}
            class="px-6 py-3 text-sm font-semibold text-center text-white bg-[#C09A5B] rounded-lg 
                  hover:bg-[#B08A4F] transition-colors duration-200 transform">
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>