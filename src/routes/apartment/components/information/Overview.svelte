<script>
    export let parsedDescription;
</script>

<div class="mb-6">
    <h2 class="text-3xl font-bold text-black mb-4">Overview</h2>
    
    <p class="text-sm text-gray-600">  
      {#each parsedDescription?.slice(0, 2) as line}
        {line}
        <br><br>
      {/each}
    </p>

    
    <!-- Read More Section -->
    <div>
      <div id="hs-show-hide-collapse-heading" class="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-show-hide-collapse">
        <p class="text-sm text-gray-600 mt-4">

          {#each parsedDescription?.slice(2) as line}
            {line}
            <br><br>
          {/each}        

        </p>
      </div>
      
      <p class="mt-4">
        <button 
          type="button" 
          class="{parsedDescription?.length > 2 ? '' : 'hidden'} hs-collapse-toggle inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-[#C09A5B] hover:underline focus:outline-none focus:underline focus:text-[#C09A5B] disabled:opacity-50 disabled:pointer-events-none" 
          id="hs-show-hide-collapse" 
          aria-expanded="false" 
          aria-controls="hs-show-hide-collapse-heading" 
          data-hs-collapse="#hs-show-hide-collapse-heading">
          <span class="hs-collapse-open:hidden">Read more</span>
          <span class="hs-collapse-open:block hidden">Read less</span>
          <svg class="hs-collapse-open:rotate-180 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
      </p>
    </div>

  </div>