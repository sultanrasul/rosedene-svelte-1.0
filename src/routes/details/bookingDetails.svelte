<script>
    // @ts-nocheck
    
    import { Check, X } from "lucide-svelte";
    import { apartments } from '../apartments';
    import Slideshow from "./Slideshow.svelte";

    
    
    export let bookingData = {};
    export let success = true;
    export let apartmentDetails;
    let nights;

    let apartmentNumber = bookingData.Apartment.match(/\d+/)?.[0];
    let images = apartmentDetails.amountOfPictures;
    
    function formatDate(dateStr) {
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }
    
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed
    };
    
    let startDate = parseDate(formatDate(bookingData?.DateFrom));
    let endDate = parseDate(formatDate(bookingData?.DateTo));
    
    nights = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

</script>

<div class="flex flex-col lg:flex-row items-stretch gap-2">
    <!-- Image Section - Wider on large screens -->
    <div class="h-full flex-1 md:flex-[3_1_0%] shadow-xl rounded-xl overflow-hidden md:h-auto relative">
        <!-- svelte-ignore a11y_img_redundant_alt -->
         <Slideshow apartmentNumber={apartmentNumber} images={images}/>
        <!-- <img src="/{apartmentNumber}/0.jpg" alt="Apartment photo" class="w-full h-full object-cover lg:h-full lg:min-h-full"/> -->
    </div>

    <!-- Card Section - Slightly narrower -->
    <div class="flex-1 lg:flex-[2_1_0%] bg-white rounded-xl shadow-xl pt-12 px-6 pb-6 relative lg:h-auto">
        <!-- Status Icon (slightly larger on desktop) -->

        <div class="z-[10] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div class={`flex items-center justify-center p-2 rounded-full shadow-2xl ${success ? 'bg-green-100' : 'bg-red-100'} animate-[pulse_1.5s_ease-out]`}>
                <div class={`w-16 h-16 flex items-center justify-center rounded-full ${success ? 'bg-green-500' : 'bg-red-500'} shadow-lg`}>
                    {#if success}
                        <Check class="w-8 h-8 lg:w-10 lg:h-10" color="white" />
                    {:else}
                        <X class="w-8 h-8 lg:w-10 lg:h-10" color="white" />
                    {/if}
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="space-y-3 mb-8">
            {#if success}
                <h1 class="text-center text-3xl lg:text-4xl font-bold text-green-600">Payment Successful!</h1>
                <p class="text-center text-gray-600 lg:text-lg">Your reservation is confirmed</p>
            {:else}
                <h1 class="text-center text-3xl lg:text-4xl font-bold text-red-600">Payment Failed</h1>
                <p class="text-center text-gray-600 lg:text-lg">Funds may take 5-10 business days to return</p>
            {/if}
        </div>

        <!-- Details Card -->
        <div class=" rounded-xl p-6 lg:p-8 space-y-8 border border-gray-200">
            <!-- Amount Section -->
            <div class="flex justify-between items-center pb-4 border-b border-gray-200">
                <span class="text-gray-600 font-medium lg:text-lg">Total Amount</span>
                <span class="text-2xl lg:text-3xl font-bold text-gray-800">£{bookingData?.ClientPrice}</span>
            </div>

            <!-- Details Grid -->
            <div class="space-y-4">
                <!-- Dynamic Rows -->
                {#if !success && bookingData?.errorCode}
                <div class="flex justify-between">
                    <span class="text-gray-600">Error Code</span>
                    <span class="text-gray-800 font-medium">{bookingData.errorCode}</span>
                </div>
                {/if}

                {#if success && bookingData?.ReservationID}
                <div class="flex justify-between">
                    <span class="text-gray-600">Reference Number</span>
                    <span class="text-gray-800 font-medium">{bookingData.ReservationID}</span>
                </div>
                {:else if bookingData?.error}
                <div class="flex justify-between">
                    <span class="text-gray-600">Error Message</span>
                    <span class="text-gray-800 text-right max-w-[60%]">{bookingData.error}</span>
                </div>
                {/if}

                <!-- Apartment Info -->
                {#if bookingData?.Apartment}
                <div class="flex justify-between">
                    <span class="text-gray-600">Apartment</span>
                    <span class="text-gray-800">{bookingData.Apartment}</span>
                </div>
                {/if}

                <!-- Customer Info -->
                {#if bookingData?.CustomerInfo}
                <div class="space-y-4 pt-4 border-t border-gray-200">
                    {#if bookingData.CustomerInfo?.Name}
                    <div class="flex justify-between">
                        <span class="text-gray-600">Guest Name</span>
                        <span class="text-gray-800">{bookingData.CustomerInfo.Name}</span>
                    </div>
                    {/if}

                    {#if bookingData.CustomerInfo?.Email}
                    <div class="flex justify-between">
                        <span class="text-gray-600">Email</span>
                        <span class="text-gray-800 break-all">{bookingData.CustomerInfo.Email}</span>
                    </div>
                    {/if}

                    {#if bookingData.CustomerInfo?.Phone}
                    <div class="flex justify-between">
                        <span class="text-gray-600">Phone</span>
                        <span class="text-gray-800">{bookingData.CustomerInfo.Phone}</span>
                    </div>
                    {/if}
                </div>
                {/if}

                <!-- Dates Section -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                    <!-- Check-in -->
                    <div class="space-y-1">
                        <span class="text-gray-600 block">Check-in</span>
                        <span class="text-gray-800 font-medium">{formatDate(bookingData.DateFrom)}</span>
                    </div>

                    <!-- Vertical Separator -->
                    <div class="h-8 w-px bg-gray-300 mx-4"></div>

                    <!-- Check-out -->
                    <div class="space-y-1">
                        <span class="text-gray-600 block">Check-out</span>
                        <span class="text-gray-800 font-medium">{formatDate(bookingData.DateTo)}</span>
                    </div>
                </div>

                <!-- Guest Details -->
                {#if bookingData?.GuestDetailsInfo}
                <div class="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div class="space-y-1 text-left">
                        <span class="text-gray-600 block">Adults</span>
                        <span class="text-gray-800 font-medium">{bookingData.GuestDetailsInfo.NumberOfAdults}</span>
                    </div>
                    <div class="space-y-1 text-center">
                        <span class="text-gray-600 block">Children</span>
                        <span class="text-gray-800 font-medium">{bookingData.GuestDetailsInfo.NumberOfChildren}</span>
                    </div>
                    <div class="space-y-1 text-right">
                        <span class="text-gray-600 block">Nights</span>
                        <span class="text-gray-800 font-medium">{nights}</span>
                    </div>
                </div>
                <div>
                    {#if parseInt(bookingData.GuestDetailsInfo?.NumberOfChildren, 10) > 0}
                    <div class="flex justify-between">
                        <span class="text-gray-600">Children Ages</span>
                        <span class="text-gray-800 break-all">{bookingData.GuestDetailsInfo.ChildrenAges.Age}</span>
                    </div>
                    {/if}
                </div>
                {/if}
            </div>
            
            <!-- Updated error message width -->
            {#if !success && bookingData?.error}
            <div class="flex justify-between">
                <span class="text-gray-600">Error Message</span>
                <span class="text-gray-800 text-right max-w-[70%] lg:max-w-[75%]">{bookingData.error}</span>
            </div>
            {/if}
        </div>
    </div>
</div>