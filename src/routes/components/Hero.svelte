<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import DatePicker from './DatePicker.svelte';
    import Navbar from '../Navbar.svelte';
    import Contact from './Contact.svelte';

    import BlurFade from '$lib/components/BlurFade.svelte';




</script>
  
<div class=" flex flex-col items-center justify-center mt-20">

  
  <div class="flex flex-wrap ">
    <div class="p-4 md:p-0">
      <BlurFade class="text-center justify-center">
        <img src="/Logo.svg" class="max-w-lg w-full text-center justify-center" alt="">
      </BlurFade>
      

       <div class=" pl-5 pr-5 pb-[20vh] md:pb-[40vh]">
        <BlurFade delay={0.3}>
          <DatePicker/>
        </BlurFade>
       </div>
       
      </div>
    </div>
    
</div>



