<script>
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
    import { Ban, Info, TriangleAlert, X } from "lucide-svelte";
  import { BACKEND_URL } from "../conf";

    export let bookingReference;
    export let email;
    let isProcessing = false;

    // @ts-ignore
    async function cancelBooking(bookingReference, email){
        isProcessing = true;
        try  {
            // @ts-ignore
            const response = await fetch(`${BACKEND_URL}/cancel_booking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    booking_ref: bookingReference,
                    email: email
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
            // @ts-ignore
            bookingData = await response.json();
            // @ts-ignore
            bookingData = bookingData["reservation_data"]

            // @ts-ignore
            showBookingDetails = true;
            // @ts-ignore
            apartmentDetails = apartments[bookingData.Apartment.match(/\d+/)?.[0]]
            // @ts-ignore
            apartmentNumber = bookingData.Apartment.match(/\d+/)?.[0];

            // @ts-ignore
            startDate = parseDate(formatDate(bookingData?.DateFrom));
            // @ts-ignore
            endDate = parseDate(formatDate(bookingData?.DateTo));
            // @ts-ignore
            nights = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

            // @ts-ignore
            confetti({
                colors: ['#C09A5B','#233441'],
                particleCount: 100,
                spread: 70,
                origin: {
                    y: 0.9,
                    x: 0.2
                }
            });

            // @ts-ignore
            confetti({
                colors: ['#C09A5B','#233441'],
                particleCount: 100,
                spread: 70,
                origin: {
                    y: 0.9,
                    x: 0.8
                }
            });



            // @ts-ignore
            console.log(bookingData);

        } catch (error) {
            console.error(error)

            // @ts-ignore
            if(error.status === 420){
                // @ts-ignore
                toast.error("Booking reference not found");
                // coundNotFind = true;
                // @ts-ignore
                bookingReferenceinput = "";
                
                // @ts-ignore
                document.getElementById("email").value = "";
            }
        }
        finally{
            isProcessing = false;
        }
    }
</script>
<div id="hs-scale-animation-modal-cancelation"
  class="hs-overlay hidden fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-none"
  role="dialog"
  tabindex="-1"
  aria-labelledby="cancel-modal-title">
  
  
    <div class="hs-overlay-animation-target scale-95 opacity-0 hs-overlay-open:scale-100 hs-overlay-open:opacity-100 ease-in-out transition-all duration-300 sm:max-w-md sm:w-full mx-auto p-4 pointer-events-auto">
    <div class="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden relative">
      <!-- Floating Close Button (Top Right) -->
      <button type="button" aria-label="Close"
        class="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 hover:text-gray-600 transition-all duration-300 group z-10"
        data-hs-overlay="#hs-scale-animation-modal-cancelation">
        <svg class="w-6 h-6 group-hover:rotate-90 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      <!-- Modal Header -->
      <div class="py-5 px-6 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
        <div class="flex items-center gap-3">
          <TriangleAlert class="text-red-700 w-7 h-7 shrink-0" />
          <h3 id="cancel-modal-title" class="text-xl font-semibold text-gray-800">
            Cancel Booking?
          </h3>
        </div>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        <div class="flex flex-col items-center mb-5">
          <div class="bg-red-100 rounded-full p-3 mb-4">
            <Ban class="text-red-700 w-9 h-9" />
          </div>

          <h2 class="text-center text-xl font-semibold text-gray-800 mb-2">
            Are you sure you want to cancel?
          </h2>

          <p class="text-center text-gray-600 mb-4">
            This action <span class="font-bold">cannot</span> be undone. Cancelling your booking will:
          </p>

          <ul class="text-gray-700 mb-5 w-full max-w-xs space-y-3">
            <li class="flex items-start">
              <div class="bg-red-400 rounded-full p-1 mr-3">
                <X class="text-white w-4 h-4" />
              </div>
              <span>Immediately cancel your reservation</span>
            </li>
            <li class="flex items-start">
              <div class="bg-red-400 rounded-full p-1 mr-3">
                <X class="text-white w-4 h-4" />
              </div>
              <span>Initiate the refund process (if applicable)</span>
            </li>
            <li class="flex items-start">
              <div class="bg-red-400 rounded-full p-1 mr-3">
                <X class="text-white w-4 h-4" />
              </div>
              <span>Remove your booking from our system</span>
            </li>
          </ul>

          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 w-full rounded-md">
            <div class="flex">
              <div class="flex-shrink-0 mr-3">
                <Info class="text-yellow-400 w-6 h-6" />
              </div>
              <p class="text-sm text-yellow-700">
                <strong>Important:</strong> Refunds may take 7-10 business days to process.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
    <div class="bg-gray-50 px-6 py-4 flex justify-between flex-col sm:flex-row gap-3 sm:gap-4">
        <!-- Back Button -->
        <button type="button"
            class="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            data-hs-overlay="#hs-scale-animation-modal-cancelation">
            Back to Booking
        </button>

        <!-- Continue Button -->
        <button
            type="button"
            on:click={() => {cancelBooking(bookingReference, email)}}
            disabled={isProcessing}
            class="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium transition-colors flex items-center justify-center gap-2
                    hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-red-600">

            {#if isProcessing}
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
            {:else}
                Confirm Cancellation
            {/if}

        </button>
    </div>


    </div>
  </div>
</div>