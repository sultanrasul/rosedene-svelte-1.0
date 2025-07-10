<script lang="ts">
    // @ts-nocheck
    import { Home, Building, House, InfoIcon } from "lucide-svelte";
    import { onMount } from 'svelte';
    import Navbar from '../Navbar.svelte';
    import Card from './Card.svelte';
    import DatePicker from '../components/DatePicker.svelte';
    import CardLoading from "./cardLoading.svelte";
    import { BACKEND_URL } from '../conf';
    import Footer from "../Footer.svelte";
  import BlurFade from "@/components/BlurFade.svelte";
  import Drawer from "../Drawer.svelte";

    let apartments;
    let startDate, endDate, nights, loading = true;
    let error = null;
    let formattedStartDateDMY, formattedEndDateDMY;
    let adults, children, guests, childrenAges = [];

    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const checkIn = urlParams.get('check_in');
        const checkOut = urlParams.get('check_out');

        if (checkIn && checkOut) {
            formattedStartDateDMY = checkIn;
            formattedEndDateDMY = checkOut;
            startDate = new Date(checkIn.split('/').reverse().join('-'));
            endDate = new Date(checkOut.split('/').reverse().join('-'));
            nights = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

            adults = parseInt(urlParams.get('adults'), 10) || 0;
            children = parseInt(urlParams.get('children'), 10) || 0;
            guests = adults + children;

            urlParams.forEach((value, key) => {
                if (key === 'ages') childrenAges.push(Number(value));
            });

            const dateFrom = { day: startDate.getDate(), month: startDate.getMonth() + 1, year: startDate.getFullYear() };
            const dateTo = { day: endDate.getDate(), month: endDate.getMonth() + 1, year: endDate.getFullYear() };

            try {
                const response = await fetch(`${BACKEND_URL}/blocked_apartments`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ date_from: dateFrom, date_to: dateTo }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                apartments = await response.json();
                console.log(apartments); // Check if data is correct
                loading = false;
            } catch (err) {
                console.error('Failed to fetch apartments:', err);
                error = err.message
                loading = false;
            }
        } else {
            console.error('Missing check_in or check_out parameters in URL');
            loading = false;
        }
    });


    function calculateApartmentPrice(prices) {
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





</script>


    
<!-- Main Menu -->
<div class="relative bg-primary-100 dark:bg-[#233441]" id="Home">
    <Navbar/>   
    <DatePicker isSearch startDate={startDate} endDate={endDate} children={children} adults={adults} childrenAges={childrenAges}/>

    
    <!-- <BlurFade delay={0.3}> -->
        <div class="min-h-screen relative z-10 pb-20 pl-5 pr-5">
        <!-- </BlurFade> -->

        <div class="flex flex-wrap justify-center gap-4 pt-10">
            {#if loading}
                <!-- Show loading cards while fetching data -->
                {#each [1, 2, 3] as _}
                    <div>
                        <CardLoading />
                    </div>
                {/each}

            {:else if error}
                <!-- If no apartments are available -->
                <div class="flex flex-col items-center text-center max-w-xl mx-auto">
                    <InfoIcon size="100px" class="text-[#ff4747]"/>
                    <h1 class="text-2xl font-bold mb-4 mt-4">An Error has occurred</h1>
                    <p class="text-base-content/70 mb-8">{error}</p>                            
                </div>
            {:else if !error && !loading}
                <!-- Once loading is false, show apartments -->
                {#if apartments && apartments["properties"]["available"].length > 0}
                    {#each apartments["properties"]["available"] as apartment}
                        <a
                            class="block"
                            href={`/apartment/${apartment.name.match(/\d+/)?.[0]}?check_in=${formattedStartDateDMY}&check_out=${formattedEndDateDMY}&adults=${adults}&children=${children}&${childrenAges.map(age => `ages=${age}`).join('&')}`}
                        >
                            <Card
                                nights={nights}
                                price={calculateApartmentPrice(apartment.Prices)}
                                apartmentName={apartment.name}
                                apartmentNumber={apartment.name.match(/\d+/)?.[0]}
                            />
                        </a>
                    {/each}
                {:else}
                    <!-- If no apartments are available -->
                    <div class="flex flex-col items-center text-center max-w-xl mx-auto">
                        <Home size="100px" class="text-[#BF9A5B]"/>
                        <h1 class="text-2xl font-bold mb-4 mt-4">No Apartments Available</h1>
                        <p class="text-base-content/70 mb-8">
                            We couldn't find any apartments matching your dates and guests.
                        </p>                            
                    </div>
                {/if}
            {/if}

        </div>

    </div>
    <Footer/>
</div>
