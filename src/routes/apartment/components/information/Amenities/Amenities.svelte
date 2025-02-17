<script>

    import { Check, Flower2, Monitor, ParkingCircle, ShowerHead, UtensilsCrossed, WashingMachine, Wifi } from "lucide-svelte";

</script>

<div  aria-haspopup="dialog" aria-expanded="false" >
    <h2 class="text-3xl font-bold text-black mb-4">Amenities</h2>
    <div class="grid grid-cols-2 gap-4 text-gray-700 text-sm">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-volume-off mr-2 w-[30px] h-[30px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M16 9a5 5 0 0 1 .95 2.293"/><path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"/><path d="m2 2 20 20"/><path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"/><path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686"/></svg>
        <span>Soundproofing</span>
      </div>
      <div class="flex items-center">
        <ParkingCircle class="w-[30px] h-[30px] mr-2" />
        <span>Free on-site parking</span>
      </div>
      <div class="flex items-center">
        <ShowerHead class="mr-2 w-[30px] h-[30px]"/>
        <span>Private bathroom</span>
      </div>
      <div class="flex items-center">
        <Wifi class="w-[30px] h-[30px] mr-2" />
        <span>Free WiFi</span>
      </div>
      <div class="flex items-center">
        <UtensilsCrossed class="w-[30px] h-[30px] mr-2" />
        <span>Kitchen</span>
      </div>
      <div class="flex items-center">
        <WashingMachine class="w-[30px] h-[30px] mr-2" />
        <span>Washing machine</span>
      </div>
      <div class="flex items-center">
        <Monitor class="w-[30px] h-[30px] mr-2" />
        <span>Flat screen TV</span>
      </div>
      <div class="flex items-center">
        <Flower2 class="w-[30px] h-[30px] mr-2" />
        <span>Garden</span>
      </div>
    </div>
    <button aria-controls="hs-scale-animation-modal" data-hs-overlay="#hs-scale-animation-modal" class="mt-4 px-4 py-2 border border-gray-300 rounded-full text-gray-600 text-sm hover:bg-gray-100">
      Show all amenities
    </button>
  </div>
