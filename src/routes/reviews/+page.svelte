<script>
    // @ts-nocheck
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import Navbar from '../Navbar.svelte';
    import { BACKEND_URL } from '../conf';
    import { toast } from 'svelte-sonner';
    import Footer from '../Footer.svelte';
    import { afterUpdate, onDestroy } from 'svelte';
    import BlurFade from '@/components/BlurFade.svelte';
    import { Plus, Search } from 'lucide-svelte';

    
    let searchTerm = "";
    let topics = [];
    let sortBy = "date";
    let sortOrder = "desc";
    let debounceTimeout;
    let showSearch = false

    let showSortOptions = false;
    let selectedSort = `${sortBy}-${sortOrder}`;
                    
    function setSort(type, order) {
        sortBy = type;
        sortOrder = order;
        showSortOptions = false;
        selectedSort = `${type}-${order}`;

        fetchReviews(currentPage);
    }
        
    let reviews = [];
    let currentPage = 1;
    let reviewsPerPage = 20;
    let totalReviews = 0;
    let sortDirection = 'desc';
    $: totalPages = Math.ceil(totalReviews / reviewsPerPage);
    $: visiblePages = getVisiblePages(currentPage, totalPages);

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

    function getVisiblePages(current, total) {
        const range = 1;
        let start = Math.max(1, current - range);
        let end = Math.min(total, current + range);
        
        if (current - range <= 1) end = Math.min(total, 2 * range + 1);
        if (current + range >= total) start = Math.max(1, total - 2 * range);
        
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }

    function formatScore(score) {
        const num = Number(score);
        if (num === 10) return '10';
        return num % 1 === 0 ? num.toFixed(1) : num.toFixed(1);
    }

    async function fetchReviews(page = 1) {
        try {
            reviews = []
            const response = await fetch(`${BACKEND_URL}/get_reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                page,
                limit: reviewsPerPage,
                search: searchTerm,
                sort_by: sortBy,
                topics: topics,
                sort_order: sortOrder
                }),
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
            totalReviews = data.total;
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
            toast.error(`Failed to fetch reviews: ${err}`);
        }
    }

    function handleSearch(value) {
        searchTerm = value;
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => fetchReviews(1), 500);
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

    function toggleSort(newSortBy) {
        if (sortBy === newSortBy) {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
        sortBy = newSortBy;
        sortOrder = 'desc';
        }
        fetchReviews(1);
    }

    function changePage(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            fetchReviews(page);
            scrollToElementWithOffset("sortBar");
        }
    }

    function handlePerPageChange(count) {
        reviewsPerPage = count;
        currentPage = 1;
        fetchReviews(1);
    }

    onMount(() => fetchReviews());

    function scrollToElementWithOffset(id) {
        const element = document.getElementById(id);
        const yOffset = -100; // Adjust this value as needed
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    function highlightText(text, searchTerm, topics) {
        if (!text) return '';
        const terms = [];
        
        // Add search term if exists
        if (searchTerm) {
            terms.push(searchTerm);
        }
        
        // Add topics
        if (topics?.length > 0) {
            terms.push(...topics);
        }

        if (terms.length === 0) return text;

        // Escape special regex characters and join with | (OR)
        const pattern = terms
            .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
            .join('|');

        const regex = new RegExp(`(${pattern})`, 'gi');
        return text.replace(regex, '<mark class="bg-[#C09A5B] text-white px-1 rounded">$1</mark>');
    }
</script>

<div class="bg-[#233441] min-h-screen ">

    <div class="relative z-50">   
        <Navbar/>
    </div>
    <!-- Background Layers -->


    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <!-- Header Section -->
        <div class="text-center mb-14 space-y-5">
            <div class="inline-flex flex-col items-center">
                <span class="text-[#D1A054] uppercase tracking-widest text-sm mb-3 font-medium">
                    Guest Reviews
                </span>
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-5 relative">
                    Shared Experiences
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
                    <span class="text-sm">(Based on {totalReviews} reviews)</span>
                </div>
            </div>
        </div>

        <!-- Sorting Controls -->
        <div id="sortBar" class="max-w-7xl mx-auto mb-8 relative ">
        
            <!-- Topic Filters -->
            <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
                <p>Select topics to read reviews:</p>
                <div class="flex flex-wrap gap-3 items-center">
                    <!-- Topic Buttons -->
                    <button on:click={() => {topics.push("Location"); fetchReviews()}} class="inline-flex px-4 py-2 rounded-full bg-white/10 border-2 border-white/30 hover:border-white/50 text-white transition-all duration-300">
                      <Plus class="mr-2 w-6"/>  Location
                    </button>
                    <button on:click={() => {topics.push("Room"); fetchReviews()}} class="inline-flex px-4 py-2 rounded-full bg-white/10 border-2 border-white/30 hover:border-white/50 text-white transition-all duration-300">
                      <Plus class="mr-2 w-6"/>  Room
                    </button>
                    <button on:click={() => {topics.push("Clean"); fetchReviews()}} class="inline-flex px-4 py-2 rounded-full bg-white/10 border-2 border-white/30 hover:border-white/50 text-white transition-all duration-300">
                      <Plus class="mr-2 w-6"/>  Clean
                    </button>
                    <button on:click={() => {topics.push("Bed"); fetchReviews()}} class="inline-flex px-4 py-2 rounded-full bg-white/10 border-2 border-white/30 hover:border-white/50 text-white transition-all duration-300">
                      <Plus class="mr-2 w-6"/>  Bed
                    </button>
                    <button on:click={() => {topics.push("Kitchen"); fetchReviews()}} class="inline-flex px-4 py-2 rounded-full bg-white/10 border-2 border-white/30 hover:border-white/50 text-white transition-all duration-300">
                      <Plus class="mr-2 w-6"/>  Kitchen
                    </button>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button  on:click={() => {showSearch = !showSearch}} class="inline-flex px-4 py-2 rounded-full bg-white/10 border-2 border-white/30 hover:border-white/50 text-white transition-all duration-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg> 
                    </button>

                    
                    <!-- Show More Link -->
                    <!-- <a href="#" class="ml-2 text-[#C09A5B]/80 hover:text-[#C09A5B] transition-colors duration-300 text-sm">
                        Show more
                    </a> -->
                    <!-- Sort Dropdown -->
                    <div class="relative  w-full sm:w-64 group">
                        <select
                            class="w-full px-6 py-3 rounded-xl bg-[#C09A5B]/10 border-2 border-[#C09A5B]/30 hover:border-[#C09A5B]/50 text-[#C09A5B] transition-all duration-300 appearance-none cursor-pointer"
                            bind:value={selectedSort}
                            on:change={(e) => setSort(e.target.value.split('-')[0], e.target.value.split('-')[1])}
                        >
                            <option 
                                value="date-desc" 
                                class="bg-[#233441] text-white"
                                selected={sortBy === 'date' && sortOrder === 'desc'}
                            >
                                Newest First
                            </option>
                            <option 
                                value="date-asc" 
                                class="bg-[#233441] text-white"
                                selected={sortBy === 'date' && sortOrder === 'asc'}
                            >
                                Oldest First
                            </option>
                            <option 
                                value="rating-desc" 
                                class="bg-[#233441] text-white"
                                selected={sortBy === 'rating' && sortOrder === 'desc'}
                            >
                                Highest Scores
                            </option>
                            <option 
                                value="rating-asc" 
                                class="bg-[#233441] text-white"
                                selected={sortBy === 'rating' && sortOrder === 'asc'}
                            >
                                Lowest Scores
                            </option>
                        </select>
                        
                        <!-- Custom dropdown chevron -->
                        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg class="w-5 h-5 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </div>
                        
                    </div>
                </div>
            </div>
            <!-- Search Input (Hidden by default) -->
            {#if showSearch}
                <div class="mb-6 mt-6">
                    <div class="relative w-full sm:w-96 mx-auto">
                        <input
                            type="text"
                            bind:value={searchTerm}
                            on:input={(e) => handleSearch(e.target.value)}
                            placeholder="Search reviews..."
                            class="w-full pl-12 pr-4 py-3 rounded-lg bg-[#233441]/40 border-2 border-[#C09A5B]/30 focus:border-[#C09A5B] focus:ring-2 focus:ring-[#C09A5B]/50 text-white placeholder-[#C09A5B]/50 transition-all duration-300"
                        />
                        <svg class="absolute left-4 top-3.5 w-5 h-5 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                </div>
            {/if}
        </div>
        

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
                            {@html highlightText(review["Review title"], searchTerm, topics)}
                        </h4>
                    
                        <!-- Review Content -->
                        <p bind:this={review.contentEl} class="text-white/90 mb-5 {review.isExpanded ? '' : 'line-clamp-4'}">
                            {#if review["Positive review"] == ""}
                                There are no comments available for this review
                            {:else}
                                {@html highlightText(review["Positive review"], searchTerm, topics)}
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
        

        <!-- Pagination Controls -->
        <div class="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-white/10">
            <!-- Items Per Page -->
            <div class="hs-dropdown relative">
                <button class="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-[#D1A054] transition-colors">
                    Show: {reviewsPerPage}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                <div class="hs-dropdown-menu hidden absolute bottom-full mb-2 bg-[#1E293B] border border-white/10 rounded-lg shadow-lg">
                    {#each [10, 20, 30] as count}
                        <button 
                            class="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 flex items-center justify-between"
                            on:click={() => handlePerPageChange(count)}
                        >
                            {count}
                            {#if count === reviewsPerPage}
                                <svg class="w-4 h-4 text-[#D1A054]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                </svg>
                            {/if}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Page Navigation -->
            <nav class="flex items-center gap-2">
                <button 
                    class="p-2 text-white/80 hover:text-[#D1A054] disabled:opacity-50"
                    on:click={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                </button>

                {#each visiblePages as page}
                    <button 
                        class={`px-3 py-1 rounded-md text-sm ${
                            page === currentPage 
                            ? 'bg-[#D1A054] text-white'
                            : 'text-white/80 hover:bg-white/10'
                        }`}
                        on:click={() => changePage(page)}
                    >
                        {page}
                    </button>
                {/each}

                <button 
                    class="p-2 text-white/80 hover:text-[#D1A054] disabled:opacity-50"
                    on:click={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
            </nav>
        </div>
    </div>
</div>

<Footer/>

<style>
    /* Add smooth rotation for arrows */
    .transform {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
</style>