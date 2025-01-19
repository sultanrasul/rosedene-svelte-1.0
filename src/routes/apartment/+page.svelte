<script lang="ts">
  // @ts-nocheck
  import * as Dialog from "../../lib/components/ui/dialog";
  import * as Carousel from "../../lib/components/ui/carousel";
  import { apartments } from '../apartments';
  import { Home, Building , BedDouble, Wifi, UtensilsCrossed, Ruler, TvMinimal, User } from "lucide-svelte";


  
  import Slideshow from "./Slideshow.svelte";
  
  import { onMount } from 'svelte';
  import Navbar from '../Navbar.svelte';
  import DatePicker from '../DatePicker.svelte';
  import Calendar from "./Calendar.svelte";
  import Slide from "flowbite-svelte/Slide.svelte";
  
  let apartmentsList;
  let startDate; // Variable for start date as a Date object
  let endDate;   // Variable for end date as a Date object
  let apartmentDetails;
  let apartmentNumber;
  let carouselInstance;
  let current = 0;
  let count = 0;
  let adults;
  let children;
  let images;
  let isModalOpen = false;
  let parsedDescription;
  import { currentPageIndex } from "./store";
    import { parse } from "date-fns";
  
  let galleryContainer;
  
  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkIn = urlParams.get('check_in'); // Format: day/month/year
    const checkOut = urlParams.get('check_out'); // Format: day/month/year

    apartmentDetails = apartments[urlParams.get('number')];
    apartmentNumber = urlParams.get('number');
    console.log(apartmentDetails);
    adults = urlParams.get('adults'); 
    children = urlParams.get('children');
    images = getApartmentImages(apartmentNumber);

    if (apartmentDetails?.description) {
      parseDescription(apartmentDetails.description);
    }

    if (checkIn && checkOut) {
      // Convert day/month/year string to Date object
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed
      };

      startDate = parseDate(checkIn);
      endDate = parseDate(checkOut);

      const dateFrom = {
        day: startDate.getDate(),
        month: startDate.getMonth() + 1,
        year: startDate.getFullYear()
      };

      const dateTo = {
        day: endDate.getDate(),
        month: endDate.getMonth() + 1,
        year: endDate.getFullYear()
      };

    } else {
      console.error('Missing check_in or check_out parameters in URL');
    }

    // Delay the scrolling effect by 2 seconds
    setTimeout(() => {
      const scrollInterval = setInterval(() => {
        if (galleryContainer) {
          galleryContainer.scrollTop += 1;  // Scroll down by 1px
        }
      }, 30);  // Adjust interval (in milliseconds) for smoothness

      // Clear the interval once the gallery has reached the bottom
      galleryContainer.addEventListener('scroll', () => {
        if (galleryContainer.scrollHeight - galleryContainer.scrollTop === galleryContainer.clientHeight) {
          clearInterval(scrollInterval); // Stop when we reach the bottom
        }
      });
    }, 2000); // Delay the start by 2000ms (2 seconds)
  });

  
  function getApartmentImages(apartmentNumber) {
    // Check if the apartment exists in the apartments object
    const apartment = apartments[apartmentNumber];
    if (!apartment) {
      console.error(`Apartment with ID ${apartmentNumber} does not exist.`);
      return [];
    }
  
    const { amountOfPictures } = apartment; // Get the amount of pictures
    const images = []; // Initialize an array for images
  
    // Loop through the amount of pictures and generate image objects
    for (let i = 0; i < amountOfPictures; i++) {
      images.push({
        alt: `Apartment ${apartmentNumber} Image ${i + 1}`,
        src: `/${apartmentNumber}/${i}.jpg`,
        title: `apartment-${apartmentNumber}-image-${i + 1}`
      });
    }
  
    return images;
  }

  function parseDescription(description) {
    const details = description
      .split("\n")                  // Split the description by new lines
      .map((line) => line.trim())   // Trim leading and trailing whitespaces from each line
      .filter((line) => line !== ""); // Remove empty strings

    console.log("Parsed Description:", details);
    parsedDescription =  details;
  }


  
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
  </script>
    
  <!-- Main Menu -->
  <div class="relative bg-primary-100 dark:bg-[#233441] min-h-screen" id="Home">
    <Navbar />
    <div class="relative z-10 pb-20 pl-40 pr-40">
      
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
          {apartmentDetails?.name}
        </li>
      </ol>
      
      <!-- Images -->
      <div class="flex flex-col md:flex-row md:space-x-5">
        <div class="w-full items-center justify-center text-center">
          <div class="pb-5">
            <div class="grid grid-cols-3 gap-4 pt-2">
              <!-- Selected Image Display -->
              <div class="col-span-2 flex justify-center items-center">
                {#if images}
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <div class="group relative inline-block cursor-pointer" on:click={openModel(0)}>
                    <img 
                        class="h-auto max-w-full rounded-lg transition-all" 
                        src="{images[0].src}" 
                        alt=""
                    >
                    <div 
                        class="absolute inset-0 bg-[#C09A5B] opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"
                    ></div>
                  </div>
                {/if}
              </div>
          
              <!-- Thumbnail Gallery -->
              <div bind:this={galleryContainer} class="col-span-1 flex flex-col space-y-4 max-h-[512px] overflow-y-auto">
                {#if images}
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  {#each images.slice(1) as image, i}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="group relative inline-block cursor-pointer" on:click={openModel(i+1)}>
                      <img 
                          class="h-auto max-w-full rounded-lg transition-all" 
                          src="{image.src}" 
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
        </div>
  
      </div>
      
      
      <!-- info -->
      <!-- Information Section -->
      <div class="flex flex-wrap mt-6 justify-between">
        <div class="bg-white rounded-lg shadow-lg p-6  w-[70%]">

          <!-- Property Title & Key Points -->
          <div>
            <!-- Title -->
            <h2 class="text-4xl font-bold text-[#C09A5B] mb-4">{apartmentDetails?.name}</h2>
            
            <!-- Features -->
            <div class="flex flex-wrap gap-2 mb-4 ">
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full text-gray-900">
                <User size="22px" class="pr-1" /> {apartmentDetails?.maxGuests} Guests
              </span>
              <!-- <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full text-gray-900">
                <TvMinimal size="22px" class="pr-1" /> {apartmentDetails?.tvSize}" Flat-screen TV
              </span> -->
              <!-- <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full text-gray-900">
                <Ruler size="22px" class="pr-1" /> {apartmentDetails?.squareFeet} Feet²
              </span> -->
              {#if apartmentDetails?.bedrooms !== 0}
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full text-gray-900">
                <BedDouble size="22px" class="pr-1" /> {apartmentDetails?.bedrooms} Bedroom{apartmentDetails?.bedrooms > 1 ? 's' : ''}
              </span>
              {/if}
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 rounded-full text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pr-1 lucide lucide-toilet">
                  <path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18" />
                  <path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" />
                </svg>
                {apartmentDetails?.bathrooms} Bathroom{apartmentDetails?.bathrooms > 1 ? 's' : ''}
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
  
          <hr class="h-px my-8 bg-[#C09A5B] border-0 ">
  
  
          <!-- Amenities Section -->
          <div>
            <h2 class="text-3xl font-bold text-black mb-4">Amenities</h2>
            <ul class="list-disc list-inside text-sm text-gray-600">
              <li>Furnished</li>
              <li>Fire alarm</li>
              <li>Wi-Fi</li>
              <li>Large kitchen diner</li>
            </ul>
          </div>
          
          <hr class="h-px my-8 bg-[#C09A5B] border-0 ">
  
          <!-- Bills Package Section -->
          <div class="bg-gray-100 rounded-lg p-4 mb-6">
            <p class="font-medium text-gray-700">Get a bills package</p>
            <p class="text-sm text-gray-500">Unlimited energy & Internet</p>
            <p class="font-semibold text-gray-800">£15.36 per person/week</p>
          </div>

        </div>

        <div class="bg-gray-100 rounded-lg shadow-lg p-6 w-[25%] self-start">
          <div class="text-lg font-bold text-gray-800">From £176.54/week</div>
          <div class="text-sm text-gray-600">+ £765 security deposit</div>
          <div class="text-sm text-gray-600 mt-4">No bills included</div>
          <hr class="my-4">
          <div class="text-sm text-gray-700">Get a bills package</div>
          <div class="text-sm text-gray-500">Unlimited energy & Internet</div>
          <div class="font-semibold text-gray-800">£15.36 per person/week</div>
          <button class="mt-4 bg-[#C09A5B] text-white font-semibold py-2 px-4 rounded-lg">
            Enquire
          </button>
          
        </div>
        

      </div>


      <!-- Calendar -->
      <div class="w-full flex flex-col justify-start items-center pt-20">
        <!-- Availability Heading -->
        <h2 class="mb-4 text-4xl font-semibold text-[#C09A5B] tracking-wider uppercase w-full text-center">
          Availability
        </h2>
        
        <!-- Calendar Container -->
        <div class="w-[345px] h-[400px] text-center p-3">
          <Calendar startDate={startDate} endDate={endDate} />
        </div>
      </div>


    </div>
  </div>
  

  <!-- Full Gallary -->
  {#if isModalOpen}
    <div class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
        <div class="relative w-full h-full">
            <button on:click={() => {isModalOpen = !isModalOpen;}} class="absolute top-4 right-4 text-white text-2xl font-bold">×</button>
            <div class="w-full h-full flex justify-center items-center">
                <Slideshow images={images}/>
            </div>
        </div>
    </div>
  {/if}
  