<script>
// @ts-nocheck

    import { Camera } from "lucide-svelte";

// @ts-nocheck

    export let apartmentNumber;
    export let openModel;
</script>

<div class="flex flex-col md:flex-row md:space-x-5">
    <div class="w-full items-center justify-center text-center relative">
      <div class="pb-5">
        <div class="grid grid-cols-3 gap-4 pt-2">
          <!-- Selected Image Display -->
          <div class="col-span-2 flex justify-center items-center">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div class="group relative inline-block cursor-pointer" on:click={openModel}>

                <img
                  class="rounded-lg transition-all h-auto object-cover"
                  src="{apartmentNumber}/0.jpg"
                  alt=""
                />
                <div 
                class="absolute inset-0 bg-[#C09A5B] opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"
                  ></div>
              </div>
            
          </div>
  
          <!-- Thumbnail Gallery -->
          <div  class="col-span-1 flex flex-col space-y-4 hidden md:block">
              {#each Array(2).fill().map((_, i) => i + 1) as i}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="group relative inline-block cursor-pointer" on:click={openModel}>
                  <img
                    class="h-auto max-w-full rounded-lg transition-all"
                    src={`/${apartmentNumber}/${i}.jpg`}
                    alt=""
                  />
                  <div 
                      class="absolute inset-0 bg-[#C09A5B] opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"
                    ></div>
                </div>
              {/each}
          </div>
        </div>
      </div>
  
      <!-- "View All" Button -->
      <button
        class="inline-flex absolute bottom-10 right-5 mb-0 mr-0 bg-white text-[#C09A5B] px-4 py-2 rounded-lg shadow-md hover:bg-[#C09A5B] hover:text-white transition duration-300"
        on:click={openModel}
      >
        <Camera class="mr-2" /> View all
      </button>
    </div>
  </div>