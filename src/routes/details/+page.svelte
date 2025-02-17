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
    <div class="min-h-screen flex flex-col items-center justify-center pt-20 pb-8 px-4 md:pt-24"> <!-- Added padding and responsive top spacing -->
        {#if !showBookingDetails && !showErrorDetails}
            <Section sectionClass="flex flex-col items-center w-full max-w-4xl"> <!-- Added max-width -->
                <div class="flex flex-wrap w-full justify-center">
                    <div class="w-full">
                        <div class="text-[#C09A5B] tracking-[0.5em] font-light text-center" style="font-family: 'Merriweather', serif;">
                            <h1 class="pt-8 md:pt-12 text-3xl md:text-[70px]">ROSEDENE</h1> <!-- Adjusted top padding -->
                            <div class="inline-block">
                                <h2 class="pt-4 md:pt-6 text-xl md:text-[25px]">HIGHLAND HOUSE</h2> <!-- Responsive text size -->
                                <hr class="mt-2 mx-auto border-[#C09A5B] border-t-[2px]" style="width: auto; height: 1px;" />
                            </div>
                            <p class="pt-2 pb-4 text-sm md:text-[17.5px] tracking-[0.2em]">Ness Islands Inverness</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 md:p-6 mt-6 w-full max-w-md mx-4"> <!-- Added max-width and horizontal margin -->
                    <h1 class="text-xl md:text-2xl text-gray-700">Booking Information</h1>
                    <p class="text-xs md:text-sm text-gray-500 pt-1">Enter your booking reference number to view your booking details</p>

                    {#if coundNotFind}
                        <div class="text-xs md:text-sm text-gray-500 text-center flex items-center justify-center ml-1 mt-3">
                            <Info color="red" class="mr-1 w-4 h-4" /> Booking Not Found
                        </div> 
                    {/if}

                    <div class="w-full pt-4">
                        <div class="relative flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                        </svg>
                        
                        
                        <input on:focus={() => (coundNotFind = false) } bind:value={bookingReferenceinput} class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Booking Reference Number" />
                        
                        <button on:click={searchButton} disabled={bookingReferenceinput === ""} class="disabled rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 " type="button">
                            Search
                        </button> 
                        </div>
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


