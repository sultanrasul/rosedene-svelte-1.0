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
    import { BACKEND_URL } from "../conf";
    import {loadStripe} from '@stripe/stripe-js'
    import { Check, User, UserRoundIcon } from "lucide-svelte";
    import { redirect } from "@sveltejs/kit";
    import { Toaster, toast } from 'svelte-sonner'
  import GuestInformation from "./GuestInformation.svelte";
  import TripInformation from "./TripInformation.svelte";

    // Initialize variables
    // @ts-ignore
    let name = '';
    let email = '';
    let phone = '';
    // @ts-ignore
    // @ts-ignore
    let cardNumber = '';
    // @ts-ignore
    // @ts-ignore
    let expiry = '';
    // @ts-ignore
    // @ts-ignore
    let cvc = '';
    let specialRequests = '';
    let bookingReference;
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
    
    const url = $page.url;
    const number = url.searchParams.get('number');
    const check_in = url.searchParams.get('check_in');
    const check_out = url.searchParams.get('check_out');
    // @ts-ignore
    const apartmentDetails = apartments[number];
    let adults = parseInt(url.searchParams.get('adults'),10) || 1;
    // @ts-ignore
    // @ts-ignore
    let nights = Math.floor((parseDate(check_out) - parseDate(check_in)) / (1000 * 60 * 60 * 24));
    let children = parseInt(url.searchParams.get('children'),10) || 0;
    let childrenAges = children ? url.searchParams.getAll('ages').map(Number) : []; // Convert ages to an array of numbers
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
    let isProcessing = false;

    // @ts-ignore
    const formatDateDMY = (dateString) =>
        dateString && format(new Date(dateString), dateFormatDMY) || '';
  
    let dateFrom = {
      day: parseInt(formatDateDMY(startDate).split('/')[0]),
      month: parseInt(formatDateDMY(startDate).split('/')[1]),
      year: parseInt(formatDateDMY(startDate).split('/')[2])
    };
  
    let dateTo = {
      day: parseInt(formatDateDMY(endDate).split('/')[0]),
      month: parseInt(formatDateDMY(endDate).split('/')[1]),
      year: parseInt(formatDateDMY(endDate).split('/')[2])
    };

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
    let loading = true;
    // @ts-ignore
    let error = null;
    let paymentIntent;
    /**
   * @type {number}
   */
    let displayPrice;

    onMount(async () => {
        try {
            // Initialize Stripe FIRST
            stripe = await loadStripe('pk_test_51QkSqLAQmfY2PDog1Sd4LCK6Y85GYEdbOP1CeVQ2iw7P9KJ362fbf4PzLq2cEJ4OYJSqrSSN7DI52SmStGCVS8Qa00C9oDsRb0');
            // THEN fetch client secret
            const response = await fetch(`${BACKEND_URL}/create-checkout`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                date_from: dateFrom,
                date_to: dateTo,
                property_id: apartmentDetails.id,
                adults: adults,
                children: children,
                childrenAges: childrenAges,
                url: window.location.href
                }),
            });

            if (!response.ok) throw new Error('Failed to create payment intent');
            
            const data = await response.json();
            clientSecret = data.clientSecret;
            // @ts-ignore
            paymentIntent  = await stripe.retrievePaymentIntent(clientSecret);

            console.log("Payment Intent: ",paymentIntent)

            // Now you can access the amount
            console.log('Amount:', paymentIntent.paymentIntent?.amount);
            console.log('Currency:', paymentIntent.paymentIntent?.currency);
            
            // @ts-ignore
            displayPrice = paymentIntent.paymentIntent?.amount / 100;
            console.log('Formatted amount:', `£${displayPrice.toFixed(2)}`);
            
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

        } catch (err) {
        // @ts-ignore
        error = err.message;
        console.error('Payment error:', err);
        } finally {
        loading = false;
        }
    });

    async function handlePayment() {
        // Reset errors
        nameError = emailError = phoneError = '';
        
        // Validate form
        if (!validateForm()) {
            scrollToElementWithOffset("guestInformation");
            return;
        }

        isProcessing = true;
        
        try {
            const { paymentIntent, error } = await stripe.confirmPayment({
                redirect: "if_required",
                elements,
                confirmParams: {
                    payment_method_data: {
                        billing_details: {
                            name: name,
                            email: email,
                            phone: phone,
                        },
                    },
                },
            });

            if (error) {
                // toast.error(error.message);
                // alert("Payment error: " + error.message);
                return;
            }

            // Send to backend for processing
            const response = await fetch(`${BACKEND_URL}/success`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paymentIntentId: paymentIntent.id,
                    specialRequests,
                    customerInfo: { name, email, phone }
                })
            });

            if (!response.ok) throw new Error('Failed to confirm booking');
            
            const data = await response.json();
            bookingReference = data["booking_reference"]

            // Optional: Redirect to success page
            // throw redirect(303, '/booking-success');

        } catch (err) {
            alert(err.message);
        } finally {
            isProcessing = false;
        }
    }

    function scrollToElementWithOffset(id) {
        const element = document.getElementById(id);
        const yOffset = -100; // Adjust this value as needed
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  </script>

<div class="bg-[#233441]">
    <Navbar/>
</div>
<div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style="background-color: #233441">
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
        
        <div class="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 items-start">
            <!-- Left Column (50%) -->
            <div class="space-y-6 bg-white rounded-xl relative overflow-visible">
                
                {#if bookingReference}
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
                {:else if error}
                    <div class="text-red-500 p-6">Error: {error}</div>                
                {/if}
                <div class="{!loading & !error ? 'block' : 'hidden'}">
    
                    <!-- Guest Details Section -->
                    <div class="bg-white rounded-xl p-6">
                        <h2 class="text-2xl font-bold mb-6" style="color: #233441">Your Trip</h2>
                        
                        <!-- Trip Summary -->
                        <TripInformation bookingReference={bookingReference} startDate={startDate} endDate={endDate} adults={adults} children={children} childrenAges={childrenAges}/>
                    
                    </div>
    
                    <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6" id="guestInformation">
    
                    <!-- Guest Information -->
                    <GuestInformation readOnly={bookingReference ? true : false} bind:specialRequests={specialRequests} bind:name={name} bind:nameError={nameError} bind:phone={phone} bind:phoneError={phoneError} bind:email={email} bind:emailError={emailError} />
    
                    
                    <!-- Payment Card -->
                    <div class="{!bookingReference ? 'block' : 'hidden'}">
                        <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6">

                        <div class="bg-white rounded-xl  p-6">
                            <h2 class="text-2xl font-bold mb-6" style="color: #233441">Payment details</h2>
                            <div id="payment-element" class="payment-form"></div>
                        </div>
        
                        <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6">
        
                        <!-- Cancellation Policy -->
                        <div class="bg-white rounded-xl  p-6">
                            <h3 class="font-semibold mb-2" style="color: #233441">Cancellation policy</h3>
                            <p class="text-sm text-gray-600">
                                Free cancellation before  May. Cancel before 2 Jun for a partial refund.
                                <a href="#" class="underline" style="color: #C09A5B">Learn more</a>
                            </p>
                        </div>
        
                        <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6">
        
                        <!-- Confirm Button - Now at bottom of left column -->
                        <div class="bg-white rounded-xl  p-6">
                            <!-- Update the Confirm Button -->
                            <button
                                on:click={handlePayment}
                                class="w-full py-4 rounded-xl font-bold text-white transition-colors hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                                style="background-color: #C09A5B;"
                                disabled={isProcessing}
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
                    
                </div>
            </div>
            
            <!-- Right Sticky Column (50%) -->
            <div class="md:sticky md:top-6 w-full max-w-xl md:max-w-none mx-auto md:mx-0 order-first md:order-none">
                <!-- Apartment Details Card -->
                <Card loading={loading} error={error} apartmentNumber={number} apartmentDetails={apartmentDetails} price={displayPrice} nights={nights} />
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