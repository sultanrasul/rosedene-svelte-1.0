<script lang="ts">
	import { cn } from '$lib/utils';
	import { AlignJustify, Menu, UserRoundIcon, XIcon } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
  import BorderBeam from '$lib/components/BorderBeam.svelte';
  import DropdownMenu from '$lib/components/DropdownMenu.svelte';
  import { onMount } from 'svelte';
  import Drawer from './Drawer.svelte';
  export let fixed = false;

  // User Data
  import { user } from "$lib/stores/user";
  import { onDestroy } from "svelte";
  import { supabase } from '@/supabase';
  let currentUser: null;
  const unsubscribe = user.subscribe(u => currentUser = u);
  onDestroy(unsubscribe);
  async function signOut() {
    await supabase.auth.signOut();
  }

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

  // Dropdown functionality
  let isDropdownOpen = false;
  
  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }
  
  function closeDropdown() {
    isDropdownOpen = false;
  }
  
  function handleDropdownItemClick(link: string, event: Event) {
    event.preventDefault();
    closeDropdown();
    window.location.href = window.location.origin + link;
  }

  // Close dropdown when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const dropdown = document.querySelector('.dropdown-container');
    const button = document.querySelector('.dropdown-button');
    
    if (dropdown && button && 
        !dropdown.contains(event.target as Node) && 
        !button.contains(event.target as Node)) {
      closeDropdown();
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<header class="left-0 top-0 z-50 w-full animate-fade-in opacity-100 backdrop-blur-[3px] border-b shadow-xl relative">
  <div class="pl-12 pr-12 flex h-[66px] lg:h-[80px] items-center justify-between m-auto">
    <!-- Logo -->
    <div class="flex-shrink-0">
      <a href="/">
        <img src="/name.svg" 
             class="h-auto w-[150px] md:w-[200px] max-w-full cursor-pointer" 
             alt="Logo"
             style="object-fit: contain">
      </a>
    </div>

    <!-- Navigation Links -->
    <nav class="ml-auto flex h-full items-center space-x-4 relative">
      <!-- Dropdown Menu -->


      <!-- Login Button -->
      <div class="{currentUser ? "block": "hidden"} hs-dropdown relative inline-flex [--placement:top-right]">

        <div class="relative">
          <button
            id="hs-dropdown-with-header"
            class="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/20 hover:shadow-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#C09A5B] focus:ring-opacity-50"
          >
            <UserRoundIcon class="w-5 h-5 text-[#C09A5B]" />
            <span class="capitalize hidden sm:block">
              {#if currentUser?.user_metadata}
                {currentUser["user_metadata"]["first_name"] ? currentUser["user_metadata"]["first_name"]: currentUser["user_metadata"]["name"]}
              {/if}
            </span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>

        <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-with-header">
          <div class="py-3 px-4 border-b border-gray-200">
            <p class="text-sm text-gray-500">Signed in as</p>
            {#if currentUser?.user_metadata}
              <p class="text-sm font-medium text-gray-800">{currentUser["user_metadata"]["email"]}</p>
            {/if}
          </div>
          <div class="p-1 space-y-0.5">
            <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" href="#">
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              Newsletter
            </a>
            <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" href="#">
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              Purchases
            </a>
            <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" href="#">
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
              Downloads
            </a>
            <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100" href="#">
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Team Account
            </a>

            <!-- 🔥 Log out button -->
            <button 
              on:click={signOut} 
              class="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 transition"
            >
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log out
            </button>
          </div>
        </div>
      </div>

      <div class="relative cursor-pointer {currentUser ? "hidden": "block"}">
        <a href="/login" id="hs-dropdown-with-header" class="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/20 hover:shadow-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#C09A5B] focus:ring-opacity-50">
            <UserRoundIcon class="w-5 h-5 text-[#C09A5B]" />
            <span class="hidden sm:block">Login</span>
        </a>
      </div>

      <!-- Hamburger -->
      <button 
        class="flex items-center justify-center h-[40px] rounded-lg hover:bg-white/10 transition"
        aria-haspopup="dialog" 
        aria-expanded="false" 
        aria-controls="hs-sidebar-offcanvas" 
        aria-label="Toggle navigation" 
        data-hs-overlay="#hs-sidebar-offcanvas">
        <Menu size="30px" />
      </button>
    </nav>

  </div>
</header>

<style>
  .dropdown-container {
    position: relative;
    display: inline-block;
  }
  
  .dropdown-button {
    cursor: pointer;
  }
</style>