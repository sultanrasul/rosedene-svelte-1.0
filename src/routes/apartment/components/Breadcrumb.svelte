<script>

    import BlurFade from "@/components/BlurFade.svelte";
    import { Building, Home } from "lucide-svelte";

    export let apartmentName;

    function replacePathToSearch() {
        // Get the current URL
        const currentUrl = new URL(window.location.href);
    
        // Replace 'apartment' with 'search' in the pathname
        const newPathname = currentUrl.pathname.replace('apartment', 'search');
    
        // Construct the new URL
        const newUrl = `${currentUrl.origin}${newPathname}${currentUrl.search}`;
    
        // Redirect to the new URL
        window.location.href = newUrl;
    }
    $: numbersOnly = apartmentName.replace(/\D+/g, '');
</script>
        <!-- Breadcrumb -->
        <ol class="flex items-center whitespace-nowrap pb-4 pl-1">
            <BlurFade delay={0.2}>
              <li class="inline-flex items-center">
                <a on:click={() => {window.location.href = "/"} } class="flex items-center text-sm text-gray-500 hover:text-[#C09A5B] focus:outline-none  " href="#">
    
                  <Home size="24px" class="shrink-0 me-3 size-4"/>
                  Home
                </a>
                <svg class="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </li>
            </BlurFade>
            <BlurFade delay={0.4}>
              <li class="inline-flex items-center">
                <a on:click={replacePathToSearch} class="flex items-center text-sm text-gray-500 hover:text-[#C09A5B] focus:outline-none" href="#">
                  <Building size="24px" class="shrink-0 me-3 size-4"/>
                  Apartments
                  <svg class="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </a>
              </li>
            </BlurFade>
            <BlurFade delay={0.6}>
              <li class="inline-flex items-center text-sm font-semibold truncate text-[#C09A5B]" aria-current="page">
                {numbersOnly}
              </li>
            </BlurFade>
          </ol>