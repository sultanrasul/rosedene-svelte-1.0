<script>
    // @ts-nocheck
    // @ts-ignore
    import { BedDouble, Wifi, UtensilsCrossed, Ruler, TvMinimal, User } from "lucide-svelte";
    import { apartments } from '../../apartments';

    export let apartmentNumber;
    export let apartmentName;

    // @ts-ignore
    const apartmentDetails = apartments[apartmentNumber];
</script>

<div class="flex flex-col cursor-pointer w-[320px] h-[420px] rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden snap-center group relative">
    <!-- Full-bleed Background Image -->
    <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
         src={`/${apartmentNumber}.jpg`} 
         alt={apartmentName}
         loading="lazy"/>

    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20"></div>

    <!-- Top-right Reviews -->
    <div class="absolute top-4 right-4 z-20 bg-gray-800/50 px-3 py-1 rounded-full text-sm text-white flex items-center gap-1 backdrop-blur-sm">
        <svg class="w-4 h-4 fill-current text-[#C09A5B]" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span>4.8</span>
        <span class="text-gray-300">(127)</span>
    </div>

    <!-- Bottom Content -->
    <div class="absolute bottom-0 left-0 right-0 p-6 space-y-3 text-white z-20">
        <!-- Apartment Info -->
        <div class="space-y-2">
            <h3 class="text-2xl font-bold leading-tight">{apartmentName}</h3>
            <div class="flex items-center gap-2 text-sm">
                <User size="20" class="text-[#C09A5B]" />
                <span>6 Guests</span>
                <span class="text-[#C09A5B]">•</span>
                <BedDouble size="20" class="text-[#C09A5B]" />
                <span>2 bedrooms</span>
            </div>
        </div>

        <!-- Location & Button -->
        <div class="pt-3 space-y-4">
            <button class="w-full py-3 text-sm font-semibold text-center text-white bg-[#C09A5B] rounded-lg 
                        hover:bg-[#B08A4F] transition-colors duration-200 transform group-hover:scale-[1.02]">
                Explore Apartment
            </button>
        </div>
    </div>
</div>