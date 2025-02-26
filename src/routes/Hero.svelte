<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import DatePicker from './DatePicker.svelte';
    import Navbar from './Navbar.svelte';
    import Contact from './Contact.svelte';
    import Calendar from './Calendar.svelte';

    import BlurFade from '$lib/components/BlurFade.svelte';




</script>
  
<div class=" flex flex-col items-center justify-center pt-20">

  <div class="flex flex-wrap ">
    <div class="p-4 md:p-0">
      <!-- <BlurFade> -->
        <img src="/Logo.svg" class="max-w-lg w-full" alt="">
      <!-- </BlurFade> -->

      <!-- <div class="text-[#C09A5B] tracking-[0.5em] font-light text-center w-full max-sm:text-center" style="font-family: 'Merriweather', serif;">
        <h1 class="pt-32 text-4xl md:text-[70px]">ROSEDENE</h1>
        <div class="inline-block">
          <h2 class="pt-6 text-[25px]">HIGHLAND HOUSE</h2>
          <hr class="mt-2 mx-auto border-[#C09A5B] border-t-[2px]" style="width: auto; height: 1px;" />
        </div>
        <p class="pt-4 pb-4 text-[17.5px] tracking-[0.2em]">Ness Islands Inverness</p>
      </div> -->


      <!-- <MobileDatePicker/> -->
       <div class=" pl-5 pr-5 md:p-0">
        <!-- <BlurFade delay={0.3}> -->
          <DatePicker/>
        <!-- </BlurFade> -->
       </div>
       
      </div>
    </div>
    
</div>



