<script>
    import { Check } from "lucide-svelte";


    import { amenities } from "../../../amenities";

</script>
<div id="hs-scale-animation-modal" class="hs-overlay hidden fixed inset-0 z-[80] flex items-center justify-center pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="hs-scale-animation-modal-label">
    <div class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 w-full max-w-full sm:max-w-2xl lg:max-w-4xl flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
      <div class="flex justify-between items-center py-3 px-4 border-b border-[#C09A5B]">
        <h3 id="hs-scale-animation-modal-label" class="pt-2 pl-2 font-bold text-[#C09A5B] text-xl">
          All Amenities
        </h3>
        <button type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none" aria-label="Close" data-hs-overlay="#hs-scale-animation-modal">
          <span class="sr-only">Close</span>
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
  
      <!-- All Amenities -->

      <div class="p-5 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {#each amenities as {category, icon, items} }
          <div class="mt-5 text-black">
            <div class="flex items-center font-bold text-xl">
              {#if typeof icon === 'string'}
                {@html `<div class="mr-2">${icon}</div>`}
              {:else}
                <svelte:component this={icon} class="w-6 h-6 mr-2" />
              {/if}
              {category}
            </div>
            <!-- Display items side-by-side on larger screens -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
              {#each items as item}
                <div class="text-black">
                  <p class="inline-flex"><Check class="mr-2" /> {item}</p>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>