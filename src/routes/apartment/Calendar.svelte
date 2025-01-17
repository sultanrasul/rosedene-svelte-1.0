<script>
  // @ts-nocheck
  
  import { DatePicker } from '@svelte-plugins/datepicker';
  import { format } from 'date-fns';
  import { Search, UserCircle, CalendarDays } from 'lucide-svelte';
  import FormInputs from '../../lib/components/formInputs.svelte';
  import { onMount } from 'svelte';
  import { apartments } from '../apartments';
  
  let apartmentDetails;
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
    console.log(disabledDates)
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
  
  // Function to fetch blocked apartments
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
      console.log(apartmentsList);
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
    console.log(apartmentDetails);
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

    showTwoMonths = window.innerWidth > 1219; // Set initial value based on current width
    window.addEventListener('resize', () => (showTwoMonths = window.innerWidth > 1219));
    return () => window.removeEventListener('resize', () => (showTwoMonths = window.innerWidth > 1219));
  });
  let showTwoMonths = true;
  </script>
  <div class="">

    <DatePicker
    onNavigationChange={handleNavigationChange}
    bind:disabledDates
    alwaysShow={true}
    isOpen={true}
    bind:startDate
    theme="custom-datepicker"
    bind:endDate
    isRange
    isMultipane={false}
    showYearControls={false}
    enableFutureDates
    enablePastDates={false}
    />
  </div>
<!--   
    <DatePicker theme="custom-datepicker" isOpen bind:startDate isRange >

    </DatePicker> -->

  <style>


  
    :global(.datepicker[data-picker-theme="custom-datepicker"]) {
      --datepicker-container-border: 6px solid #C09A5B;
      

    }
  </style>