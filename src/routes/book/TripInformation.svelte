<script>
// @ts-nocheck


    import { TicketCheck, UserRoundIcon } from "lucide-svelte";
    import { format, isWithinInterval } from 'date-fns';

    
    export let startDate = ""
    export let refundable;
    export let endDate = ""
    let tooltipText = "Copy reference";
    let active = false;

    export let adults = 1;
    export let children = 0;
    export let childrenAges = [];
    
    export let bookingReference;

    async function copyButton() {
        try {
        await navigator.clipboard.writeText(bookingReference);
        tooltipText = "Copied!";
        active = true;
        // Reset tooltip after 2 seconds
        setTimeout(() => {
            active = false;
            tooltipText = "Copy reference";
        }, 2000);
        } catch (err) {
        console.error('Copy failed:', err);
        tooltipText = "Copy failed!";
        setTimeout(() => tooltipText = "Copy reference", 2000);
        }
    }

    $: normalizedChildrenAges = Array.isArray(childrenAges) ? childrenAges : childrenAges ? [childrenAges] : [];


</script>

<!-- Booking Reference Display -->
<div class=" {bookingReference ? 'block' : 'hidden'} mb-6 flex items-center gap-4 p-5 bg-[#F5F2ED] rounded-lg border-2 border-[#C09A5B]/20 relative">
    <div class="p-3 bg-white rounded-lg shadow-md flex-shrink-0">
        <TicketCheck class="w-8 h-8 text-[#C09A5B]"/>
    </div>
    <div class="space-y-1">
        <p class="text-sm font-medium text-gray-500 tracking-wide">BOOKING REFERENCE</p>
        <div class="flex items-baseline gap-3">
            <p class="text-2xl min-[340px]:text-3xl min-[430px]:text-4xl font-bold tracking-tight" style="color: #C09A5B">
              {bookingReference}
            </p>
            
            <!-- Copy Button with Tooltip -->
            <div class="relative group">
              <button 
                on:click={copyButton}
                class="p-1 hover:bg-[#C09A5B]/10 rounded-full transition-colors relative"
                aria-label="Copy booking reference"
              >
                <svg class="w-5 h-5 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                
                <!-- Tooltip -->
                <span 
                  class="absolute left-1/2 -translate-x-1/2 -translate-y-11 px-2 py-1 
                         bg-gray-800 text-white text-xs rounded-md transition-all
                         duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-12
                         {active ? 'opacity-100 -translate-y-12' : ''}"
                  style="min-width: max-content"
                >
                  {tooltipText}
                  <!-- Tooltip arrow -->
                  <span class="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-gray-800 rotate-45"></span>
                </span>
              </button>
            </div>
          </div>
        <p class="text-sm text-gray-500">An email confirmation will be sent shortly</p>
    </div>
</div>

<!-- Refundable Rate -->
<div class="mt-4 mb-4 flex items-center gap-3 p-4 border rounded-lg shadow-sm"
    class:border-green-300={refundable}
    class:border-red-300={!refundable}
    class:bg-green-50={refundable}
    class:bg-red-50={!refundable}>
    
    <div class="p-2 rounded-full"
            class:bg-green-200={refundable}
            class:bg-red-200={!refundable}>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class:text-green-700={refundable}
        class:text-red-700={!refundable}>
        {#if refundable}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7" />
        {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        {/if}
        </svg>
    </div>

    <div>
        <p class="text-sm font-medium text-gray-700">
        {refundable ? "Refundable Booking" : "Non-Refundable Booking"}
        </p>
        <p class="text-xs text-gray-500 mt-1">
            
            {refundable
            ? "You are eligible for a refund if canceled 2 weeks before your check-in date."
            : "This booking cannot be refunded after cancellation."}
        </p>
    </div>
</div>


<!-- Guest Details they picked from page before -->
<div class="p-5 bg-[#233441]/10 rounded-lg space-y-4">
    <!-- Dates -->
    <div class="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2">
        <div class="flex items-center gap-4">
            <div class="p-3 bg-white rounded-lg shadow-md">
                <svg class="w-6 h-6 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
            </div>
            <div>
                <p class="text-sm text-gray-500">Check-in</p>
                <p class="text-base font-medium" style="color: #233441">{format(startDate, 'd MMM yyyy')}</p>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="p-3 bg-white rounded-lg shadow-md">
                <svg class="w-6 h-6 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
            </div>
            <div>
                <p class="text-sm text-gray-500">Check-out</p>
                <p class="text-base font-medium" style="color: #233441">{format(endDate, 'd MMM yyyy')}</p>
            </div>
        </div>
    </div>

    <!-- Divider -->
    <div class="border-t-2 border-solid border-gray-200"></div>

    <!-- Guests -->
    <div class="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2">
        <div class="flex items-center gap-4">
            <div class="p-3 bg-white rounded-lg shadow-md">

                <UserRoundIcon class="w-6 h-6 md:w-6 md:h-6 text-[#C09A5B]" />
            </div>
            <div>
                <p class="text-sm text-gray-500">Guests</p>
                <p class="text-base font-medium space-x-2" style="color: #233441">
                    <span>{adults} Adult{adults > 1 ? "s": ""}</span>
                    {#if children > 0}
                        <span>•</span>
                        <span>{children} Child{children > 1 ? "ren": ""}</span>
                    {/if}
                </p>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="p-3 bg-white rounded-lg shadow-md">

                <UserRoundIcon class="w-6 h-6 md:w-6 md:h-6 text-[#C09A5B]" />
            </div>
            <div>
                <p class="text-sm text-gray-500">Children Ages</p>
                {#if children > 0}
                    <p class="text-base font-medium space-x-2" style="color: #233441">
                        {normalizedChildrenAges.join(", ")} <span class="text-gray-500 text-sm">Year Old</span>
                    </p>
                {:else}
                    <p class="text-base font-medium space-x-2 text-[#233441]">
                        0 Children
                    </p>
                {/if}
            </div>
        </div>
    </div>
</div>