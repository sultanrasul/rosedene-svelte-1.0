
<script lang="ts">
  // @ts-nocheck
  import { currentPageIndex } from "./store";
  import { parse } from "date-fns";
  import { DateRangePicker } from "bits-ui";
  import { BACKEND_URL } from "../conf";
  import NumberTicker from "@/components/NumberTicker.svelte";
  import * as Dialog from "../../lib/components/ui/dialog";
  import * as Carousel from "../../lib/components/ui/carousel";
  import { format, isWithinInterval } from 'date-fns';
  import { innerWidth, innerHeight } from 'svelte/reactivity/window';
  
  import { apartments } from '../apartments';
  import { CalendarDays ,Info , LogIn, LogOut,Home, Building , BedDouble, Wifi, UtensilsCrossed, Ruler, TvMinimal, User, Moon, Banknote, WashingMachine, Check, Camera, ShowerHead, Monitor, Flower2, ParkingCircle, Users, PersonStanding, CigaretteOff, PawPrint, UserRoundIcon} from "lucide-svelte";
  import { amenities } from "./amenities";
  import Breadcrumb from "./components/Breadcrumb.svelte";
  import PriceFooter from "./components/mobile/PriceFooter.svelte";
  import ImageDisplay from "./components/desktop/imageDisplay.svelte";
  import MobileSlideshow from "./components/mobile/Slideshow.svelte";
  import PriceCard from "./components/desktop/PriceCard.svelte";
  import Amenities from "./components/information/Amenities/Amenities.svelte";
  import AmenitiesModel from "./components/information/Amenities/Model.svelte" ;
  import HouseRules from "./components/information/HouseRules.svelte";
  import GuestDetails from "./components/guestDetails.svelte";

  
  
  import SlideshowDesktop from "./components/desktop/Slideshow.svelte";
  
  import { onMount, tick } from 'svelte';
  import Navbar from '../Navbar.svelte';
  import DatePicker from '../DatePicker.svelte';
  import Slide from "flowbite-svelte/Slide.svelte";
  import TitleAndFeatures from "./components/information/TitleAndFeatures.svelte";
  import Overview from "./components/information/Overview.svelte";

  const updateWidth = () => {
      screenWidth = window.innerWidth;
  };

  onMount(() => {

    updateWidth(); // Set initial width
        window.addEventListener('resize', updateWidth);
    
        // Cleanup on component destruction
        return () => {
            window.removeEventListener('resize', updateWidth);

        };

  });



  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed
  };
  
  function parseDescription(description) {
    const details = description
    .split("\n")                  // Split the description by new lines
    .map((line) => line.trim())   // Trim leading and trailing whitespaces from each line
    .filter((line) => line !== ""); // Remove empty strings
    
    console.log("Parsed Description:", details);
    return details;
  }
  
  export let data;
  let galleryContainer;
  let startDate = parseDate(data.check_in); // Variable for start date as a Date object
  let endDate = parseDate(data.check_out); // Variable for start date as a Date object
  let apartmentDetails = data.apartment_details;
  let apartmentNumber = data.number;
  let guests = data.guests;
  let nights = data.nights;
  let adults = 1;
  let children = 0;
  let isModalOpen = false;
  let parsedDescription = parseDescription(data.apartmentDetails.description);
  let childrenAges = data.ages;
  let isOpen;

  let dateFormatDMY = 'dd/MM/yyyy';
  let dateFormat = 'dd MMMM';

  const formatDate = (dateString) =>
      dateString && format(new Date(dateString), dateFormat) || '';

  const formatDateDMY = (dateString) =>
      dateString && format(new Date(dateString), dateFormatDMY) || '';

  let dateFrom = {
    day: parseInt(formatDateDMY(startDate).split('/')[0]),
    month: parseInt(formatDateDMY(startDate).split('/')[1]),
    year: parseInt(formatDateDMY(startDate).split('/')[2])
  };

  let dateTo = {
    day: parseInt(formatDateDMY(endDate).split('/')[0]),
    month: parseInt(formatDateDMY(endDate).split('/')[1]),
    year: parseInt(formatDateDMY(endDate).split('/')[2])
  };

  let Prices = data.Prices;
  let displayPrice = calculateApartmentPrice(Prices);
  let initialPrice = 0;

  // Function to update the price with animation
  function updatePrice(newPrice) {
    initialPrice = displayPrice; // Set initialPrice to the current displayPrice
    displayPrice = newPrice; // Update displayPrice to the new value
  }
  
  let screenWidth = 800;





  
  function replacePathToSearch() {
    // Get the current URL
    const currentUrl = new URL(window.location.href);
  
    // Replace 'apartment' with 'search' in the pathname
    const newPathname = currentUrl.pathname.replace('apartment', 'search');
  
    // Construct the new URL
    const newUrl = `${currentUrl.origin}${newPathname}${currentUrl.search}`;
  
    // Redirect to the new URL
    window.location.href = newUrl;
  }
  
  function openModel(){
    isModalOpen = !isModalOpen;
  }

  function calculateApartmentPrice(prices) {
    console.log(prices)
    let totalPrice = 0;

    // Log to inspect the data
    console.log('Calculating price for', prices);

    // Check if prices is defined and contains the 'Season' property
    if (prices && prices["Season"]) {
        // Ensure prices["Season"] is an array
        if (!Array.isArray(prices["Season"])) {
            prices["Season"] = [prices["Season"]];
        }

        let currentDate = new Date(startDate);

        // Iterate over each night in the stay
        while (currentDate < endDate) {
            prices["Season"].forEach(season => {
                const seasonStart = new Date(season["@DateFrom"]);
                const seasonEnd = new Date(season["@DateTo"]);

                // Ensure valid dates are present
                if (!isNaN(seasonStart.getTime()) && !isNaN(seasonEnd.getTime())) {
                    const price = parseFloat(season.Price) || 0; // Default to 0 if price is missing
                    const extraCharge = parseFloat(season.Extra) || 0; // Default to 0 if extra charge is missing

                    // If the current night falls within a season range, add its price
                    if (seasonStart <= currentDate && currentDate <= seasonEnd) {
                        totalPrice += price;
                        console.log('Extra charge:', extraCharge);
                        // Add extra charge if there are more than 2 guests
                        if (guests > 2) {
                            totalPrice += extraCharge * (guests - 2);
                        }
                    }
                } else {
                    console.warn('Invalid date range for season:', season);
                }
            });
            currentDate.setDate(currentDate.getDate() + 1);  // Move to next night
        }
    } else {
        console.warn('No valid season data in prices:', prices);
    }

    return Math.floor(totalPrice);
}
  

  $: formattedStartDate = formatDate(startDate);
  $: formattedEndDate = formatDate(endDate);

  $: formattedStartDateDMY = formatDateDMY(startDate);
  $: formattedEndDateDMY = formatDateDMY(endDate);

  $: {
    if (startDate && endDate) {
      const millisecondsPerDay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day
      if (Math.floor((endDate - startDate) / millisecondsPerDay) < 2){
        callToastMinNights();
        startDate = null;
        endDate = null;
        isOpen = true;
        nights = 2;
        
      } else{
        nights = Math.floor((endDate - startDate) / millisecondsPerDay);
        const newPrice = calculateApartmentPrice(Prices);
        if (newPrice !== displayPrice) {
          updatePrice(newPrice); // Update price with animation
        }
        
        
        dateFrom = {
          day: parseInt(formatDateDMY(startDate).split('/')[0]),
          month: parseInt(formatDateDMY(startDate).split('/')[1]),
          year: parseInt(formatDateDMY(startDate).split('/')[2])
        };

        dateTo = {
          day: parseInt(formatDateDMY(endDate).split('/')[0]),
          month: parseInt(formatDateDMY(endDate).split('/')[1]),
          year: parseInt(formatDateDMY(endDate).split('/')[2])
        };

        let url;
        if (typeof window !== "undefined") {
          url = new URL(window.location.href);
          url.searchParams.set('check_in', formatDateDMY(startDate));
          url.searchParams.set('check_out', formatDateDMY(endDate));
          window.history.replaceState({}, '', url);
        }
      }
    }
    
  }

  $: {
    if (adults || children) {

      guests = parseInt(adults, 10) + parseInt(children, 10);
      const newPrice = calculateApartmentPrice(Prices);
      if (newPrice !== displayPrice) {
        updatePrice(newPrice); // Update price with animation
      }

      
    }
  }

  async function bookNow (){
    console.log("testing")
    try {
      const response = await fetch(`${BACKEND_URL}/create-checkout-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              date_from: dateFrom,
              date_to: dateTo,
              property_id: data.apartmentDetails.id,
              adults: adults,
              children: children,
              childrenAges: childrenAges,
              url: window.location.href
          }),
      });
      console.log(response);

      // Check if the response is not OK (non-2xx status code)
      if (!response.ok) {
          // Retrieve the error data and throw a custom error with status and details
          const errorData = await response.json(); // This assumes the error response contains more details
          throw {
              status: response.status,
              statusText: response.statusText,
              message: errorData.error || 'Unknown error', // Customize based on your error structure
              data: errorData,
          };
      }

      // If the response is successful, parse the checkout URL
      const checkoutURL = await response.json();
      window.open(checkoutURL.url, "_self");
      console.log(checkoutURL.url);


    } catch (error) {
        // Log detailed error information
        if (error.status == 420) {
          callToastError("This apartment is not available for these dates! Please Refresh the page or select other dates.")
          startDate = null;
          endDate = null;
        }


        // Optionally, handle specific errors (e.g., show alert to the user)
    }

  }

  // Scroll and flash logic
  function scrollToGuestDetails() {
      // Scroll to component
      const guestDetails = document.getElementById('guestDetails');
      guestDetails?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
      });

      // Flash guest control buttons
      const flashButtons = () => {

        const elements = document.querySelectorAll('#flashGuestsInput');
    
        const flash = (element) => {
          element.style.transition = 'border-color 0.5s ease';
          setTimeout(() => {
            element.style.borderColor = '#C09A5B';
            setTimeout(() => {
              element.style.borderColor = '#e5e7eb';
              setTimeout(() => {
                element.style.borderColor = '#C09A5B';
                setTimeout(() => {
                  element.style.borderColor = '#e5e7eb';
                }, 400);
              }, 400);
            }, 400);
          }, 0);
        };

        elements.forEach(flash);

      };

      // Wait for scroll to complete
      setTimeout(flashButtons, 500);
  }




  function callToastMinNights(){
    const toastMarkup2 = `
    <!-- Toast -->
      <div class="bg-white max-w-xs border border-[2px] text-sm  rounded-lg border-[#C09A5B] text-[#C09A5B]" role="alert" tabindex="-1" aria-labelledby="hs-toast-soft-color-red-label">
        <div id="hs-toast-soft-color-red-label" class="flex p-3">
          
          <p class="text-sm inline-flex">         
            <svg class="lucide lucide-calendar-days inline-flex" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
            <span class="mt-[4px] ml-1">Minimum 2 Night Stay</span>
          </p>


          </div>
        </div>
      </div>
    <!-- End Toast -->
    `;

    Toastify({
      text: toastMarkup2,
      className: "border-neutral-700 text-neutral-400 max-w-[210px] hs-toastify-on:opacity-100 opacity-0 fixed -top-[150px] right-[20px] z-[90] transition-all duration-300 w-[320px] text-sm border rounded-xl shadow-lg [&>.toast-close]:hidden ",
      duration: 3000,
      close: false,
      escapeMarkup: false
    }).showToast();
  }  
  
  function callToastError(message){
    const toastMarkup2 = `
    <!-- Toast -->
      <div class="bg-white max-w-xs border border-[4px] text-sm  rounded-lg border-red-700 text-[#C09A5B]" role="alert" tabindex="-1" aria-labelledby="hs-toast-soft-color-red-label">
        <div id="hs-toast-soft-color-red-label" class="flex p-3">
          
          <p class="text-sm inline-flex">         
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-flex lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
            <span class="mt-[4px] ml-1">${message}</span>
          </p>


          </div>
        </div>
      </div>
    <!-- End Toast -->
    `;

    Toastify({
      text: toastMarkup2,
      className: "border-neutral-700 text-neutral-400  hs-toastify-on:opacity-100 opacity-0 fixed -top-[150px] right-[20px] z-[90] transition-all duration-300 w-[320px] text-sm border rounded-xl shadow-lg [&>.toast-close]:hidden ",
      duration: 3000,
      close: false,
      escapeMarkup: false
    }).showToast();
  }  

</script>
    

  <!-- Main Menu -->
    
    <div class="relative bg-primary-100 dark:bg-[#233441] min-h-screen " id="Home">
      <Navbar/>
      <div class="relative z-10 pt-0 mt-0 pb-20 sm:pl-0 sm:pr-0 md:pl-5 md:pr-5 lg:pl-10 lg:pr-10 xl:pl-40 xl:pr-40">
        

        <!-- Breadcrumb -->
         <div class="pt-8 hidden md:block">
           <Breadcrumb apartmentName={data.apartmentDetails.name}/>
         </div>

      


        {#if screenWidth < 768 }
          <MobileSlideshow images={data.apartmentDetails.amountOfPictures} apartmentNumber = {data.number}/>
          <PriceFooter 
            bind:displayPrice={displayPrice}
            bind:initialPrice={initialPrice}
            bind:nights={nights}
            bind:childrenAges={childrenAges}
            bind:children={children}
            bind:startDate={startDate}
            bind:endDate={endDate}
            bookNow={bookNow}
          />
          
          
          {:else}
          <ImageDisplay apartmentNumber={data.number} openModel={openModel}/>
          
          {/if}
          
          
          
          <!-- info -->
          <!-- Information Section -->
          <div class="flex flex-wrap mt-0 justify-between">
            <div class="bg-white rounded-b-lg md:rounded-lg shadow-lg p-6 pt-6  w-full md:w-[66.4%]">

            <div class="p-0 block md:hidden">
              <Breadcrumb apartmentName={data.number}/>
            </div>

            <!-- Property Title & Key Points -->
             <TitleAndFeatures
              apartmentName={data.apartmentDetails.name}
              maxGuests={data.apartmentDetails.maxGuests}
              bedrooms={data.apartmentDetails.bedrooms}
              bathrooms={data.apartmentDetails.bathrooms}
             />
            
            <hr class="h-px my-8 bg-[#C09A5B] border-0 ">
            
            <!-- Overview Section -->
            <Overview parsedDescription={parsedDescription}/>

            <div class="text-black">
              <div class="block md:hidden" >
                <hr class="h-px my-8 bg-[#C09A5B] border-0">
                  <GuestDetails 
                    bind:disabledDates={data.disabledDates} 
                    bind:childrenAges={childrenAges} 
                    bind:startDate={startDate} 
                    bind:endDate={endDate} 
                    bind:children={children} 
                    bind:adults={adults}
                    dropdownID={"mobile"}
                  />              
              </div>
            </div>


            <hr class="h-px my-8 bg-[#C09A5B] border-0 ">
            
            
            <!-- Amenities Section -->
            <Amenities/>

            <hr class="h-px my-8 bg-[#C09A5B] border-0 ">


            <!-- House Rules -->
             <HouseRules/>

            
            
          </div>

          
          <!-- Price Card -->
          {#if screenWidth >= 768 }
            <PriceCard
              bind:displayPrice={displayPrice}
              bind:initialPrice={initialPrice}
              bind:nights={nights}
              bind:childrenAges={childrenAges}
              bind:startDate={startDate}
              bind:endDate={endDate}
              bind:children={children}
              bind:adults={adults}
              bind:disabledDates={data.disabledDates}
              bookNow={bookNow}
            />
          {/if}

        </div>

      </div>
    </div>


  <!-- Full Gallary -->
  {#if isModalOpen}
    <div class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
        <div class="relative w-full h-full">
            <button on:click={() => {isModalOpen = !isModalOpen;}} class="absolute top-4 right-4 text-white text-2xl font-bold">×</button>
            <div class="w-full h-full flex justify-center items-center">
                <SlideshowDesktop bind:images={data.apartmentDetails.amountOfPictures} apartmentNumber = {apartmentNumber}/>
            </div>
        </div>
    </div>
  {/if}
  
  <!-- Amenities Modal -->
  <AmenitiesModel/>
  

  <style>

    ::-webkit-scrollbar {
      width: 8px; /* Width of the scrollbar */
    }
  
    ::-webkit-scrollbar-thumb {
      background-color: #C09A5B; /* Color of the scrollbar thumb */
      border-radius: 4px; /* Rounded corners */
    }
    
    ::-webkit-scrollbar-track {
      background-color: #c0995b7c; /* Color of the scrollbar track */
      border-radius: 4px; /* Rounded corners */
    }


    
  </style>
  
  