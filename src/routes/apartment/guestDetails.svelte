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
  let childrenAges = [];
  
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

  function incrementAdults() {
    if ((parseInt(adults, 10) + parseInt(children, 10)) < apartmentDetails?.maxGuests) {
      adults = parseInt(adults, 10) + 1;
    }
  }

  function decrementAdults() {
    if (parseInt(adults, 10) > 1) {
      adults = parseInt(adults, 10) - 1;
    }
  }

  function incrementChildren() {
    if (parseInt(adults, 10) + parseInt(children, 10) < apartmentDetails?.maxGuests) {
      children = parseInt(children, 10) + 1;
    }
  }

  function decrementChildren() {
    if (parseInt(children, 10) > 0) {
      children = parseInt(children, 10) - 1;
    }
  }


  onMount(async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const checkIn = urlParams.get('check_in'); // Format: day/month/year
    const checkOut = urlParams.get('check_out'); // Format: day/month/year

    
    apartmentDetails = apartments[urlParams.get('number')];
    adults = parseInt(urlParams.get('adults'),10)
    children = parseInt(urlParams.get('children'),10)
    
    childrenAges = urlParams.getAll('ages').map(Number); // Convert to numbers
    console.log('Children Ages:', childrenAges); // Verify the result

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

    <DatePicker class="" theme={"custom-datepicker"} align={"right"} bind:disabledDates onNavigationChange={handleNavigationChange} bind:isOpen bind:startDate bind:endDate isRange isMultipane={true} showYearControls={false} enableFutureDates enablePastDates={false}> 

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
    <div>
      <button id="dropdownCheckboxButton" data-dropdown-toggle="dropdownDefaultCheckbox" type="button" class="overflow-y-auto w-full flex items-center gap border border-gray-300 rounded-lg p-2 cursor-pointer text-black hover:text-[#C09A5B]">
        <UserRoundIcon class="text-xl" />
        <p class="text-sm ml-2">
          {parseInt(adults, 10) + parseInt(children, 10)} Guest{(parseInt(adults, 10) + parseInt(children, 10)) > 1 ? 's' : ''}
        </p>
        
        <!-- Move SVG to the right -->
        <svg class="ml-auto text-right hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
    
      <!-- Dropdown menu -->
      <div id="dropdownDefaultCheckbox" class="z-10 hidden w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 max-h-[250px] overflow-y-auto">
        <!-- Input Number -->
        <div class="py-2 px-3 bg-white border border-gray-200 rounded-lg">
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
              <button on:click={incrementAdults} type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabindex="-1" aria-label="Increase" data-hs-input-number-increment="">                
                <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </button>
            </div>
          </div>
          <hr class="h-px my-2 bg-gray-300 border-0">
      
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
              <button on:click={incrementChildren} type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabindex="-1" aria-label="Increase" data-hs-input-number-increment="">                
                <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </button>
            </div>
          </div>
          {#if children > 0}
            <hr class="h-px bg-gray-300 border-0 text-white">
            <div class="grid grid-cols-1 gap-1 pt-2 w-full">
              {#each childrenAges as age, index}
                <select
                  id="child-age-{index}"
                  bind:value={childrenAges[index]}
                  on:change={(event) => updateAge(index, event.target.value)}
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
      </div>
      
  
    </div>

  </div>

</div>

<!-- DatePicker Component -->
<style>
  :global(.datepicker[data-picker-theme="custom-datepicker"]) {
      --datepicker-container-border: 2px solid #C09A5B;
      --datepicker-calendar-range-selected-background: #C09A5B;
      --datepicker-calendar-day-color-disabled: #23344161;

    }

    #dropdownDefaultCheckbox {
    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: #C09A5B transparent; /* Thumb and track colors for Firefox */
  }

  /* Webkit browsers (Chrome, Edge, Safari) */
  #dropdownDefaultCheckbox::-webkit-scrollbar {
    width: 8px; /* Scrollbar width */
  }

  #dropdownDefaultCheckbox::-webkit-scrollbar-track {
    background: transparent; /* Track color */
    border-radius: 8px;
  }

  #dropdownDefaultCheckbox::-webkit-scrollbar-thumb {
    background-color: #C09A5B; /* Thumb color */
    border-radius: 8px;
    border: 2px solid transparent; /* Adds padding */
    background-clip: content-box; /* Makes border visible */
  }

  #dropdownDefaultCheckbox::-webkit-scrollbar-thumb:hover {
    background-color: #C09A5B; /* Darker thumb color on hover */
  }

  #dropdownDefaultCheckbox::-webkit-scrollbar-corner {
    background: transparent; /* Corner color */
  }

    
</style>