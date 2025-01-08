<script>
    import { onMount } from 'svelte';
    import Navbar from '../Navbar.svelte';

    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const checkIn = urlParams.get('check_in');
        const checkOut = urlParams.get('check_out');

        if (checkIn && checkOut) {
            // Convert dates to day/month/year format for the backend
            // @ts-ignore
            const formatDate = (dateStr) => {
                const [day, month, year] = dateStr.split('/');
                return { day: parseInt(day), month: parseInt(month), year: parseInt(year) };
            };

            const dateFrom = formatDate(checkIn);
            const dateTo = formatDate(checkOut);

            try {
                const response = await fetch('http://127.0.0.1:5000/blocked_apartments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ date_from: dateFrom, date_to: dateTo }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('Blocked Apartments:', result);
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

    <div class="relative z-10">
        <Navbar />
    </div>
</div>
