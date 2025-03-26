<script>
  import { onMount, afterUpdate, onDestroy } from 'svelte';


// @ts-nocheck

    import { fade } from 'svelte/transition';
    import { BACKEND_URL } from '../conf';
  import WordPullUp from '@/components/WordPullUp.svelte';
  import BlurFade from '@/components/BlurFade.svelte';
  import BookingDetails from '../details/bookingDetails.svelte';

    BACKEND_URL
    
    // @ts-ignore
    /**
   * @type {any}
   */
    let reviews = [];

    onMount(() => fetchReviews());

    // @ts-ignore
    async function fetchReviews(page = 1) {
        try {
            const response = await fetch(`${BACKEND_URL}/get_reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: 1, limit: 7 }),
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            
            const data = await response.json();
            reviews = data.reviews.map(review => ({
                ...review,
                isExpanded: false,
                needsReadMore: false, // Changed from showReadMore
                titleEl: null,
                contentEl: null,
                observer: null
            }));
            initResizeObservers();

        } catch (err) {
            console.error('Failed to fetch reviews:', err);
            // @ts-ignore
            toast.error(`Failed to fetch reviews: ${err}`);
        }
    }

    function initResizeObservers() {
        reviews.forEach((review) => {
            if (!review.observer && review.titleEl && review.contentEl) {
                const checkClamping = () => {
                    const titleClamped = review.titleEl.scrollHeight > review.titleEl.clientHeight;
                    const contentClamped = review.contentEl.scrollHeight > review.contentEl.clientHeight;
                    
                    // Only update needsReadMore if not already set
                    if (!review.needsReadMore) {
                        review.needsReadMore = titleClamped || contentClamped;
                    }
                };
                
                review.observer = new ResizeObserver(checkClamping);
                review.observer.observe(review.titleEl);
                review.observer.observe(review.contentEl);
                checkClamping(); // Initial check
            }
        });
    }

    onDestroy(() => {
        reviews.forEach(review => {
            if (review.observer) review.observer.disconnect();
        });
    });

    afterUpdate(initResizeObservers);

    // @ts-ignore
    function formatScore(score) {
        const num = Number(score);
        if (num === 10) return '10';
        return num % 1 === 0 ? num.toFixed(1) : num.toFixed(1);
    }

    // @ts-ignore
    function formatDateToMonthYear(dateString) {
        // Pad single-digit time components and format to ISO
        const [datePart] = dateString.split(' ');
        const date = new Date(`${datePart}`);
        
        if (isNaN(date.getTime())) return '';
        
        return date.toLocaleString('default', { month: 'long' }) + 
            ' ' + date.getFullYear();
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
                <BlurFade delay={0.8}>
                    <span class="text-[#D1A054] uppercase tracking-widest text-sm mb-3 font-medium">
                        Guest Reviews
                    </span>
                </BlurFade>
                <WordPullUp
                    class="text-4xl md:text-5xl font-bold text-white mb-5 relative uppercase"
                    words="Experiences That Speak Volumes"
                />
                <!-- <h2 class="text-4xl md:text-5xl font-bold text-white mb-5 relative">
                    Experiences That Speak Volumes
                </h2> -->
                <BlurFade delay={0.9}>
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
                </BlurFade>
            </div>
        </div>

        <!-- Review Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {#each reviews as review, index}   
                {#if review["Positive review"] != "" }             
                    <BlurFade class="relative bg-white/10 rounded-xl p-6 transition-all hover:bg-white/20 border border-white/20 hover:border-white/30 group">
                        <!-- Header (unchanged) -->
                        <div class="flex items-start justify-between mb-4">
                            <!-- Author Info -->
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#D1A054] to-amber-700 flex items-center justify-center text-white font-medium">
                                    {review["Guest name"].split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 class="text-white font-semibold">{review["Guest name"]}</h3>
                                </div>
                            </div>
                            
                            <!-- Score & Date -->
                            <div class="flex items-center justify-center 
                                bg-gradient-to-br from-[#003B95] to-[#0066CC]
                                shadow-lg shadow-[#003B95]/30 
                                rounded-full w-9 h-9 mb-1.5
                                transition-all duration-200
                                hover:scale-105 hover:shadow-[#003B95]/40
                                active:scale-95
                                group-hover:ring-2 group-hover:ring-white/20">
                            <span class="text-white font-bold text-sm 
                                    drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]
                                    tracking-tighter">
                                {formatScore(review["Review score"])}
                            </span>
                        </div>
                        </div>
                    
                        <!-- Review Title -->
                        <h4 bind:this={review.titleEl} class="text-white font-medium text-lg mb-3 {review.isExpanded ? '' : 'line-clamp-3'}">
                            {review["Review title"]}
                        </h4>
                    
                        <!-- Review Content -->
                        <p bind:this={review.contentEl} class="text-white/90 mb-5 {review.isExpanded ? '' : 'line-clamp-4'}">
                            {review["Positive review"]}
                        </p>
            
                        {#if review.needsReadMore}
                        <div>                        
                            <p class="mt-4">
                            <button 
                                on:click={() => review.isExpanded = !review.isExpanded}
                                class="inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-[#C09A5B] hover:underline focus:outline-none focus:underline focus:text-[#C09A5B] disabled:opacity-50 disabled:pointer-events-none" 
                            >
                                <span>{review.isExpanded ? 'Read less' : 'Read more'}</span>
                                <svg 
                                class="shrink-0 size-4 transition-transform {review.isExpanded ? 'rotate-180' : ''}" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round"
                                >
                                <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </button>
                            </p>
                        </div>
                        {/if}
                    </BlurFade>   
                {/if}
            {/each}
        </div>

        <BlurFade>
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
        </BlurFade>
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