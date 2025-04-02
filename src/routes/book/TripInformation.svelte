<script>
// @ts-nocheck


    import { TicketCheck, UserRoundIcon } from "lucide-svelte";
    import { format, isWithinInterval } from 'date-fns';

    
    export let startDate = ""
    export let endDate = ""

    export let adults = 1;
    export let children = 0;
    export let childrenAges = [];
    
    export let bookingReference;


</script>
{#if bookingReference}
<div class="mb-6 flex items-center gap-4 p-5 bg-[#F5F2ED] rounded-lg border-2 border-[#C09A5B]/20 relative">
        <div class="p-3 bg-white rounded-lg shadow-md flex-shrink-0">
            <TicketCheck class="w-8 h-8 text-[#C09A5B]"/>
        </div>
        <div class="space-y-1">
            <p class="text-sm font-medium text-gray-500 tracking-wide">BOOKING REFERENCE</p>
            <div class="flex items-baseline gap-3">
                <p class="text-4xl font-bold tracking-tight" style="color: #C09A5B">{bookingReference}</p>
                <!-- Copy Button -->
                
                <button class="p-1 hover:bg-[#C09A5B]/10 rounded-full transition-colors" title="Copy reference">
                    <svg class="w-5 h-5 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                </button>
            </div>
            <p class="text-sm text-gray-500">An email confirmation will be sent shortly</p>
        </div>
    </div>
    {/if}


<div class="p-5 bg-[#233441]/10 rounded-lg space-y-4">
    <!-- Dates -->
    <div class="grid grid-cols-2 gap-4">
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
    <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center gap-4">
            <div class="p-3 bg-white rounded-lg shadow-md">

                <UserRoundIcon class="w-6 h-6 md:w-6 md:h-6 text-[#C09A5B]" />
            </div>
            <div>
                <p class="text-sm text-gray-500">Guests</p>
                <p class="text-base font-medium space-x-2" style="color: #233441">
                    <span>{adults} Adult{adults > 1 ? "s": ""}</span>
                    {#if children}
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
                        {childrenAges.join(", ")} <span class="text-gray-500 text-sm">Year Old</span>
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