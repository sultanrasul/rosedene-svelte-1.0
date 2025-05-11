<!-- Amenities.svelte -->
<script>
  import BlurFade from "@/components/BlurFade.svelte";
    import Footer from "../Footer.svelte";
    import Navbar from "../Navbar.svelte";
  import WordPullUp from "@/components/WordPullUp.svelte";

    export let title = "Aparthotel Amenities";
    export let ctaText = "Tell Me More";
    
    const amenities = [
        {
            image: '/10/5.jpg',
            title: 'Luxury Bedding',
            description: 'Premium emperor beds with high-thread-count linens'
        },
        {
            image: '/3/1.jpg',
            title: 'Full Kitchen',
            description: 'Fully equipped kitchens with modern appliances'
        },
        {
            image: '/2/0.jpg',
            title: 'living spaces',
            description: "Curl up on the couch with a book or enjoy a movie night from bed. There's plenty of space to roll out a yoga mat or get some work done."
        },
        {
            image: '/parking.png',
            title: 'Free Parking',
            description: 'Parking on site'
        },
        {
            image: '📶',
            title: 'High-Speed WiFi',
            description: 'Enterprise-grade connectivity throughout'
        },
        {
            image: '🏋️',
            title: 'Washing Machine',
            description: 'Stay fresh with our washing machines. Super handy for longer stays!'
        },
    ];
</script>

<div class="bg-[#233441]">
    <Navbar/>
</div>
<section class="bg-[#233441] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div class="max-w-6xl mx-auto relative z-10">
        <div class=" w-full md:1/2 block md:inline-flex pb-[100px] pl-10">
            <div class="w-full md:w-1/2">
                <BlurFade delay={0.2}>
                    <p class="mt-1 mb-5 text-white/90">APARTHOTEL?</p>
                </BlurFade>

                <!-- <h2 class="text-[#C09A5B] text-5xl md:leading-tight">what is an <br/> aparthotel?</h2> -->
                <WordPullUp duration={0.05} class="text-[#C09A5B] text-5xl md:leading-tight font-normal text-left" words={"What is an"} />
                <WordPullUp duration={0.05} delay={0.2} class="text-[#C09A5B] text-5xl md:leading-tight font-normal text-left" words={"aparthotel?"} />
            </div>
            <div class="w-full md:w-1/2 mt-1 text-sm text-white/90">
                <BlurFade delay={0.2}>
                    <p class="mt-4">Half apartment, half hotel!</p>
                </BlurFade>
                <BlurFade delay={0.25}>
                    <p class="mt-4">Everything you love about hotel hospitality and apartment living, in one place, together.</p>
                </BlurFade>
                <BlurFade delay={0.3}>
                    <p class="mt-4">Whether you're staying solo, with family, colleagues, or friends, aparthotels offer you ultimate comfort and flexibility, with all the care and attention* you’d expect of a hotel.</p>
                </BlurFade>
                <BlurFade delay={0.35}>
                    <p class="mt-4">Aparthotels are perfect for both short and long stays. With Rosedene Highland House</p>
                </BlurFade>
                <BlurFade delay={0.4}>
                    <p class="mt-4">*pancake machines, *workout spaces, *in-room kettles</p>
                </BlurFade>
            </div>
            <!-- End Col -->
         </div>
        <!-- Enhanced Header -->
        <div class="text-center mb-16">
            <WordPullUp duration={0.1} class="text-[#C09A5B] text-5xl font-bold mb-4 uppercase tracking-wider" words={"Premium Amenities"} />
            <!-- <h2 class="text-[#C09A5B] text-5xl font-bold mb-4 uppercase tracking-wider">
                Premium Amenities
            </h2> -->
            <div class="border-t border-[#C09A5B]/30 w-32 mx-auto mb-8"></div>
        </div>

        <!-- Image-Centric Grid -->
        <div class="space-y-16">
            {#each amenities as amenity, i}
                <div class="group relative flex flex-col md:flex-row gap-8 items-stretch 
                           {i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                           hover:transform hover:scale-[99.5%] transition-all duration-300">
                    <BlurFade class="md:w-1/2 h-96 relative overflow-hidden rounded-2xl border-2 border-[#C09A5B]/20 hover:border-[#C09A5B]/40">
                        <!-- Image Container -->
                            <img 
                                src={amenity.image}
                                alt={amenity.title}
                                class="w-full h-full object-cover transform transition-all 
                                       duration-500 group-hover:scale-105"
                            />
                    </BlurFade>

                    <!-- Content Container -->
                    <div class="md:w-1/2 flex items-center p-8 md:p-12">
                        <div class="space-y-6 relative z-10">
                            <BlurFade delay={0.2}>
                                <h3 class="text-4xl font-bold text-[#C09A5B]">
                                    {amenity.title}
                                </h3>
                            </BlurFade>
                            <BlurFade delay={0.4}>
                                <p class="text-lg  leading-relaxed">
                                    {amenity.description}
                                </p>
                            </BlurFade>
                            {#if amenity.title === 'Full Kitchen'}
                                <BlurFade delay={0.5}>
                                    <div class="pt-4 space-y-4">
                                        <div class="flex gap-4 text-[#C09A5B]/90">
                                            <div class="flex-1 border-t border-[#C09A5B]/30"></div>
                                            <span class="text-sm uppercase tracking-wider">Includes</span>
                                            <div class="flex-1 border-t border-[#C09B5B]/30"></div>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4 text-sm">
                                            <div class="flex items-center gap-2">
                                                <span class="text-[#C09A5B]">✓</span> Chef-grade appliances
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <span class="text-[#C09A5B]">✓</span> Full cookware set
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <span class="text-[#C09A5B]">✓</span> Smart refrigerator
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <span class="text-[#C09A5B]">✓</span> Coffee station
                                            </div>
                                        </div>
                                    </div>
                                </BlurFade>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>

    </div>
</section>
<Footer/>