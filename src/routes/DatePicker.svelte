<script>
// @ts-nocheck

  import { DatePicker } from '@svelte-plugins/datepicker';
  import { format } from 'date-fns';
  import { Search, UserCircle, CalendarDays, LucideMinus, Plus, Baby, UserRound, UserRoundIcon } from 'lucide-svelte';
  import FormInputs from '../lib/components/formInputs.svelte';
    import { onMount } from 'svelte';

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


  export let children = 0;
  export let adults = 1;
  
  let dateFormatDMY = 'dd/MM/yyyy';
  let dateFormat = 'dd MMMM';
  let isOpen = false;
  export let childrenAges = [];


  const toggleDatePicker = () => (isOpen = !isOpen);

  const formatDate = (dateString) =>
      dateString && format(new Date(dateString), dateFormat) || '';

  const formatDateDMY = (dateString) =>
      dateString && format(new Date(dateString), dateFormatDMY) || '';


  function incrementAdults() {
    if ((parseInt(adults, 10) + parseInt(children, 10)) <  6) {
      adults = parseInt(adults, 10) + 1;
    }
  }

  function decrementAdults() {
    if (parseInt(adults, 10) > 1) {
      adults = parseInt(adults, 10) - 1;
    }
  }

  function incrementChildren() {
    if (parseInt(adults, 10) + parseInt(children, 10) < 6) {
      children = parseInt(children, 10) + 1;
    }
  }

  function decrementChildren() {
    if (parseInt(children, 10) > 0) {
      children = parseInt(children, 10) - 1;
    }
  }

  $: formattedStartDate = formatDate(startDate);
  $: formattedEndDate = formatDate(endDate);

  $: formattedStartDateDMY = formatDateDMY(startDate);
  $: formattedEndDateDMY = formatDateDMY(endDate);

  // Ensure the array length matches the number of children
  $: {
    if (children > childrenAges.length) {
      // Add new -1 entries for additional children
      childrenAges = [...childrenAges, ...Array(children - childrenAges.length).fill(-1)];
    } else if (children < childrenAges.length) {
      // Remove extra entries if children count decreases
      childrenAges = childrenAges.slice(0, children);
    }
  }
  // Update the age of a specific child
  function updateAge(index, age) {
    const updatedAges = [...childrenAges];
    updatedAges[index] = parseInt(age, 10);
    childrenAges = updatedAges;
    console.log(childrenAges); // Should show the updated array
  }

</script>

<div class="flex items-center justify-center py-6 relative z-[10]">
  <div class="flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-md relative">
    <!-- Date Input -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <DatePicker class="" bind:isOpen bind:startDate bind:endDate isRange isMultipane showYearControls={false} enableFutureDates enablePastDates={false}>
      <div class="text-[17px] min-w-[230px] flex items-center gap-2 cursor-pointer text-gray-600 hover:text-[#C09A5B]" on:click={toggleDatePicker}>
        <CalendarDays />
        <span>
          {#if startDate && endDate}
            {formattedStartDate} - {formattedEndDate}
          {:else}
          <p>
            Select Date
          </p>
          {/if}
        </span>
      </div>
    </DatePicker>

    <div class="w-px h-6 bg-gray-300"></div>

    <!-- Guest Input -->

<div>

  <button id="dropdownCheckboxButton" data-dropdown-toggle="dropdownDefaultCheckbox"  type="button" class="text-gray-600 overflow-y-auto w-full flex items-center gap rounded-lg p-2 cursor-pointer text-black hover:text-[#C09A5B]" >
    <UserRoundIcon class="text-xl" />
    <p class="text-[17px]  ml-2">
      {parseInt(adults, 10) + parseInt(children, 10)} Guest{(parseInt(adults, 10) + parseInt(children, 10)) > 1 ? 's' : ''}
    </p>

  </button>

  <!-- Dropdown menu -->
  <div id="dropdownDefaultCheckbox" class="min-w-[150px] z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
    <!-- Input Number -->
    <div class="py-2 px-3 bg-white border border-gray-200 rounded-lg" >
      <!-- Adults -->
      <div class="flex justify-between items-center gap-x-5">
        <div>
          <span class="block text-xs text-gray-500">Adults</span>
          <input
            class="w-12 p-0 bg-transparent border-0 text-gray-800 text-left focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            style="-moz-appearance: textfield;"
            type="number"
            aria-roledescription="Number field"
            bind:value={adults}
          />
        </div>
        
        <div class="flex items-center gap-x-1.5">
          <button on:click={decrementAdults} type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabindex="-1" aria-label="Decrease" data-hs-input-number-decrement="">
            <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <button on:click={incrementAdults} type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabindex="-1" aria-label="Increase" data-hs-input-number-increment="">                <svg  class="shrink-0 size-3.5"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </button>
        </div>
      </div>
      <hr class="h-px my-2 bg-gray-300 border-0 ">
      
      <!-- Children -->
      <div class="flex justify-between items-center gap-x-5">
        <div>
          <span class="block text-xs text-gray-500">Children</span>
          <input
            class="w-12 p-0 bg-transparent border-0 text-gray-800 text-left focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            style="-moz-appearance: textfield;"
            type="number"
            aria-roledescription="Number field"
            bind:value={children}
          />
        </div>
        
        <div class="flex items-center gap-x-1.5">
          <button on:click={decrementChildren} type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabindex="-1" aria-label="Decrease" data-hs-input-number-decrement="">
            <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <button on:click={incrementChildren} type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabindex="-1" aria-label="Increase" data-hs-input-number-increment="">                <svg  class="shrink-0 size-3.5"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </button>
        </div>
      </div>


      {#if children > 0}
        <hr class="h-px bg-gray-300 border-0 text-white">
        <div class="grid grid-cols-1 gap-1 pt-2 w-full">
          {#each Array(children) as _, index}
            <select
              on:change={(e) => updateAge(index, e.target.value)}
              class="outline-none focus:ring-0 focus:border-gray-300 border rounded-lg p-2 cursor-pointer text-black text-[13px] hover:text-[#C09A5B]"
              style:box-shadow="none"
            >
              <option value="-1" selected={childrenAges[index] === -1}>Age Needed</option>
              {#each Array.from({ length: 18 }, (_, i) => i) as age}
                <option value={age} selected={childrenAges[index] === age}>{age} Years old</option>
              {/each}
            </select>
          {/each}
        </div>
      {/if}
      
      
      




    </div>
    <!-- End Input Number -->
  </div>

</div>

    

    <div class="w-px h-6 bg-gray-300"></div>

    <!-- Search Button -->
    <button on:click={() => 
    {
      const agesParam = childrenAges.map(age => `ages=${age}`).join('&');
      window.location.href = `/search?check_in=${formattedStartDateDMY}&check_out=${formattedEndDateDMY}&adults=${adults}&children=${children}&${agesParam}`;
    }} 
    class="flex items-center justify-center w-10 h-10 bg-[#C09A5B]/90 rounded-full hover:bg-[#C09A5B] focus:outline-none">
      <Search />
    </button>
  </div>


    
</div>

<!-- DatePicker Component -->
<style>
  select:focus {
    outline: none;
    box-shadow: none;
}
</style>