<script>
// @ts-nocheck

    import { Check, CloudDownload, Info, UserRoundIcon } from "lucide-svelte";
    import { onMount } from "svelte";
    import BookingDetails from "./bookingDetails.svelte";
    import Navbar from "../Navbar.svelte";
    import { apartments } from '../apartments';
    import { BACKEND_URL } from "../conf";
    import { toast } from "svelte-sonner";
    import BlurFade from "@/components/BlurFade.svelte";
    import Footer from "../Footer.svelte";


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

            if(error.status === 420){
                toast.error("Booking reference not found");
                // coundNotFind = true;
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




<div class="relative min-h-screen bg-[#233441]">
    <!-- Full-screen background overlay -->

    <Navbar fixed />
    
    <!-- Main content container -->
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {#if !showBookingDetails && !showErrorDetails}
        <BlurFade delay={0.1/4}>
            <div class="flex flex-col items-center justify-center min-h-[70vh]">
                <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-8 w-full max-w-2xl shadow-xl border border-gray-200 transition-all duration-300 hover:shadow-2xl">
                    <div class="text-center space-y-4 mb-8">
                        <BlurFade delay={0.2/2}>
                            <h1 class="text-3xl font-bold text-[#C09A5B] mb-2">
                                Retrieve Your Booking Details
                            </h1>
                        </BlurFade>
                        <BlurFade delay={0.3/2}>
                            <p class="text-lg text-gray-600">
                                Enter your unique booking reference below to access your stay information
                            </p>
                        </BlurFade>
                    </div>

                    <div class="space-y-6">
                        <div class="flex flex-col sm:flex-row gap-4 items-stretch">
                            <BlurFade delay={0.4/2} class="flex-1 relative">
                                <input 
                                type="number"
                                on:focus={() => (coundNotFind = false)}
                                bind:value={bookingReferenceinput}
                                class="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 bg-white rounded-lg border-2 border-gray-200 focus:border-[#C09A5B] focus:outline-none transition-all shadow-sm"
                                placeholder="Booking Reference Number"
                                inputmode="numeric"
                                pattern="[0-9]*"
                                maxlength="10"
                                on:input={e => {
                                    const value = e.target.value;
                                    const maxInt32 = 2147483647;
                                    
                                    // Validate numeric input
                                    const numericValue = value.replace(/\D/g, '');
                                    if (numericValue !== value) {
                                        e.target.value = numericValue;
                                        bookingReferenceinput = numericValue;
                                    }
                                    
                                    // Validate against Int32 limits
                                    if (numericValue > maxInt32) {
                                        e.target.value = numericValue.slice(0, 9);
                                        bookingReferenceinput = e.target.value;
                                    }
                                }}
                            />
                            </BlurFade>

                            <BlurFade delay={0.5/2} class="w-full sm:w-auto">
                                <button 
                                    on:click={searchButton} 
                                    disabled={bookingReferenceinput === ""}
                                    class="w-full px-8 py-3 text-lg bg-[#C09A5B] hover:bg-[#B08A4F] text-white font-semibold rounded-xl 
                                           transition-all transform  active:scale-95 
                                           shadow-lg disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-[#C09A5B]"
                                >
                                    Find My Booking
                                </button>
                            </BlurFade>
                        </div>

                        <BlurFade delay={0.6/2}>
                            <p class="text-sm text-gray-500 text-center">
                                Check your confirmation email for the reference number
                            </p>
                        </BlurFade>
                    </div>
                </div>
            </div>
        </BlurFade>
        {/if}

        <!-- Expanded details section -->
        {#if showBookingDetails || showErrorDetails}
        <BlurFade delay={0.2/2}>
            <div class="mx-auto w-full max-w-7xl backdrop-blur-sm rounded-2xl shadow-2xl  ">
                <BookingDetails 
                    bookingData={bookingData} 
                    apartmentDetails={apartmentDetails} 
                    success={showBookingDetails}
                />
            </div>
        </BlurFade>
        {/if}
    </div>
</div>
<Footer/>


<style>

    /* Hide number input arrows for Chrome, Safari, Edge */
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Hide number input arrows for Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
</style>