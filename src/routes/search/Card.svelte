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
    const apartmentDetails = apartments[apartmentNumber];
</script>

<div class="flex flex-col cursor-pointer max-w-sm bg-gray-800  rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden dark:bg-white ">
    <!-- Image Section -->
    <div class="relative overflow-hidden">
        <img class="w-full object-cover hover:scale-105 transition-transform duration-300" src={`/${apartmentNumber}.jpg`} alt={apartmentName}/>
    </div>

    <!-- Content Section -->
    <div class="flex-1 text-2xl flex flex-col p-6">
        <!-- Apartment Name -->
        <h3 class="mb-3  font-bold text-[#C09A5B] ">{apartmentName}</h3>

        <!-- Apartment Description -->
        <p class="mb-4 text-gray-300 dark:text-gray-600 text-base leading-relaxed">
            Located in Nakagyo Ward, this hotel is known for its helpful staff, great location, and additional amenities like a bath and laundry.
        </p>

        <!-- Features Section -->
        <div class="flex flex-wrap gap-2 mt-auto mb-5">
            {#each [
                { icon: User, text: `${apartmentDetails['maxGuests']} Guests` },
                { icon: TvMinimal, text: `${apartmentDetails['tvSize']}" TV` },
                { icon: Ruler, text: `${apartmentDetails['squareFeet']} ft²` },
                ...(apartmentDetails["bedrooms"] !== 0 ? [{ icon: BedDouble, text: `${apartmentDetails['bedrooms']} Bedroom${apartmentDetails['bedrooms'] > 1 ? 's' : ''}` }] : []),
                { icon: 'toilet', text: `${apartmentDetails['bathrooms']} Bathroom${apartmentDetails['bathrooms'] > 1 ? 's' : ''}` }
            ] as feature}
                <span class="inline-flex items-center px-2.5 py-1 text-xs text-white font-medium bg-gray-700 border border-gray-600 rounded-full dark:bg-gray-50 dark:border-gray-200 dark:text-gray-700 transition-colors">
                    {#if feature.icon === 'toilet'}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1">
                            <path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"/>
                            <path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"/>
                        </svg>
                    {:else}
                        <feature.icon size="14" class="mr-1"/>
                    {/if}
                    {feature.text}
                </span>
            {/each}
        </div>

        <!-- Price Section -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-700 dark:border-gray-100">
            <div class="flex items-baseline gap-2">
                <span class="text-3xl font-bold text-[#C09A5B]">£{price}</span>
                <span class="text-gray-400 dark:text-gray-500 text-sm">/{nights} nights</span>
            </div>
            <button class="px-4 py-2 text-sm font-semibold text-white bg-[#C09A5B] rounded-lg hover:bg-[#B08A4F] transition-colors duration-200">
                Read More
            </button>
        </div>
    </div>
</div>
