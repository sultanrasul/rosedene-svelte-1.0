<script>
// @ts-nocheck

    import { Check, CloudDownload, Info, UserRoundIcon } from "lucide-svelte";
    import { onMount, tick } from "svelte";
    import BookingDetails from "./bookingDetails.svelte";
    import Navbar from "../Navbar.svelte";
    import { apartments } from '../apartments';
    import { BACKEND_URL } from "../conf";
    import { toast } from "svelte-sonner";
    import BlurFade from "@/components/BlurFade.svelte";
    import Footer from "../Footer.svelte";
  import GuestInformation from "../book/GuestInformation.svelte";
  import TripInformation from "../book/TripInformation.svelte";
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import Card from "../book/Card.svelte";
  import WordPullUp from "@/components/WordPullUp.svelte";


    let bookingData = {};

    let showBookingDetails = false;

    let showErrorDetails = false;

    let bookingReferenceinput = "";

    let coundNotFind = false;
    
    let apartmentDetails;

    let email = "";

    let isProcessing = false;

    function formatDate(dateStr) {
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }
    
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed
    };
    let nights;
    let startDate = ""
    let endDate = ""
    let apartmentNumber;


    async function getBookingDetails(bookingReference, email){
        isProcessing = true;
        try  {
            const response = await fetch(`${BACKEND_URL}/get_booking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    booking_ref: bookingReference,
                    email: email,
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
            apartmentNumber = bookingData.Apartment.match(/\d+/)?.[0];

            startDate = parseDate(formatDate(bookingData?.DateFrom));
            endDate = parseDate(formatDate(bookingData?.DateTo));
            nights = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

            confetti({
                colors: ['#C09A5B','#233441'],
                particleCount: 100,
                spread: 70,
                origin: {
                    y: 0.9,
                    x: 0.2
                }
            });

            confetti({
                colors: ['#C09A5B','#233441'],
                particleCount: 100,
                spread: 70,
                origin: {
                    y: 0.9,
                    x: 0.8
                }
            });



            console.log(bookingData);

        } catch (error) {
            console.error(error)

            if(error.status === 420){
                toast.error("Booking reference not found");
                // coundNotFind = true;
                bookingReferenceinput = "";
                
                document.getElementById("email").value = "";
            }
        }
        finally{
            isProcessing = false;
        }
    }

    function searchButton(){
        // Validate both fields before making the request
        if (bookingReferenceinput && email) {
            getBookingDetails(bookingReferenceinput, email);
        } else {
            if (!bookingReferenceinput) toast.error("Please enter your booking reference");
            if (!email) toast.error("Please enter your email address");
        }
    }

    onMount(async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        // Check for the refNumber in the URL
        const ref_number = urlParams.get("ref_number");
        const email = urlParams.get("email");
        const error = urlParams.get("error");

        if (ref_number && email) {
            // Set the bookingData if refNumber exists
            document.getElementById("email").value = email;
            document.getElementById("bookingReference").value = ref_number;
            getBookingDetails(ref_number,email);

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

    function backButton(){
        bookingData = {};
        showBookingDetails = false;

        apartmentDetails = None;
        apartmentNumber = None;

        startDate = None;
        endDate = None;
        nights = None;
    }

    $: email;
    $: bookingReferenceinput;
</script>


{#if !showBookingDetails && !showErrorDetails}
<div class="min-h-screen flex">
    
    <!-- Right Form Section -->
    <div class=" absolute w-full z-10">
        <Navbar/>
    </div>

    <!-- Left Image Section -->
    <BlurFade delay={0.2/2} class="z-0 w-1/2 hidden sm:block bg-cover bg-center bg-[url('/2/3.jpg')]">
            <!-- Testimonial Overlay -->
            <div class="h-full flex items-end p-12 bg-black/30">
                <!-- <div class="text-white border-l-4 border-[#C09A5B] pl-6 py-2">
                    <p class="text-xl italic">
                        “This library has saved me countless hours of work and helped me deliver 
                        stunning designs to my clients faster than ever before. Highly recommended!”
                    </p>
                    <p class="mt-4 font-semibold text-lg not-italic">Sofia Davis</p>
                </div> -->
            </div>
    </BlurFade>

    <div class="w-full sm:w-1/2 bg-[#233441] flex items-center justify-center p-8">
        <div class="max-w-md w-full text-white">
            <!-- Header -->
            <WordPullUp duration={0.1/2} class="text-4xl mb-5 text-center text-[#C09A5B]" words={"Find Your Booking"} />

            <!-- <BlurFade delay={0.1/2}>
                <h1 class="text-4xl mb-5 text-center text-[#C09A5B]">Find Your Booking</h1>
            </BlurFade> -->
            
            <!-- Form Content -->
            <div class="space-y-6">
                <BlurFade delay={0.3/2}>
                    <p class="text-center text-gray-400 mb-8">Enter your email and booking number below</p>
                </BlurFade>
                
                <BlurFade delay={0.4/2} class="flex-1 relative">
                    <input 
                        id="email"
                        type="email"
                        bind:value={email}
                        class="focus:ring-1 focus:ring-[#C09A5B] w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 bg-white rounded-lg border-2 border-gray-200 focus:border-[#C09A5B] focus:outline-none transition-all shadow-sm"
                        placeholder="name@example.com"
                    />
                </BlurFade>

                <BlurFade delay={0.5/2} class="flex-1 relative">
                    <input 
                        type="number"
                        id="bookingReference"
                        bind:value={bookingReferenceinput}
                        class="focus:ring-1 focus:ring-[#C09A5B] w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 bg-white rounded-lg border-2 border-gray-200 focus:border-[#C09A5B] focus:outline-none transition-all shadow-sm"
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

                <!-- Modified button section -->
                <BlurFade delay={0.6/2} class="w-full sm:w-auto">
                    <button
                        on:click={searchButton}
                        class="w-full px-8 py-3 text-lg bg-[#C09A5B] hover:bg-[#B08A4F] text-white font-semibold rounded-xl transition-all transform hover:scale-100 active:scale-95 shadow-lg disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-[#C09A5B]"                       
                        disabled={!bookingReferenceinput || !email || isProcessing}
                    >
                        {#if isProcessing}
                            <div class="flex items-center justify-center gap-2">
                                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </div>
                        {:else}
                            Find My Booking
                        {/if}
                    </button>
                </BlurFade>
                <BlurFade delay={0.7/2}>
                    <p class="text-sm text-gray-500 text-center">
                        Check your confirmation email for the booking number
                    </p>
                </BlurFade>

            </div>
        </div>
    </div>
        
    </div>
{/if}


{#if showBookingDetails || showErrorDetails}
<div class="bg-[#233441]">
    <Navbar/>
</div>
<div class="relative z-10 pt-10 mt-0 pb-20 sm:pl-5 sm:pr-5 md:pl-5 md:pr-5 lg:pl-10 lg:pr-10 xl:pl-40 xl:pr-40 bg-[#233441]">
    <div class="max-w-7xl mx-auto ">
        <div class="inline-flex items-center gap-2 mb-8">
            <!-- Back Button Container -->
            <button 
                class="group relative p-1 rounded-full transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C09A5B]"
                aria-label="Go back"
                on:click={backButton}
            >
                <!-- Hover Circle Background -->
                <div class="absolute inset-0 rounded-full transition-all group-hover:bg-gray-100/50"></div>
                
                <!-- Chevron Icon -->
                <ChevronLeft 
                    class="w-8 h-8 text-gray-300 transition-all group-hover:text-[#C09A5B] group-hover:scale-110" 
                    stroke-width="2"
                />
            </button>
            
            <h1 class="text-3xl  text-[#C09A5B]">Find Your Booking</h1>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-5 md:gap-10 items-start">
            <!-- Left Column (50%) -->
            <div class="space-y-6 bg-white rounded-xl relative overflow-visible">
                
                <div class="z-[10] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div class={`flex items-center justify-center p-2 rounded-full shadow-2xl bg-green-100 animate-[pulse_1.5s_ease-out]`}>
                        <div class={`w-16 h-16 flex items-center justify-center rounded-full bg-green-500 shadow-lg`}>
                            <Check class="w-8 h-8 lg:w-10 lg:h-10" color="white" />
                        </div>
                    </div>
                </div>

                <div class="space-y-3 mb-8 pt-8">
                    <h1 class="text-center text-3xl lg:text-4xl font-bold text-green-600">Payment Successful!</h1>
                    <p class="text-center text-gray-600 lg:text-lg">Your reservation is confirmed</p>
                </div>
<!-- 
                {#if loading}
                    <div class="space-y-6 p-6 animate-pulse">
                        <div class="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div class="space-y-4">
                            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div class="h-px bg-gray-200 my-8"></div>
                            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>

                        <div class="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div class="space-y-4">
                            <div class="h-12 bg-gray-200 rounded"></div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="h-12 bg-gray-200 rounded"></div>
                                <div class="h-12 bg-gray-200 rounded"></div>
                            </div>
                        </div>

                        <div class="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div class="h-32 bg-gray-200 rounded-lg"></div>
                    </div>
                {:else if error}
                    <div class="text-red-500 p-6">Error: {error}</div>                
                {/if} -->
                
                <div class="block">
    
                    <!-- Guest Details Section -->
                    <div class="bg-white rounded-xl p-6">
                        <h2 class="text-2xl font-bold mb-6" style="color: #233441">Your Trip</h2>
                        
                        <!-- Trip Summary -->
                        <TripInformation bookingReference={bookingData?.ReservationID} startDate={bookingData.DateFrom} endDate={bookingData.DateTo} adults={bookingData?.GuestDetailsInfo?.NumberOfAdults} children={bookingData?.GuestDetailsInfo?.bookingData?.GuestDetailsInfo?.NumberOfAdults} childrenAges={"childrenAges"}/>
                    
                    </div>
    
                    <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6" id="guestInformation">
    
                    <!-- Guest Information -->
                    <GuestInformation showEditButton={false} guestInformationConfirmed={true} specialRequests={bookingData?.SpecialRequest} name={bookingData?.CustomerInfo?.Name} phone={bookingData?.CustomerInfo?.Phone} email={bookingData?.CustomerInfo?.Email}/>
    
                    
                    
                </div>
            </div>
            
            <!-- Right Sticky Column (50%) -->
            <div class="md:sticky md:top-6 w-full max-w-xl md:max-w-none mx-auto md:mx-0 order-first md:order-none">
                <!-- Apartment Details Card -->
                <Card apartmentNumber={apartmentNumber} apartmentDetails={apartmentDetails} price={bookingData?.ClientPrice} nights={nights} />
            </div>
        </div>
        <!-- Footer -->
        <div class="text-center text-sm text-gray-300 mt-12 ">
            <div class="flex justify-center gap-4 mb-2">
                <a href="#" class="hover:text-[#C09A5B]">Privacy</a>
                <a href="#" class="hover:text-[#C09A5B]">Terms</a>
            </div>
            <p>© 2025 Boardbeach Ltd | All rights reserved</p>
        </div>
    </div>
</div>
{/if}

<Footer/>
<style>
    :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }



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