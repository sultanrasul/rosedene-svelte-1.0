<script>
// @ts-nocheck

    // @ts-ignore
    import { BedDouble, Wifi, UtensilsCrossed, Ruler, TvMinimal, User } from "lucide-svelte";
    import { apartments } from '../apartments.js';
    import Slideshow from "../apartment/components/mobile/Slideshow.svelte";

    export let price; // Default price
    export let nights;
    export let apartmentNumber;

    // @ts-ignore
    export let apartmentDetails;
</script>

<div class="flex flex-col  rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ">
    <!-- Image Section with Rating -->
     <Slideshow apartmentNumber={apartmentNumber} images={apartmentDetails?.amountOfPictures}/>
    <!-- <div class="relative overflow-hidden group">
        <img 
            class="w-full  object-cover transition-transform duration-300" 
            src={`/${apartmentNumber}.jpg`} 
            alt={apartmentName}
        />
    </div> -->

    <!-- Content Section -->
    <div class="flex-1 flex flex-col p-6 space-y-3 bg-white">
        <!-- Header Section -->
        <div>
            <h3 class="text-2xl font-bold text-[#C09A5B] mb-2">{apartmentDetails?.name}</h3>
        </div>

        <!-- Booking Summary -->
        <!-- <div class="space-y-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span class="text-sm">{nights} nights</span>
                </div>
                <div class="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                    <User class="w-5 h-5"/>
                    <span class="text-sm">{apartmentDetails.maxGuests} guests</span>
                </div>
            </div>

            <div class="space-y-2">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400 dark:text-gray-500">Check-in:</span>
                    <span class="text-gray-300 dark:text-gray-700">9 Jun 2025</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400 dark:text-gray-500">Check-out:</span>
                    <span class="text-gray-300 dark:text-gray-700">15 Jun 2025</span>
                </div>
            </div>
        </div> -->

        <!-- Price Breakdown -->
        <div class="pt-4">
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-gray-400 dark:text-gray-600 text-sm">${apartmentDetails?.basePrice} x {nights} nights</span>
                    <span class="text-gray-300 dark:text-gray-700">$2,400</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-400 dark:text-gray-600 text-sm">Service fee</span>
                    <span class="text-gray-300 dark:text-gray-700">$144</span>
                </div>
                <div class="flex justify-between items-center border-t pt-3 border-gray-200">
                    <span class="font-bold text-[#C09A5B]">Total (GBP)</span>
                    <span class="text-2xl font-bold text-[#C09A5B]">£{price}</span>
                </div>
            </div>
        </div>

    </div>
</div>
