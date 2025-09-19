<script>
  import { user } from "$lib/stores/user";
  
  import { onDestroy } from "svelte";
  import { supabase } from '@/supabase';
  import { UserRoundIcon } from "lucide-svelte";
  let currentUser;
  const unsubscribe = user.subscribe(u => currentUser = u);
  onDestroy(unsubscribe);

  async function signOut() {
    await supabase.auth.signOut();
  }
</script>
  
  <!-- Sidebar -->
  <div id="hs-sidebar-offcanvas" 
  class="hs-overlay w-full sm:w-[40%]
         hs-overlay-open:translate-x-0
         hs-overlay-backdrop-open:bg-blue-950/90
         translate-x-full transition-all duration-300 transform
         h-full
         hidden
         fixed top-0 end-0 bottom-0 z-[60]
         bg-white border-s border-gray-200 text-gray-600" 
  role="dialog" 
  tabindex="-1" 
  aria-label="Sidebar">

  <div class="relative flex flex-col h-full max-h-full">
  <!-- Header -->
  <header class="p-4 flex justify-between items-center border-b border-gray-200">
    <div class="flex items-center gap-2">
      <span class="font-semibold">GBP</span>
      <span class="text-gray-500">|</span>
      <span class="text-gray-600">ENGLISH</span>
    </div>
    <!-- svelte-ignore a11y_consider_explicit_label -->

    
    <!-- Close Button -->
    <div class="flex items-center">
      <!-- Login Button -->
      {#if currentUser}
        <div class="hs-dropdown relative inline-flex [--placement:top-right]">

          <div class="relative">
            <button
              id="hs-dropdown-with-header"
              class="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/20 hover:shadow-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#C09A5B] focus:ring-opacity-50"
            >
              <UserRoundIcon class="w-5 h-5 text-[#C09A5B]" />
              <span class="capitalize hidden sm:block">{currentUser["user_metadata"]["first_name"] ? currentUser["user_metadata"]["first_name"]: currentUser["user_metadata"]["name"]}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>

          <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-with-header">
            <div class="py-3 px-4 border-b border-gray-200">
              <p class="text-sm text-gray-500">Signed in as</p>
              <p class="text-sm font-medium text-gray-800">{currentUser["user_metadata"]["email"]}</p>
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

      {:else}

        <div class="relative cursor-pointer">
            <a
              href="/login"
              id="hs-dropdown-with-header"
              class="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/20 hover:shadow-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#C09A5B] focus:ring-opacity-50"
            >
                  <UserRoundIcon class="w-5 h-5 text-[#C09A5B]" />
                  <span class="hidden sm:block">Login</span>
            </a>
          </div>
       {/if}
      
      <button type="button" 
        class="ml-2 sm:ml-4 p-1 sm:p-2 rounded-full hover:bg-[#C09A5B]/20 transition-all duration-300 group"
        data-hs-overlay="#hs-sidebar-offcanvas">
        <svg class="w-7 h-7 text-[#C09A5B] group-hover:text-[#C09A5B]/80 group-hover:rotate-90 transition-all" 
            viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      </button>
    </div>


  </header>

  <!-- Body -->
  <nav class="h-full overflow-y-auto p-4 space-y-6">
    <!-- Locations Section -->

    <!-- Our Company -->
    <div class="space-y-2" >
      <h3 class="text-sm font-semibold text-gray-500 uppercase">Our Company</h3>
      <!-- <ul class="space-y-1 cursor-pointer" data-sveltekit-reload> This is the fix to the issue of combinging two pages -->
      <ul class="space-y-1 cursor-pointer">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <li><a data-hs-overlay="#hs-sidebar-offcanvas" href="/" class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">View Our Apartments</a></li>
        <li><a data-hs-overlay="#hs-sidebar-offcanvas" href="/aparthotel" class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">What is an aparthotel?</a></li>
        <li><a data-hs-overlay="#hs-sidebar-offcanvas" href="/gallery" class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">Gallery</a></li>
        <li><a data-hs-overlay="#hs-sidebar-offcanvas" href="/reviews" class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">Reviews </a></li>
        <!-- <li><a on:click={() => { window.location.href = "/"; }} class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">About Us</a></li> -->
        <!-- <li><a href="#" class="block p-2 text-gray-700 hover:bg-[#tygyC09A5B]/60 rounded">Press & Media</a></li> -->
      </ul>
    </div>
    
    <!-- Customer Support Section -->
    <div class="space-y-2">
      <h3 class="text-sm font-semibold text-gray-500 uppercase">Customer Support</h3>
      <ul class="space-y-1 cursor-pointer">
        <li><a data-hs-overlay="#hs-sidebar-offcanvas" href="/contact" class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">Contact Us</a></li>
        <li><a data-hs-overlay="#hs-sidebar-offcanvas" href="/details" class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">Manage Booking</a></li>
        <li><a data-hs-overlay="#hs-sidebar-offcanvas" href = "/terms" class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">Terms and Conditions</a></li>
        <!-- <li><a data-hs-overlay="#hs-sidebar-offcanvas" href = "/faq"   class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">FAQ</a></li> -->
      </ul>
    </div>




  </nav>
  </div>

</div>
  <!-- End Sidebar -->