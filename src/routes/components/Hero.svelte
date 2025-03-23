<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import DatePicker from './DatePicker.svelte';
    import Navbar from '../Navbar.svelte';
    import Contact from './Contact.svelte';

    import BlurFade from '$lib/components/BlurFade.svelte';




</script>
  
<div class="flex flex-col items-center pt-20 min-h-screen">
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