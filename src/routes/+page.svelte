<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
    import { Button } from 'flowbite-svelte';
    import ConfirmedBooking from './confirmedBooking.svelte';
    import Hero from './Hero.svelte'
    import Navbar from './Navbar.svelte'


    onMount( () => {

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

    <div class="relative z-10 min-h-screen flex flex-col items-center">
        <Navbar fixed/>

        <Hero/>
    </div>
</div>
