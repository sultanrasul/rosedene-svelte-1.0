<script>
    // @ts-nocheck
        // @ts-ignore
        import { BedDouble, Wifi, UtensilsCrossed, Ruler, TvMinimal, User } from "lucide-svelte";
        import { apartments } from '../apartments.js';
        import Slideshow from "../apartment/components/mobile/Slideshow.svelte";
    
        export let price; // Default price
        export let nights;
        export let apartmentNumber;
        export let loading;
        export let error;
        export let refundable;
    
        // @ts-ignore
        export let apartmentDetails;
    </script>
    
    <div class="flex flex-col rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
        <!-- Image Section with Rating -->
        <Slideshow apartmentNumber={apartmentNumber} images={apartmentDetails?.amountOfPictures}/>
    
        <!-- Content Section -->
        <div class="flex-1 flex flex-col p-6 space-y-3 bg-white">
            <!-- Header Section -->
            <div>
                <h3 class="text-2xl font-bold text-[#C09A5B] mb-2">{apartmentDetails?.name}</h3>
            </div>
    
            <!-- Price Breakdown -->
            <div class="pt-4">
                {#if price}
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400 dark:text-gray-600 text-sm">£{(price/nights).toFixed(2)} x {nights} nights</span>
                            <span class="text-gray-300 dark:text-gray-700">£{price}</span>
                        </div>
                        <div class="flex justify-between items-center border-t pt-3 border-gray-200">
                            <span class="font-bold text-[#C09A5B]">Total (GBP)</span>
                            <span class="text-2xl font-bold text-[#C09A5B]">£{price}</span>
                        </div>
                    </div>
                {:else}
                    <!-- Price Loading Skeleton -->
                    <div class="space-y-3 animate-pulse">
                        <div class="flex justify-between items-center">
                            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div class="flex justify-between items-center pt-3">
                            <div class="h-6 bg-gray-200 rounded w-1/4"></div>
                            <div class="h-6 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>

<style>

    @keyframes rotate-glow-reverse {
        from { transform: rotate(-360deg); }
        to { transform: rotate(0deg); }
    }
    
    .animate-rotate-glow-reverse {
        animation: rotate-glow-reverse 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
    }
    

    
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.04); opacity: 0.9; }
    }
    
    .animate-pulse {
        animation: pulse 2s ease-in-out infinite;
    }
    
    /* Keep original scrollbar styles */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-thumb { background-color: #C09A5B; border-radius: 4px; }
    ::-webkit-scrollbar-track { background-color: #c0995b7c; border-radius: 4px; }
    
</style>