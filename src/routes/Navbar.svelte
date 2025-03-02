<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { cn } from '$lib/utils';
	import { AlignJustify, XIcon } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
  import BorderBeam from '$lib/components/BorderBeam.svelte';
  import {DarkMode} from 'flowbite-svelte';
  import DropdownMenu from '$lib/components/DropdownMenu.svelte';
  import { onMount } from 'svelte';
  export let fixed = false;

  let scrolled = false;
  let screenWidth: number;

  function scrollToElementWithOffset(id: string) {
        const element = document.getElementById(id);
        const yOffset = -100; // Adjust this value as needed
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    }

  // Update the screen width on resize
  const updateWidth = () => {
      screenWidth = window.innerWidth;
  };

  onMount(() => {
      updateWidth(); // Set initial width
      window.addEventListener('resize', updateWidth);

      // Cleanup on component destruction
      return () => {
          window.removeEventListener('resize', updateWidth);
      };
  });

	// Event listener to track scroll position
	function handleScroll() {
		scrolled = window.scrollY > 0;
    console.log(scrolled);
	}



</script>


<svelte:window on:scroll={handleScroll} />

<!-- <svelte:window bind:innerWidth /> -->

<!-- <header class="fixed top-0 left-0 z-50 w-full bg-gray-800/0 transition-transform
    {scrolled ? 'backdrop-blur-lg border-b shadow-xl' : 'backdrop-filter-none'}"> -->


<header class="bg-gray-800/0 left-0 top-0 z-50 w-full animate-fade-in opacity-100 backdrop-blur-lg border-b shadow-xl">
  <div class="container flex h-20 items-center justify-between m-auto">
    <!-- Logo -->
    
    <a data-sveltekit-preload-data="hover" class="text-gray-700 self-center whitespace-nowrap text-xl font-bold dark:text-white leading-none" href="/">Rosedene</a>

    <!-- Navigation Links -->
      
    {#if screenWidth < 600}
      <DropdownMenu/>
    {:else}
      <nav class="ml-auto flex h-full items-center space-x-6">
        <a on:click={(e) => { e.preventDefault(); window.location.href = "/"; }} class="cursor-pointer text-xl text-gray-400 hover:text-[#C09A5B] flex items-center h-full leading-none transition-colors" href="/" >Home</a>
        <a on:click={(e) => { e.preventDefault(); window.location.href = "/details"; }} class="cursor-pointer text-xl text-gray-400 hover:text-[#C09A5B] flex items-center h-full leading-none transition-colors" href="/details">Find Booking</a>
        <a on:click={(e) => { e.preventDefault(); window.location.href = "/contact"; }} class="cursor-pointer text-xl text-gray-400 hover:text-[#C09A5B] flex items-center h-full leading-none  transition-colors" href="/contact" >Contact</a>
        
        <DarkMode btnClass="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-1.5" size="lg"/>
      </nav>
    {/if}

  </div>
</header>




