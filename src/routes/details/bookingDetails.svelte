<script>
// @ts-nocheck

    import { Check, X } from "lucide-svelte";

    export let bookingData = {};

    export let success = true;


</script>

<div class="bg-white rounded-lg shadow-lg pt-10 pb-2 pl-2 pr-2 max-w-md w-full text-black sm:pr-10 sm:pl-10 sm:pb-10 relative">


    <!-- Check Mark, positioned half inside and half outside -->
    <div class="absolute top-[-30px] left-1/2 transform -translate-x-1/2">
        <div class={`flex items-center justify-center p-4 rounded-full shadow-2xl animate-[pulse_1.5s_ease-out] ${success ? 'bg-green-500/80' : 'bg-red-500/80'}`}>
            <div class={`w-[30px] h-[30px] flex items-center justify-center rounded-full ${success ? 'bg-green-500' : 'bg-red-500'}`}>
                {#if success}
                    <Check class="w-6 h-6" color="white" />
                {:else}
                    <X class="w-6 h-6" color="white" />
                {/if}
            </div>
        </div>
    </div>    

    <!-- Payment Success Text -->
    {#if success}
        <h1 class="text-center text-gray-800 text-2xl font-semibold">Payment Success!</h1>
        <p class="text-center text-gray-500 mt-2">Your Reservation has been complete</p>
        {:else}
            <h1 class="text-center text-gray-800 text-2xl font-semibold">Payment Unsuccessful!</h1>
            <p class="text-center text-gray-500 mt-2">It may take 5-10 business days for funds to settle.</p>

    {/if}

    <!-- Payment Details -->
    <div class="bg-gray-100 rounded-lg p-6 mt-6">
        <div class="grid grid-cols-2 gap-4 text-sm">
            <!-- Amount -->
            <div class="flex items-center col-span-2 w-full text-center justify-between">
                <div class="text-gray-500">Amount</div>
                <div class="text-right text-gray-800 font-medium text-lg">£{bookingData.price}</div>
            </div>

            <!-- Error Code if there is one -->
            {#if !success}
                <div class="flex items-center col-span-2 w-full text-center justify-between">
                    <div class="text-gray-500">Error Code</div>
                    <div class="text-right text-gray-800">{bookingData.errorCode}</div>
                </div>
            {/if}

            <!-- Ref Number OR Error -->
            <div class="flex items-center col-span-2 w-full text-center justify-between">
                {#if success}
                    <div class="text-gray-500">Ref Number</div>
                    <div class="text-right text-gray-800">{bookingData.booking_reference}</div>
                    {:else}  
                        <div class="text-gray-500">Error</div>
                        <div class="text-right text-gray-800 w-3/4">{bookingData.error}</div>

                        {/if}
                    </div>
                    

            <!-- Apartment -->
            <div class="flex items-center col-span-2 w-full text-center justify-between">
                <div class="text-gray-500">Apartment</div>
                <div class="text-right text-gray-800">{bookingData.apartment_name}</div>
            </div>

            <!-- Name -->
            <div class="flex items-center col-span-2 w-full text-center justify-between">
                <div class="text-gray-500">Name</div>
                <div class="text-right text-gray-800">{bookingData.name}</div>
            </div>

            <!-- Email -->
            <div class="flex items-center col-span-2 w-full text-center justify-between">
                <div class="text-gray-500">Email</div>
                <div class="text-right text-gray-800">{bookingData.email}</div>
            </div>

            <!-- Phone Number -->
            <div class="flex items-center col-span-2 w-full text-center justify-between">
                <div class="text-gray-500">Phone Number</div>
                <div class="text-right text-gray-800">{bookingData.phone_number}</div>
            </div>

            <hr class="h-px my-2 bg-gray-300 border-0 col-span-2">

            <!-- Check-in and Check-out -->
            <div class="flex items-center space-x-3 col-span-2 w-full text-center justify-between">
                <div class="flex items-left space-x-2">
                    <div class="text-gray-500">Check-in</div>
                    <div class="text-left text-gray-800">{bookingData.date_from}</div>
                </div>
                
                <hr class="h-full w-px bg-gray-300 border-0">
                
                <div class="flex items-right space-x-2">
                    <div class="text-gray-500">Check-out</div>
                    <div class="text-right text-gray-800">{bookingData.date_to}</div>
                </div>
            </div>

            <!-- Adults, Children, Nights -->
            <div class="flex items-center space-x-4 col-span-2 w-full text-center justify-between">
                <div class="flex items-center space-x-4 text-left">
                    <div class="text-gray-500">Adults</div>
                    <div class="text-gray-800">{bookingData.adults}</div>
                </div>
            
                <hr class="h-full w-px bg-gray-300 border-0">
            
                <div class="flex items-center space-x-4 text-center">
                    <div class="text-gray-500">Children</div>
                    <div class="text-gray-800">{bookingData.children}</div>
                </div>
            
                <hr class="h-full w-px bg-gray-300 border-0">
                
                <div class="flex items-center space-x-4 text-right">
                    <div class="text-gray-500">Nights</div>
                    <div class="text-gray-800">{bookingData.nights}</div>
                </div>
            </div>

            <!-- Children Ages -->
            {#if parseInt(bookingData.children,10) > 0}
                <div class="text-gray-500">Children Ages</div>
                <div class="text-right text-gray-800">{bookingData.children_ages}</div>      
            {/if}
        </div>
    </div>
</div>