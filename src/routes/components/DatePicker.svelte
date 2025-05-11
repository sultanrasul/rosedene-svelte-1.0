<script>
  // @ts-nocheck
  
    import { DatePicker } from '@svelte-plugins/datepicker';
    import { format, startOfHour } from 'date-fns';
    import { Search, UserCircle, CalendarDays, LucideMinus, Plus, Baby, UserRound, UserRoundIcon } from 'lucide-svelte';
    import FormInputs from '../../lib/components/formInputs.svelte';
    import { onMount } from 'svelte';
    import { toast } from 'svelte-sonner';
  import BlurFade from '@/components/BlurFade.svelte';
  
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
    let screenWidth = 800;
  
  
    export let children = 0;
    export let adults = 1;
    
    let dateFormatDMY = 'dd/MM/yyyy';
    let dateFormat = 'dd MMMM';
    let isOpenMobile = false;
    let isOpenDesktop = false;
    export let childrenAges = [];
    console.log(childrenAges);
    
    // function toggleDatePicker(){
    //   isOpenMobile = !isOpenMobile;
    //   isOpenDesktop = !isOpenDesktop
    // }

    function toggleDatePicker(){
      if (!isOpenMobile){
        isOpenMobile = true
      } else {
        isOpenMobile = false
      }

      if (!isOpenDesktop){
        isOpenDesktop = true
      } else {
        isOpenDesktop = false
      }
    }
  
  
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
    
    function callToast(){
      toast.warning('Minimum 2 Night Stay');
    }  
  
    $: {
      if (startDate && endDate) {
        const millisecondsPerDay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day
        if (Math.floor((endDate - startDate) / millisecondsPerDay) < 2){
          callToast();
          startDate = null;
          endDate = null;
          isOpenMobile = true;
          
        }
      }
    }
    $: {
      if (startDate && endDate) {
        const millisecondsPerDay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day
        if (Math.floor((endDate - startDate) / millisecondsPerDay) < 2){
          callToast();
          startDate = null;
          endDate = null;
          isOpenMobile = true;
          
        }
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

    const updateWidth = () => {
        screenWidth = window.innerWidth;
        console.log(screenWidth)
    };

    onMount(() => {
      updateWidth(); // Set initial width
      window.addEventListener('resize', updateWidth);
    })
  
  </script>
  
  <div class="min-w-[350px] flex items-center justify-center py-6 relative z-50">
    <BlurFade class="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-5 py-3 md:px-6 bg-white rounded-2xl md:rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 relative w-full md:w-auto">
        <!-- Date Input -->
        <div class=" w-full md:w-auto group">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
            class="text-base md:text-[17px] w-full flex items-center justify-center gap-2 cursor-pointer text-gray-700 hover:bg-gray-50 rounded-full px-4 py-2 transition-colors duration-200"
            on:click={toggleDatePicker}
            >
            <CalendarDays class="w-5 h-5  md:h-6 text-[#C09A5B] shrink-0" />
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
          {#if screenWidth <= 767}
                <DatePicker theme={"homepage-datepicker"} class="w-full" bind:isOpen={isOpenMobile} bind:startDate bind:endDate isRange isMultipane showYearControls={false} enableFutureDates enablePastDates={false}/>
          {/if}
        </div>
    
        <div class="md:w-px md:h-8 w-full h-px bg-gray-200/60"></div>
    
        <!-- Guest Input -->
        <div class="w-full md:w-auto group relative">
          <button 
            data-dropdown-toggle="dropdownDefaultCheckbox"
            
            class="text-gray-700 w-full flex items-center justify-center gap-2 md:gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded-full transition-colors duration-200"
          >
            <UserRoundIcon class="w-5 h-5 md:w-6 md:h-6 text-[#C09A5B] shrink-0" />
            <p class="text-base md:text-[17px] font-medium">
              {parseInt(adults, 10) + parseInt(children, 10)} 
              <span class="text-gray-500">Guest{(parseInt(adults, 10) + parseInt(children, 10)) > 1 ? 's' : ''}</span>
            </p>
          </button>
    
          <!-- Enhanced Dropdown Menu -->
          <div id="dropdownDefaultCheckbox"
          class={`text-black min-w-[240px] hidden z-50 absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white border-2 border-gray-200 rounded-lg shadow-xl`}
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
  
          <!-- In the Guest Input section, update the each loop and select elements: -->
          {#if children > 0}
            <div class="pt-4 space-y-3">
              <h4 class="text-sm font-medium text-gray-700">Children's Ages</h4>
              {#each childrenAges as age, index}
                <select
                  bind:value={childrenAges[index]}
                  class="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#C09A5B] focus:border-[#C09A5B]"
                >
                  <option value={-1}>Select Age</option>
                  {#each Array.from({ length: 18 }, (_, i) => i) as ageValue}
                    <option value={ageValue}>{ageValue} years old</option>
                  {/each}
                </select>
              {/each}
            </div>
          {/if}
          </div>
        </div>
        </div>
    
        <div class="md:w-px md:h-8 w-full h-px bg-gray-200/60"></div>
    
        <!-- Search Button -->
        <div class="w-full md:w-auto flex justify-center">
          {#if startDate && endDate}
            <button 
            on:click={() => 
              {
                const agesParam = childrenAges.map(age => `ages=${age}`).join('&');
                window.location.href = `/search?check_in=${formattedStartDateDMY}&check_out=${formattedEndDateDMY}&adults=${adults}&children=${children}&${agesParam}`;
              }} 
              class="flex items-center justify-center w-full md:w-12 h-12 bg-[#C09A5B] rounded-full md:rounded-full hover:bg-[#B08A4F] focus:outline-none focus:ring-2 focus:ring-[#C09A5B] focus:ring-offset-2 transition-all duration-200 px-6 md:px-0"
            >
              <span class="md:hidden text-white font-medium mr-2">Search</span>
              <Search class="w-5 h-5 text-white" />
            </button>
          {:else}
            <div class="w-full md:w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 cursor-not-allowed">
              <span class="md:hidden text-gray-400 font-medium mr-2">Search</span>
              <Search class="w-5 h-5 text-gray-400" />
            </div>
          {/if}
        </div>

    </BlurFade>
  </div>
  {#if screenWidth > 767}
    <div class="w-full justify-center flex">
      <DatePicker theme={"homepage-datepicker"} bind:isOpen={isOpenDesktop} bind:startDate bind:endDate isRange isMultipane showYearControls={false} enableFutureDates enablePastDates={false}/>
    </div>
  {/if}
  <!-- DatePicker Component -->
  <style>
    select:focus {
      outline: none;
      box-shadow: none;
  }
  
  :global(.datepicker[data-picker-theme="homepage-datepicker"]) {
        --datepicker-container-border: 1px solid #d5d5d534;
        --datepicker-container-background: #fff;
        --datepicker-container-box-shadow: 0 1px 20px rgba(0, 0, 0, 0.1);
        --datepicker-calendar-range-selected-background: #C09A5B;
        --datepicker-container-position: relative;

        --datepicker-calendar-day-color-disabled: rgba(255, 0, 43, 0.5);
        --datepicker-container-top: auto;

  
  
        
      }
      
  </style>