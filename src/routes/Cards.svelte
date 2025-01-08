<script>
  import { Card, Button } from 'flowbite-svelte';
  import { ArrowRightOutline, DiscordSolid, ArrowDownOutline, ArrowUpOutline } from 'flowbite-svelte-icons';
  import BorderBeam from '$lib/components/BorderBeam.svelte';
  import BlurFade from '$lib/components/BlurFade.svelte';
  
  let dateDescending = true;
  let cards = [
    {
      title: "OrbitTech",
      date: new Date("2024-01-23"),
      img: "\\cardImages\\orbitTech.png",
      description: "Developer for my Schools Young Enterprise team, where I was asked to create E-commerce website for our product.",
      link: "/orbittech",
      linkText: "Read More"
    },
    {
      title: "Base Converter",
      date: new Date("2023-06-23"),
      img: "\\cardImages\\bases.png",
      description: "I was learning how to convert different numbers to different bases in my Advanced higher maths class so I made a website application to do it for me with working.",
      link: "/bases",
      linkText: "View Website"
    },
    {
      title: "Motorised Blinds",
      date: new Date("2023-07-09"),
      img: "\\cardImages\\blinds.png",
      description: "I used an ESP32 to control the stepper motors and asked my friend to 3D print me the parts to attach to my motor, I used the Sinric.pro to link my blinds to my Alexa.",
      link: "/blinds",
      linkText: "Read More"
    },
    {
      title: "Wordle ++",
      date: new Date("2022-03-16"),
      img: "\\cardImages\\wordle.png",
      description: "This google chrome extension tells you the wordle of the day. It also gives you hints if you don't want the answer.",
      link: "https://chromewebstore.google.com/detail/wordle++/lkdgfadjadljnjokkhinbjoknomnjkil?hl=en",
      linkText: "View App"
    },
    {
      title: "First Website",
      date: new Date("2022-02-26"),
      img: "\\cardImages\\oldWebsite.png",
      description: "My first website that I made, I decided to make a portfolio website with plain html, css and javascript.",
      link: "https://old.funkypanda.dev",
      linkText: "View Old Website"
    },
    {
      title: "Weather App",
      date: new Date("2022-04-05"),
      img: "\\cardImages\\weatherApp.png",
      description: "I wanted to make a mobile app instead of making a web app so I decided to learn flutter. I am using the flutter framework to create a weather app.",
      link: "https://funkypanda.dev",
      linkText: "Google Play"
    },
    {
      title: "Music Bot",
      date: new Date("2023-04-22"),
      img: "\\cardImages\\discordMusicBot.png",
      description: "I made this discord bot just after groove got shutdown it plays music from youtube or soundcloud though my bot, It also has other uses as well and it also uses slash commands.",
      link: "https://github.com/Funky-Panda/Discord-Music-Bot-/blob/main/main.py",
      linkText: "Source Code",
      icon: DiscordSolid,
      note: "(yt-dlp module broken)"
    }
  ];

  function sortCards() {
    dateDescending = !dateDescending;
    cards = cards.slice().sort((a, b) => dateDescending ? b.date - a.date : a.date - b.date);
  }

  $: sortedCards = cards.slice().sort((a, b) => dateDescending ? b.date - a.date : a.date - b.date);
</script>

<div class="min-h-screen flex flex-col justify-center items-center pb-30" id="Projects">
  <div class="pb-20 flex flex-col lg:flex-row items-center lg:justify-start lg:items-start">
    <h1 class="pr-0 lg:pr-10 text-center text-5xl text-primary-900 dark:text-primary-100">What am I working on?</h1>
    <div class="flex justify-center w-full lg:w-auto">
      <Button class="w-1/2 lg:w-full mt-2 lg:ml-4" pill outline on:click={sortCards}>
        Date
        {#if dateDescending}
          <ArrowDownOutline/>
        {:else}
          <ArrowUpOutline/>
        {/if}
      </Button>
    </div>
  </div>



  <div class="flex flex-wrap justify-center gap-4">
    {#each sortedCards as { title, date, img, description, link, linkText, icon, note }, index}
    <BlurFade delay = {0 + (index/4)}>
      <div class="relative rounded-xl border flex flex-col">
        <BorderBeam size={300} duration={12} />

        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="p-5">

              <!-- title -->
              <div class="flex justify-between items-center mb-2">
                <div>
                  <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
                    {#if icon}
                    <svelte:component this={icon} class="w-6 h-6 mr-2" />
                    {/if}
                    {title}
                  </h5>
                  {#if note}
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">{note}</p>
                  {/if}
                </div>
                <p class="text-right text-xs text-gray-500 dark:text-gray-400">{date.toLocaleDateString()}</p>
              </div>
              <!-- title -->

              <!-- image -->
              <!-- <img class="h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800 w-40 " src={img} alt="image description"> -->

              <!-- image -->
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
              <a href={link} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary-800 dark:hover:bg-primary-700 dark:focus:ring-blue-800">
                {linkText}
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a>
          </div>
        </div>

        <!-- <Card padding="lg"  size="xs" class="flex-grow flex flex-col" >
          <div class="flex justify-between items-center mb-2">
            <div>
              <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
                {#if icon}
                <svelte:component this={icon} class="w-6 h-6 mr-2" />
                {/if}
                {title}
              </h5>
              {#if note}
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">{note}</p>
              {/if}
            </div>
            <p class="text-right text-xs text-gray-500 dark:text-gray-400">{date.toLocaleDateString()}</p>
          </div>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight flex-grow overflow-hidden">
            {description}
          </p>
  
          <Button href={link} class="mt-5">
            {linkText} <ArrowRightOutline class=" w-6 h-6 ms-2 text-white" />
          </Button>
        </Card> -->
      </div>
    </BlurFade>

    {/each}
  </div>
  
  
</div>

