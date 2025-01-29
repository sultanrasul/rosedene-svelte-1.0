<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
    import { Button } from 'flowbite-svelte';
    import { register } from 'swiper/element/bundle';
    import ConfirmedBooking from './confirmedBooking.svelte';
    import Hero from './Hero.svelte'
    import Navbar from './Navbar.svelte'

    // Register Swiper custom elements
    register();

    let showBookingDetails = false;
    let bookingData = {};

    onMount(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        // Check for the refNumber in the URL
        const refNumber = urlParams.get("ref_number");

        if (refNumber) {
            showBookingDetails = true; // Set to true if refNumber is found

            // Set the bookingData if refNumber exists
            bookingData = {
                name: urlParams.get("name"),
                email: urlParams.get("email"),
                phone_number: urlParams.get("phone_number"),
                apartment_name: urlParams.get("apartment_name"),
                amount: urlParams.get("amount"),
                ref_number: urlParams.get("ref_number"),
                check_in: urlParams.get("check_in"),
                check_out: urlParams.get("check_out"),
                adults: urlParams.get("adults"),
                children: urlParams.get("children"),
                children_ages: urlParams.get("children_ages"),
                nights: urlParams.get("nights"),
                refNumber: refNumber
            };
        }

        const scrollToo = urlParams.get("scrollToo") || null;
        if (scrollToo) {
            console.log("Scroll Too:", scrollToo);
            scrollToElementWithOffset(scrollToo);
            window.history.replaceState({}, document.title, "/");
        }
    });

    function scrollToElementWithOffset(id) {
        const element = document.getElementById(id);
        const yOffset = -100; // Adjust this value as needed
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    export const prerender = true;
</script>

<!-- Main Menu -->
<div class="relative" id="Home">

    <div class="absolute inset-0 bg-black opacity-[0.4] z-[-1]"
        style="background-image: url('background.png'); background-size: cover; background-position: center;">
    </div>

    <div class="relative z-10 h-screen flex flex-col items-center">
        <Navbar />
        {#if showBookingDetails}
            <ConfirmedBooking {bookingData} />
            {:else}
            <Hero/>
        {/if}
    </div>
</div>
