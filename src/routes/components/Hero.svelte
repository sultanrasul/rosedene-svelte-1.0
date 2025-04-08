<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import DatePicker from './DatePicker.svelte';
    import Navbar from '../Navbar.svelte';
    import Contact from './Contact.svelte';

    import BlurFade from '$lib/components/BlurFade.svelte';


    let isMobile = false;
    let dynamicHeight = 'min-h-screen';
    
    onMount(() => {
      // Detect mobile devices
      isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      const updateHeight = () => {
          if (isMobile) {
              dynamicHeight = window.innerHeight;
          }
      };

      if (isMobile) {
          // Set initial height
          updateHeight();
          
          // Update height on resize with debounce
          let resizeTimer;
          window.addEventListener('resize', () => {
              clearTimeout(resizeTimer);
              resizeTimer = setTimeout(() => {
                  updateHeight();
                  // Reset scroll position
                  window.scrollTo(0, window.pageYOffset - 1);
              }, 100);
          });

          // Lock scroll position on input focus
          document.addEventListener('focusin', () => {
              window.scrollTo(0, window.pageYOffset);
          });
      }
    });


</script>
  

<div class="relative overflow-hidden bg-[#233441] {isMobile ? `h-[${$dynamicHeight}px]` : 'min-h-screen'}">  
  <!-- Image Container -->
  <div class="absolute inset-0  filter brightness-50"
  style="background-image: url('background.png'); 
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;">
</div>
<Navbar fixed/>

<div class="relative z-20 pt-24 px-6 max-w-7xl mx-auto">
      <div class="flex flex-wrap w-full">  <!-- Added w-full here -->
        <div class="p-4 md:p-0 w-full">  <!-- Added w-full here -->
          <BlurFade class="text-center justify-center w-full">  <!-- Added w-full -->
            <div class="flex justify-center">  <!-- Added wrapper div -->
              <img src="/Logo.svg" class="max-w-lg w-full" alt="">
            </div>
          </BlurFade>
          <div class="pl-5 pr-5 w-full  justify-center text-center flex">
            <BlurFade delay={0.3}>
              <DatePicker/>
            </BlurFade>
          </div>
    
        </div>
      </div>

  </div>
</div>
