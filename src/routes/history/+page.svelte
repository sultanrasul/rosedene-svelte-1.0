<script>
    import { onMount } from "svelte";
  
    let scrollProgress = 0;
    let container;
  
    const historyItem = 
      {
        year: "1852",
        image: "https://alondoninheritance.com/wp-content/uploads/2018/03/Old-Photos-of-London-7.jpg",
        title: "The Founding",
        text: "Built as a Highland manor blending Georgian symmetry and craftsmanship."
      }
    
  
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

<div class="bg-[#233441] text-white h-screen w-full flex items-center justify-center relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-repeat opacity-10" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzA5QTVCIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0tMS0xaDIydjIySDF6Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMS41Ii8+PC9nPjwvc3ZnPg==')"></div>

    <!-- Timeline Column -->
    <div class="w-10 flex-shrink-0 relative flex justify-center">
        <div class="sticky top-32 h-[80vh] w-1 sticky-bar">
            <!-- Progress Line -->
            <div class="progress-fill" style="height: {scrollProgress}%"></div>
            
            <!-- Timeline Markers -->

                <div 
                    class="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-[#C09A5B] bg-[#233441] transition-all duration-300"

                >
                    <div class="w-2 h-2 bg-[#C09A5B] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

        </div>
    </div>

    <!-- Content Container -->
    <div class="relative container mx-auto px-4 md:px-8 max-w-6xl">
        <div class="grid md:grid-cols-2 gap-12 items-center">
            <!-- Image Section -->
            <div class="relative group overflow-hidden rounded-lg shadow-2xl border-2 border-[#C09A5B]/30 transform transition-all duration-500 hover:scale-[1.02]">
                <div class="absolute inset-0 bg-[#C09A5B]/20 mix-blend-multiply transition-opacity duration-300"></div>
                <img 
                    src={historyItem.image} 
                    alt={historyItem.title} 
                    class="w-full h-[500px] object-cover object-center"
                />
                <!-- Year Badge -->
                <div class="absolute bottom-4 left-4 bg-[#C09A5B] px-4 py-2 rounded-md text-sm font-mono shadow-lg">
                    {historyItem.year}
                </div>
            </div>

            <!-- Text Section -->
            <div class="space-y-6 relative">
                <!-- Timeline Progress (Vertical Line) -->
                <div class="absolute left-[-2rem] top-0 bottom-0 w-1 bg-[#444] hidden md:block">
                    <div class="w-full h-8 bg-[#C09A5B] absolute top-0 transition-all duration-300"></div>
                </div>

                <div class="space-y-4">
                    <div class="text-[#C09A5B] font-mono text-lg tracking-wide">
                        Historical Chapter {historyItem.year}
                    </div>
                    <h2 class="text-4xl font-bold leading-tight">
                        {historyItem.title}
                    </h2>
                    <p class="text-white/80 text-lg leading-relaxed max-w-[500px]">
                        {historyItem.text}
                    </p>
                </div>

                <!-- Navigation Hint -->
                <div class="flex items-center gap-2 text-[#C09A5B] mt-8 animate-pulse">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    </svg>
                    <span class="font-mono text-sm">Scroll to continue</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Page Indicator -->
    <div class="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4">
        {#each [1,2,3,4] as num}
            <div class="w-3 h-3 rounded-full border border-[#C09A5B] transition-all duration-300 {num === 2 ? 'bg-[#C09A5B] scale-125' : 'bg-transparent'}"></div>
        {/each}
    </div>
</div>

<style>
    .container {
        padding-top: 4rem;
        padding-bottom: 4rem;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .animate-float {
        animation: float 3s ease-in-out infinite;
    }
</style>