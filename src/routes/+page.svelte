<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
    import { Button } from 'flowbite-svelte';
    import Hero from './components/Hero.svelte'
    import Navbar from './Navbar.svelte'
    import Drawer from './Drawer.svelte';
    import DatePicker from './components/DatePicker.svelte';
    import Apartments from './components/apartments/Main.svelte';
  import Location from './components/Location.svelte';
  import ApartmentShowcase from './components/ApartmentShowcase.svelte';
  import Reviews from './components/Reviews.svelte';


    
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
    <!-- Background Container -->
    <div class="absolute inset-x-0 top-0 h-[100vh] -z-10 opacity-[0.4]"
        style="background-image: url('background.png'); 
               background-size: cover; 
               background-position: center;
               background-repeat: no-repeat;
               "
               >


   <!-- Edge Blur Effect -->
   <!-- <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-red-800 via-red-800 to-transparent backdrop-blur-[2px]"></div> -->
    </div>


    
    <!-- Content Container -->
    <div class="relative ">
        <Navbar fixed/>
        <Hero/>
        <Apartments/>
        <Location/>
        <Reviews/>
        
    </div>
</div>