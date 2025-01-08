<script>
  import { DatePicker } from '@svelte-plugins/datepicker';
  import { format } from 'date-fns';
  import { Search, UserCircle, CalendarDays} from 'lucide-svelte';
  import FormInputs from './formInputs.svelte';
  import {clickOutside} from '../../../node_modules/@svelte-plugins/datepicker/dist/actions.js';

  const today = new Date();
  const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

  const getDateFromToday = (days) => Date.now() - days * MILLISECONDS_IN_DAY;

  let isGuestPopupOpen = false;

  // Function to toggle the pop-up
  const toggleGuestPopup = () => {
    isGuestPopupOpen = !isGuestPopupOpen;
  };

  let startDate;
  let endDate;  


  let children = 0;
  let adults = 1;
  
  let dateFormat = 'dd MMMM';
  let isOpen = false;


  const toggleDatePicker = () => (isOpen = !isOpen);

  const formatDate = (dateString) =>
      dateString && format(new Date(dateString), dateFormat) || '';

  $: formattedStartDate = formatDate(startDate);
  $: formattedEndDate = formatDate(endDate);
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
      <UserCircle />
      <span>{adults + children} Guest{(adults + children) > 1 ? 's' : ''}</span>

    </div>

    

    <div class="w-px h-6 bg-gray-300"></div>

    <!-- Search Button -->
    <button class="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none">
      <Search />
    </button>
  </div>

  <!-- DatePicker Component -->
  <div class="absolute mt-24  left-[-10%] transform  bg-white shadow-lg rounded-lg">
    <DatePicker bind:isOpen bind:startDate bind:endDate isRange isMultipane showYearControls={false} enableFutureDates enablePastDates={false}/>  
  </div>

  {#if isGuestPopupOpen}
    <div  class="bg-white rounded-3xl top-[7%] w-[200px] p-2 absolute mt-24  left-[50%] transform  bg-white shadow-lg rounded-lg">
      <FormInputs bind:adults bind:children />
    </div>
    {/if}
    
</div>

<!-- DatePicker Component -->
