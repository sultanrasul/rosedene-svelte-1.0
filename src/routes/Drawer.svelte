
  
  <!-- Sidebar -->
  <div id="hs-sidebar-offcanvas" 
  class="hs-overlay w-full sm:w-[40%]
         hs-overlay-open:translate-x-0
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
    <button type="button" class="p-2 hover:bg-[#C09A5B]/60 rounded-full" data-hs-overlay="#hs-sidebar-offcanvas">
      <svg class="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  </header>

  <!-- Body -->
  <nav class="h-full overflow-y-auto p-4 space-y-6">
    <!-- Locations Section -->

    <!-- Our Company -->
    <div class="space-y-2">
      <h3 class="text-sm font-semibold text-gray-500 uppercase">Our Company</h3>
      <ul class="space-y-1 cursor-pointer">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <li><a on:click={() => { window.location.href = "/"; }} class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">View Our Apartments</a></li>
        <li><a on:click={() => { window.location.href = "/aparthotel"; }} class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">What is an aparthotel?</a></li>
        <li><a on:click={() => { window.location.href = "/reviews"; }} class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">Reviews </a></li>
        <!-- <li><a on:click={() => { window.location.href = "/"; }} class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">About Us</a></li> -->
        <!-- <li><a href="#" class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">Press & Media</a></li> -->
      </ul>
    </div>
    
    <!-- Customer Support Section -->
    <div class="space-y-2">
      <h3 class="text-sm font-semibold text-gray-500 uppercase">Customer Support</h3>
      <ul class="space-y-1 cursor-pointer">
        <li><a on:click={() => { window.location.href = "/contact"; }} class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">Contact Us</a></li>
        <li><a on:click={() => { window.location.href = "/details"; }} class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">Manage Booking</a></li>
        <li><a on:click={() => { window.location.href = "/terms"; }} class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">Terms and Conditions</a></li>
        <li><a on:click={() => { window.location.href = "/faq"; }} class="block p-2 text-gray-700 hover:bg-[#C09A5B]/60 rounded">FAQ</a></li>
      </ul>
    </div>




  </nav>
  </div>

</div>
  <!-- End Sidebar -->