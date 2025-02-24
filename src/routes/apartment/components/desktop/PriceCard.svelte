<script>
    // @ts-nocheck
    import { Banknote, Info } from "lucide-svelte";
    import GuestDetails from "../guestDetails.svelte";
    import NumberTicker from "@/components/NumberTicker.svelte";
    import { Spinner } from "flowbite-svelte";


    export let displayPrice;
    export let initialPrice;
    export let nights;
    export let childrenAges;
    export let startDate;
    export let endDate;
    export let children;
    export let adults;
    export let bookNow;
    export let disabledDates;
    export let bookNowLoading;
</script>

<div class="w-[28%] text-black self-start sticky top-6 hidden md:block">
    <div class="bg-white border-2 border-gray-100 rounded-xl shadow-xl p-6">
      <!-- Price Display -->
      <div class="mb-6">
        <div class="flex items-baseline gap-2">
          <!-- <NumberTicker value={100} /> -->
          {#key displayPrice}
            <NumberTicker class="text-4xl font-bold text-[#C09A5B]" duration={1000} initial={initialPrice} value={displayPrice} />
          {/key}
          <span class="text-lg text-gray-500">/{nights} nights</span>
        </div>
        <!-- <div class="text-sm text-gray-400 mt-1">Total includes taxes and charges</div> -->
        <div class="flex items-center text-sm text-gray-500 mt-1">
          <Banknote class="w-4 h-4 mr-2 text-[#C09A5B]" />
          <span class="text-sm text-gray-400">Total includes taxes and charges</span>

        </div>
      </div>
      
  
      <!-- Guest Details -->
      <div class="text-black mb-6 hidden md:block ">
        <GuestDetails
          bind:disabledDates={disabledDates}
          bind:childrenAges={childrenAges} 
          bind:startDate={startDate} 
          bind:endDate={endDate} 
          bind:children={children} 
          bind:adults={adults}
          dropdownID={"desktop"}
        />
      </div>
  
      <!-- Validation Messages -->
      <div class="space-y-3 mb-6">
        {#if childrenAges.filter(age => age !== -1).length != children}
          <div class="flex items-center text-sm text-red-500">
            <Info class="w-4 h-4 mr-2" />
            <span>Please specify ages for all children</span>
          </div>
        {/if}
        
        {#if !(startDate && endDate)}
          <div class="flex items-center text-sm text-red-500">
            <Info class="w-4 h-4 mr-2" />
            <span>Please select your dates</span>
          </div>
        {/if}
  

      </div>
  
      <!-- Book Now Button -->
      {#if bookNowLoading}
        <button
          class={`w-full py-3 rounded-xl font-semibold transition-all duration-200 bg-[#C09A5B]/30 text-gray-400 cursor-not-allowed`}
          disabled
          on:click={bookNow}
        >
          <Spinner class="me-3" size="8" color="white" />
          Book Now 
        </button>
        {:else}
          <button 
            class={`w-full py-3 rounded-xl font-semibold transition-all duration-200
              ${(childrenAges.filter(age => age !== -1).length != children) || !(startDate && endDate) ?
                'bg-[#C09A5B]/30 text-gray-400 cursor-not-allowed' :
                'bg-[#C09A5B] hover:bg-[#B08A4F] text-white shadow-md hover:shadow-lg'
              }`}
            disabled={(childrenAges.filter(age => age !== -1).length != children) || !(startDate && endDate)}
            on:click={bookNow}
          >
            Book Now 
          </button>
      {/if}
    </div>
  </div>