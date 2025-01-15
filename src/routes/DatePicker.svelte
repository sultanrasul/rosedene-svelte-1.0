<script>
// @ts-nocheck

  import { DatePicker } from '@svelte-plugins/datepicker';
  import { format } from 'date-fns';
  import { Search, UserCircle, CalendarDays, LucideMinus, Plus, Baby, UserRound, UserRoundIcon } from 'lucide-svelte';
  import FormInputs from '../lib/components/formInputs.svelte';

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


  let children = 0;
  let adults = 1;
  
  let dateFormatDMY = 'dd/MM/yyyy';
  let dateFormat = 'dd MMMM';
  let isOpen = false;


  const toggleDatePicker = () => (isOpen = !isOpen);

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

<div class="flex items-center justify-center py-6 relative">
  <div class="flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-md relative">
    <!-- Date Input -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="min-w-[230px] flex items-center gap-2 cursor-pointer text-gray-600 hover:text-blue-500" on:click={toggleDatePicker}>
      <CalendarDays />
      <span>
        {#if startDate && endDate}
          {formattedStartDate} - {formattedEndDate}
        {:else}
          Select Date
        {/if}
      </span>
    </div>

    <div class="w-px h-6 bg-gray-300"></div>

    <!-- Guest Input -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-blue-500" on:click={toggleGuestPopup}>
      <UserRoundIcon />
      <span>{adults + children} Guest{(adults + children) > 1 ? 's' : ''}</span>
    </div>

    

    <div class="w-px h-6 bg-gray-300"></div>

    <!-- Search Button -->
    <button on:click={() => {window.location.href = `/search?check_in=${formattedStartDateDMY}&check_out=${formattedEndDateDMY}&adults=${adults}&kids=${children}`;}} 
    class="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none">
      <Search />
    </button>
  </div>

  <!-- DatePicker Component -->
  <div class="z-50 absolute mt-24 transform  bg-white shadow-lg rounded-lg" class:left-[-10%]={!isSearch} class:left-[27%]={isSearch}>
    <DatePicker bind:isOpen bind:startDate bind:endDate isRange isMultipane showYearControls={false} enableFutureDates enablePastDates={false}/>  
  </div>

  {#if isGuestPopupOpen}
    <div class="bg-white rounded-3xl top-[7%] w-[200px] p-1 absolute mt-24 left-[50%] transform bg-white shadow-lg rounded-lg">
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
