<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
    import Hero from './components/Hero.svelte'
    import Navbar from './Navbar.svelte'
    import Drawer from './Drawer.svelte';
    import DatePicker from './components/DatePicker.svelte';
    import Apartments from './components/apartments/Main.svelte';
    import Location from './components/Location.svelte';
    import ApartmentShowcase from './components/ApartmentShowcase.svelte';
    import Reviews from './components/Reviews.svelte';
    import Footer from './Footer.svelte';
    import Amenities from './components/Amenities.svelte';


    
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
<div class="relative bg-[#233441]" id="Home">
    <!-- Background Color is now on the parent container -->
    
    <!-- Image Container -->
    <div class="absolute inset-0 h-[100vh] filter brightness-50"
        style="background-image: url('background.png'); 
               background-size: cover; 
               background-position: center;
               background-repeat: no-repeat;">
    </div>

    <!-- Content Container (now with transparent background) -->
    <div class="relative">
        <Navbar fixed/>
        <Hero/>
        <Apartments/>
        <Amenities/>
        <Location/>
        <Reviews/>
        <Footer/>
    </div>
</div>