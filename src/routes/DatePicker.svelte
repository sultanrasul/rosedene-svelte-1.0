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


  export let children = 0;
  export let adults = 1;
  
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
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- Guest Input -->
<div>

  <button id="dropdownCheckboxButton" data-dropdown-toggle="dropdownDefaultCheckbox"  type="button" class="w-full flex items-center gap  p-2 cursor-pointer text-gray-600 hover:text-[#C09A5B]" >
    <UserRoundIcon class="text-xl" />
    <p class="text-[17px]  ml-2">
      {parseInt(adults, 10) + parseInt(children, 10)} Guest{(parseInt(adults, 10) + parseInt(children, 10)) > 1 ? 's' : ''}
    </p>

  </button>

  <!-- Dropdown menu -->
  <div id="dropdownDefaultCheckbox" class="z-10 hidden w-3/4 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
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
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-1 pt-2 w-full">
          {#each Array(children) as _, index}
            <select name="cars" id="cars" class="pr-[4rem] flex items-center gap border border-gray-300 rounded-lg p-2 pr-10 cursor-pointer text-black text-[13px] hover:text-[#C09A5B]">
              <option value="0">0 Years old</option>
              <option value="1">1 Years old</option>
              <option value="2">2 Years old</option>
              <option value="3">3 Years old</option>
              <option value="4">4 Years old</option>
              <option value="5">5 Years old</option>
              <option value="6">6 Years old</option>
              <option value="7">7 Years old</option>
              <option value="9">9 Years old</option>
              <option value="10">10 Years old</option>
              <option value="11">11 Years old</option>
              <option value="12">12 Years old</option>
              <option value="13">13 Years old</option>
              <option value="14">14 Years old</option>
              <option value="15">15 Years old</option>
              <option value="16">16 Years old</option>
              <option value="17">17 Years old</option>              
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
    <button on:click={() => {window.location.href = `/search?check_in=${formattedStartDateDMY}&check_out=${formattedEndDateDMY}&adults=${adults}&children=${children}`;}} 
    class="flex items-center justify-center w-10 h-10 bg-[#C09A5B]/90 rounded-full hover:bg-[#C09A5B] focus:outline-none">
      <Search />
    </button>
  </div>


    
</div>

<!-- DatePicker Component -->
<style>
  select {
      /* for Firefox */
      -moz-appearance: none;
      /* for Safari, Chrome, Opera */
      -webkit-appearance: none;
  }

  /* for IE10 */
  select::-ms-expand {
      display: none;
  }
</style>