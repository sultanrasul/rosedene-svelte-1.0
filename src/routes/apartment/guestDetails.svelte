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
  export let dropdownID = "dropdownDefaultCheckbox";
  let apartmentDetails;


  export let children = 0;
  export let adults = 1;
  export let childrenAges = [];
  
  let dateFormatDMY = 'dd/MM/yyyy';
  let dateFormat = 'dd MMMM';
  export let ageMismatch;
  export let isOpen = false;

  export let disabledDates;
  




  const handleNavigationChange = async ({ direction, type, currentPeriod, isPastPeriod }) => {
    
    // Log the start and end dates from currentPeriod
    console.log('start', currentPeriod.start);
    console.log('end', currentPeriod.end);
    console.log('past period', isPastPeriod);

  };



  function incrementAdults() {
    if ((parseInt(adults, 10) + parseInt(children, 10)) < apartmentDetails?.maxGuests) {
      adults = parseInt(adults, 10) + 1;
      const newURL = new URL(window.location.href);
      newURL.searchParams.set('adults', adults);
      history.pushState(null, '', newURL);
    }
  }
  
  function decrementAdults() {
    if (parseInt(adults, 10) > 1) {
      adults = parseInt(adults, 10) - 1;
      const newURL = new URL(window.location.href);
      newURL.searchParams.set('adults', adults);
      history.pushState(null, '', newURL);
    }
  }
  
  function incrementChildren() {
    if (parseInt(adults, 10) + parseInt(children, 10) < apartmentDetails?.maxGuests) {
      children = parseInt(children, 10) + 1;
      const newURL = new URL(window.location.href);
      newURL.searchParams.set('children', children);
      history.pushState(null, '', newURL);
    }
  }
  
  function decrementChildren() {
    if (parseInt(children, 10) > 0) {
      children = parseInt(children, 10) - 1;
      const newURL = new URL(window.location.href);
      newURL.searchParams.set('children', children);
      history.pushState(null, '', newURL);
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
    
    
    const newURL = new URL(window.location.href);
    newURL.searchParams.delete('ages');
    childrenAges.forEach(age => {
      newURL.searchParams.append('ages', age);
    });

    history.pushState(null, '', newURL);
  }
  $: formattedStartDate = formatDate(startDate);
  $: formattedEndDate = formatDate(endDate);

  $: formattedStartDateDMY = formatDateDMY(startDate);
  $: formattedEndDateDMY = formatDateDMY(endDate);
</script>

<div class="flex justify-center items-center relative z-[10] w-full">
  <div class="flex flex-col gap-4 w-full max-w-2xl">
    <!-- Date Input -->
    <div class="w-full group">
      <DatePicker bind:disabledDates={disabledDates} theme={"custom-datepicker"} class="w-full" align={"right"} bind:isOpen bind:startDate bind:endDate isRange isMultipane showYearControls={false} enableFutureDates enablePastDates={false}>
        <div 
          class="text-base md:text-[17px] flex items-center justify-center gap-2 cursor-pointer text-gray-700 bg-white border-2 border-gray-300 rounded-lg px-4 py-3 transition-all duration-200 hover:border-[#C09A5B]"
          on:click={toggleDatePicker}
        >
          <CalendarDays class="w-5 h-5 md:w-6 md:h-6 text-[#C09A5B] shrink-0" />
          <span class="font-medium truncate text-center">
            {#if startDate && !endDate}
              <span class="text-gray-900">{formattedStartDate}</span> – <span class="text-gray-900">Check Out</span>
            {:else if startDate && endDate}
              <span class="text-gray-900">{formattedStartDate}</span> – <span class="text-gray-900">{formattedEndDate}</span>
            {:else}
              <span class="text-gray-900">Check In</span> – <span class="text-gray-900">Check Out</span>
            {/if}
          </span>
        </div>
      </DatePicker>
    </div>

    <!-- Guest Input -->
    <div class="w-full relative">
      <button 
        data-dropdown-toggle={dropdownID}
        class="w-full flex items-center justify-between cursor-pointer bg-white border-2 border-gray-300 rounded-lg px-4 py-3 transition-all duration-200 hover:border-[#C09A5B]"
      >
        <div class="flex items-center gap-2">
          <UserRoundIcon class="w-5 h-5 md:w-6 md:h-6 text-[#C09A5B]" />
          <span class="text-base md:text-[17px] font-medium text-gray-700">
            {parseInt(adults, 10) + parseInt(children, 10)} 
            <span class="text-gray-500">Guest{(parseInt(adults, 10) + parseInt(children, 10)) > 1 ? 's' : ''}</span>
          </span>
        </div>
        <svg class="w-4 h-4 text-gray-400 transform transition-transform" class:rotate-180={isGuestPopupOpen} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div 
        id={dropdownID}
        class={`min-w-[240px] z-20 hidden absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white border-2 border-gray-200 rounded-lg shadow-xl`}
      >
        <div class="p-4 space-y-4">
          <!-- Adults -->
          <div class="flex justify-between items-center">
            <div>
              <span class="block text-sm font-medium text-gray-700 mb-1">Adults</span>
              <p class="text-xs text-gray-400">Ages 13+</p>
            </div>
            <div class="flex items-center gap-3">
              <button 
                on:click={decrementAdults}
                class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50" 
                disabled={adults <= 1}
              >
                −
              </button>
              <span class="w-8 text-center font-medium">{adults}</span>
              <button 
                on:click={incrementAdults}
                class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <!-- Children -->
          <div class="flex justify-between items-center">
            <div>
              <span class="block text-sm font-medium text-gray-700 mb-1">Children</span>
              <p class="text-xs text-gray-400">Ages 2-12</p>
            </div>
            <div class="flex items-center gap-3">
              <button 
                on:click={decrementChildren}
                class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50" 
                disabled={children <= 0}
              >
                −
              </button>
              <span class="w-8 text-center font-medium">{children}</span>
              <button 
                on:click={incrementChildren}
                class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {#if children > 0}
            <div class="pt-4 space-y-3">
              <h4 class="text-sm font-medium text-gray-700">Children's Ages</h4>
              {#each Array(children) as _, index}
                <select
                  on:change={(e) => updateAge(index, e.target.value)}
                  class="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#C09A5B] focus:border-[#C09A5B]"
                >
                  <option value="-1" selected={childrenAges[index] === -1}>Select Age</option>
                  {#each Array.from({ length: 18 }, (_, i) => i) as age}
                    <option value={age}>{age} years old</option>
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



    
</style>