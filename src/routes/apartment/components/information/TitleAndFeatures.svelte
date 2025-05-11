<script>
  import BlurFade from "@/components/BlurFade.svelte";
  import GradualSpacing from "@/components/GradualSpacing.svelte";
  import WordPullUp from "@/components/WordPullUp.svelte";


    import { BedDouble, User } from "lucide-svelte";

    export let apartmentName;
    export let maxGuests;
    export let bedrooms;
    export let bathrooms;

</script>
<div>
    <!-- Title -->
     <GradualSpacing  words={apartmentName} class="text-4xl max-[430px]:text-3xl max-[353px]:text-2xl font-bold text-[#C09A5B] mb-4"/>
    <!-- <h2 class="text-4xl max-[430px]:text-3xl max-[353px]:text-2xl font-bold text-[#C09A5B] mb-4">{apartmentName}</h2> -->
    <!-- Features -->
    <div class="flex flex-wrap gap-2 mb-4 ">
      <BlurFade delay = {0.4 + 0.2}>
        <span class="inline-flex items-center px-2.5 py-1 text-xs text-white font-medium bg-gray-700 border border-gray-600 rounded-full dark:bg-gray-50 dark:border-gray-200 dark:text-gray-700 transition-colors"> 
          <User size="22px" class="pr-1" /> {maxGuests} Max Guests
        </span>
      </BlurFade>
      <BlurFade delay={0.4 +0.4}>
        {#if bedrooms !== 0}
        <span class="inline-flex items-center px-2.5 py-1 text-xs text-white font-medium bg-gray-700 border border-gray-600 rounded-full dark:bg-gray-50 dark:border-gray-200 dark:text-gray-700 transition-colors">
          <BedDouble size="22px" class="pr-1" /> {bedrooms} Bedroom{bedrooms > 1 ? 's' : ''}
        </span>
        {/if}
      </BlurFade>
      <BlurFade delay={bedrooms !== 0 ? 0.4+0.6 : 0.4+0.4 }>
        <span class="inline-flex items-center px-2.5 py-1 text-xs text-white font-medium bg-gray-700 border border-gray-600 rounded-full dark:bg-gray-50 dark:border-gray-200 dark:text-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pr-1 lucide lucide-toilet">
            <path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18" />
            <path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" />
          </svg>
          {bathrooms} Bathroom{bathrooms > 1 ? 's' : ''}
        </span>
      </BlurFade>
    </div>
  </div>