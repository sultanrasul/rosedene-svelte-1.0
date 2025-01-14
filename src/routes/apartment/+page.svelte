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

        let api: CarouselAPI;
        let current = 0;
        let count = 0;
        let adults;
        let children;

        
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

    </script>
    
    <!-- Main Menu -->
    <div class="relative bg-primary-100 dark:bg-[#233441] min-h-screen" id="Home">
        <div 
        class="absolute inset-0 opacity-[0.4] z-[-1]"
        style="background-image: url('background.png'); background-size: cover; background-position: center;">
    </div>
    
    <div class="relative z-10 pt-20 pb-20">
        <Navbar/>   

        <div class="text-[#C09A5B] tracking-[0.5em] font-light text-center w-full max-sm:text-center" style="font-family: 'Merriweather', serif;">

            <div class="inline-block">
              <h2 class="pt-6 text-4xl">{apartmentDetails?.name}</h2>
              <hr class="mt-2 mx-auto border-[#C09A5B] border-t-[2px]" style="width: auto; height: 1px;" />
            </div>
          </div>

        <div class="flex flex-wrap p-10 ">
            <div class="w-full sm:w-1/2 items-center justify-center text-center h-1/2">
                <Slideshow/>
            </div>
            <div class="w-full sm:w-1/2 sm:pl-10 pl-0 items-center justify-center text-center">
                <Calendar startDate={startDate} endDate={endDate} apartmentI/>
            </div>
        </div>



    </div>
</div>
