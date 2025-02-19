<script>
    // @ts-ignore
    import { BedDouble, Wifi, UtensilsCrossed, Ruler, TvMinimal, User } from "lucide-svelte";
    import { apartments } from '../apartments.js';

    // @ts-ignore
</script>

<div class="h-full flex flex-col cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <!-- Image Section -->
    <div class="relative">
        <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
            <div class="flex items-center justify-center w-full h-[255px] bg-gray-300 rounded-t-sm sm:w-96 dark:bg-gray-700">
                <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
            </div>
            
        </div>
    </div>

    <!-- Content Section -->
    <div class="flex-1 relative p-5 bg-transparent">
        <!-- Apartment Name -->
        <!-- <h5 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Emperor Apartment 1</h5> -->
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[200px] h-[20px] animate-pulse mb-4"></div>






        <!--Apartment Description -->
        <!-- <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">
            Located in Nakagyo Ward, this hotel is known for its helpful staff, great location, and additional amenities like a bath and laundry.
        </p> -->

        <div class="animate-pulse h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[320px] mb-2.5"></div>
        <div class="animate-pulse h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div class="animate-pulse h-2 mb-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[280px] mb-2.5"></div>


        <!-- Features Section -->
        <div class="flex flex-wrap gap-2 mb-0 animate-pulse">
            <span class="w-[140px] h-[24px] inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"/>
            <span class="w-[120px] h-[24px] inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"/>
            <span class="w-[100px] h-[24px] inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"/>
            <span class="w-[100px] h-[24px] inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"/>
            <span class="w-[100px] h-[24px] inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"/>
            
        </div>
    </div>
    
    <!-- Price Section -->
    <div class="mt-auto text-lg font-bold text-gray-500 ml-5 mb-5 animate-pulse">
        <span class="text-gray-900 dark:text-white text-4xl">£299</span>
        /nights
    </div>
</div>


<style>

    .animate-pulse {
        animation: pulse-fix 1.5s infinite;
    }
    
    @keyframes pulse-fix {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
</style>
