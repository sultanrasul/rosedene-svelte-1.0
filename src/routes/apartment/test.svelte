<script>
    import { onMount } from 'svelte';
    import MobileSlideshow from './MobileSlideshow.svelte';
  
    export let data;
  
    onMount(() => {
      console.log('Number:', data.number);
      console.log('Check-in:', data.check_in);
      console.log('Check-out:', data.check_out);
      console.log('Adults:', data.adults);
      console.log('Children:', data.children);
      console.log('Apartment Details:', data.apartmentDetails);
      console.log('Disabled Dates: ',data.disabledDates)
      console.log('Price: ',data.Prices)
      console.log('Children Ages:', data.ages)
    });
  </script>
  
  <h1>Apartment Details</h1>
  <p><strong>Apartment Number:</strong> {data.number}</p>
  <p><strong>Check-in Date:</strong> {data.check_in}</p>
  <p><strong>Check-out Date:</strong> {data.check_out}</p>
  <p><strong>Adults:</strong> {data.adults}</p>
  <p><strong>Children:</strong> {data.children}</p>
  <p><strong>Apartment Name:</strong> {data.apartmentDetails.name}</p>

  
  <MobileSlideshow images={data.apartmentDetails.amountOfPictures} apartmentNumber = {data.number}/>

  <!-- Main Menu -->
    


<!-- <div id="default-carousel" class="relative w-full" data-carousel="slide">
    <div class="relative h-[500px] overflow-hidden rounded-lg">
         {#each Array(4).fill().map((_, i) => i) as i}
            <div class="hidden flex justify-center items-center duration-700 ease-in-out" data-carousel-item>
                <img src={`/${1}/${i}.jpg`} class="rounded-xl object-contain w-full" />
            </div>
        {/each}


    </div>
    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>

    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div> -->
