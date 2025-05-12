<script>
    import { onMount } from "svelte";
  
    let scrollProgress = 0;
    let container;
  
    const historyItems = [
      {
        year: "1852",
        image: "https://alondoninheritance.com/wp-content/uploads/2018/03/Old-Photos-of-London-7.jpg",
        title: "The Founding",
        text: "Built as a Highland manor blending Georgian symmetry and craftsmanship."
      },
      {
        year: "1920",
        image: "https://alondoninheritance.com/wp-content/uploads/2018/03/Old-Photos-of-London-7.jpg",
        title: "A Social Epicenter",
        text: "Famous for cultural salons, literary gatherings, and lavish garden parties."
      },
      {
        year: "1985",
        image: "https://alondoninheritance.com/wp-content/uploads/2018/03/Old-Photos-of-London-7.jpg",
        title: "Restoration",
        text: "Preserved original hearths, stained glass, and woodwork with modern updates."
      },
      {
        year: "2020",
        image: "https://alondoninheritance.com/wp-content/uploads/2018/03/Old-Photos-of-London-7.jpg",
        title: "Rebirth",
        text: "Transformed into a luxurious aparthotel, open to the world."
      }
    ];
  
    function updateScroll() {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      scrollProgress = (scrollY / docHeight) * 100;
    }
  
    onMount(() => {
      updateScroll();
      window.addEventListener("scroll", updateScroll);
      return () => window.removeEventListener("scroll", updateScroll);
    });
</script>

<div class="bg-[#233441] text-white min-h-screen px-4 md:px-16 overflow-hidden">
    <!-- Hero / Title -->
    <section class="text-center py-20 max-w-3xl mx-auto">
        <h1 class="text-[#C09A5B] text-5xl font-serif mb-4">Through the Ages</h1>
        <p class="text-white/80 text-lg">A walk through time — the history of Rosedene Highland House unfolds.</p>
    </section>

    <!-- Timeline Layout -->
    <div class="relative flex">
        <!-- Timeline Column -->
        <div class="w-10 flex-shrink-0 relative flex justify-center">
            <div class="sticky top-32 h-[80vh] w-1 sticky-bar">
                <!-- Progress Line -->
                <div class="progress-fill" style="height: {scrollProgress}%"></div>
                
                <!-- Timeline Markers -->
                {#each historyItems as item, i}
                    <div 
                        class="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-[#C09A5B] bg-[#233441] transition-all duration-300"
                        style="top: {i * (100 / (historyItems.length - 1))}%"
                    >
                        <div class="w-2 h-2 bg-[#C09A5B] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                {/each}
            </div>
        </div>

        <!-- Content Columns -->
        <div class="flex-1">
            {#each historyItems as item, i}
                <div class="relative group">
                    <!-- Connecting Line -->
                    {#if i > 0}
                        <div class="absolute left-[-4.5rem] top-[-6rem] w-1 h-32 bg-[#C09A5B]/30 -z-10" />
                    {/if}

                    <div class="flex items-stretch min-h-[400px] mb-32">
                        <!-- Text Section -->
                        <div class="w-1/2 pr-8">
                            <div class="max-w-md ml-auto transition-all duration-300 group-hover:translate-x-2 {i % 2 ? 'text-right' : 'text-left'}">
                                <div class="text-[#C09A5B] text-sm font-mono mb-2">{item.year}</div>
                                <h2 class="text-3xl font-bold mb-4">{item.title}</h2>
                                <p class="text-white/80 leading-relaxed">{item.text}</p>
                            </div>
                        </div>

                        <!-- Image Section -->
                        <div class="w-1/2 pl-8">
                            <div class="relative w-full h-full max-w-xl {i % 2 ? 'ml-auto' : 'mr-auto'} transition-transform duration-300 group-hover:scale-105">
                                <div class="absolute inset-0 bg-[#C09A5B]/20 mix-blend-multiply" />
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    class="w-full h-[300px] object-cover rounded-lg shadow-xl border-2 border-[#C09A5B]/30"
                                />
                                <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#233441] to-transparent">
                                    <div class="text-sm font-mono text-[#C09A5B]">{item.year}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .sticky-bar::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        width: 4px;
        height: 100%;
        background: linear-gradient(to bottom, #444 0%, #444 50%, transparent 100%);
        background-size: 4px 20px;
        transform: translateX(-50%);
    }

    .progress-fill {
        background: linear-gradient(to bottom, #C09A5B 0%, #C09A5B 100%);
        width: 4px;
        transition: height 0.2s ease;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .animate-entry {
        animation: fadeIn 0.6s ease forwards;
    }
</style>