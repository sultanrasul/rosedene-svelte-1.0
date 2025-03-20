<script>
    // @ts-nocheck
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import Navbar from '../Navbar.svelte';
    import { BACKEND_URL } from '../conf';
    import { toast } from 'svelte-sonner';
  import Footer from '../Footer.svelte';

    let reviews = [];
    let currentPage = 1;
    let reviewsPerPage = 20;
    let totalReviews = 0;
    let sortBy = 'date';
    let sortDirection = 'desc';
    $: totalPages = Math.ceil(totalReviews / reviewsPerPage);
    $: visiblePages = getVisiblePages(currentPage, totalPages);

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
            const response = await fetch(`${BACKEND_URL}/get_reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: currentPage, limit: reviewsPerPage }),
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            
            const data = await response.json();
            reviews = data.reviews;
            totalReviews = data.total;
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
            toast.error(`Failed to fetch reviews: ${err}`);
        }
    }

    function toggleSort(newSortBy) {
        if (sortBy === newSortBy) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortBy = newSortBy;
            sortDirection = 'desc';
        }
        fetchReviews(currentPage);
    }

    function changePage(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            fetchReviews(page);
        }
    }

    function handlePerPageChange(count) {
        reviewsPerPage = count;
        currentPage = 1;
        fetchReviews(1);
    }

    onMount(() => fetchReviews());

    function formatDateToMonthYear(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric'
        }).format(date);
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
        <!-- Improved Sorting Controls -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-lg">
            <div class="flex items-center gap-3 flex-wrap">
                <span class="text-white/80 font-medium">Sort by:</span>
                <div class="flex flex-wrap gap-2">
                    <button 
                        class="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200
                            {sortBy === 'date' 
                                ? 'bg-[#D1A054] text-white shadow-md'
                                : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'}"
                        on:click={() => toggleSort('date')}
                    >
                        <svg class="w-4 h-4 {sortBy === 'date' ? 'text-white' : 'text-[#D1A054]'}" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/>
                        </svg>
                        Date
                    </button>
                    <button 
                        class="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200
                            {sortBy === 'stars' 
                                ? 'bg-[#D1A054] text-white shadow-md'
                                : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'}"
                        on:click={() => toggleSort('stars')}
                    >
                        <svg class="w-4 h-4 {sortBy === 'stars' ? 'text-white' : 'text-[#D1A054]'}" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        Rating
                    </button>
                    <button 
                        class="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200
                            {sortBy === 'apartment' 
                                ? 'bg-[#D1A054] text-white shadow-md'
                                : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'}"
                        on:click={() => toggleSort('apartment')}
                    >
                        <svg class="w-4 h-4 {sortBy === 'apartment' ? 'text-white' : 'text-[#D1A054]'}" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 18H6c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1z"/>
                            <path d="M8 10h8v2H8zm0 4h5v2H8z"/>
                        </svg>
                        Apartment
                    </button>
                </div>
            </div>
            
            <button 
                class="flex items-center gap-2 text-white/80 hover:text-[#D1A054] transition-colors px-4 py-2 rounded-lg border border-white/10 hover:border-[#D1A054]/30"
                on:click={() => sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'}
            >
                <span>{sortDirection === 'asc' ? 'Ascending' : 'Descending'}</span>
                <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d={sortDirection === 'asc' ? 'M19 9l-7 7-7-7' : 'M19 15l-7-7-7 7'}/>
                </svg>
            </button>
        </div>

        <!-- Review Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {#each reviews as review}   
                {#if review["Positive review"] != ""}             
                    <div 
                        class="relative bg-white/10 rounded-xl p-6 transition-all hover:bg-white/20 border border-white/20 hover:border-white/30 group"
                        transition:fade
                    >
                        <!-- Header -->
                        <div class="flex items-start justify-between mb-4">
                            <!-- Author Info -->
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#D1A054] to-amber-700 flex items-center justify-center text-white font-medium">
                                    {review["Guest name"].split(' ').map(n => n[0]).join('')}                                
                                </div>
                                <div>
                                    <h3 class="text-white font-semibold">{review["Guest name"]}</h3>
                                    <p class="text-sm text-white/60">United Kingdom</p>
                                </div>
                            </div>
                            
                            <!-- Date -->
                            <span class="text-sm text-white/50">{formatDateToMonthYear(review["Review date"])}</span>
                        </div>

                        <!-- Rating & Details -->
                        <div class="mb-4 flex items-center justify-between">

                            <div class="flex items-center justify-center text-white bg-[#003B95] rounded font-bold rounded-bl-[0px] w-8 h-8">
                                <p >{formatScore(review["Review score"])}</p>
                            </div>

                            <span class="text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full">
                                Emperor 1
                            </span>
                        </div>

                        <!-- Review Content -->
                        <p class="text-white/90 mb-5 line-clamp-4">
                            {review["Positive review"]}
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