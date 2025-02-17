<script>
// @ts-nocheck

    import NumberTicker from "@/components/NumberTicker.svelte";

    export let displayPrice;
    export let initialPrice;
    export let nights;
    export let childrenAges;
    export let children;
    export let startDate;
    export let endDate;
    export let bookNow;

      // Scroll and flash logic
    function scrollToGuestDetails() {
        // Scroll to component
        const guestDetails = document.getElementById('guestDetails');
        guestDetails?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Flash guest control buttons
        const flashButtons = () => {

            const elements = document.querySelectorAll('#flashGuestsInput');
        
            // @ts-ignore
            const flash = (element) => {
            element.style.transition = 'border-color 0.5s ease';
            setTimeout(() => {
                element.style.borderColor = '#C09A5B';
                setTimeout(() => {
                element.style.borderColor = '#e5e7eb';
                setTimeout(() => {
                    element.style.borderColor = '#C09A5B';
                    setTimeout(() => {
                    element.style.borderColor = '#e5e7eb';
                    }, 400);
                }, 400);
                }, 400);
            }, 0);
            };

            elements.forEach(flash);

        };

        // Wait for scroll to complete
        setTimeout(flashButtons, 500);
    }
</script>

<footer class="fixed bottom-0 left-0 z-20 w-full p-3 rounded-t-3xl bg-gray-800 border-t border-t-4 border-l-4 border-r-4 border-[#C09A5B] shadow-2xl flex items-center justify-between dark:bg-white">
    <!-- Left Section - Price and Banknote -->
    <div class="flex flex-col">
        <div class="flex items-baseline gap-1.5">
          {#key displayPrice}
            <NumberTicker class="text-4xl font-bold text-[#C09A5B]" duration={1000} initial={initialPrice} value={displayPrice} />
          {/key}                  
        <span class="text-sm text-gray-300 dark:text-gray-500">/{nights} nights</span>
        </div>
    </div>

    <!-- Right Section - Buttons -->
    <div class="flex items-center gap-2">
      <button 
          on:click={scrollToGuestDetails}
          class="py-2 px-2 text-xs font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors dark:text-gray-700 dark:bg-gray-100 dark:hover:bg-gray-200 whitespace-nowrap"
      >
          Booking Details
      </button>
      <button 
      class={`w-full py-2 px-2 rounded-xl font-semibold transition-all duration-200
        ${(childrenAges.filter(age => age !== -1).length != children) || !(startDate && endDate) ?
          'bg-[#C09A5B]/30 text-gray-400 cursor-not-allowed' :
          'bg-[#C09A5B] hover:bg-[#B08A4F] text-white shadow-md hover:shadow-lg'
        }`}
      disabled={(childrenAges.filter(age => age !== -1).length != children) || !(startDate && endDate)}
      on:click={bookNow}
    >
      Book Now
    </button>
  </div>
</footer>