<script>
// @ts-nocheck

    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import Navbar from '../Navbar.svelte';
    import { BACKEND_URL } from '../conf';
  import { toast } from 'svelte-sonner';
  import { error } from '@sveltejs/kit';

    // @ts-ignore
    /**
   * @type {never[]}
   */
    let reviews = [];
    let currentPage = 1;
    let reviewsPerPage = 20;
    let totalReviews = 0;
    let sortBy = 'date';
    let sortDirection = 'desc';
    $: totalPages = Math.ceil(totalReviews / reviewsPerPage);
    $: visiblePages = getVisiblePages(currentPage, totalPages);

    // @ts-ignore
    function getVisiblePages(current, total) {
        const range = 1; // Number of pages to show around current
        let start = Math.max(1, current - range);
        let end = Math.min(total, current + range);
        
        if (current - range <= 1) end = Math.min(total, 2 * range + 1);
        if (current + range >= total) start = Math.max(1, total - 2 * range);
        
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }    

    // Fetch reviews from backend
    async function fetchReviews(page = 1) {
        try {
                const response = await fetch(`${BACKEND_URL}/get_reviews`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ page: currentPage, limit: reviewsPerPage }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data);
                reviews = data.reviews;
                totalReviews = data.total;
            } catch (err) {
                console.error('Failed to fetch apartments:', err);
                toast.error(`Failed to fetch apartments: ${err}`)
            }
        } 
    

    // Sort and reload reviews
    // @ts-ignore
    // @ts-ignore
    function toggleSort(newSortBy) {
        if (sortBy === newSortBy) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortBy = newSortBy;
            sortDirection = 'desc';
        }
        fetchReviews(currentPage);
    }

    // Change page
    // @ts-ignore
    function changePage(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            fetchReviews(page);
        }
    }
    // Add items per page handler
    function handlePerPageChange(count) {
        reviewsPerPage = count;
        currentPage = 1;
        fetchReviews(1);
    }

    
    onMount(() => {
        fetchReviews();
    });


  function sortReviews(reviews) {
    
  }
  function formatDateToMonthYear(dateString) {
    const date = new Date(dateString); // Convert the input string to a Date object

    // Format the date as "Month Year"
    return new Intl.DateTimeFormat('en-US', {
        month: 'long', // Full month name (e.g., "March")
        year: 'numeric' // Full year (e.g., "2022")
    }).format(date);
    }
</script>

<div class="bg-[#233441]">
    <Navbar />
</div>
<div class="bg-[#233441] relative overflow-hidden min-h-screen">
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
    
    <div class="max-w-7xl mx-auto z-10 relative">
        <!-- Header Section -->
        <div class="text-center mb-16 space-y-6">
            <div class="inline-flex flex-col items-center">
                <span class="text-[#d19c47] font-semibold tracking-widest text-sm mb-4 mt-[80px]">TESTIMONIALS</span>
                <h2 class="text-5xl font-bold text-[#F0F4F8] mb-6 relative">
                    Guest Experiences
                    <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#d19c47] rounded-full"></div>
                </h2>
                <!-- Rating Badge -->
                <div class="rating-badge pt-2 inline-flex  flex-row items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full gap-4 border border-white/20 ">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl font-bold text-[#d19c47]">4.9</span>
                        <div class="flex text-[#d19c47]">
                            {#each Array(5) as _, i}
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            {/each}
                        </div>
                    </div>
                    <span class="text-[#D1E0EB] text-sm">Based on 284 reviews</span>
                </div>

            </div>
        </div>

        <!-- Sorting buttons -->
        <div class="flex flex-wrap gap-4 mb-12 items-center justify-between bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
            <div class="flex items-center gap-4">
                <span class="text-[#D1E0EB] font-medium">Sort by:</span>
                <div class="flex gap-2">
                    <button 
                        class="px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all {sortBy === 'date' ? 'bg-amber-500 text-[#233441]' : 'bg-white/10 hover:bg-white/20 text-[#D1E0EB]'}"
                        on:click={() => sortBy = 'date'}
                    >
                        <svg class="w-4 h-4 {sortBy === 'date' ? 'fill-[#233441]' : 'fill-[#D1E0EB]'}" viewBox="0 0 24 24">
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/>
                        </svg>
                        Date
                    </button>
                    <button 
                        class="px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all {sortBy === 'stars' ? 'bg-amber-500 text-[#233441]' : 'bg-white/10 hover:bg-white/20 text-[#D1E0EB]'}"
                        on:click={() => sortBy = 'stars'}
                    >
                        <svg class="w-4 h-4 {sortBy === 'stars' ? 'fill-[#233441]' : 'fill-amber-500'}" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        Rating
                    </button>
                    <button 
                        class="px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all {sortBy === 'apartment' ? 'bg-amber-500 text-[#233441]' : 'bg-white/10 hover:bg-white/20 text-[#D1E0EB]'}"
                        on:click={() => sortBy = 'apartment'}
                    >
                        <svg class="w-4 h-4 {sortBy === 'apartment' ? 'fill-[#233441]' : 'fill-[#D1E0EB]'}" viewBox="0 0 24 24">
                            <path d="M19 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 18H6c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1z"/>
                            <path d="M8 10h8v2H8zm0 4h5v2H8z"/>
                        </svg>
                        Apartment
                    </button>
                </div>
            </div>
            
            <button 
                class="flex items-center gap-2 text-[#D1E0EB] hover:text-amber-500 transition-colors group"
            >
                <span>{sortDirection === 'asc' ? 'Ascending' : 'Descending'}</span>
                <svg class="w-5 h-5 transition-transform transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
            </button>
        </div> 


        <!-- Review Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each reviews as review}
                <div 
                    class="review-card group relative bg-white/5 backdrop-blur-sm p-7 rounded-2xl border border-white/20 hover:border-[#d19c47]/30 transition-all duration-300 hover:-translate-y-1.5 shadow-xl min-w-0"
                    transition:fade
                >
                    <!-- Decorative Corner -->
                    <div class="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#d19c47]/30 rounded-tr-2xl"></div>

                    <div class="flex flex-col gap-4">
                        <!-- Author Section -->
                        <div class="flex items-center gap-4">
                            <div class="relative">
                                <div class="absolute -inset-0.5 bg-gradient-to-br from-[#d19c47] to-amber-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                <div class="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[#d19c47] font-medium text-lg relative">
                                    {review["Guest name"].split(' ').map(n => n[0]).join('')}
                                </div>
                            </div>
                            <div>
                                <p class="font-semibold text-[#F0F4F8]">{review["Guest name"]}</p>
                                <p class="text-[#D1E0EB] text-sm">Mars</p>
                            </div>
                        </div>

                        <!-- Stay Details -->
                        <div class="space-y-2">
                            <div class="flex flex-wrap gap-2 items-center text-sm">
                                <span class="text-[#d19c47] font-medium">apartment name</span>
                                <span class="text-[#D1E0EB]">•</span>
                                <span class="text-[#D1E0EB]">2 nights</span>
                                <span class="text-[#D1E0EB]">•</span>
                                <span class="text-[#D1E0EB]">{formatDateToMonthYear(review["Review date"])}</span>
                            </div>
                            <div class="flex items-center gap-2 text-sm text-[#d19c47]">
                                <svg fill="#d19c47" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px"><path d="M6 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0m-3 3A4.5 4.5 0 0 0 0 13.5v2.25c0 .414.336.75.75.75h1.5l-.744-.657.75 6A.75.75 0 0 0 3 22.5h3A.75.75 0 0 0 6 21H3l.744.657-.75-6A.75.75 0 0 0 2.25 15H.75l.75.75V13.5a3 3 0 0 1 3-3 .75.75 0 0 0 0-1.5M21 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0m-3 4.5a3 3 0 0 1 3 3v2.25l.75-.75h-1.5a.75.75 0 0 0-.744.657l-.75 6L21 21h-3a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 .744-.657l.75-6-.744.657h1.5a.75.75 0 0 0 .75-.75V13.5A4.5 4.5 0 0 0 19.5 9a.75.75 0 0 0 0 1.5m-5.25-6.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0m1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0M18 13.5a6 6 0 0 0-12 0v2.25c0 .414.336.75.75.75H9l-.746-.675.75 7.5A.75.75 0 0 0 9.75 24h4.5a.75.75 0 0 0 .746-.675l.75-7.5L15 16.5h2.25a.75.75 0 0 0 .75-.75zm-1.5 0v2.25l.75-.75H15a.75.75 0 0 0-.746.675l-.75 7.5.746-.675h-4.5l.746.675-.75-7.5A.75.75 0 0 0 9 15H6.75l.75.75V13.5a4.5 4.5 0 1 1 9 0"></path></svg>
                                <span>  Couple</span>
                            </div>
                        </div>

                        <!-- Review Content -->
                        <div class="space-y-4">
                            <div class="flex items-center gap-2 text-[#d19c47]">
                                {#each Array(10) as _, i}
                                    <svg class="w-5 h-5 {i < review["Review score"] ? 'fill-current' : 'fill-white/20'}" 
                                        viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                {/each}
                            </div>

                            <p class="text-[#D1E0EB] italic">{review["Positive review"]}</p>
                            

                            <div class="flex flex-wrap justify-between items-center text-sm">
                                <p class="review-date text-[#D1E0EB]">20/12/24</p>
                            </div>

                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Pagination Wrapper -->
        <div class="flex flex-col sm:flex-row gap-4 justify-between items-center p-6">
            <!-- Pagination -->
            <nav class="flex items-center gap-1" aria-label="Pagination">
                <button 
                    class="h-9 w-9 flex justify-center items-center rounded-lg border border-[#C09A5B]/20 text-[#C09A5B] hover:bg-[#C09A5B]/10 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                    aria-label="Previous"
                    on:click={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 18-6-6 6-6"/>
                    </svg>
                </button>
        
                {#each visiblePages as page}
                    <button 
                        class={`h-9 w-9 flex justify-center items-center rounded-lg border ${
                            page === currentPage 
                                ? 'bg-[#C09A5B] border-[#C09A5B] text-[#233441]'
                                : 'border-[#C09A5B]/20 text-[#C09A5B] hover:bg-[#C09A5B]/10'
                        } transition-colors`}
                        aria-current={page === currentPage ? 'page' : undefined}
                        on:click={() => changePage(page)}
                    >
                        {page}
                    </button>
                {/each}
        
                <div class="hs-tooltip inline-block ">
                    <button 
                        class="h-9 w-9 flex justify-center items-center rounded-lg border border-[#C09A5B]/20 text-[#C09A5B] hover:bg-[#C09A5B]/10 transition-colors"
                        aria-label="More pages"
                    >
                        <span class="group-hover:hidden text-xs">•••</span>
                        <svg class="group-hover:block hidden w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 17 5-5-5-5m13 0 5 5-5 5"/>
                        </svg>
                        <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity absolute z-10 py-1 px-2 bg-[#C09A5B] text-[#233441] text-xs font-medium rounded-md shadow-lg">
                            Pages {visiblePages[visiblePages.length - 1] + 1} to {totalPages}
                        </span>
                    </button>
                </div>

                
        
                <button 
                    class="h-9 w-9 flex justify-center items-center rounded-lg border border-[#C09A5B]/20 text-[#C09A5B] hover:bg-[#C09A5B]/10 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                    aria-label="Next"
                    on:click={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18 6-6-6-6"/>
                    </svg>
                </button>
            </nav>
        
            <!-- Updated Dropdown -->
            <div class="hs-dropdown relative inline-flex">
                <button 
                    class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#C09A5B]/20 text-[#C09A5B] hover:bg-[#C09A5B]/10 transition-colors"
                    aria-label="Items per page"
                >
                    {reviewsPerPage} per page
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                    </svg>
                </button>
        
                <div class="hs-dropdown-menu hs-dropdown-open:opacity-100 hidden opacity-0 transition-opacity absolute bottom-full mb-2 z-50 w-32 bg-[#233441] border border-[#C09A5B]/20 rounded-lg shadow-lg">
                    {#each [5, 8, 10] as count}
                        <button 
                            class="w-full px-3 py-2 text-left text-[#C09A5B] hover:bg-[#C09A5B]/10 flex items-center justify-between text-sm"
                            class:font-semibold={count === reviewsPerPage}
                            on:click={() => handlePerPageChange(count)}
                        >
                            {count}
                            {#if count === reviewsPerPage}
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 13 4 4L19 7"/>
                                </svg>
                            {/if}
                        </button>
                    {/each}
                </div>
            </div>
        </div>
        <!-- End Pagination Wrapper -->

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