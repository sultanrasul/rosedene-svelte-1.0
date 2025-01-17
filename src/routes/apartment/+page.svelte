<script lang="ts">
    // @ts-nocheck
        import * as Dialog from "../../lib/components/ui/dialog";
        import * as Carousel from "../../lib/components/ui/carousel";
        import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
        import { apartments } from '../apartments';

        import Slideshow from "./Slideshow.svelte";

        
        import { onMount } from 'svelte';
        import Navbar from '../Navbar.svelte';
        import DatePicker from '../DatePicker.svelte';
        import Calendar from "./Calendar.svelte";
    
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

    </script>
    
    <!-- Main Menu -->
    <div class="relative bg-primary-100 dark:bg-[#233441] min-h-screen" id="Home">
      <div class="relative z-10 pt-20 pb-20">
        <Navbar />
    
        <div
          class="text-[#C09A5B] tracking-[0.5em] font-light text-center w-full max-md:text-center"
          style="font-family: 'Merriweather', serif;"
        >
          <div class="inline-block">
            <h2 class="mb-4 text-4xl font-semibold text-[#C09A5B] tracking-wider uppercase w-full text-center">{apartmentDetails?.name}</h2>
            <hr
            class="mt-2 mx-auto border-[#C09A5B] border-t-[2px]"
            style="width: auto; height: 1px;"
            />
          </div>
        </div>
        
        <!-- Layout wrapper -->
        <div class="flex flex-col md:flex-row p-5 md:space-x-5">
          <!-- Slideshow -->
          <div class="w-full md:w-[60%] items-center justify-center text-center p-0 md:p-10">
            <div class="pb-5">
              <Slideshow images={images} />
            </div>
          </div>
          
          <!-- Calendar -->
          <div class="w-full md:w-[40%] flex flex-col justify-start items-center pt-20">
            <!-- Availability Heading -->
            <h2 class="mb-4 text-4xl font-semibold text-[#C09A5B] tracking-wider uppercase w-full text-center">
              Availability
            </h2>
            
            <!-- Calendar Container -->
            <div class="w-[345px] h-[400px] scale-[1.3] responsive-scale text-center p-3">
              <Calendar startDate={startDate} endDate={endDate} />
            </div>
          </div>

          
          
        </div>
      </div>
    </div>
    
<style>
  @media (min-width: 975px) {
    .responsive-scale {
      transform: scale(1.2);
      margin-top: 2rem;
    }
    .responsive-flex {
      padding-top: 5%;
      display: flex;
      justify-content: center; /* Align items horizontally */
    }
  }

  @media (max-width: 975px) {
    .responsive-scale {
      transform: scale(1);
    }
    .responsive-flex {
      display: flex;
      justify-content: center; /* Align items horizontally */
    }
  }

  @media (max-width: 767px) {
    .responsive-scale {
      transform: scale(1.2);
      margin-top: 10%;
    }
    .responsive-flex {
      display: flex;
      justify-content: center; /* Align items horizontally */
    }
  }

  @media (max-width: 500px) {
    .responsive-scale {
      transform: scale(1);
      margin-top: 0%;
    }
    .responsive-flex {
      display: flex;
      justify-content: center; /* Align items horizontally */
    }
  }

  /* Ensure entire calendar section stays at the top */
  .w-full.md\:w-\[40\%\].flex {
    justify-content: flex-start; /* Align content to the top */
    align-items: center; /* Horizontally center the content */
    flex-direction: column; /* Stack items vertically */
  }

</style>