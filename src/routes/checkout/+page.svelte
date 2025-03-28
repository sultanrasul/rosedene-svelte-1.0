<script>
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
import Navbar from "../Navbar.svelte";
import Card from "./Card.svelte";

    let checkInDate = '2025-06-09';
    let checkOutDate = '2025-06-15';
    let guests = 1;
    let fullName = '';
    let email = '';
    let phone = '';
    let cardNumber = '';
    let expiry = '';
    let cvc = '';
    
    const handlePayment = () => {
        // Handle payment logic
    };
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
        
        <div class="flex flex-wrap gap-10 justify-between">
            <!-- Left Column (50%) -->
            <div class="md:w-[60%] w-full space-y-6 bg-white rounded-xl ">

                <!-- Guest Details Section -->
                <div class="bg-white rounded-xl p-6">
                    <h2 class="text-2xl font-bold mb-6" style="color: #233441">Your Trip</h2>
                    
                    <!-- Trip Summary -->
                    <div class="p-5 bg-[#233441]/5 rounded-lg space-y-4">
                        <!-- Dates -->
                        <div class="grid grid-cols-2 gap-4">
                            <div class="flex items-center gap-4">
                                <div class="p-3 bg-white rounded-lg shadow-md">
                                    <svg class="w-6 h-6 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Check-in</p>
                                    <p class="text-base font-medium" style="color: #233441">9 Jun 2025</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="p-3 bg-white rounded-lg shadow-md">
                                    <svg class="w-6 h-6 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Check-out</p>
                                    <p class="text-base font-medium" style="color: #233441">15 Jun 2025</p>
                                </div>
                            </div>
                        </div>

                        <!-- Divider -->
                        <div class="border-t-2 border-solid border-gray-200"></div>

                        <!-- Guests -->
                        <div class="flex items-center gap-4">
                            <div class="p-3 bg-white rounded-lg shadow-md">
                                <svg class="w-6 h-6 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                                    <circle cx="9" cy="7" r="4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/>
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Guests</p>
                                <p class="text-base font-medium space-x-2" style="color: #233441">
                                    <span>1 Adult</span>
                                    <span>•</span>
                                    <span>2 Children</span>
                                    <span>•</span>
                                    <span>1 Infant</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6">

                <!-- Guest Information -->
                <div class="bg-white rounded-xl p-6">
                    <h2 class="text-2xl font-bold mb-6" style="color: #233441">Guest information</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-2" style="color: #233441">Full name</label>
                            <input
                                type="text"
                                bind:value={fullName}
                                class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2" style="color: #233441">Email</label>
                                <input
                                    type="email"
                                    bind:value={email}
                                    class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2" style="color: #233441">Phone</label>
                                <input
                                    type="tel"
                                    bind:value={phone}
                                    class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                                    placeholder="+44 1234 567890"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2" style="color: #233441">Special Requests</label>
                            <textarea 
                                class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none h-32"
                                placeholder="Accessibility needs, crib requirements, etc."></textarea>
                        </div>
                    </div>
                </div>

                <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6">

                <!-- Payment Card -->
                <div class="bg-white rounded-xl  p-6">
                    <h2 class="text-2xl font-bold mb-6" style="color: #233441">Payment details</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-2" style="color: #233441">Card number</label>
                            <input
                                type="text"
                                bind:value={cardNumber}
                                class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                                placeholder="•••• •••• •••• ••••"
                            />
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2" style="color: #233441">Expiry</label>
                                <input
                                    type="text"
                                    bind:value={expiry}
                                    class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2" style="color: #233441">CVC</label>
                                <input
                                    type="text"
                                    bind:value={cvc}
                                    class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                                    placeholder="•••"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6">

                <!-- Cancellation Policy -->
                <div class="bg-white rounded-xl  p-6">
                    <h3 class="font-semibold mb-2" style="color: #233441">Cancellation policy</h3>
                    <p class="text-sm text-gray-600">
                        Free cancellation before 10 May. Cancel before 2 Jun for a partial refund.
                        <a href="#" class="underline" style="color: #C09A5B">Learn more</a>
                    </p>
                </div>

                <hr class="h-px my-8 bg-[#C09A5B] border-0 mx-6">

                <!-- Confirm Button - Now at bottom of left column -->
                <div class="bg-white rounded-xl  p-6">
                    <button
                        on:click={handlePayment}
                        class="w-full py-4 rounded-xl font-bold text-white transition-colors hover:"
                        style="background-color: #C09A5B; hover:bg-#b08a4f"
                    >
                        Confirm and pay
                    </button>
                    
                    <div class="mt-4 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#C09A5B">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                        </svg>
                        <span class="text-sm" style="color: #233441">Secure payment</span>
                    </div>
                </div>
            </div>
            
            <!-- Right Sticky Column (50%) -->
            <div class="md:w-[36%] w-full order-first md:order-none sticky md:top-6 z-10 sticky self-start">
                <!-- Apartment Details Card -->
                <Card apartmentName="Emperor Apartment 1" apartmentNumber=1 price={569} nights={2}/>
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