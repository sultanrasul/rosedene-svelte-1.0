<script>
  import Footer from "../Footer.svelte";
  import Navbar from "../Navbar.svelte";
  import BlurFade from "@/components/BlurFade.svelte";
  import WordPullUp from "@/components/WordPullUp.svelte";
</script>

<svelte:head>
	<title>About | Rosedene Highland House</title>
</svelte:head>

<!-- About -->
<div class="min-h-screen bg-[#233441] text-white">
  <Navbar />

  <div class="max-w-[80%] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Grid Layout -->
    <div class="flex flex-col md:flex-row gap-10 items-center">
      
      <!-- Left Side: Title + Description -->
      <div class="w-full md:w-1/2 space-y-6">
        <div>
          <WordPullUp class="text-[#C09A5B] text-4xl md:text-6xl font-normal" words={"A modern take on"} />
          <WordPullUp class="text-[#C09A5B] text-4xl md:text-6xl font-normal" words={"Highland tradition."} />
        </div>

        <!-- Description Paragraphs -->
        <div class="space-y-5 text-white/90">
          <BlurFade delay={0.2}>
            <p>
              Apartments at Rosedene Highland House are a little different from most Serviced Apartments in the Scottish Highlands.
              Our goal was to create a safe and comfortable place for our guests to stay while they experience a part of Scottish history at Rosedene Highland House and beyond.
            </p>
          </BlurFade>

          <BlurFade delay={0.3}>
            <p>
              Whether staying for work or leisure, with Ness Islands at the doorstep you can enjoy the best of the surrounding location with an easy route into the deeper mysterious Highlands.
            </p>
          </BlurFade>

          <BlurFade delay={0.4}>
            <p>
              Rosedene Highland House is a Victorian gem with an extensive local heritage, its history interweaved with that of Inverness and the Highlands themselves.
            </p>
          </BlurFade>

          <BlurFade delay={0.5}>
            <p>
              The iconic building has been re-imagined to offer a mix of the classic and the contemporary, tradition meets the new in the most sympathetic and thoughtful manner — and for the time you stay with us, it’s your home.
            </p>
          </BlurFade>
        </div>
      </div>

      <!-- Right Side: Image -->
      <div class="w-full md:w-1/2">
        <img src="/background-test.png" alt="About image" class="w-full rounded-lg object-cover shadow-lg" />
      </div>
    </div>
  </div>
</div>

<Footer />
