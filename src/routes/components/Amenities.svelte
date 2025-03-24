<!-- Amenities.svelte -->
<script>
  import BlurFade from "@/components/BlurFade.svelte";
  import WordPullUp from "@/components/WordPullUp.svelte";

    export let title = "Aparthotel Amenities";
    export let ctaText = "Tell Me More";
    
    const amenities = [
        {
            title: 'Luxury Bedding',
            description: 'Premium emperor beds with high-thread-count linens'
        },
        {
            title: 'Full Kitchen',
            description: 'Fully equipped kitchens with modern appliances'
        },
        {
            title: 'High-Speed WiFi',
            description: 'Enterprise-grade connectivity throughout'
        },
        {
            title: 'Free Parking',
            description: 'Parking on site'
        },
        {
            title: 'Washing Machine',
            description: 'Stay fresh with our washing machines. Super handy for longer stays!'
        },
        {
            title: 'living spaces',
            description: "Curl up on the couch with a book or enjoy a movie night from bed. There's plenty of space to roll out a yoga mat or get some work done."
        }
    ];
</script>


<section class="bg-[#233441] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background Layers -->
    <div class="absolute inset-0 z-0">
        <!-- Primary Background -->
        <img 
            src="/1/4.jpg"
            alt="Scenic background"
            class="w-full h-full object-cover opacity-50 transition-opacity duration-1000"
            style="mask-image: linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%);"
        />


    </div>

    <!-- Content Container with elevated z-index -->
    <div class="max-w-7xl mx-auto relative z-10">
        <!-- Header -->
        <div class="text-center mb-12">
            <WordPullUp
                class="text-4xl max-[489px]:text-4xl font-bold text-[#C09A5B] tracking-wider uppercase"
                words="Staying In Our Aparthotels"
            />
            <!-- <h2 class="text-[#C09A5B] text-4xl font-bold mb-4 uppercase tracking-wider">
                Staying In Our Aparthotels
            </h2> -->
            <BlurFade delay={0.4}>
                <p class="text-white text-xl mb-8">
                    Half apartment, half hotel
                </p>
            </BlurFade>
            <div class="border-t border-[#C09A5B] h-2  w-32 mx-auto mb-10"></div>
            <BlurFade delay={0.8}>
                <p class="text-white italic max-w-2xl mx-auto text-lg">
                    Our individual services and amenities aren't new, but our combination is.
                </p>
            </BlurFade>
        </div>

        <!-- Amenities Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {#each amenities as amenity, i}
                <BlurFade delay={0.7+ (i)/7}>
                    <div class=" hover:scale-[1.02] group relative p-8 bg-[#233441]/60 backdrop-blur-sm border border-[#C09A5B]/20 rounded-xl hover:border-[#C09A5B]/40 transition-all">
                        <div class="flex items-start gap-6">
                            <!-- <div class="text-4xl text-[#C09A5B] p-4 bg-[#C09A5B]/10 rounded-lg transition-transform group-hover:scale-110">
                                {amenity.icon}
                            </div> -->
                            <div>
                                <h3 class="text-2xl font-semibold text-[#C09A5B] mb-2">
                                    {amenity.title}
                                </h3>
                                <p class="text-white leading-relaxed">
                                    {amenity.description}
                                </p>
                            </div>
                        </div>
                        <div class="absolute inset-0 -z-10 bg-gradient-to-br from-[#C09A5B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                    </div>
                </BlurFade>
            {/each}
        </div>

        
        <!-- Enhanced CTA Button -->
        <BlurFade delay={1}>
            <div class="text-center relative">
                <button on:click={() => { window.location.href = "/aparthotel"; }}
                 class="bg-[#C09A5B] text-[#233441] px-8 py-4 rounded-lg font-semibold hover:bg-[#b08d52] transition-all 
                           transform hover:scale-105 shadow-lg hover:shadow-xl shadow-[#C09A5B]/30 
                           border-2 border-[#C09A5B]/80 flex items-center gap-2 mx-auto
                           relative z-20">
                    <span>{ctaText}</span>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                </button>
            </div>
        </BlurFade>
    </div>
</section>