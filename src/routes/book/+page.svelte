<script>
// @ts-nocheck

    import ChevronLeft from "@lucide/svelte/icons/chevron-left";
    import Navbar from "../Navbar.svelte";
    import Card from "./Card.svelte";
    import { apartments } from "../apartments";
    // @ts-ignore
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    // @ts-ignore
    // @ts-ignore
    import { format, isWithinInterval } from 'date-fns';
    import { BACKEND_URL, PK } from "../conf";
    import {loadStripe} from '@stripe/stripe-js'
    import { Check, User, UserRoundIcon, X } from "lucide-svelte";
    import { redirect } from "@sveltejs/kit";
    import { Toaster, toast } from 'svelte-sonner'
    import GuestInformation from "./GuestInformation.svelte";
    import TripInformation from "./TripInformation.svelte";
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
    import { calculateApartmentPrice } from "../calculateApartmentPrice";
    import { user } from "@/stores/user";
    import { onDestroy } from "svelte";
    import { supabase } from "@/supabase";
    import { tick } from 'svelte';


    
    // Initialize variables
    // @ts-ignore
    let name = '';
    let email = '';
    let phone = '';
    let bookingData;
    // @ts-ignore
    
    let currentUser;
    const unsubscribe = user.subscribe(u => {
        currentUser = u;

        if (currentUser) {
            // Always set email
            email = currentUser.email ?? '';

            // Build name
            const meta = currentUser.user_metadata || {};
            if (meta.first_name) {
                name = `${meta.first_name} ${meta.last_name ?? ''}`.trim();
            } else {
                name = meta.name ?? '';
            }
        } else {
            // Reset if logged out
            name = '';
            email = '';
            phone = '';
        }
    });
    onDestroy(unsubscribe);
    
    // @ts-ignore
    let specialRequests = '';
    let bookingReference;
    let booking_uuid;
    let token;
    let returnedEmail;
    // @ts-ignore
    /**
   * @type {any}
   */
    /**
   * @type {string | number | null}
   */  
    // @ts-ignore
    const parseDate = (dateStr) => {
      if (dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed
      }
      return ""
    };
    const formatDateDMY = (dateString) =>
        dateString && format(new Date(dateString), dateFormatDMY) || '';
    
    let number, check_in, check_out, refundable, children, adults, childrenAges, apartmentDetails;
    // @ts-ignore
    // @ts-ignore
    let nights = Math.floor((parseDate(check_out) - parseDate(check_in)) / (1000 * 60 * 60 * 24));
    // @ts-ignore
    // @ts-ignore
    let guests = (adults ? parseInt(adults, 10) : 0) + (children ? parseInt(children, 10) : 0);
    // @ts-ignore
    // @ts-ignore
    let disabledDates = [];
    let dateFormatDMY = 'dd/MM/yyyy';
    // @ts-ignore
    let startDate = parseDate(check_in); // Variable for start date as a Date object
    // @ts-ignore
    let endDate = parseDate(check_out); // Variable for start date as a Date object
    console.log(startDate, endDate)
    let nameError = '';
    let emailError = '';
    let phoneError = '';
    let paymentProcessing = false;
    let clientSecretProcessing = false;
    let apartmentPrice;

    let guestInformationConfirmed = false;

    let agreedToTerms = false;
    let termsError = '';


    let dateFrom, dateTo;

    function fetchApartmentPrice(basePrice, clientPrice, refundable, nights) {
        // Helper to format as £ with 2 decimal places (always includes .00)
        const formatGBP = (amount) => `£${amount.toFixed(2)}`;
        const perNightPrice = basePrice / nights;
        const breakdown = [
            {
                label: `${formatGBP(perNightPrice)} x ${nights} nights`,
                amount: basePrice.toFixed(2) // keep as string so .00 stays
            }
        ];
        if (refundable) {
            const refundableFee = basePrice * 0.0575;
            breakdown.push({
                label: "Refundable rate",
                amount: refundableFee.toFixed(2)
            });
        }

        return {
            total: clientPrice.toFixed(2),
            breakdown
        };
    }



    async function hashToken(token) {
        const msgBuffer = new TextEncoder().encode(token);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Fetch booking from Supabase — supports guest-token logic
    // Fetch booking — supports guest-token logic
    async function fetchBooking(uuid, token = null) {
        if (token) {
            // Guest booking: fetch via backend endpoint
            try {
                const res = await fetch(`${BACKEND_URL}/bookings/${uuid}?token=${encodeURIComponent(token)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    console.error("Error fetching guest booking:", res.statusText);
                    return null;
                }

                const data = await res.json();
                return data.booking || data; // Adjust depending on backend response format
            } catch (err) {
                console.error("Network error fetching guest booking:", err);
                return null;
            }
        } else {
            // Logged-in user: fetch directly from Supabase
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .eq('id', uuid)
                .single();

            if (error) {
                console.error('Error fetching booking:', error);
                return null;
            }

            return data;
        }
    }


    async function initBookingData() {
        const urlParams = new URLSearchParams(window.location.search);
        const uuid = urlParams.get('booking_uuid');
        const token = urlParams.get('token'); // token is optional

        if (uuid) {
            // --- Flow: Returning booking
            bookingData = await fetchBooking(uuid, token);
            if (!bookingData) return; // maybe redirect or show error
            
            console.log(bookingData.apartment_id)
            const entry = Object.entries(apartments).find(([key, apt]) => apt.id == bookingData.apartment_id);
            if (!entry) {
                console.error("❌ No apartment found for id", bookingData.apartment_id);
                return;
            }

            const [numberKey, aptDetails] = entry;
            number = parseInt(numberKey, 10);
            apartmentDetails = aptDetails;

            refundable = bookingData.refundable;
            adults = bookingData.adults || 1;
            children = bookingData.children || 0;
            childrenAges = bookingData.children_ages || [];

            name = bookingData.name;
            email = bookingData.email;
            phone = bookingData.phone;
            specialRequests = bookingData.special_requests;
            clientSecret = bookingData.client_secret

            // ✅ Dates from Supabase come as YYYY-MM-DD
            startDate = new Date(bookingData.date_from);
            endDate = new Date(bookingData.date_to);

            stripe = await loadStripe(PK);
            // Load Stripe Elements
            paymentIntent = await stripe.retrievePaymentIntent(clientSecret);

            console.log("Payment Intent: ",paymentIntent)

            // Now you can access the amount
            console.log('Amount:', paymentIntent.paymentIntent?.amount);
            console.log('Currency:', paymentIntent.paymentIntent?.currency);
            
            // @ts-ignore
            totalPrice = paymentIntent.paymentIntent?.amount / 100;
            console.log('Total Price amount:', `£${totalPrice.toFixed(2)}`);

            // Initialize Elements AFTER getting clientSecret
            elements = stripe.elements({ 
                clientSecret,
                appearance: {
                    type: 'tabs',
                    defaultCollapsed: false,
                    theme: 'stripe',
                    variables: {
                        colorPrimary: '#C09A5B',
                        colorBackground: '#FFF',
                    },
                },
            });

            paymentElement = elements.create('payment');
            paymentElement.mount('#payment-element');
            guestInformationConfirmed = true;

            scrollToElementWithOffset("terms");
        } else {
            // --- Flow: Fresh booking via URL
            number = urlParams.get('number');
            const check_in = urlParams.get('check_in');   // DD/MM/YYYY
            const check_out = urlParams.get('check_out');

            refundable = urlParams.has('refundable');
            adults = parseInt(urlParams.get('adults'), 10) || 1;
            children = parseInt(urlParams.get('children'), 10) || 0;
            childrenAges = children ? urlParams.getAll('ages').map(Number) : [];
            apartmentDetails = apartments[number];

            // ✅ Dates from URL come as DD/MM/YYYY
            startDate = parseDate(check_in);
            endDate = parseDate(check_out);
        }

        // ✅ Common derived values
        nights = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
        guests = (adults || 0) + (children || 0);

        dateFrom = {
            day: startDate.getDate(),
            month: startDate.getMonth() + 1,
            year: startDate.getFullYear()
        };

        dateTo = {
            day: endDate.getDate(),
            month: endDate.getMonth() + 1,
            year: endDate.getFullYear()
        };

        console.log("initBookingData →", { startDate, endDate, dateFrom, dateTo, nights });
    }


    onMount(async () => {
        await initBookingData();
        
        console.log(apartmentDetails["id"]);
        apartmentPrice = fetchApartmentPrice(bookingData.ru_price, bookingData.client_price, refundable, nights);
        console.log(apartmentPrice, "backend price");

        priceBreakDown = apartmentPrice["breakdown"];
        totalPrice = apartmentPrice["total"];

        // console.log(newPrice);

    });
    


    // Validation functions
    const validateForm = () => {
        let isValid = true;
        
        // Name validation
        if (!name.trim()) {
            nameError = 'Name is required';
            isValid = false;
        } else {
            nameError = '';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            emailError = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError = 'Invalid email format';
            isValid = false;
        } else {
            emailError = '';
        }

        // Phone validation (basic international format validation)
        const phoneRegex = /^\+?[0-9\s\-()]{7,}$/;
        if (!phone.trim()) {
            phoneError = 'Phone number is required';
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            phoneError = 'Invalid phone number format';
            isValid = false;
        } else {
            phoneError = '';
        }

        return isValid;
    };

    // @ts-ignore
    let stripe;
    let paymentElement;
    // @ts-ignore
    let elements;
    let clientSecret = null;
    let loading = false;
    // @ts-ignore
    let error = null;
    let paymentIntent;
    /**
   * @type {number}
   */
    let priceBreakDown;
    let totalPrice;

    let pollingInterval;


    async function pollPaymentStatus(paymentIntentId, email) {
        let attempts = 0;
        const maxAttempts = 15; // Timeout after ~75 seconds (5s interval)

        return new Promise((resolve, reject) => {
            pollingInterval = setInterval(async () => {
                try {
                    attempts++;

                    const response = await fetch(`${BACKEND_URL}/payment-status`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ payment_intent_id: paymentIntentId, email })
                    });

                    const data = await response.json();

                    if (data.status === "confirmed") {
                        clearInterval(pollingInterval);
                        resolve(data); // Booking confirmed

                    } else if (data.status === "error") {
                        clearInterval(pollingInterval);
                        reject(new Error(data["error"]));

                    } else if (data.status === "Booking Not Found" || attempts >= maxAttempts) {
                        clearInterval(pollingInterval);
                        reject(new Error("Booking not found or polling timeout"));
                    }

                    // Else status is still "pending", so do nothing yet
                } catch (err) {
                    clearInterval(pollingInterval);
                    reject(err);
                }
            }, 5000); // every 5 seconds
        });
    }


    async function fetchClientSecret(){
        clientSecretProcessing = true;
        try {
            // Initialize Stripe FIRST
            stripe = await loadStripe(PK);
            // THEN fetch client secret
            const response = await fetch(`${BACKEND_URL}/payments/create-checkout-session`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    date_from: dateFrom,
                    date_to: dateTo,
                    apartment_id: apartmentDetails.id,
                    adults: adults,
                    children: children,
                    children_ages: childrenAges,
                    refundable: refundable,

                    special_requests: specialRequests,
                    name: name,
                    email: email,
                    phone: phone,
                    user_id: currentUser?.id
                }),
            });

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
            
            const data = await response.json();
            clientSecret = data.clientSecret;
            booking_uuid = data.booking_uuid;
            token = data?.token;
            
            // @ts-ignore
            paymentIntent = await stripe.retrievePaymentIntent(clientSecret);

            console.log("Payment Intent: ",paymentIntent)

            // Now you can access the amount
            console.log('Amount:', paymentIntent.paymentIntent?.amount);
            console.log('Currency:', paymentIntent.paymentIntent?.currency);
            
            // @ts-ignore
            totalPrice = paymentIntent.paymentIntent?.amount / 100;
            console.log('Total Price amount:', `£${totalPrice.toFixed(2)}`);

            // Update URL with booking_uuid
            const newUrl = new URL(window.location.href);
            if (data.token){
                token = data.token;
                newUrl.search = `?booking_uuid=${booking_uuid}&token=${data.token}`
            } else {
                newUrl.search = `?booking_uuid=${booking_uuid}`
            }
            window.history.replaceState({}, "", newUrl);

            // Initialize Elements AFTER getting clientSecret
            // @ts-ignore
            elements = stripe.elements({ 
                clientSecret,
                appearance: {
                    type: 'tabs',
                    defaultCollapsed: false,
                    theme: 'stripe',
                    variables: {
                        colorPrimary: '#C09A5B',
                        colorBackground: '#FFF',
                    },
                },
            });

            // paymentElement = elements.create('payment');
            paymentElement = elements.create('payment');
            paymentElement.mount('#payment-element');
            guestInformationConfirmed = true;

            scrollToElementWithOffset("terms");

        } catch (err) {
        // @ts-ignore
            error = err.message;
            

            console.error('Payment error:', err);
        } finally {
            clientSecretProcessing = false;
        }
    }


    async function confirmDetails(params) {
        // Validate form
        if (!validateForm()) {
            scrollToElementWithOffset("guestInformation");
            return false;
        }

        fetchClientSecret();

        return true;

    }


    async function handlePayment() {

        if (!agreedToTerms){
            termsError = 'Please accept terms & conditions';
            return;
        }

        paymentProcessing = true;

        try {
            const { paymentIntent, error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    payment_method_data: {
                        billing_details: { name, email, phone },
                    },
                },
                redirect: "if_required",
            });

            if (error) {
                toast.error(error.message || "Payment failed");
                return;
            }

            const pollingResult = await pollPaymentStatus(paymentIntent.id, email);
            bookingReference = pollingResult.booking_reference;
            returnedEmail = pollingResult.email;

            window.location.href = `/details?ref_number=${bookingReference}&email=${returnedEmail}`;
        } catch (err) {
            console.error("Polling failed:", err.message);
            error = err.message || "An unexpected error occurred while confirming booking.";
        } finally {
            paymentProcessing = false;
        }
    }

    async function scrollToElementWithOffset(id) {
        await tick(); // wait for DOM update
        const element = document.getElementById(id);
        const yOffset = 0; // Adjust this value as needed
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  </script>

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
                on:click={window.history.back()}
            >
                <!-- Hover Circle Background -->
                <div class="absolute inset-0 rounded-full transition-all group-hover:bg-gray-100/50"></div>
                
                <!-- Chevron Icon -->
                <ChevronLeft 
                    class="w-8 h-8 text-gray-300 transition-all group-hover:text-[#C09A5B] group-hover:scale-110" 
                    stroke-width="2"
                />
            </button>
        
            <h1 class="text-3xl font-bold text-[#C09A5B]">Confirm and pay</h1>
        </div>
        {#if number}
            <div class="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 items-start">
                <!-- Left Column (50%) -->
                <div class="space-y-6 bg-white rounded-xl relative overflow-visible min-h-[600px]">
                    
                    {#if bookingReference || error}
                        <div class="z-[10] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div class={`flex items-center justify-center p-2 rounded-full shadow-2xl ${error ? 'bg-red-100' : 'bg-green-100'} animate-[pulse_1.5s_ease-out]`}>
                                <div class={`w-16 h-16 flex items-center justify-center rounded-full ${error ? 'bg-red-500' : 'bg-green-500'} shadow-lg`}>
                                    {#if error}
                                        <X class="w-8 h-8 lg:w-10 lg:h-10" color="white" />
                                    {:else}
                                        <Check class="w-8 h-8 lg:w-10 lg:h-10" color="white" />
                                    {/if}
                                </div>
                            </div>
                        </div>

                        {#if bookingReference}
                            <div class="space-y-3 mb-8 pt-8">
                                <h1 class="text-center text-3xl lg:text-4xl font-bold text-green-600">Payment Successful!</h1>
                                <p class="text-center text-gray-600 lg:text-lg">Your reservation is confirmed</p>
                            </div>
                        {:else if error}
                            <div class="space-y-3 mb-8 pt-8">
                                <h1 class="text-center text-3xl lg:text-4xl font-bold text-red-600">Error!</h1>
                                <p class="text-center text-gray-600 lg:text-lg p-5">{error}</p>
                            </div>
                        
                        {/if}
                    {/if}

                    {#if loading}
                        <div class="space-y-6 p-6 animate-pulse">
                            <!-- Trip Summary Skeleton -->
                            <div class="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                            <div class="space-y-4">
                                <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div class="h-px bg-gray-200 my-8"></div>
                                <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                            </div>

                            <!-- Guest Info Skeleton -->
                            <div class="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                            <div class="space-y-4">
                                <div class="h-12 bg-gray-200 rounded"></div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="h-12 bg-gray-200 rounded"></div>
                                    <div class="h-12 bg-gray-200 rounded"></div>
                                </div>
                            </div>

                            <!-- Payment Details Skeleton -->
                            <div class="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                            <div class="h-32 bg-gray-200 rounded-lg"></div>
                        </div>
                    {/if}
                    <div class="{!loading & !error ? 'block' : 'hidden'}">
        
                        <!-- Guest Details Section -->
                        <div class="bg-white rounded-xl p-6">
                            <h2 class="text-2xl font-bold mb-6" style="color: #233441">Your Trip</h2>
                            <!-- Apartment Details Card -->
                            <div class="pb-10 block md:hidden">
                                <Card apartmentNumber={number} apartmentDetails={apartmentDetails} totalPrice={totalPrice} priceBreakDown={priceBreakDown} nights={nights} refundable={refundable} />
                            </div>
                            
                            <!-- Trip Summary -->
                            <TripInformation refundable={refundable} bookingReference={bookingReference} startDate={startDate} endDate={endDate} adults={adults} children={children} childrenAges={childrenAges}/>
                            
                        </div>
        
                        <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6" id="guestInformation">
        
                        <!-- Guest Information -->
                        <GuestInformation 
                            bind:guestInformationConfirmed={guestInformationConfirmed}
                            bind:specialRequests={specialRequests} 
                            bind:name={name}
                            bind:nameError={nameError}
                            bind:phone={phone}
                            bind:phoneError={phoneError}
                            bind:email={email}
                            bind:emailError={emailError}
                            bind:clientSecret={clientSecret}
                        />   

                        <!-- Payment Card -->

                        <div class="{guestInformationConfirmed ? 'block' : 'hidden'}">
                            <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6">

                            <div class="bg-white rounded-xl  p-6">
                                <h2 class="text-2xl font-bold mb-6" style="color: #233441">Payment details</h2>
                                <div id="payment-element" class="payment-form"></div>
                            </div>
            
                            <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6">
            
                            <!-- <div class="bg-white rounded-xl  p-6">
                                <h3 class="font-semibold mb-2" style="color: #233441">Cancellation policy</h3>
                                <p class="text-sm text-gray-600">
                                    Free cancellation before  May. Cancel before 2 Jun for a partial refund.
                                    <a href="#" class="underline" style="color: #C09A5B">Learn more</a>
                                </p>
                            </div>
            
                            <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6"> -->

                            
                            <div class="bg-white rounded-xl p-6" id="terms">
                                <!-- Agree to Terms -->
                                <div class="mb-10">
                                    <div class="flex items-center">  <!-- Changed from items-start to items-center -->
                                        <input
                                            type="checkbox"
                                            id="termsAgreement"
                                            bind:checked={agreedToTerms}
                                            on:input={() => termsError = ''}
                                            class="mr-3 h-6 w-6 rounded border-gray-300 text-[#C09A5B] focus:ring-[#C09A5B] transition-all duration-150 ease-in-out
                                                {termsError ? 
                                                    'border-red-500 shadow-[0_0_0_1px_#ef4444,0_0_0_3px_#fca5a5]' 
                                                    : ''}"
                                        />
                                        <label for="termsAgreement" class="text-sm text-gray-700">
                                            I agree to the 
                                            <a href="/terms" target="_blank" class="underline text-[#C09A5B] hover:text-[#a17843] transition-colors duration-150">Terms and Conditions</a> 
                                            and understand the cancellation policy.
                                        </label>
                                    </div>
                                    
                                    {#if termsError}
                                        <p class="text-red-500 text-sm mt-2 ml-9">{termsError}</p>  <!-- Adjusted ml-8 to ml-9 to account for larger checkbox -->
                                    {/if}
                                </div>


                                <!-- Update the Confirm Button -->
                                <button
                                    on:click={handlePayment}
                                    class="w-full py-4 rounded-xl font-bold text-white transition-colors hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                                    style="background-color: #C09A5B;"
                                    disabled={paymentProcessing}
                                >
                                    {#if paymentProcessing}
                                        <div class="flex items-center justify-center gap-2">
                                            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </div>
                                    {:else}
                                        Confirm and pay
                                    {/if}
                                </button>
                                
                                <div class="mt-4 flex items-center justify-center gap-2">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#C09A5B">
                                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                                    </svg>
                                    <span class="text-sm" style="color: #233441">Secure payment</span>
                                </div>
                            </div>
                        </div>


                        <div class="flex justify-end p-6 {guestInformationConfirmed ? 'hidden' : 'block'}">
                            <button
                                on:click={confirmDetails}
                                class="w-auto px-4 py-2  rounded-xl text-white transition-colors hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                                style="background-color: #C09A5B;"
                                disabled={paymentProcessing || clientSecretProcessing}
                            >
                                {#if paymentProcessing}
                                    <div class="flex items-center justify-center gap-2">
                                        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </div>
                                {:else}
                                <div class="flex items-center gap-2">
                                    Continue to Payment  
                                    {#if clientSecretProcessing}
                                        <svg class="mx-1.5 my-1.5 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        
                                    {:else}
                                        <ChevronRight size={30} class="mt-0.5" />
                                    {/if}
                                </div>
                                {/if}
                            </button>
                        </div>

                        
                    </div>
                </div>
                
                <!-- Right Sticky Column (50%) -->
                <div class="hidden md:sticky md:top-6 w-full max-w-xl md:max-w-none mx-auto md:mx-0 order-first md:order-none md:block">
                    <!-- Apartment Details Card -->
                    <Card loading={loading} error={error} apartmentNumber={number} apartmentDetails={apartmentDetails} totalPrice={totalPrice} priceBreakDown={priceBreakDown} nights={nights} />
                </div>
            </div>
        {/if}

        <!-- Footer -->
        <div class="text-center text-sm text-gray-300 mt-12 ">
            <div class="flex justify-center gap-4 mb-2">
                <a href="/privacy" target="_blank" class="hover:text-[#C09A5B]">Privacy</a>
                <a href="/terms" target="_blank" class="hover:text-[#C09A5B]">Terms</a>
            </div>
            <p>© 2025 Boardbeach Ltd | All rights reserved</p>
        </div>
    </div>
</div>

<style>
    
    @keyframes rotate-glow-reverse {
      from { transform: rotate(-360deg); }
      to { transform: rotate(0deg); }
    }
  
    .animate-rotate-glow-reverse {
      animation: rotate-glow-reverse 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
    }
  

  
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.04); opacity: 0.9; }
    }
  
    .animate-pulse {
      animation: pulse 2s ease-in-out infinite;
    }
  
    /* Keep original scrollbar styles */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-thumb { background-color: #C09A5B; border-radius: 4px; }
    ::-webkit-scrollbar-track { background-color: #c0995b7c; border-radius: 4px; }
  </style>