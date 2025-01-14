<script>
    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
    import { Button } from 'flowbite-svelte';

    import Hero from './Hero.svelte';
    import Navbar from './Navbar.svelte';
    // import function to register Swiper custom elements
    import { register } from 'swiper/element/bundle';
    // register Swiper custom elements
    register();
  

	/**
	 * @param {string} id
	 */
	function scrollToElementWithOffset(id) {
      const element = document.getElementById(id);
      const yOffset = -100; // Adjust this value as needed
      // @ts-ignore
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
  }

    // Function to get the URL parameters and log the "code" parameter if it exists
    onMount(() => {
        const queryString = window.location.search; // gets url
        const urlParams = new URLSearchParams(queryString); // gets params from url
        const scrollToo = urlParams.get("scrollToo") || null;

        if (scrollToo) {
            console.log("Scroll Too:", scrollToo);
			scrollToElementWithOffset(scrollToo);
			window.history.replaceState({}, document.title, "/");
        } 
    });
    export const prerender = true
</script>


<!-- Main Menu -->
<div class="relative " id="Home">

    <div 
        class="absolute  inset-0 bg-black opacity-[0.4] z-[-1]"
        style="background-image: url('background.png'); background-size: cover; background-position: center;">
    </div>

    <div class="relative z-10">
        <Navbar />
        <Hero />
        <!-- Add other components -->
        <!-- <Cards/> -->
        <!-- <Contact/> -->
    </div>
</div>





