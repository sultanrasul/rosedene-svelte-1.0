<script>
    // @ts-ignore
    import { BedDouble, Wifi, UtensilsCrossed, Ruler, TvMinimal, User } from "lucide-svelte";
    import { apartments } from '../apartments.js';

    export let apartmentNumber;
    export let apartmentName;
    export let price = "£66/night"; // Default price

    // @ts-ignore
    const apartmentDetails = apartments[apartmentNumber];
</script>

<div class="cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <!-- Image Section -->
    <div class="relative">
        <img class="w-full  object-cover" src={`/${apartmentNumber}.jpg`} alt={apartmentName}/>
        <!-- <div class="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent"></div> -->
    </div>

    <!-- Content Section -->
    <div class="relative p-5 bg-transparent">
        <!-- Apartment Name -->
        <h5 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{apartmentName}</h5>

        <!--Apartment Description -->
        <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">
            Located in Nakagyo Ward, this hotel is known for its helpful staff, great location, and additional amenities like a bath and laundry.
        </p>

        <!-- Features Section -->
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                <User size="22px" class="pr-1"/> {apartmentDetails['maxGuests']} Guests
            </span>
            <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                <TvMinimal size="22px" class="pr-1"/> {apartmentDetails['tvSize']}" Flat-screen TV
            </span>
            <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                <Ruler size="22px" class="pr-1"/> {apartmentDetails['squareFeet']} Feet²
            </span>
            {#if apartmentDetails["bedrooms"] !== 0}
            <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                <BedDouble size="22px" class="pr-1"/> {apartmentDetails['bedrooms']} Bedroom{apartmentDetails['bedrooms'] > 1 ? 's' : ''}
            </span>
            {/if}
            <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pr-1 lucide lucide-toilet">
                    <path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"/>
                    <path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"/>
                </svg>
                {apartmentDetails['bathrooms']} Bathroom{apartmentDetails['bathrooms'] > 1 ? 's' : ''}
            </span>
        </div>
    
        <!-- Price Section -->
        <div class="mt-4 text-lg font-bold text-gray-500">
            <span class="text-gray-900 dark:text-white text-4xl">{price.split('/')[0]}</span>/night
        </div>
    </div>
    
</div>
