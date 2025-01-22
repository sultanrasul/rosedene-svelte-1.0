<script>
// @ts-nocheck

  import { DatePicker } from '@svelte-plugins/datepicker';
  import { format } from 'date-fns';
  import { Search, UserCircle, CalendarDays, LucideMinus, Plus, Baby, UserRound, UserRoundIcon, Triangle } from 'lucide-svelte';
  import FormInputs from '$lib/components/formInputs.svelte';
  import { onMount } from 'svelte';
  import { apartments } from '../apartments';
  

  const today = new Date();
  const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

  const getDateFromToday = (days) => Date.now() - days * MILLISECONDS_IN_DAY;

  let isGuestPopupOpen = false;



  // Function to toggle the pop-up
  const toggleGuestPopup = () => {
    isGuestPopupOpen = !isGuestPopupOpen;
  };

  export let startDate;
  export let endDate;
  export let isSearch = false;  
  let apartmentDetails;


  export let children = 0;
  export let adults = 1;
  
  let dateFormatDMY = 'dd/MM/yyyy';
  let dateFormat = 'dd MMMM';
  let isOpen = false;

  let disabledDates;
  
  const formatBlockedDates = (blockedDatesResponse) => {
    let updatedDisabledDates = [...disabledDates];  // Clone the existing disabledDates array

    blockedDatesResponse.forEach(blockedDate => {
      if (blockedDate.IsBlocked === "true") {
        // Parse the @Date value and create a Date object
        const dateStr = blockedDate["@Date"];
        const [year, month, day] = dateStr.split('-').map(Number);

        // Create a Date object (month is 0-indexed in JavaScript)
        const blockedDateObj = format(new Date(year, month - 1, day), 'MMMM dd, yyyy'); // Month is 0-indexed

        // Add the new Date object to the updatedDisabledDates array
        updatedDisabledDates.push(blockedDateObj);
      }
    });

    // Reassign the disabledDates array to trigger reactivity
    disabledDates = updatedDisabledDates;
  };



  const handleNavigationChange = async ({ direction, type, currentPeriod, isPastPeriod }) => {
    
    // Log the start and end dates from currentPeriod
    console.log('start', currentPeriod.start);
    console.log('end', currentPeriod.end);
    console.log('past period', isPastPeriod);
    if (direction !== "previous" && !isPastPeriod){
      // Parse the start and end dates
      const parseDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed
      };
  
      const startDate = parseDate(currentPeriod.start);
      const endDate = parseDate(currentPeriod.end);
  
      // Get the first day of the start month
      const firstDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  
      // Get the last day of the start month
      const lastDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 2, 0);
  
      const dateFrom = {
        day: firstDayOfMonth.getDate(),
        month: firstDayOfMonth.getMonth() + 1,
        year: firstDayOfMonth.getFullYear(),
      };
  
      const dateTo = {
        day: lastDayOfMonth.getDate(),
        month: lastDayOfMonth.getMonth() + 1,
        year: lastDayOfMonth.getFullYear(),
      };
  
      // Fetch the blocked apartments using the new dateFrom and dateTo
      formatBlockedDates(await fetchBlockedApartments(dateFrom, dateTo, apartmentDetails.id));
    }

  };

  async function fetchBlockedApartments(dateFrom, dateTo, propertyId) {
    try {
      const response = await fetch('http://127.0.0.1:5000/check_calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date_from: dateFrom, date_to: dateTo, property_id: propertyId }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const apartmentsList = await response.json();
      console.log(disabledDates);
      return apartmentsList;  // Return the fetched list
    } catch (error) {
      console.error('Failed to fetch blocked apartments:', error);
    }
  }

  onMount(async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const checkIn = urlParams.get('check_in'); // Format: day/month/year
    const checkOut = urlParams.get('check_out'); // Format: day/month/year

    apartmentDetails = apartments[urlParams.get('number')];
    adults = urlParams.get('adults');
    children = urlParams.get('children');

    if (checkIn && checkOut) {
      // Convert day/month/year string to Date object
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed
      };

      startDate = parseDate(checkIn);
      endDate = parseDate(checkOut);

      // Get the first day of the start month
      const firstDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

      // Get the last day of the start month
      const lastDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 2, 0);

      const dateFrom = {
        day: firstDayOfMonth.getDate(),
        month: firstDayOfMonth.getMonth() + 1,
        year: firstDayOfMonth.getFullYear(),
      };

      const dateTo = {
        day: lastDayOfMonth.getDate(),
        month: lastDayOfMonth.getMonth() + 1,
        year: lastDayOfMonth.getFullYear(),
      };

      // Fetch the blocked apartments using the new dateFrom and dateTo
      formatBlockedDates(await fetchBlockedApartments(dateFrom, dateTo, apartmentDetails.id));
    } else {
      console.error('Missing check_in or check_out parameters in URL');
    }

  });


  function toggleDatePicker(){
    if (!isOpen){
      isOpen = true
    } else {
      isOpen = false
    }
  }

  const formatDate = (dateString) =>
      dateString && format(new Date(dateString), dateFormat) || '';

  const formatDateDMY = (dateString) =>
      dateString && format(new Date(dateString), dateFormatDMY) || '';


  function incrementAdults(){
    adults +=1;
  }

function decrementAdults(){
    if (adults > 1){
        adults-=1;
    }
  }

function incrementChildren(){
    children +=1;
  }

function decrementChildren(){
    if (children > 0){
        children-=1;
    }
  }

  $: formattedStartDate = formatDate(startDate);
  $: formattedEndDate = formatDate(endDate);

  $: formattedStartDateDMY = formatDateDMY(startDate);
  $: formattedEndDateDMY = formatDateDMY(endDate);
</script>

<div class=" justify-center items-center relative z-[10] w-full">
  
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="flex flex-col gap-4">
    <!-- Date Input -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->

    <DatePicker class="" align={"right"} bind:disabledDates onNavigationChange={handleNavigationChange} bind:isOpen bind:startDate bind:endDate isRange isMultipane={true} showYearControls={false} enableFutureDates enablePastDates={false}> 

      <div class="flex items-center gap-2 border border-gray-300 rounded-lg p-2 cursor-pointer text-black hover:text-[#C09A5B]" on:click={toggleDatePicker}>
        <CalendarDays class="text-xl" />
        <p class="text-sm">
          {#if startDate && endDate}
            {formattedStartDate} - {formattedEndDate}
          {:else}
            Select Date
          {/if}
        </p>
      </div>
    </DatePicker>


    
    <!-- Guest Input -->
    <div class="flex items-center gap-2 border border-gray-300 rounded-lg p-2 cursor-pointer text-black hover:text-[#C09A5B]" on:click={() => { isGuestPopupOpen = !isGuestPopupOpen }}>
      <UserRoundIcon class="text-xl" />
      <p class="text-sm">
        {parseInt(adults, 10) + parseInt(children, 10)} Guest{(parseInt(adults, 10) + parseInt(children, 10)) > 1 ? 's' : ''}
      </p>
    </div>
  </div>

  <!-- DatePicker Component -->
  <!-- <div class="z-50 absolute transform  bg-white shadow-2xl rounded-lg top-[0%] left-[-4%]">
    <DatePicker align={"right"} bind:isOpen bind:startDate bind:endDate isRange isMultipane={true} showYearControls={false} enableFutureDates enablePastDates={false}/>  
  </div> -->

  {#if isGuestPopupOpen}
    <div class="bg-white rounded-3xl top-[7%] p-1 absolute mt-24 transform bg-white shadow-lg rounded-lg">
      <!-- Adults Section -->
      <div class="flex items-center justify-between py-2 px-3 bg-white rounded-lg">
        <!-- Label -->
        <h1 class="text-black font-medium flex items-center gap-x-1">
          <!-- <UserRound class="w-[24px]" /> -->
          <span class="pr-2">Adults</span>
        </h1>
    
        <!-- Input and Buttons -->
        <div class="flex items-center gap-x-1.5">
          <!-- Decrease Button -->
          <button type="button" on:click={decrementAdults} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-300 bg-gray-100 text-black shadow-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none" tabindex="-1" aria-label="Decrease" data-hs-input-number-decrement="">
            <LucideMinus class="w-[18px]" />
          </button>
    
          <!-- Number Input -->
          <input class="p-0 w-6 bg-transparent border-0 text-black text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" style="-moz-appearance: textfield;" type="number" aria-roledescription="Number field" bind:value={adults} data-hs-input-number-input="" />
    
          <!-- Increase Button -->
          <button type="button" on:click={incrementAdults} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-300 bg-gray-100 text-black shadow-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none" tabindex="-1" aria-label="Increase" data-hs-input-number-increment="">
            <Plus class="w-[18px]" />
          </button>
        </div>
      </div>
    
      <!-- Divider -->
      <div class="h-[1px] bg-gray-200 my-2"></div>
    
      <!-- Children Section -->
      <div class="flex items-center justify-between py-2 px-3 bg-white rounded-lg">
        <!-- Label -->
        <h1 class="text-black font-medium flex items-center gap-x-1">
          <!-- <Baby class="w-[24px]" /> -->
          <span class="pr-2">Children</span>
        </h1>
    
        <!-- Input and Buttons -->
        <div class="flex items-center gap-x-1.5">
          <!-- Decrease Button -->
          <button type="button" on:click={decrementChildren} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-300 bg-gray-100 text-black shadow-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none" tabindex="-1" aria-label="Decrease" data-hs-input-number-decrement="">
            <LucideMinus class="w-[18px]" />
          </button>
    
          <!-- Number Input -->
          <input class="p-0 w-6 bg-transparent border-0 text-black text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" style="-moz-appearance: textfield;" type="number" aria-roledescription="Number field" bind:value={children} data-hs-input-number-input="" />
    
          <!-- Increase Button -->
          <button type="button" on:click={incrementChildren} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-300 bg-gray-100 text-black shadow-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none" tabindex="-1" aria-label="Increase" data-hs-input-number-increment="">
            <Plus class="w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  

  {/if}
    
</div>

<!-- DatePicker Component -->
