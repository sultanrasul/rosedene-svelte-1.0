<script>
  import { onMount } from 'svelte';

// @ts-nocheck

    import { fade } from 'svelte/transition';
    import { BACKEND_URL } from '../conf';

    BACKEND_URL
    
    let reviews;

    onMount(() => fetchReviews());

    async function fetchReviews(page = 1) {
        try {
            const response = await fetch(`${BACKEND_URL}/get_reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: 1, limit: 10 }),
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            
            const data = await response.json();
            reviews = data.reviews;
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
            toast.error(`Failed to fetch reviews: ${err}`);
        }
    }

    function formatScore(score) {
        const num = Number(score);
        if (num === 10) return '10';
        return num % 1 === 0 ? num.toFixed(1) : num.toFixed(1);
    }

    function formatDateToMonthYear(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric'
        }).format(date);
    }

</script>

<div class="bg-[#233441] py-24 px-6 relative overflow-hidden min-h-screen">
    <!-- Background Layers -->
    <div class="absolute inset-0 z-0">
        <img 
            src="reviewsBackground.png"
            alt="Scenic background"
            class="w-full h-full object-cover opacity-30 transition-opacity duration-1000"
            style="mask-image: linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%);"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#233441]/90 via-[#233441]/50 to-transparent"></div>
        <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#233441] via-[#233441]/80 to-transparent"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
        <!-- Header Section -->
        <div class="text-center mb-14 space-y-5">
            <div class="inline-flex flex-col items-center">
                <span class="text-[#D1A054] uppercase tracking-widest text-sm mb-3 font-medium">
                    Guest Reviews
                </span>
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-5 relative">
                    Experiences That Speak Volumes
                    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#D1A054]"></div>
                </h2>
                
                <!-- Rating Summary -->
                <div class="mt-6 flex items-center gap-3 text-white/90">
                    <div class="flex items-center gap-1 text-[#D1A054]">
                        {#each Array(5) as _, i}
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        {/each}
                    </div>
                    <span class="text-lg font-medium">4.9/5</span>
                    <span class="text-sm">(Based on 284 reviews)</span>
                </div>
            </div>
        </div>

        <!-- Review Cards Grid -->
        {#if reviews}
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                {#each Array(10) as _, i}
                    {#if reviews[i]["Positive review"] != ""}             
                        <div 
                            class="relative bg-white/10 rounded-xl p-6 transition-all hover:bg-white/20 border border-white/20 hover:border-white/30 group"
                            transition:fade
                        >
                            <!-- Header -->
                            <div class="flex items-start justify-between mb-4">
                                <!-- Author Info -->
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#D1A054] to-amber-700 flex items-center justify-center text-white font-medium">
                                        {reviews[i]["Guest name"].split(' ').map(n => n[0]).join('')}                                
                                    </div>
                                    <div>
                                        <h3 class="text-white font-semibold">{reviews[i]["Guest name"]}</h3>
                                        <p class="text-sm text-white/60">United Kingdom</p>
                                    </div>
                                </div>
                                
                                <!-- Date -->
                                <span class="text-sm text-white/50">{formatDateToMonthYear(reviews[i]["Review date"])}</span>
                            </div>

                            <!-- Rating & Details -->
                            <div class="mb-4 flex items-center justify-between">

                                <div class="flex items-center justify-center text-white bg-[#003B95] rounded font-bold rounded-bl-[0px] w-8 h-8">
                                    <p >{formatScore(reviews[i]["Review score"])}</p>
                                </div>

                                <span class="text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full">
                                    Emperor 1
                                </span>
                            </div>

                            <!-- Review Content -->
                            <p class="text-white/90 mb-5 line-clamp-4">
                                {reviews[i]["Positive review"]}
                            </p>

                            <!-- Stay Details -->
                            <div class="pt-4 border-t border-white/10">
                                <div class="flex flex-wrap gap-3 text-sm text-white/60">
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        2 nights
                                    </span>
                                    <span>•</span>
                                    <span>Group Type</span>
                                </div>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}

        <!-- CTA Button -->
        <div class="text-center">
            <button 
                on:click={() => { window.location.href = "/reviews"; }}
                class="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D1A054] hover:bg-amber-600 text-white rounded-lg transition-all font-medium group"
            >
                Read All Reviews
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
            </button>
        </div>
    </div>

</div>

<style>
    /* Responsive adjustments */
    @media (max-width: 345px) {
        /* Make rating badge stack vertically */
        .rating-badge {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
        }

    }
</style>