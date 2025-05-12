
<script lang="ts">
    // @ts-nocheck

    export let data;
    const number = data.number
    const apartmentDetails = data.apartmentDetails

    console.log(data);

    import { currentPageIndex } from "../store";
    import { parse } from "date-fns";
    import { DateRangePicker } from "bits-ui";
    import { BACKEND_URL } from "../../conf";
    import NumberTicker from "@/components/NumberTicker.svelte";
    import * as Dialog from "../../../lib/components/ui/dialog";
    import * as Carousel from "../../../lib/components/ui/carousel";
    import { format, isWithinInterval } from 'date-fns';
    import { innerWidth, innerHeight } from 'svelte/reactivity/window';
    import { page } from '$app/stores'; // Import the page store to access URL data
    import { Toaster, toast } from 'svelte-sonner'


    import { apartments } from '../../apartments';
    import { CalendarDays ,Info , LogIn, LogOut,Home, Building , BedDouble, Wifi, UtensilsCrossed, Ruler, TvMinimal, User, Moon, Banknote, WashingMachine, Check, Camera, ShowerHead, Monitor, Flower2, ParkingCircle, Users, PersonStanding, CigaretteOff, PawPrint, UserRoundIcon} from "lucide-svelte";
    import { amenities } from "../amenities";
    import Breadcrumb from "../components/Breadcrumb.svelte";
    import PriceFooter from "../components/mobile/PriceFooter.svelte";
    import ImageDisplay from "../components/desktop/ImageDisplay.svelte";
    import MobileSlideshow from "../components/mobile/Slideshow.svelte";
    import PriceCard from "../components/desktop/PriceCard.svelte";
    import Amenities from "../components/information/Amenities/Amenities.svelte";
    import AmenitiesModel from "../components/information/Amenities/Model.svelte" ;
    import HouseRules from "../components/information/HouseRules.svelte";
    import GuestDetails from "../components/guestDetails.svelte";
  
    
    
    import SlideshowDesktop from "../components/desktop/Slideshow.svelte";
    
    import { onMount, tick } from 'svelte';
    import Navbar from '../../Navbar.svelte';
    import TitleAndFeatures from "../components/information/TitleAndFeatures.svelte";
    import Overview from "../components/information/Overview.svelte";
    import BlurFade from "@/components/BlurFade.svelte";
    import Footer from "../../Footer.svelte";
    import { calculateApartmentPrice } from "../../calculateApartmentPrice";
  
  
  
    const parseDate = (dateStr) => {
      if (dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed
      }
      return ""
    };
    
    function parseDescription(description) {
      const details = description
      .split("\n")                  // Split the description by new lines
      .map((line) => line.trim())   // Trim leading and trailing whitespaces from each line
      .filter((line) => line !== ""); // Remove empty strings
      
      console.log("Parsed Description:", details);
      return details;
    }
    
    const url = $page.url;
    // const number = url.searchParams.get('number');
    const check_in = url.searchParams.get('check_in');
    const check_out = url.searchParams.get('check_out');
    // const apartmentDetails = apartments[number];
    let adults = url.searchParams.get('adults');
    let nights = Math.floor((parseDate(check_out) - parseDate(check_in)) / (1000 * 60 * 60 * 24));
    let children = url.searchParams.get('children');
    let childrenAges = children ? url.searchParams.getAll('ages').map(Number) : []; // Convert ages to an array of numbers
    let guests = (adults ? parseInt(adults, 10) : 0) + (children ? parseInt(children, 10) : 0);
    let disabledDates = [];
    
    const parsedDescription = parseDescription(apartmentDetails.description);
    let startDate = parseDate(check_in); // Variable for start date as a Date object
    let endDate = parseDate(check_out); // Variable for start date as a Date object
    let dateFormatDMY = 'dd/MM/yyyy';
    let dateFormat = 'dd MMMM';
    let isModalOpen = false;
    let isOpen;
    let loading = true;
    let bookNowLoading = false;
    let error = null;
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
  
    let Prices;
    let displayPrice;
    let initialPrice = 0;
    let screenWidth = 800;
  
    // Function to update the price with animation
    function updatePrice(newPrice) {
      initialPrice = displayPrice; // Set initialPrice to the current displayPrice
      displayPrice = newPrice; // Update displayPrice to the new value
    }
  
    function openModel(){
      isModalOpen = !isModalOpen;
    }


    // Fetch apartment price
    // @ts-ignore
    async function fetchApartmentPrice(propertyId) {
      try {
        const response = await fetch(`${BACKEND_URL}/check_price`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ property_id: propertyId }),
        });

        if (!response.ok) throw new Error('Price check failed');
        return await response.json();
      } catch (err) {
        console.error('Failed to fetch apartment price:', err);
        throw err;
      }
    }

    // Fetch blocked apartments
    // @ts-ignore
    async function fetchBlockedApartments(propertyId) {
      try {
        const response = await fetch(`${BACKEND_URL}/check_calendar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ property_id: propertyId }),
        });

        if (!response.ok) throw new Error('Calendar check failed');
        const data = await response.json();

        // Sort dates chronologically
        const sortedData = data.sort((a, b) => a["@Date"].localeCompare(b["@Date"]));

        // Extract original blocked dates
        const originalBlocked = sortedData
          .filter(item => item.IsBlocked === "true")
          .map(item => item["@Date"]);

        // Track sequences of available dates
        let currentSequence = [];
        const availableSequences = [];
        
        for (const item of sortedData) {
          if (item.IsBlocked === "false") {
            currentSequence.push(item["@Date"]);
          } else {
            if (currentSequence.length) {
              availableSequences.push(currentSequence);
              currentSequence = [];
            }
          }
        }
        if (currentSequence.length) availableSequences.push(currentSequence);

        // Block short sequences (length < 3)
        const additionalBlocked = availableSequences
          .filter(seq => seq.length < 3)
          .flat();

        // Combine and dedupe
        const finalBlocked = [...new Set([...originalBlocked, ...additionalBlocked])];
        
        return finalBlocked;
      } catch (err) {
        console.error('Failed to fetch blocked apartments:', err);
        throw err;
      }
    }

    const updateWidth = () => {
        screenWidth = window.innerWidth;
    };
  
    onMount(async () => {
      updateWidth(); // Set initial width
      window.addEventListener('resize', updateWidth);
      
      try {
        // Validate required parameters
        if (!adults || !children) {
            adults = 1;
            children = 0;
          // throw new Error('Missing required URL parameters');
        }
        // Get apartment details
        if (!apartmentDetails) throw new Error('Invalid apartment number');

        // Fetch price and calendar data
        const [prices, blocked] = await Promise.all([
          fetchApartmentPrice(apartmentDetails.id),
          fetchBlockedApartments(apartmentDetails.id),
        ]);

        Prices = prices["Prices"];
        console.log(prices);
        disabledDates = blocked;
        error = null;
        } catch (err) {
        error = err.message;
        } finally {
        loading = false;
        }
      
      // Cleanup on component destruction
      return () => {
          window.removeEventListener('resize', updateWidth);

      };
  
    });

    
    async function bookNow (){
      console.log(window.location.href)
      const currentUrl = window.location.href;
    if (currentUrl.includes('apartment')) {
      const newUrl = currentUrl.replace('apartment', 'book');
      // window.history.replaceState({}, '', newUrl);
      // Or if you want to redirect:
      window.location.replace(newUrl);
    }
      console.log("testing")
      try {
        bookNowLoading = true;
        const response = await fetch(`${BACKEND_URL}/create-checkout-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date_from: dateFrom,
                date_to: dateTo,
                property_id: apartmentDetails.id,
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
          } else {
            callToastError(`An error has occured, ${error.message}`)
            }
  
  
          // Optionally, handle specific errors (e.g., show alert to the user)
      } finally {
        bookNowLoading = false;
      }
  
    }
  
  
  
  
    function callToastMinNights(){
      toast.warning('Minimum 2 Night Stay');
      
    }  
    
    function callToastError(message){
      toast.error(message);

    }  
  
    // --- Date formatters ---
    $: formattedStartDate = formatDate(startDate);
    $: formattedEndDate = formatDate(endDate);
    $: formattedStartDateDMY = formatDateDMY(startDate);
    $: formattedEndDateDMY = formatDateDMY(endDate);

    // --- Reactive guest calculation ---
    $: guests = parseInt(adults, 10) + parseInt(children, 10);

    // --- Handle short stays and date-related updates ---
    $: if (startDate && endDate) {
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const stayLength = Math.floor((endDate - startDate) / millisecondsPerDay);

      if (stayLength < 2) {
        callToastMinNights();
        startDate = null;
        endDate = null;
        isOpen = true;
        nights = 2;
      } else {
        nights = stayLength;

        // Update price only if it's changed
        const newPrice = calculateApartmentPrice(Prices, guests, startDate, endDate);
        if (newPrice !== displayPrice) {
          updatePrice(newPrice);
        }

        // Set check-in/out objects
        const [dayFrom, monthFrom, yearFrom] = formatDateDMY(startDate).split('/').map(Number);
        const [dayTo, monthTo, yearTo] = formatDateDMY(endDate).split('/').map(Number);

        dateFrom = { day: dayFrom, month: monthFrom, year: yearFrom };
        dateTo = { day: dayTo, month: monthTo, year: yearTo };

        // Update URL params (only in browser)
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.set('check_in', formatDateDMY(startDate));
          url.searchParams.set('check_out', formatDateDMY(endDate));
          window.history.replaceState({}, '', url);
        }
      }
    }

    // --- Fallback price update if only guests change (e.g., no dates yet selected) ---
    $: if (Prices && guests && !startDate && !endDate) {
      const newPrice = calculateApartmentPrice(Prices, guests);
      if (newPrice !== displayPrice) {
        updatePrice(newPrice);
      }
    }

  

  </script>
  
  <!-- This is the main container that now always shows, regardless of loading/error state -->
<div class="relative bg-primary-100 dark:bg-[#233441] min-h-[100dvh]" id="Home">
  <div class="z-[50]">
    <Navbar/> 
  </div>
  
  <div class="relative z-10 pt-0 mt-0 pb-20 sm:pl-0 sm:pr-0 md:pl-5 md:pr-5 lg:pl-10 lg:pr-10 xl:pl-40 xl:pr-40">
    <!-- Breadcrumb -->
    <div class="pt-8 hidden md:block">
      <Breadcrumb apartmentName={apartmentDetails?.name}/>
    </div>

    {#if screenWidth < 768 }
      <BlurFade>
        <MobileSlideshow images={apartmentDetails?.amountOfPictures} apartmentNumber={number}/>
      </BlurFade>
        <PriceFooter 
          bind:displayPrice={displayPrice}
          bind:initialPrice={initialPrice}
          bind:nights={nights}
          bind:childrenAges={childrenAges}
          bind:children={children}
          bind:startDate={startDate}
          bind:endDate={endDate}
          bind:bookNowLoading={bookNowLoading}
          bind:loading={loading}
          bind:error={error}
          bookNow={bookNow}
        />
    {:else}
        <ImageDisplay apartmentNumber={number} openModel={openModel}/>
    {/if}
          
    <!-- Information Section -->
     <BlurFade>
       <div class="flex flex-wrap mt-0 justify-between">
         <div class="bg-white rounded-b-lg md:rounded-lg shadow-lg p-6 pt-6 w-full md:w-[66.4%]">
           <div class="p-0 block md:hidden">
             <Breadcrumb apartmentName={apartmentDetails?.name}/>
           </div>
   
           <!-- Property Title & Key Points -->
           <TitleAndFeatures
             apartmentName={apartmentDetails?.name}
             maxGuests={apartmentDetails?.maxGuests}
             bedrooms={apartmentDetails?.bedrooms}
             bathrooms={apartmentDetails?.bathrooms}
           />
           
           <hr class="h-px my-8 bg-[#C09A5B] border-0">
           
           <!-- Overview Section -->
           <Overview parsedDescription={parsedDescription}/>
   
           <div class="text-black">
             <div class="block md:hidden">
               <hr class="h-px my-8 bg-[#C09A5B] border-0">
               <GuestDetails
                 apartmentDetails={apartmentDetails} 
                 bind:disabledDates={disabledDates} 
                 bind:childrenAges={childrenAges} 
                 bind:startDate={startDate} 
                 bind:endDate={endDate} 
                 bind:children={children} 
                 bind:adults={adults}
                 dropdownID={"mobile"}
                 bind:loading={loading}
                 bind:error={error}
               />              
             </div>
           </div>
   
           <hr class="h-px my-8 bg-[#C09A5B] border-0">
           
           <!-- Amenities Section -->
           <Amenities/>
   
           <hr class="h-px my-8 bg-[#C09A5B] border-0">
   
           <!-- House Rules -->
           <HouseRules/>
         </div>
       
         <!-- Price Card -->
         {#if screenWidth >= 768}
           <PriceCard
             bind:displayPrice={displayPrice}
             bind:initialPrice={initialPrice}
             bind:nights={nights}
             bind:childrenAges={childrenAges}
             bind:startDate={startDate}
             bind:endDate={endDate}
             bind:children={children}
             bind:adults={adults}
             bind:disabledDates={disabledDates}
             bind:bookNowLoading={bookNowLoading}
             bind:loading={loading}
             bind:error={error}
             bookNow={bookNow}
           />
         {/if}
       </div>
     </BlurFade>
    
    <div class="{screenWidth < 768 ? '' : 'hidden'}">
      <Footer/>
    </div>
  </div>
  
  <div class="{screenWidth >= 768 ? '' : 'hidden'}">
    <Footer/>
  </div>
</div>
        
      
          
        <!-- Full Gallary -->
        {#if isModalOpen}
          <div class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
              <div class="relative w-full h-full">
                  <button on:click={() => {isModalOpen = !isModalOpen;}} class="absolute top-4 right-4 text-white text-2xl font-bold">×</button>
                  <div class="w-full h-full flex justify-center items-center">
                      <SlideshowDesktop bind:images={apartmentDetails.amountOfPictures} apartmentNumber = {number}/>
                  </div>
              </div>
          </div>
        {/if}

    
    <!-- Amenities Modal -->
    <AmenitiesModel/>
    
  
    <style>
    
      @keyframes rotate-glow-reverse {
        from { transform: rotate(-360deg); }
        to { transform: rotate(0deg); }
      }
    
      .animate-rotate-glow-reverse {
        animation: rotate-glow-reverse 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
      }
    

    
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.04); opacity: 0.9; }
      }
    
      .animate-pulse {
        animation: pulse 2s ease-in-out infinite;
      }
    
      /* Keep original scrollbar styles */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-thumb { background-color: #C09A5B; border-radius: 4px; }
      ::-webkit-scrollbar-track { background-color: #c0995b7c; border-radius: 4px; }
    </style>