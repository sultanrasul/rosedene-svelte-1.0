<script>
// @ts-nocheck

    import { Check, CloudDownload, Info, UserRoundIcon } from "lucide-svelte";
    import { onMount } from "svelte";
    import BookingDetails from "./bookingDetails.svelte";
    import { P, Search } from "flowbite-svelte";
    import Navbar from "../Navbar.svelte";
    import { Section } from "flowbite-svelte-blocks";
    import { ColumnSolid } from "flowbite-svelte-icons";
    import { apartments } from '../apartments';
    import { BACKEND_URL } from "../conf";


    let bookingData = {};

    let showBookingDetails = false;

    let showErrorDetails = false;

    let bookingReferenceinput = "";

    let coundNotFind = false;
    
    let apartmentDetails;


    async function getBookingDetails(bookingReference){
        try  {
            const response = await fetch(`${BACKEND_URL}/get_booking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    booking_ref: bookingReference,
                }),
            });

            // Check if the response is not OK (non-2xx status code)
            if (!response.ok) {
                // Retrieve the error data and throw a custom error with status and details
                const errorData = await response.json(); // This assumes the error response contains more details
                throw {
                    status: response.status,
                    statusText: response.statusText,
                    message: errorData.error || 'Unknown error', // Customize based on your error structure
                    data: errorData,
                };
            }

            // If the response is successful, parse the checkout URL
            bookingData = await response.json();
            bookingData = bookingData["reservation_data"]

            showBookingDetails = true;
            apartmentDetails = apartments[bookingData.Apartment.match(/\d+/)?.[0]]

            console.log(bookingData);

        } catch (error) {
            console.error(error)

            if(error.statusText === 'NOT FOUND'){
                coundNotFind = true;
                bookingReferenceinput = "";

            }
            
        }
    }

    function searchButton(){

        getBookingDetails(bookingReferenceinput);

    }

    onMount(async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        // Check for the refNumber in the URL
        const ref_number = urlParams.get("ref_number");
        const error = urlParams.get("error");

        if (ref_number) {
            // Set the bookingData if refNumber exists
            getBookingDetails(ref_number);

        }
        if (error){

            urlParams.forEach((value, key) => {
                bookingData[key] = value;
            });

            showErrorDetails = true;

        }


        const scrollToo = urlParams.get("scrollToo") || null;
        if (scrollToo) {
            console.log("Scroll Too:", scrollToo);
            scrollToElementWithOffset(scrollToo);
            window.history.replaceState({}, document.title, "/");
        }
    });
</script>

<div class="relative">
    <!-- Background overlay -->
    <div class="absolute inset-0 bg-black opacity-[0.4] z-[-1]" style="background-image: url('background.png'); background-size: cover; background-position: center;"></div>
    <Navbar fixed/>
    
    <!-- Centered Payment Section -->
    <div class="h-screen flex flex-col items-center justify-center pt-60 pb-9 px-4 md:pt-24"> <!-- Added padding and responsive top spacing -->
        {#if !showBookingDetails && !showErrorDetails}
        <Section sectionClass="flex flex-col items-center w-full max-w-4xl px-4">
            <img src="/Logo.svg" class="max-w-lg w-full" alt="">
        
            <div class="bg-white rounded-xl p-6 md:p-8 mt-6 w-full max-w-lg shadow-lg border border-gray-100">
                <div class="text-center mb-6">
                    <h1 class="text-2xl md:text-3xl font-medium text-gray-800 mb-2">
                        Booking Information
                    </h1>
                    <p class="text-sm md:text-base text-gray-500">
                        Enter your booking reference number to view your booking details
                    </p>
                </div>
        
                {#if coundNotFind}
                    <div class="flex items-center justify-center mb-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <Info class="w-5 h-5 text-amber-600 mr-2" />
                        <span class="text-sm text-amber-700">Booking reference not found</span>
                    </div>
                {/if}
        
                <div class="space-y-4">
                    <div class="relative flex gap-2">
                        <div class="flex-1 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                                 class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
                                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                            
                            <input 
                                on:focus={() => (coundNotFind = false)}
                                bind:value={bookingReferenceinput}
                                class="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 bg-white rounded-lg border-2 border-gray-200 focus:border-[#C09A5B]  focus:outline-none transition-all shadow-sm"
                                placeholder="Booking Reference Number"
                            />
                        </div>
        
                        <button 
                            on:click={searchButton} 
                            disabled={bookingReferenceinput === ""}
                            class="px-6 py-3 bg-[#C09A5B] text-white font-medium rounded-lg border-2 border-transparent hover:bg-[#B08A4F] hover:border-[#A07A3F] focus:ring-2 focus:ring-[#C09A5B]/40 focus:border-[#C09A5B] transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            Search
                        </button>
                    </div>
        
                    <p class="text-xs text-gray-400 text-center mt-2">
                        Your booking reference can be found in your confirmation email
                    </p>
                </div>
            </div>
        </Section>  
        {/if}

        <div class="bg-white rounded-lg shadow-lg text-black relative w-full max-w-4xl mx-4 mt-6 mb-8"> <!-- Added constraints -->
            <!-- ... keep booking details code the same ... -->
            {#if showBookingDetails}
                <BookingDetails bookingData={bookingData} success={true}/>
            {/if}

            {#if showErrorDetails}
                <BookingDetails bookingData={bookingData} success={false}/>
            {/if}        
        </div>
    </div>
</div>


