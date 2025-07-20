<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import DatePicker from './DatePicker.svelte';
    import Navbar from '../Navbar.svelte';
    import Contact from './Contact.svelte';

    import BlurFade from '$lib/components/BlurFade.svelte';


    let isMobile = false;
    let dynamicHeight;
    
    onMount(() => {
      // Detect mobile devices
      let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      console.log(isMobile ? "it is mobile":  "not mobile")

      if (!isMobile){
        dynamicHeight = "min-h-screen";
      } else {
        dynamicHeight = `min-h-auto`
      }

      

    });


</script>
  

<div class="relative bg-[#233441] {dynamicHeight}">  
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
          <div class=" w-full  justify-center text-center flex">
            <BlurFade delay={0.3} class="min-w-[320px]">
              <DatePicker/>
            </BlurFade>
          </div>
    
        </div>
      </div>

  </div>
</div>
