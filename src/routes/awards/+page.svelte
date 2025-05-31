
<script>
    import BlurFade from "@/components/BlurFade.svelte";
    import Footer from "../Footer.svelte";
    import Navbar from "../Navbar.svelte";
    import WordPullUp from "@/components/WordPullUp.svelte";

    export let title = "Aparthotel Amenities";
    export let ctaText = "Tell Me More";
    
</script>

<!-- <svelte:head>
	<title>What is an Aparthotel? | Rosedene Highland House</title>
</svelte:head> -->

<div class="bg-[#233441]">
    <Navbar/>
</div>
<section class="bg-[#233441] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div class="max-w-6xl mx-auto relative z-10">
        <div class=" w-full md:1/2 block md:inline-flex pb-[100px] pl-10">
            <div class="w-full md:w-1/2">
                <BlurFade delay={0.2}>
                    <p class="mt-1 mb-5 text-white/90 uppercase">Distinction</p>
                </BlurFade>

                <!-- <h2 class="text-[#C09A5B] text-5xl md:leading-tight">what is an <br/> aparthotel?</h2> -->
                <WordPullUp duration={0.05} class="text-[#C09A5B] text-5xl md:leading-tight font-normal text-left" words={"Recognised"} />
                <WordPullUp duration={0.05} delay={0.2} class="text-[#C09A5B] text-5xl md:leading-tight font-normal text-left" words={"Excellence"} />
            </div>
            <div class="w-full md:w-1/2 mt-1 text-sm text-white/90">
                <BlurFade delay={0.2}>
                    <p class="mt-4">At Rosedene Highland House, recognition is more than just accolades — it reflects the dedication and care we put into every guest experience.</p>
                </BlurFade>
                <BlurFade delay={0.25}>
                    <p class="mt-4">These awards and certifications celebrate our commitment to high standards, safety, service, and comfort. They’re not just achievements — they’re promises we continue to uphold.</p>
                </BlurFade>
                <BlurFade delay={0.3}>
                    <p class="mt-4">Every certificate and guest rating represents trust earned through consistency, excellence, and genuine hospitality.</p>
                </BlurFade>
            </div>
            <!-- End Col -->
         </div>
        <!-- Enhanced Header -->
        <div class="text-center mb-16">
            <WordPullUp duration={0.1} class="text-[#C09A5B] text-4xl font-bold mb-4 uppercase tracking-wider" words={"Our Achievements"} />
            <div class="border-t border-[#C09A5B]/30 w-32 mx-auto mb-8"></div>
        </div>

        <!-- Image-Centric Grid -->
        <div class="space-y-16">
            <!-- ISAAP Building Accreditation certificate -->
            <div class="group relative flex flex-col md:flex-row gap-8 items-stretch hover:transform hover:scale-[99.5%] transition-all duration-300">
                <BlurFade class="md:w-1/2 h-96 relative overflow-hidden rounded-2xl border-2 border-[#C09A5B]/20 hover:border-[#C09A5B]/40">
                    <!-- Image Container -->
                        <img 
                            src="/awards/isaap-picture.png"
                            alt="Luxury Bedding"
                            class="w-full h-full object-cover transform transition-all 
                                    duration-500 group-hover:scale-105"
                        />
                </BlurFade>

                <!-- Content Container -->
                <div class="md:w-1/2 flex items-center p-8 md:p-12">
                    <div class="space-y-6 relative z-10">
                        <BlurFade delay={0.2}>
                            <h3 class="text-4xl font-bold text-[#C09A5B]">
                                ISAAP Building Accreditation certificate
                            </h3>
                        </BlurFade>
                        <BlurFade delay={0.4}>
  <p class="text-lg leading-relaxed">
    “This is a tremendous feather in our cap, and we are so pleased to have been recognised by such an august body. We have attracted clients from throughout the world to Inverness, and they have become valued, repeat customers. 

    I am really pleased that we provide an unmatched base for people to enjoy our wonderful city and, on a wider level, the magnificent Highlands.”
  </p>

  <!-- Read More Section -->
  <div>
    <div
      id="hs-show-hide-collapse-heading"
      class="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
      aria-labelledby="hs-show-hide-collapse"
    >
      <p class="text-lg leading-relaxed mt-4">
        “It has been my passion and obsession for delivering enhanced accommodation standards and outstanding guest experiences for more than 30 years. At Rosedene Highland House, I was able to bring all my skills together — consulting with industry experts to help fine-tune my vision. 

        The project started with the aim of achieving the ISAAP building accreditation award, and we set out not to follow trends of the day, but to go above and beyond — to set our model apart as an exemplar of what can be achieved.”
      </p>

      <p class="text-lg leading-relaxed mt-4">
        “Everything that we have done has been thoughtfully planned as part of a long-term vision for the site and to have a positive social impact. Our use of the building has added great value to the area by putting the iconic heritage structure back into use in this way.”
      </p>
    </div>

    <p class="mt-4">
      <button 
        type="button" 
        class="hs-collapse-toggle inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-[#C09A5B] hover:underline focus:outline-none focus:underline focus:text-[#C09A5B] disabled:opacity-50 disabled:pointer-events-none" 
        id="hs-show-hide-collapse" 
        aria-expanded="false" 
        aria-controls="hs-show-hide-collapse-heading" 
        data-hs-collapse="#hs-show-hide-collapse-heading"
      >
        <span class="hs-collapse-open:hidden">Read more</span>
        <span class="hs-collapse-open:block hidden">Read less</span>
        <svg class="hs-collapse-open:rotate-180 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>
    </p>
  </div>
</BlurFade>

                    </div>
                </div>
            </div>

            <!-- Booking.com Reviews award -->
            <div class="group relative flex flex-col md:flex-row-reverse gap-8 items-stretch hover:transform hover:scale-[99.5%] transition-all duration-300">
                <BlurFade class="md:w-1/2 h-96 relative overflow-hidden rounded-2xl border-2 border-[#C09A5B]/20 hover:border-[#C09A5B]/40">
                    <!-- Image Container -->
                        <img 
                            src="/awards/booking-2022.png"
                            alt="Luxury Bedding"
                            class="w-full h-full object-cover transform transition-all 
                                    duration-500 group-hover:scale-105"
                        />
                </BlurFade>

                <!-- Content Container -->
                <div class="md:w-1/2 flex items-center p-8 md:p-12">
                    <div class="space-y-6 relative z-10">
                        <BlurFade delay={0.2}>
                            <h3 class="text-4xl font-bold text-[#C09A5B]">
                                Traveller Review Awards 2022
                            </h3>
                        </BlurFade>
                        <BlurFade delay={0.4}>
                            <p class="text-lg  leading-relaxed">
                                Based on consistently high guest reviews, this award from Booking.com recognises the outstanding experiences we provide — from our warm hospitality to our attention to detail in every room and service.
                            </p>
                        </BlurFade>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>
<Footer/>