<!-- TermsAndConditions.svelte -->
<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import Navbar from '../Navbar.svelte'; // Update path as needed
    import Footer from '../Footer.svelte'; // Update path as needed
  import Drawer from '../Drawer.svelte';

    let activeSection = 1;
    let showScrollButton = false;
    
    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    function handleScroll() {
        showScrollButton = window.scrollY > 500;
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
</script>


<div class="bg-[#233441]">

    <Navbar />
    <main class="min-h-screen">
        <!-- Hero Section -->
        <section class="relative  text-[#C09A5B] py-20 px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto text-center" in:fade>
                <div class="mb-8 mt-20 relative">
                    <div class="absolute -inset-1">
                        <div class="w-full h-full rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-[#C09A5B] via-transparent to-transparent"></div>
                    </div>
                    <h1 class="text-5xl font-bold mb-4 relative">Terms & Conditions</h1>
                    <p class="text-xl text-[#C09A5B]/80">Last updated: {new Date().toLocaleDateString()}</p>
                    <p class="mt-4 text-white">
                        Boardbeach Ltd is the owner of Rosedene Highland House and will be referred to as Rosedene Highland House in the Terms and Conditions. Please read through the terms and conditions that apply to the accommodation, pre-bookable packages and promotions. You will be asked to accept these terms and conditions and confirm that you have read and understood them before you complete your booking. You warrant that you are 18 years and older and possess the legal authority to enter into this agreement and to use this website in accordance with the terms and conditions.
                    </p>
                </div>
                
    
            </div>
        </section>
    
        <!-- Content Sections -->
        <div class="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 space-y-20">
            {#each [1,2,3,4,5,6,7,8,9,10] as i}
                <section 
                    id={`section-${i}`}
                    class="group relative mb-5 rounded-2xl border border-xl hover:border-[#C09A5B] shadow-lg p-8 md:p-12 transition-all hover:shadow-xl"
                    in:fade
                >
                    <div class="flex items-start gap-6">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 rounded-lg bg-[#C09A5B]/10 flex items-center justify-center">
                                <span class="text-2xl font-bold text-[#C09A5B]">{i}</span>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <h2 class="text-3xl font-bold text-white/90 mb-6">Section Title {i}</h2>
                            <div class="prose max-w-none text-white/80">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <ul class="mt-4 space-y-2">
                                    {#each [1,2,3] as j}
                                        <li class="flex items-start gap-2">
                                            <svg class="w-5 h-5 text-[#C09A5B] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                            </svg>
                                            <span>Key point about section {i}-{j}</span>
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            {/each}
        </div>
    
        <!-- Scroll to Top Button -->
        {#if showScrollButton}
            <button 
                on:click={scrollToTop}
                class="fixed bottom-8 right-8 p-4 bg-[#C09A5B] text-white rounded-full shadow-lg hover:bg-[#b08d52] transition-all"
                transition:fade
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                </svg>
            </button>
        {/if}
    </main>
    <Footer />
</div>



<style global>
    /* Custom typography */
    .prose h3 {
        @apply text-2xl font-bold text-[#233441] mt-8 mb-4;
    }
    .prose ul {
        @apply list-disc pl-6;
    }
    .prose a {
        @apply text-[#C09A5B] hover:underline;
    }
</style>