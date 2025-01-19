<script>
// @ts-nocheck

    import { Section, News, HeroHeader, HeroBody } from 'flowbite-svelte-blocks';
    import { Button, Avatar} from 'flowbite-svelte';
    import { ArrowRightOutline, ArrowDownOutline, GithubSolid } from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';
    import GradualSpacing from "$lib/components/GradualSpacing.svelte";
    import BlurFade from '$lib/components/BlurFade.svelte';
    import TextReveal from '$lib/components/TextReveal.svelte';
    import NumberTicker from '$lib/components/NumberTicker.svelte';
    import DatePicker from './DatePicker.svelte';


  let todaysDate = new Date();

  /**
	 * @type {number}
	 */
  let screenWidth;



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
  /**
	 * @param {string} id
	 */
  function scrollToElementWithOffset(id) {
        const element = document.getElementById(id);
        const yOffset = -100; // Adjust this value as needed
        // @ts-ignore
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    }
</script>
  
<Section sectionClass="min-h-screen flex flex-col items-center">
  <div class="flex flex-wrap ">
    <div>
      <div class="text-[#C09A5B] tracking-[0.5em] font-light text-center w-full max-sm:text-center" style="font-family: 'Merriweather', serif;">
        <h1 class="pt-16 text-4xl md:text-[70px]">ROSEDENE</h1>
        <div class="inline-block">
          <h2 class="pt-6 text-[25px]">HIGHLAND HOUSE</h2>
          <hr class="mt-2 mx-auto border-[#C09A5B] border-t-[2px]" style="width: auto; height: 1px;" />
        </div>
        <p class="pt-4 pb-4 text-[17.5px] tracking-[0.2em]">Ness Islands Inverness</p>
      </div>
      <DatePicker/>
    </div>
  </div>
</Section>



