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
    let reviews = [
        {
            "Cleanliness": 10,
            "Comfort": 10,
            "Facilities": 10,
            "Guest name": "Helen",
            "Location": 10,
            "Negative review": "Nothing!",
            "Positive review": "Quiet location right near River Ness and Ness Islands with easy walks to city centre. Comfy bed in a very spacious suite in a recently remodeled character building. The room was thoughtfully appointed, very clean and had more than we needed for dining in. En suite laundry was a bonus. Check-in details were sent ahead of time with clear instructions. Lots of on site parking behind a gate - not locked but felt secure.",
            "Property reply": "",
            "Reservation Number": "4497578795",
            "Review date": "Wed, 02 Oct 2024 16:00:56 GMT",
            "Review score": 10,
            "Review title": "Fantastic river location. Spacious suite in a character building with everything we needed and more!",
            "Staff": 7.5,
            "Value for money": 7.5
        },
        {
            "Cleanliness": 10,
            "Comfort": 10,
            "Facilities": 10,
            "Guest name": "Serena",
            "Location": 10,
            "Negative review": "",
            "Positive review": "Beautiful grand home in leafy, quiet location. Excellent facilities. Roomy and comfortable. Helpful and responsive staff. When we couldn’t find instruction folder for appliances response via WhatsApp was speedy and efficient. ",
            "Property reply": "",
            "Reservation Number": "4816559074",
            "Review date": "Sat, 28 Sep 2024 07:21:00 GMT",
            "Review score": 9,
            "Review title": "A lovely short break in Inverness. Quiet and relaxing environment after a day of sightseeing. ",
            "Staff": 10,
            "Value for money": 10
        },
        {
            "Cleanliness": 10,
            "Comfort": 10,
            "Facilities": 10,
            "Guest name": "Laura",
            "Location": 10,
            "Negative review": "N/A",
            "Positive review": "10/10 Incredible property, stay and amenities! The location is gorgeous,  peaceful and a short scenec walk into town. Everything about the apartment was so carefully thought out and beautifully designed. Our entire family was impressed. Also our host was absolutely the kindest most helpful, lovely person. He went out of his way multiple times to assist us even going as far as to upgrade our rooms as we ended up extending our stay 2 additional nights. Highly recommend Rosendene House!",
            "Property reply": "Thanks again Laura, not only did you add a lovely review on your first reservation, you have been so kind as to add one for your second reservation also. Thank you so much! we are honoured at Rosedene to have such esteemed Guests stay with us. You have a home from home here and are welcome back anytime! ",
            "Reservation Number": "2780842983",
            "Review date": "Sun, 28 May 2023 22:43:14 GMT",
            "Review score": 10,
            "Review title": "Best place ever!!! 100 Stars ",
            "Staff": 10,
            "Value for money": 10
        }
    ];
    let searchTerm = "";
    let sortBy = "date";
    let sortOrder = "desc";
    let debounceTimeout;

    // onMount(() => fetchReviews());

    // @ts-ignore

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
        try {
        // Parse the full date string directly
        const date = new Date(dateString);
        
        // Check for invalid date
        if (isNaN(date.getTime())) return 'Invalid Date';

        // Get day with ordinal suffix
        const day = date.getDate();
        const nth = (d) => {
            if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
            }
        };

        // Format as "12th May 2023"
        return `${day}${nth(day)} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        
        } catch (e) {
        console.error('Date formatting error:', e);
        return 'Invalid Date';
        }
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
         <!-- Review Cards Grid -->
         <div class="z-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {#each reviews as review, index}   
                <!-- {#if review["Positive review"] != "" }  -->
                <BlurFade class="relative bg-white/10 rounded-xl p-6 transition-all hover:bg-white/20 border border-white/20 hover:border-white/30 group">
                        <!-- Header (unchanged) -->
                        <div class="flex items-start justify-between mb-4">
                            <!-- Author Info -->
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#D1A054] to-amber-700 flex items-center justify-center text-white font-medium">
                                    {#if review["Guest name"] == ""}
                                    A
                                    {:else}
                                        {review["Guest name"].split(' ').map(n => n[0]).join('')}
                                    {/if}

                                </div>
                                <div>
                                    {#if review["Guest name"] == ""}
                                        <h3 class="text-white font-semibold">Anonymous</h3>
                                        {:else}
                                            <h3 class="text-white font-semibold">{review["Guest name"]}</h3>
                                    {/if}
                                    <span class="text-sm text-white/50">Reviewed: {formatDateToMonthYear(review["Review date"])}</span>
                                </div>
                            </div>

                            <!-- Date -->
                            
                            <!-- Score & Date -->
                            <div class="flex items-center justify-center 
                                bg-gradient-to-br from-[#003B95] to-[#0066CC]
                                shadow-lg shadow-[#003B95]/30 
                                rounded-full w-9 h-9 mb-1.5
                                transition-all duration-200
                                group-hover:scale-110 hover:shadow-[#003B95]/40
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
                            {#if review["Review title"] == ""}
                                {#if review["Review score"] == 10}
                                    Exceptional
                                {:else if review["Review score"] == 9}
                                    Superb
                                {:else if review["Review score"] == 8}
                                    Very Good
                                {:else if review["Review score"] == 7}
                                    Good
                                {:else if review["Review score"] == 6}
                                    Pleasant
                                {:else if review["Review score"] == 5}
                                    Passable
                                {/if}
                            {/if}
                            {review["Review title"]}
                        </h4>
                    
                        <!-- Review Content -->
                        <p bind:this={review.contentEl} class="text-white/90 mb-5 {review.isExpanded ? '' : 'line-clamp-4'}">
                            {#if review["Positive review"] == ""}
                                There are no comments available for this review
                            {:else}
                                {review["Positive review"]}
                            {/if}
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
                <!-- {/if} -->
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