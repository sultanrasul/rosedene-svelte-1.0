<script lang="ts">
    // @ts-nocheck
    import { Home, Building, House, InfoIcon, FastForward } from "lucide-svelte";
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

        // Add these new variables
    let sortOption = 'default';
    let sortedApartments = [];
    
    // Function to sort apartments
    function sortApartments() {
        console.log('Running sortApartments() with option:', sortOption);
        
        if (!apartments) {
            console.warn('No apartments data available');
            return;
        }
        
        console.log('Original apartments data:', apartments);
        
        // Combine available and blocked apartments
        const combined = [
            ...apartments["properties"]["available"].map(a => ({ ...a, status: 'available' })),
            ...apartments["properties"]["blocked"].map(a => ({ ...a, status: 'blocked' }))
        ];
        
        console.log('Combined apartments before sorting:', combined);
        
        let result;
        switch(sortOption) {
            case 'price_asc':
                result = [...combined].sort((a, b) => {
                    const priceA = calculateApartmentPrice(a.Prices);
                    const priceB = calculateApartmentPrice(b.Prices);
                    console.log(`Comparing ${a.name} ($${priceA}) vs ${b.name} ($${priceB})`);
                    return priceA - priceB;
                });
                break;
                
            case 'price_desc':
                result = [...combined].sort((a, b) => {
                    const priceA = calculateApartmentPrice(a.Prices);
                    const priceB = calculateApartmentPrice(b.Prices);
                    console.log(`Comparing ${a.name} ($${priceA}) vs ${b.name} ($${priceB})`);
                    return priceB - priceA;
                });
                break;
                
            case 'apartment_asc':
                result = [...combined].sort((a, b) => {
                    const numA = parseInt(a.name.match(/\d+/)?.[0]);
                    const numB = parseInt(b.name.match(/\d+/)?.[0]);
                    console.log(`Comparing ${a.name} (#${numA}) vs ${b.name} (#${numB})`);
                    return numA - numB;
                });
                break;
                
            case 'apartment_desc':
                result = [...combined].sort((a, b) => {
                    const numA = parseInt(a.name.match(/\d+/)?.[0]);
                    const numB = parseInt(b.name.match(/\d+/)?.[0]);
                    console.log(`Comparing ${a.name} (#${numA}) vs ${b.name} (#${numB})`);
                    return numB - numA;
                });
                break;
                
            default: // Default sort (available first, then by apartment number)
                result = [...combined].sort((a, b) => {
                    // Available first
                    if (a.status === 'available' && b.status !== 'available') return -1;
                    if (b.status === 'available' && a.status !== 'available') return 1;
                    
                    // Then by apartment number
                    const numA = parseInt(a.name.match(/\d+/)?.[0]);
                    const numB = parseInt(b.name.match(/\d+/)?.[0]);
                    console.log(`Default sort comparing ${a.name} (#${numA}) vs ${b.name} (#${numB})`);
                    return numA - numB;
                });
        }
        
        console.log('Sorted result:', result);
        sortedApartments = result;
    }
    
    // React to sort option changes
    $: {
        console.log('Reactive statement triggered - sortOption:', sortOption, 'apartments:', apartments);
        if (apartments) {
            sortApartments();
        }
    }
    
    // React to initial apartment load
    $: {
        console.log('Initial load check - apartments:', apartments, 'sortedApartments:', sortedApartments);
        if (apartments && !sortedApartments.length) {
            sortApartments();
        }
    }

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
    <div class="w-full  justify-center text-center flex pt-10">
        <div>
            <DatePicker isSearch startDate={startDate} endDate={endDate} children={children} adults={adults} childrenAges={childrenAges}/>
        </div>
     </div>

    
    <!-- <BlurFade delay={0.3}> -->
    <div class="min-h-screen relative z-10 pb-20 pl-5 pr-5">

        {#if apartments && !loading && !error}
        <div class="max-w-7xl mx-auto mb-6 mt-8">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        Our Apartments
                    </h1>
                    <p class="text-gray-600 dark:text-gray-300 mt-1">
                        {apartments["properties"]["available"].length} available • 
                        {apartments["properties"]["blocked"].length} booked
                    </p>
                </div>
                
                <div class="flex gap-3 items-center">
                    <span class="text-gray-700 dark:text-gray-300 text-sm hidden sm:block">Sort by:</span>
                    <select 
                        bind:value={sortOption}
                        class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C09A5B]"
                    >
                        <option value="default">Default (Availability)</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="apartment_asc">Apartment: 1-4</option>
                        <option value="apartment_desc">Apartment: 4-1</option>
                    </select>
                </div>
            </div>
        </div>
        {/if}
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
                    {#each sortedApartments as apartment}
                        <a
                            href={apartment.status === 'available' 
                                ? `/apartment/${apartment.name.match(/\d+/)?.[0]}?check_in=${formattedStartDateDMY}&check_out=${formattedEndDateDMY}&adults=${adults}&children=${children}&${childrenAges.map(age => `ages=${age}`).join('&')}`
                                : `/apartment/${apartment.name.match(/\d+/)?.[0]}?adults=${adults}&children=${children}&${childrenAges.map(age => `ages=${age}`).join('&')}`}
                            class="block transform transition-transform hover:-translate-y-1"
                        >
                            <Card
                                available={apartment.status === 'available'}
                                nights={nights}
                                price={calculateApartmentPrice(apartment.Prices)}
                                apartmentName={apartment.name}
                                apartmentNumber={apartment.name.match(/\d+/)?.[0]}
                            />
                        </a>
                    {/each}
            {/if}

        </div>

        <!-- Availability Note -->
        {#if apartments && apartments["properties"]["blocked"].length > 0}
            <div class="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-start">
                    <svg class="w-5 h-5 text-gray-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p class="text-gray-600 dark:text-gray-300">
                        Some apartments appear as "Booked" because they're not available for your selected dates.
                        You can still view their details and check availability for other dates.
                    </p>
                </div>
            </div>
        {/if}

    </div>
    <Footer/>
</div>
