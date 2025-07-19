<script>
    // @ts-nocheck
    
        // @ts-ignore
        import { BedDouble, Wifi, UtensilsCrossed, Ruler, TvMinimal, User } from "lucide-svelte";
        import { apartments } from '../apartments.js';
    
        export let apartmentNumber;
        export let apartmentName;
        export let price; // Default price
        export let nights;
    
        // @ts-ignore
    </script>
    
    <div class="flex flex-col cursor-pointer max-w-sm bg-gray-800  rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden dark:bg-white ">
        <!-- Image Section -->
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
        <div class="flex-1 flex flex-col p-6">
            <!-- Apartment Name -->
            <div class="h-2.5 bg-[#C09A5B] rounded-full  w-[200px] h-[20px] animate-pulse mb-7"></div>
    
            <!-- Apartment Description -->
            <div class="animate-pulse h-2 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[320px] mb-2.5"></div>
            <div class="animate-pulse h-2 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[300px] mb-2.5"></div>
            <div class="animate-pulse h-2 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[310px] mb-2.5"></div>
            <div class="animate-pulse h-2 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[280px] mb-2.5"></div>
            <div class="animate-pulse h-2 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[300px] mb-2.5"></div>
            <div class="animate-pulse h-2 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[280px] mb-8  "></div>
    
            <!-- Features Section -->
            <div class="flex flex-wrap gap-2 mt-auto mb-5">

                <span class="inline-flex items-center px-2.5 py-1 text-xs text-white/0 font-medium bg-gray-700 border border-gray-600 rounded-full dark:bg-gray-50 dark:border-gray-200 dark:text-gray-700/0 transition-colors">
                    <User size="14" class="mr-1"/> 4 Guests
                </span>
                <span class="inline-flex items-center px-2.5 py-1 text-xs text-white/0 font-medium bg-gray-700 border border-gray-600 rounded-full dark:bg-gray-50 dark:border-gray-200 dark:text-gray-700/0 transition-colors">
                    <User size="14" class="mr-1"/> 75" TV
                </span>
                <span class="inline-flex items-center px-2.5 py-1 text-xs text-white/0 font-medium bg-gray-700 border border-gray-600 rounded-full dark:bg-gray-50 dark:border-gray-200 dark:text-gray-700/0 transition-colors">
                    <User size="14" class="mr-1"/> 700ft²
                </span>

            </div>
    
            <!-- Price Section -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-700 dark:border-gray-100">
                <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-bold text-[#C09A5B]">£0000 </span>
                    <span class="text-gray-400 dark:text-gray-500 text-sm">/{2} nights</span>
                </div>
                <button class="px-4 py-2 text-sm font-semibold text-white bg-[#C09A5B] rounded-lg hover:bg-[#B08A4F] transition-colors duration-200">
                    View Details
                </button>
            </div>
        </div>
    </div>
    

    <style>

        .animate-pulse {
            animation: pulse-fix 1.5s infinite;
        }
        
        @keyframes pulse-fix {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.75; }
        }
    </style>
    