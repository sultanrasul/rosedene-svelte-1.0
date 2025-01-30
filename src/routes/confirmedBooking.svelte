<script>
// @ts-nocheck

    import { Check } from "lucide-svelte";
    export let bookingData = {};

    let showBookingDetails = false;

    onMount(async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        // Check for the refNumber in the URL
        const receipt_id = urlParams.get("receipt_id");

        if (receipt_id) {
            showBookingDetails = true; // Set to true if refNumber is found

            // Set the bookingData if refNumber exists
            try  {
                const response = await fetch('http://127.0.0.1:5000/get_booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        date_from: dateFrom,
                        date_to: dateTo,
                        property_id: apartmentDetails.id,
                        adults: adults,
                        children: children,
                        childrenAges: childrenAges,
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
                const checkoutURL = await response.json();
                window.open(checkoutURL.url);
                console.log(checkoutURL.url);

                } catch (error) {
                    // Log detailed error information
                    
                }
        }

        const scrollToo = urlParams.get("scrollToo") || null;
        if (scrollToo) {
            console.log("Scroll Too:", scrollToo);
            scrollToElementWithOffset(scrollToo);
            window.history.replaceState({}, document.title, "/");
        }
    });
</script>

<div class="flex flex-col items-center justify-center relative">
    <div class="bg-white rounded-lg shadow-lg pt-10 pb-2 pl-2 pr-2 max-w-md w-full text-black sm:pr-10 sm:pl-10 sm:pb-10">

        <!-- Check Mark -->
        <div class="absolute top-[-30px] left-1/2 transform -translate-x-1/2">
            <div class=" flex items-center justify-center p-4 rounded-full bg-green-500/80 shadow-2xl animate-[pulse_1.5s_ease-out]">
                <div class="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-green-500">
                <Check class="w-6 h-6" color="white" />
                </div>
            </div>
        </div>

          
  
  
        <!-- Payment Success Text -->
        <h1 class="text-center text-gray-800 text-2xl font-semibold">Payment Success!</h1>
        <p class="text-center text-gray-500 mt-2">Your Reservation has been complete</p>
    
        <!-- Payment Details -->
        <div class="bg-gray-100 rounded-lg p-6 mt-6">
            <div class="grid grid-cols-2 gap-4 text-sm">

            <div class="flex items-center col-span-2 w-full text-center justify-between">
                <div class="flex items-left ">
                    <div class="text-gray-500">Amount</div>
                </div>
                <div class="flex items-right">
                    <div class="text-right text-gray-800 font-medium text-lg">£{bookingData.amount}</div>
                </div>
            </div>

            <div class="flex items-center col-span-2 w-full text-center justify-between">
                <div class="flex items-left ">
                    <div class="text-gray-500">Ref Number</div>
                </div>
                <div class="flex items-right">
                    <div class="text-right text-gray-800">{bookingData.ref_number}</div>
                </div>
            </div>

            <div class="flex items-center col-span-2 w-full text-center justify-between">
                <div class="flex items-left ">
                    <div class="text-gray-500">Apartment</div>
                </div>
                <div class="flex items-right">
                    <div class="text-right text-gray-800">{bookingData.apartment_name}</div>
                </div>
            </div>

            <div class="flex items-center col-span-2 w-full text-center justify-between">
                <div class="flex items-left ">
                    <div class="text-gray-500">Name</div>
                </div>
                <div class="flex items-right">
                    <div class="text-right text-gray-800">{bookingData.name}</div>
                </div>
            </div>

            <div class="flex items-center col-span-2 w-full text-center justify-between">
                <div class="flex items-left ">
                    <div class="text-gray-500">Email</div>
                </div>
                <div class="flex items-right">
                    <div class="text-right text-gray-800">{bookingData.email}</div>
                </div>
            </div>

            <div class="flex items-center col-span-2 w-full text-center justify-between">
                <div class="flex items-left ">
                    <div class="text-gray-500">Phone Number</div>
                </div>
                <div class="flex items-right">
                    <div class="text-right text-gray-800">{bookingData.phone_number}</div>
                </div>
            </div>


            <hr class="h-px my-2 bg-gray-300 border-0 col-span-2">
                
            <div class="flex items-center space-x-3 col-span-2 w-full text-center justify-between">
                <div class="flex items-left space-x-2">
                    <div class="text-gray-500">Check-in</div>
                    <div class="text-left text-gray-800">{bookingData.check_in}</div>
                </div>
                
                <hr class="h-full w-px bg-gray-300 border-0">
                
                <div class="flex items-right space-x-2">
                    <div class="text-gray-500">Check-in</div>
                    <div class="text-right text-gray-800">{bookingData.check_out}</div>
                </div>
            </div>

            <!-- Flex container for Adults and Children -->
            <div class="flex items-center space-x-4 col-span-2 w-full text-center justify-between">
                <!-- Left Section (Adults) -->
                <div class="flex items-center space-x-4 text-left">
                <div class="text-gray-500">Adults</div>
                <div class="text-gray-800">{bookingData.adults}</div>
                </div>
            
                <hr class="h-full w-px bg-gray-300 border-0">
            
                <!-- Middle Section (Children) -->
                <div class="flex items-center space-x-4 text-center">
                <div class="text-gray-500">Children</div>
                <div class="text-gray-800">{bookingData.children}</div>
                </div>
            
                <hr class="h-full w-px bg-gray-300 border-0">
                
                <!-- Right Section (Nights) -->
                <div class="flex items-center space-x-4 text-right">
                    <div class="text-gray-500">Nights</div>
                    <div class="text-gray-800">{bookingData.nights}</div>
                </div>
            </div>
            
            <div class="text-gray-500">Children Ages</div>
            <div class="text-right text-gray-800">{bookingData.children_ages}</div>      
          
          
        </div>
      </div>
    </div>
  </div>
  
