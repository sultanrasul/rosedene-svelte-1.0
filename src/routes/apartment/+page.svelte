
<script lang="ts">
  



  // @ts-nocheck
  import * as Dialog from "../../lib/components/ui/dialog";
  import * as Carousel from "../../lib/components/ui/carousel";
  import { apartments } from '../apartments';
  import { CalendarDays ,Info , LogIn, LogOut,Home, Building , BedDouble, Wifi, UtensilsCrossed, Ruler, TvMinimal, User, Moon, Banknote, WashingMachine, Check, Camera, ShowerHead, Monitor, Flower2, ParkingCircle, Users, PersonStanding, CigaretteOff, PawPrint} from "lucide-svelte";
  import { amenities } from "./amenities";
  import GuestDetails from "./guestDetails.svelte";
  import { format } from 'date-fns';
  import { innerWidth, innerHeight } from 'svelte/reactivity/window';


  
  import SlideshowDesktop from "./DesktopSlideshow.svelte";
  
  import { onMount, tick } from 'svelte';
  import Navbar from '../Navbar.svelte';
  import DatePicker from '../DatePicker.svelte';
  import Slide from "flowbite-svelte/Slide.svelte";

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
  
  let screenWidth = 800;

  import { currentPageIndex } from "./store";
  import { parse } from "date-fns";
    import MobileSlideshow from "./MobileSlideshow.svelte";
    import { DateRangePicker } from "bits-ui";
    import { BACKEND_URL } from "../conf";
  let galleryContainer;




  
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
  
  function openModel(imageIndex){
    currentPageIndex.set(imageIndex); // Update the store
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
        displayPrice = calculateApartmentPrice(Prices)
        
        
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

      guests = parseInt(adults, 10) + parseInt(children, 10)
      displayPrice = calculateApartmentPrice(Prices)

      
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
      <Navbar />
      <div class="relative z-10 pb-20 sm:pl-0 sm:pr-0 md:pl-5 md:pr-5 lg:pl-10 lg:pr-10 xl:pl-40 xl:pr-40">
        

        <!-- Breadcrumb -->
        <ol class="flex items-center whitespace-nowrap pb-4 pl-3">
          <li class="inline-flex items-center">
            <a on:click={() => {window.location.href = "/"} } class="flex items-center text-sm text-gray-500 hover:text-[#C09A5B] focus:outline-none  " href="#">

              <Home size="24px" class="shrink-0 me-3 size-4"/>
              Home
            </a>
            <svg class="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </li>
          <li class="inline-flex items-center">
            <a on:click={replacePathToSearch} class="flex items-center text-sm text-gray-500 hover:text-[#C09A5B] focus:outline-none" href="#">
              <Building size="24px" class="shrink-0 me-3 size-4"/>
              Apartments
              <svg class="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </a>
          </li>
          <li class="inline-flex items-center text-sm font-semibold truncate text-[#C09A5B]" aria-current="page">
            {data.apartmentDetails.name}
          </li>
        </ol>
      

        <div class="block md:hidden">
          <MobileSlideshow images={data.apartmentDetails.amountOfPictures} apartmentNumber = {data.number}/>
        </div>
        {#if screenWidth < 768 }

            <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
              </span>
              <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                  <li>
                      <a href="#" class="hover:underline me-4 md:me-6">About</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline">Contact</a>
                  </li>
              </ul>
          </footer>
        
          {:else}
            <div class="flex flex-col md:flex-row md:space-x-5">
              <div class="w-full items-center justify-center text-center relative">
                <div class="pb-5">
                  <div class="grid grid-cols-3 gap-4 pt-2">
                    <!-- Selected Image Display -->
                    <div class="col-span-2 flex justify-center items-center">
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div class="group relative inline-block cursor-pointer" on:click={openModel(0)}>
                          <img 
                              class="h-auto max-w-full rounded-lg transition-all" 
                              src="{data.number}/0.jpg" 
                              alt=""
                          >
                          <div 
                              class="absolute inset-0 bg-[#C09A5B] opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"
                          ></div>
                        </div>
                    </div>
                
                    <!-- Thumbnail Gallery -->
                    <div bind:this={galleryContainer} class="col-span-1 flex flex-col space-y-4 hidden md:block">
                      {#if apartmentNumber}
                        {#each Array(2).fill().map((_, i) => i + 1) as i}
                          <!-- svelte-ignore a11y_click_events_have_key_events -->
                          <!-- svelte-ignore a11y_no_static_element_interactions -->
                          <div class="group relative inline-block cursor-pointer" on:click={openModel(i)}>
                            <img 
                              class="h-auto max-w-full rounded-lg transition-all" 
                              src={`/${apartmentNumber}/${i}.jpg`} 
                              alt=""
                            >
                            <div 
                              class="absolute inset-0 bg-[#C09A5B] opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"
                            ></div>
                          </div>
                        {/each}
                      {/if}
                    </div>
                  </div>
                </div>
            
                <!-- "View All" Button -->
                <button 
                  class="inline-flex absolute bottom-10 right-5 mb-0 mr-0 bg-white text-[#C09A5B] px-4 py-2 rounded-lg shadow-md hover:bg-[#C09A5B] hover:text-white transition duration-300"
                  on:click={openModel(1)}
                >
                  <Camera class="mr-2"/> View all
                </button>
              </div>
            </div>
        {/if}
        
        
        
        <!-- info -->
        <!-- Information Section -->
        <div class="flex flex-wrap mt-0 justify-between">
          <div class="bg-white rounded-b-lg md:rounded-lg shadow-lg p-6 w-full md:w-[66.4%]">

            <!-- Property Title & Key Points -->
            <div>
              <!-- Title -->
              <h2 class="text-4xl font-bold text-[#C09A5B] mb-4">{data.apartmentDetails.name}</h2>
              
              <!-- Features -->
              <div class="flex flex-wrap gap-2 mb-4 ">
                <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full text-gray-900">
                  <User size="22px" class="pr-1" /> {data.apartmentDetails.maxGuests} Guests
                </span>
                <!-- <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full text-gray-900">
                  <TvMinimal size="22px" class="pr-1" /> {apartmentDetails?.tvSize}" Flat-screen TV
                </span> -->
                <!-- <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full text-gray-900">
                  <Ruler size="22px" class="pr-1" /> {apartmentDetails?.squareFeet} Feet²
                </span> -->
                {#if data.apartmentDetails.bedrooms !== 0}
                <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full text-gray-900">
                  <BedDouble size="22px" class="pr-1" /> {data.apartmentDetails.bedrooms} Bedroom{data.apartmentDetails.bedrooms > 1 ? 's' : ''}
                </span>
                {/if}
                <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pr-1 lucide lucide-toilet">
                    <path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18" />
                    <path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" />
                  </svg>
                  {data.apartmentDetails.bathrooms} Bathroom{data.apartmentDetails.bathrooms > 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            <hr class="h-px my-8 bg-[#C09A5B] border-0 ">
            
            <!-- Overview Section -->
            <div class="mb-6">
              <h2 class="text-3xl font-bold text-black mb-4">Overview</h2>
              
              <p class="text-sm text-gray-600">  
                {#each parsedDescription?.slice(0, 2) as line}
                  {line}
                  <br><br>
                {/each}
              </p>

              
              <!-- Read More Section -->
              <div>
                <div id="hs-show-hide-collapse-heading" class="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-show-hide-collapse">
                  <p class="text-sm text-gray-600 mt-4">
      
                    {#each parsedDescription?.slice(2) as line}
                      {line}
                      <br><br>
                    {/each}        
      
                  </p>
                </div>
                
                <p class="mt-4">
                  <button 
                    type="button" 
                    class="{parsedDescription?.length > 2 ? '' : 'hidden'} hs-collapse-toggle inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-[#C09A5B] hover:underline focus:outline-none focus:underline focus:text-[#C09A5B] disabled:opacity-50 disabled:pointer-events-none" 
                    id="hs-show-hide-collapse" 
                    aria-expanded="false" 
                    aria-controls="hs-show-hide-collapse-heading" 
                    data-hs-collapse="#hs-show-hide-collapse-heading">
                    <span class="hs-collapse-open:hidden">Read more</span>
                    <span class="hs-collapse-open:block hidden">Read less</span>
                    <svg class="hs-collapse-open:rotate-180 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                </p>
              </div>

            </div>

            {#if screenWidth < 768 }
              <hr class="h-px my-8 bg-[#C09A5B] border-0 ">
              
              <GuestDetails class="text-black" bind:childrenAges={childrenAges} bind:startDate={startDate} bind:endDate={endDate} bind:children={children} bind:adults={adults}/>
            {/if}

            <hr class="h-px my-8 bg-[#C09A5B] border-0 ">
            
            
            <!-- Amenities Section -->
            <div  aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-scale-animation-modal" data-hs-overlay="#hs-scale-animation-modal">
              <h2 class="text-3xl font-bold text-black mb-4">Amenities</h2>
              <div class="grid grid-cols-2 gap-4 text-gray-700 text-sm">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-volume-off mr-2 w-[30px] h-[30px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M16 9a5 5 0 0 1 .95 2.293"/><path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"/><path d="m2 2 20 20"/><path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"/><path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686"/></svg>
                  <span>Soundproofing</span>
                </div>
                <div class="flex items-center">
                  <ParkingCircle class="w-[30px] h-[30px] mr-2" />
                  <span>Free on-site parking</span>
                </div>
                <div class="flex items-center">
                  <ShowerHead class="mr-2 w-[30px] h-[30px]"/>
                  <span>Private bathroom</span>
                </div>
                <div class="flex items-center">
                  <Wifi class="w-[30px] h-[30px] mr-2" />
                  <span>Free WiFi</span>
                </div>
                <div class="flex items-center">
                  <UtensilsCrossed class="w-[30px] h-[30px] mr-2" />
                  <span>Kitchen</span>
                </div>
                <div class="flex items-center">
                  <WashingMachine class="w-[30px] h-[30px] mr-2" />
                  <span>Washing machine</span>
                </div>
                <div class="flex items-center">
                  <Monitor class="w-[30px] h-[30px] mr-2" />
                  <span>Flat screen TV</span>
                </div>
                <div class="flex items-center">
                  <Flower2 class="w-[30px] h-[30px] mr-2" />
                  <span>Garden</span>
                </div>
              </div>
              <button class="mt-4 px-4 py-2 border border-gray-300 rounded-full text-gray-600 text-sm hover:bg-gray-100">
                Show all amenities
              </button>
            </div>

            <hr class="h-px my-8 bg-[#C09A5B] border-0 ">


            <!-- House Rules -->
            <div class="house-rules space-y-4 text-black p-3">
              <h2 class="text-2xl font-bold mb-6">House Rules</h2>
              <div class="space-y-4 ">

                <div class="flex items-start">
                  <span class="w-60 font-medium "> <LogIn class="inline-flex mr-1"/>  Check-in</span>
                  <div class="flex-1">
                    <span class="text-sm">From 16:00</span>
                    <p class="text-gray-500 text-sm mt-1">
                      You'll need to let the property know in advance what time you'll arrive.
                    </p>
                  </div>
                </div>

                <hr class="h-px my-8 bg-gray-300 border-0 ">
                
                <div class="flex items-start">
                  <span class="w-60 font-medium"> <LogOut class="inline-flex mr-1"/> Check-out</span>
                  <span class="flex-1 text-sm">Until 10:00</span>
                </div>

                <hr class="h-px my-8 bg-gray-300 border-0 ">
                
                <div class="flex items-start">
                  <span class="w-60 font-medium "><Info class="inline-flex mr-1"/> Cancellation/Prepayment
                  </span>
                  <span class="flex-1 text-sm w-2">
                    Cancellation and prepayment policies vary depending on apartment
                    type. Please check the conditions of your required room.
                  </span>
                </div>
                
                <hr class="h-px my-8 bg-gray-300 border-0 ">
                
                <div class="flex items-start">
                  <span class="w-60"><Users class="inline-flex mr-1"/>Children and Beds</span>
                  <div class="flex-1">
                    <span class="text-md font-bold">Child policies</span>
                    <p class="text-sm pt-4">Children of any age are welcome.</p>
                    <p class="text-sm pt-4">To see correct prices and occupancy information, please add the number of children in your group and their ages to your search.</p>
                    <p class="text-md font-bold pt-4">Cot and extra bed policies</p>
                    <p class="text-sm pt-4">Cots and extra beds are not available at this property.</p>
                  </div>
                </div>

                <hr class="h-px my-8 bg-gray-300 border-0 ">
                
                <div class="flex items-start">
                  <span class="w-60 font-medium"><PersonStanding class="inline-flex mr-1"/>No Age Restriction</span>
                  <span class="flex-1 text-sm">There is no age requirement for check-in</span>
                </div>
                
                <hr class="h-px my-8 bg-gray-300 border-0 ">
                
                <div class="flex items-start">
                  <span class="w-60 font-medium"> <CigaretteOff class="inline-flex mr-1"/> Smoking</span>
                  <span class="flex-1 text-sm">Smoking is not allowed.</span>
                </div>
                              
                <hr class="h-px my-8 bg-gray-300 border-0 ">

                <div class="flex items-start">
                  <span class="w-60 font-medium"> <PawPrint class="inline-flex mr-1"/> Pets</span>
                  <span class="flex-1 text-sm">Pets are not allowed.</span>
                </div>
              </div>
            </div>
            
          </div>

          
          <!-- Price Card -->
          {#if screenWidth > 768 }
            <div class="w-[28%] text-black self-start sticky top-6 hidden md:block">
              <div class="bg-white border-2 border-gray-100 rounded-xl shadow-xl p-6">
                <!-- Price Display -->
                <div class="mb-6">
                  <div class="flex items-baseline gap-2">
                    <span class="text-4xl font-bold text-[#C09A5B]">£{displayPrice}</span>
                    <span class="text-lg text-gray-500">/{nights} nights</span>
                  </div>
                  <!-- <div class="text-sm text-gray-400 mt-1">Total includes taxes and charges</div> -->
                  <div class="flex items-center text-sm text-gray-500 mt-1">
                    <Banknote class="w-4 h-4 mr-2 text-[#C09A5B]" />
                    <span class="text-sm text-gray-400">Total includes taxes and charges</span>

                  </div>
                </div>
                
            
                <!-- Guest Details -->
                <div class="mb-6">
                  <GuestDetails 
                    bind:disabledDates={data.disabledDates} 
                    bind:childrenAges={childrenAges} 
                    bind:startDate={startDate} 
                    bind:endDate={endDate} 
                    bind:children={children} 
                    bind:adults={adults}
                  />
                </div>
            
                <!-- Validation Messages -->
                <div class="space-y-3 mb-6">
                  {#if childrenAges.filter(age => age !== -1).length != children}
                    <div class="flex items-center text-sm text-red-500">
                      <Info class="w-4 h-4 mr-2" />
                      <span>Please specify ages for all children</span>
                    </div>
                  {/if}
                  
                  {#if !(startDate && endDate)}
                    <div class="flex items-center text-sm text-red-500">
                      <Info class="w-4 h-4 mr-2" />
                      <span>Please select your dates</span>
                    </div>
                  {/if}
            

                </div>
            
                <!-- Book Now Button -->
                <button 
                  class={`w-full py-3 rounded-xl font-semibold transition-all duration-200
                    ${(childrenAges.filter(age => age !== -1).length != children) || !(startDate && endDate) ?
                      'bg-[#C09A5B]/30 text-gray-400 cursor-not-allowed' :
                      'bg-[#C09A5B] hover:bg-[#B08A4F] text-white shadow-md hover:shadow-lg'
                    }`}
                  disabled={(childrenAges.filter(age => age !== -1).length != children) || !(startDate && endDate)}
                  on:click={() => bookNow()}
                >
                  Book Now
                </button>
              </div>
            </div>
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
  <div id="hs-scale-animation-modal" class="hs-overlay hidden fixed inset-0 z-[80] flex items-center justify-center pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="hs-scale-animation-modal-label">
    <div class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 w-full max-w-full sm:max-w-2xl lg:max-w-4xl flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
      <div class="flex justify-between items-center py-3 px-4 border-b border-[#C09A5B]">
        <h3 id="hs-scale-animation-modal-label" class="pt-2 pl-2 font-bold text-[#C09A5B] text-xl">
          All Amenities
        </h3>
        <button type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none" aria-label="Close" data-hs-overlay="#hs-scale-animation-modal">
          <span class="sr-only">Close</span>
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
  
      <!-- All Amenities -->

      <div class="p-5 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {#each amenities as {category, icon, items} }
          <div class="mt-5 text-black">
            <div class="flex items-center font-bold text-xl">
              {#if typeof icon === 'string'}
                {@html `<div class="mr-2">${icon}</div>`}
              {:else}
                <svelte:component this={icon} class="w-6 h-6 mr-2" />
              {/if}
              {category}
            </div>
            <!-- Display items side-by-side on larger screens -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
              {#each items as item}
                <div class="text-black">
                  <p class="inline-flex"><Check class="mr-2" /> {item}</p>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  

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
  
  