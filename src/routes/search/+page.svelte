<script>
    // @ts-nocheck
        import { onMount } from 'svelte';
        import Navbar from '../Navbar.svelte';
        import Card from './Card.svelte';
        import DatePicker from '../DatePicker.svelte';
    
        let apartments;
        let startDate; // Variable for start date as a Date object
        let endDate;   // Variable for end date as a Date object
    
        onMount(async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const checkIn = urlParams.get('check_in'); // Format: day/month/year
            const checkOut = urlParams.get('check_out'); // Format: day/month/year
    
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
    
                try {
                    const response = await fetch('http://127.0.0.1:5000/blocked_apartments', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ date_from: dateFrom, date_to: dateTo }),
                    });
    
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
    
                    apartments = await response.json();
                    console.log(apartments);
                } catch (error) {
                    console.error('Failed to fetch blocked apartments:', error);
                }
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
        
        <DatePicker isSearch startDate={startDate} endDate={endDate}/>
        <div class="flex flex-wrap justify-center gap-4 pt-10">
            {#if apartments}
                {#each apartments["properties"]["available"] as apartment }
                    <Card apartmentName={apartment.name} apartmentNumber={apartment.name.match(/\d+/)?.[0]} />
                    
                {/each}
            {/if}
        </div>
    </div>
</div>
