<script>
  // @ts-nocheck
  import { Banknote, Info, Loader2 } from "lucide-svelte";
  import GuestDetails from "../guestDetails.svelte";
  import NumberTicker from "@/components/NumberTicker.svelte";
  import BlurFade from "@/components/BlurFade.svelte";
  import { calculateRefundableRate } from "../../../calculateApartmentPrice";


  export let displayPrice;
  export let initialPrice;
  export let refundable;
  export let nights;
  export let childrenAges;
  export let startDate;
  export let endDate;
  export let children;
  export let adults;
  export let bookNow;
  export let disabledDates;
  export let bookNowLoading;
  export let loading;
  export let error;
  export let apartmentDetails;
  export let basePrice;
  console.log(apartmentDetails)

</script>

<BlurFade class="w-[28%] text-black self-start sticky top-6 hidden md:block">
    <div class="bg-white border-2 border-gray-100 rounded-xl shadow-xl p-6">
      <!-- Price Display -->
        <div class="mb-6">
          {#if error}
            <BlurFade>
              <div class="flex flex-col items-center justify-center py-2">
                <Info class="w-6 h-6 text-red-500 mb-2" />
                <p class="text-red-500 text-sm text-center">Unable to fetch pricing information</p>
              </div>
            </BlurFade>
            {:else}
          <BlurFade delay={0.2}>
            <div class="flex items-baseline gap-2">
              {#key displayPrice}
                <NumberTicker class="text-4xl font-bold text-[#C09A5B]" duration={1000} initial={initialPrice} value={displayPrice} />
              {/key}
              <span class="text-lg text-gray-500">/{nights} nights</span>
            </div>
          </BlurFade>
          <BlurFade delay={0.4}>

            <div class="flex items-center text-sm text-gray-500 mt-1">
              <Banknote class="w-4 h-4 mr-2 text-[#C09A5B]" />
              <span class="text-sm text-gray-400">Total includes taxes and charges</span>
            </div>
          </BlurFade>
          {/if}
        </div>
      
  
      <!-- Guest Details -->
      <div class="text-black mb-6 hidden md:block z-50">
           <GuestDetails
             apartmentDetails={apartmentDetails}
             delayAnimation={0.5}
             bind:disabledDates={disabledDates}
             bind:childrenAges={childrenAges} 
             bind:startDate={startDate} 
             bind:endDate={endDate} 
             bind:children={children} 
             bind:adults={adults}
             dropdownID={"desktop"}
             bind:loading={loading}
             bind:error={error}
             bind:displayPrice={displayPrice}
             bind:basePrice={basePrice}
             bind:refundable={refundable}
     
          />
        </div>
      <!-- Validation Messages -->
         <div class="space-y-3 mb-6">
           {#if !loading && !error}
             {#if childrenAges.filter(age => age !== -1).length != children}
              <BlurFade>
                <div class="flex items-center text-sm text-red-500">
                  <Info class="w-4 h-4 mr-2" />
                  <span>Please specify ages for all children</span>
                </div>
              </BlurFade>
             {/if}
             
             {#if !(startDate && endDate)}
                <BlurFade>
                  <div class="flex items-center text-sm text-red-500">
                    <Info class="w-4 h-4 mr-2" />
                    <span>Please select your dates</span>
                  </div>
                </BlurFade>
             {/if}
           {/if}
         </div>
  
      <!-- Book Now Button -->
      {#if loading}
      <BlurFade delay={0.6}>
        <button
          class="w-full py-3 rounded-xl font-semibold transition-all duration-200 bg-[#C09A5B]/30 text-gray-400 cursor-not-allowed"
          disabled
        >
          Book Now
        </button>
      </BlurFade>
      {:else if error}
        <BlurFade delay={0.6}>
          <button
            class="w-full py-3 rounded-xl font-semibold transition-all duration-200 bg-[#C09A5B]/30 text-gray-400 cursor-not-allowed"
            disabled
          >
            Unable to Book
          </button>
        </BlurFade>
      {:else if bookNowLoading}
        <button
          class="w-full py-2 rounded-xl font-semibold transition-all duration-200 bg-[#C09A5B]/30 text-gray-400 cursor-not-allowed flex items-center justify-center gap-2"
          disabled
          on:click={bookNow}
        >
        <svg width="50" height="12" fill="#C09A5B" viewBox="0 9 24 6" style="display: inline-block; overflow: visible" xmlns="http://www.w3.org/2000/svg">
          <style>
            .spinner_b2T7{animation:spinner_xe7Q .8s linear infinite}
            .spinner_YRVV{animation-delay:-.65s}
            .spinner_c9oY{animation-delay:-.5s}
            @keyframes spinner_xe7Q{93.75%,100%{r:3px}46.875%{r:.2px}}
          </style>
          <circle class="spinner_b2T7" cx="4" cy="12" r="3"/>
          <circle class="spinner_b2T7 spinner_YRVV" cx="12" cy="12" r="3"/>
          <circle class="spinner_b2T7 spinner_c9oY" cx="20" cy="12" r="3"/>
        </svg>
          Loading
        </button>
      {:else}
      <BlurFade>
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
      </BlurFade>
      {/if}
    </div>
</BlurFade>