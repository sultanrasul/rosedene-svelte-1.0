<script lang="ts">
    // @ts-nocheck
        import * as Dialog from "../../lib/components/ui/dialog";
        import * as Carousel from "../../lib/components/ui/carousel";
        import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
        import { apartments } from '../apartments';
        import { Home, Building } from "lucide-svelte";

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
        let api: CarouselAPI;
        let current = 0;
        let count = 0;
        let adults;
        let children;
        let images;
        let isModalOpen = false;


        
        $: if (api) {
            count = api.scrollSnapList().length;
            api.scrollTo(5)
            // the number five you can replace with your index that the user has pressed on the gallery presented on the apartment page
            current = api.selectedScrollSnap() + 1;
        
            api.on("select", () => {
                current = api.selectedScrollSnap() + 1;
            });
        }

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

    </script>
    
    <!-- Main Menu -->
    <Navbar />
    <div class="relative bg-primary-100 dark:bg-[#233441] min-h-screen" id="Home">
      <div class="relative z-10 pt-20 pb-20 pl-40 pr-40">
    
        <!-- <div class="text-[#C09A5B] tracking-[0.5em] font-light text-center w-full max-md:text-center" style="font-family: 'Merriweather', serif;">
          <div class="inline-block">
            <h2 class="mb-4 text-4xl font-semibold text-[#C09A5B] tracking-wider uppercase w-full text-center">{apartmentDetails?.name}</h2>
            <hr
            class="mt-2 mx-auto border-[#C09A5B] border-t-[2px]"
            style="width: auto; height: 1px;"
            />
          </div>
        </div> -->

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
                        <img src={images[0].src} alt="" class="rounded-xl max-h-[512px] object-contain shadow-lg" >
                    {/if}
                </div>
            
                <!-- Thumbnail Gallery -->
                <div class="col-span-1 flex flex-col space-y-4 max-h-[512px] overflow-y-auto">
                    {#if images}
                        {#each images as image, i}
                            <div>
                                <img class="h-auto max-w-full rounded-lg  transition-all"src={image.src} alt="">
                            </div>
                        {/each}
                    {/if}
                </div>
            </div>
            </div>
          </div>

          
          <!-- Calendar -->
          <!-- <div class="w-full md:w-[40%] flex flex-col justify-start items-center ">
            
          <h2 class="mb-4 text-4xl font-semibold text-[#C09A5B] tracking-wider uppercase w-full text-center">
            Availability
            </h2>
            
            
            <div class="w-[345px] h-[400px] scale-[1.0] responsive-scale text-center ">
              <Calendar startDate={startDate} endDate={endDate} />
              </div>
              </div> -->
              
              
              
            </div>
          </div>
          <button on:click={() => {isModalOpen = !isModalOpen;}}>Open Model</button>
    </div>


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
  