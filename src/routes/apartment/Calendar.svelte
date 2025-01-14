<script>
// @ts-nocheck

  import { DatePicker } from '@svelte-plugins/datepicker';
  import { format } from 'date-fns';
  import { Search, UserCircle, CalendarDays} from 'lucide-svelte';
  import FormInputs from '../../lib/components/formInputs.svelte';

  let currentPeriod;
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

  let disabledDates = [
    // format(new Date("2025-01-15"), 'MMMM dd, yyyy'),
    // format(new Date("2025-01-16"), 'MMMM dd, yyyy')
  ]

  // This function will handle the navigation event
  const handleNavigationChange = ({ direction, type, currentPeriod, isPastPeriod }) => {
    // console.log('Navigation Change: ', { direction, type, currentPeriod, isPastPeriod });
    // Now you can access currentPeriod, which includes the start and end dates of the current month
    console.log('Current Viewing Month: ', currentPeriod);
    currentPeriod = currentPeriod; // Or store it in a variable if you want to use it later
  };


  const toggleDatePicker = () => (isOpen = !isOpen);

  const formatDate = (dateString) =>
      dateString && format(new Date(dateString), dateFormat) || '';

  const formatDateDMY = (dateString) =>
      dateString && format(new Date(dateString), dateFormatDMY) || '';

  $: formattedStartDate = formatDate(startDate);
  $: formattedEndDate = formatDate(endDate);

  $: formattedStartDateDMY = formatDateDMY(startDate);
  $: formattedEndDateDMY = formatDateDMY(endDate);
</script>

<div class="">


  <!-- DatePicker Component -->
  <div class="">
    <DatePicker onNavigationChange={handleNavigationChange} disabledDates={disabledDates} alwaysShow={true} isOpen={true} bind:startDate bind:endDate isRange isMultipane showYearControls={false} enableFutureDates enablePastDates={false}/>  
  </div>

    
</div>

<!-- DatePicker Component -->
