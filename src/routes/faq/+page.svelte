<script>
  import Footer from "../Footer.svelte";
  import Navbar from "../Navbar.svelte";
  import BlurFade from "@/components/BlurFade.svelte";
  import WordFadeIn from "@/components/WordFadeIn.svelte";
  import WordPullUp from "@/components/WordPullUp.svelte";

</script>
<!-- FAQ -->
<div class="min-h-screen bg-[#233441]">
     <Navbar/>
     <div class="max-w-[80%] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
         <!-- Grid -->
         <div class=" w-full md:1/2 block md:inline-flex ">
           <div class="w-full md:w-1/2">

              <BlurFade delay={0.3}>
                <p class="mt-1 mb-5 text-white/90">NEED HELP?</p>
              </BlurFade>

                <WordPullUp  class="text-[#C09A5B] text-5xl md:leading-tight font-normal text-left" words={"frequently"} />
                <WordPullUp  class="text-[#C09A5B] text-5xl md:leading-tight font-normal text-left" words={"asked questions"} />
               <!-- <h2 class="text-[#C09A5B] text-5xl md:leading-tight">frequently<br>asked questions</h2> -->
           </div>
           <div class="w-full md:w-1/2">
                <BlurFade delay={0.3}>
                  <p class="mt-1  text-white/90">Got a question? Please find your answer below...</p>
                </BlurFade>
           </div>
           <!-- End Col -->
           <!-- End Col -->
        </div>

        <!-- The Rosedene Experience -->
        <div class="w-full block md:inline-flex pt-[200px]">
            <div class="w-full pb-10 md:w-1/2">
                <BlurFade delay={0.4}>
                  <h1 class="text-[#C09A5B] text-2xl md:leading-tight">The Rosedene Experience</h1>
                </BlurFade>
            </div>
            <div class="w-full md:w-1/2">
              <!-- Accordion -->
              <div class="hs-accordion-group divide-y divide-gray-200">
                <BlurFade delay={0.5 + 0.1}>
                  <div class="hs-accordion pb-3 active" id="hs-basic-with-title-and-arrow-stretched-heading-one">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="true" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
                      Can I cancel at anytime?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-one" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
                      <p class="text-white/90">
                        Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.
                      </p>
                    </div>
                  </div>
                </BlurFade>
                <BlurFade delay={0.5 + 0.2}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-two">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                      My team has credits. How do we use them?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
                      <p class="text-white/90">
                        Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.
                      </p>
                    </div>
                  </div>
                </BlurFade>
                
                <BlurFade delay={0.5 + 0.3}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-three">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three">
                      How does Preline's pricing work?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-three" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
                      <p class="text-white/90">
                        Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.
                      </p>
                    </div>
                  </div>
                </BlurFade>
                
                <BlurFade delay={0.5 + 0.4}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-four">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-four">
                      How secure is Preline?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-four" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-four">
                      <p class="text-white/90">
                        Protecting the data you trust to Preline is our first priority. This part is really crucial in keeping the project in line to completion.
                      </p>
                    </div>
                  </div>
                </BlurFade>

                <BlurFade delay={0.5 + 0.5}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-five">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-five">
                      How do I get access to a theme I purchased?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-five" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-five">
                      <p class="text-white/90">
                        If you lose the link for a theme you purchased, don't panic! We've got you covered. You can login to your account, tap your avatar in the upper right corner, and tap Purchases. If you didn't create a login or can't remember the information, you can use our handy Redownload page, just remember to use the same email you originally made your purchases with.
                      </p>
                    </div>
                  </div>
                </BlurFade>
                
                <BlurFade delay={0.5 + 0.6}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-six">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-six">
                      Upgrade License Type
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-six" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-six">
                      <p class="text-white/90">
                        There may be times when you need to upgrade your license from the original type you purchased and we have a solution that ensures you can apply your original purchase cost to the new license purchase.
                      </p>
                    </div>
                  </div>
                </BlurFade>
              </div>
              <!-- End Accordion -->
            </div>
        </div>

        
        <!-- Bookings -->
        <div class="w-full block md:inline-flex pt-[200px]">
            <div class="w-full pb-10 md:w-1/2">
              <BlurFade >
                <h1 class="text-[#C09A5B] text-2xl md:leading-tight">Bookings</h1>
              </BlurFade>
            </div>
            <div class="w-full md:w-1/2">
              <!-- Accordion -->
              <div class="hs-accordion-group divide-y divide-gray-200">
                <BlurFade delay={0.1}>
                  <div class="hs-accordion pb-3 active" id="hs-basic-with-title-and-arrow-stretched-heading-one">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="true" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
                      Can I cancel at anytime?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-one" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
                      <p class="text-white/90">
                        Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.
                      </p>
                    </div>
                  </div>
                </BlurFade>
                <BlurFade delay={0.2}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-two">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                      My team has credits. How do we use them?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
                      <p class="text-white/90">
                        Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.
                      </p>
                    </div>
                  </div>
                </BlurFade>
                
                <BlurFade delay={0.3}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-three">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three">
                      How does Preline's pricing work?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-three" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
                      <p class="text-white/90">
                        Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.
                      </p>
                    </div>
                  </div>
                </BlurFade>
                
                <BlurFade delay={0.4}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-four">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-four">
                      How secure is Preline?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-four" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-four">
                      <p class="text-white/90">
                        Protecting the data you trust to Preline is our first priority. This part is really crucial in keeping the project in line to completion.
                      </p>
                    </div>
                  </div>
                </BlurFade>

                <BlurFade delay={0.5}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-five">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-five">
                      How do I get access to a theme I purchased?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-five" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-five">
                      <p class="text-white/90">
                        If you lose the link for a theme you purchased, don't panic! We've got you covered. You can login to your account, tap your avatar in the upper right corner, and tap Purchases. If you didn't create a login or can't remember the information, you can use our handy Redownload page, just remember to use the same email you originally made your purchases with.
                      </p>
                    </div>
                  </div>
                </BlurFade>
                
                <BlurFade delay={0.6}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-six">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-six">
                      Upgrade License Type
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-six" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-six">
                      <p class="text-white/90">
                        There may be times when you need to upgrade your license from the original type you purchased and we have a solution that ensures you can apply your original purchase cost to the new license purchase.
                      </p>
                    </div>
                  </div>
                </BlurFade>
              </div>
              <!-- End Accordion -->
            </div>
        </div>

        <!-- facilities & services -->
        <div class="w-full block md:inline-flex pt-[200px]">
            <div class="w-full pb-10 md:w-1/2">
              <BlurFade>
                <h1 class="text-[#C09A5B] text-2xl md:leading-tight">facilities & services</h1>
              </BlurFade>
            </div>
            <div class="w-full md:w-1/2">
              <!-- Accordion -->
              <div class="hs-accordion-group divide-y divide-gray-200">
                <BlurFade delay={0.1}>
                  <div class="hs-accordion pb-3 active" id="hs-basic-with-title-and-arrow-stretched-heading-one">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="true" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
                      Can I cancel at anytime?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-one" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
                      <p class="text-white/90">
                        Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.
                      </p>
                    </div>
                  </div>
                </BlurFade>
                <BlurFade delay={0.2}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-two">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                      My team has credits. How do we use them?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
                      <p class="text-white/90">
                        Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.
                      </p>
                    </div>
                  </div>
                </BlurFade>
                
                <BlurFade delay={0.3}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-three">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three">
                      How does Preline's pricing work?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-three" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
                      <p class="text-white/90">
                        Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.
                      </p>
                    </div>
                  </div>
                </BlurFade>
                
                <BlurFade delay={0.4}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-four">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-four">
                      How secure is Preline?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-four" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-four">
                      <p class="text-white/90">
                        Protecting the data you trust to Preline is our first priority. This part is really crucial in keeping the project in line to completion.
                      </p>
                    </div>
                  </div>
                </BlurFade>

                <BlurFade delay={0.5}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-five">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-five">
                      How do I get access to a theme I purchased?
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-five" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-five">
                      <p class="text-white/90">
                        If you lose the link for a theme you purchased, don't panic! We've got you covered. You can login to your account, tap your avatar in the upper right corner, and tap Purchases. If you didn't create a login or can't remember the information, you can use our handy Redownload page, just remember to use the same email you originally made your purchases with.
                      </p>
                    </div>
                  </div>
                </BlurFade>
                
                <BlurFade delay={0.6}>
                  <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-six">
                    <button class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white/90 rounded-lg transition hover:text-white focus:outline-hidden focus:text-white" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-six">
                      Upgrade License Type
                      <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-white/90 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-six" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-six">
                      <p class="text-white/90">
                        There may be times when you need to upgrade your license from the original type you purchased and we have a solution that ensures you can apply your original purchase cost to the new license purchase.
                      </p>
                    </div>
                  </div>
                </BlurFade>
              </div>
              <!-- End Accordion -->
            </div>
        </div>


         <!-- End Grid -->
       </div>
    </div>
    <Footer/>
  <!-- End FAQ -->
