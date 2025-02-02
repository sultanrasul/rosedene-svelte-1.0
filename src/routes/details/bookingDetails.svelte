<script>
    // @ts-nocheck
    
    import { Check, X } from "lucide-svelte";
    
    export let bookingData = {};
    export let success = true;
    let nights;
    
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
    
    <div class="bg-white rounded-lg shadow-lg pt-10 pb-2 pl-2 pr-2 max-w-md w-full text-black sm:pr-10 sm:pl-10 sm:pb-10 relative">
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
    
        {#if success}
            <h1 class="text-center text-gray-800 text-2xl font-semibold">Payment Success!</h1>
            <p class="text-center text-gray-500 mt-2">Your reservation has been completed.</p>
        {:else}
            <h1 class="text-center text-gray-800 text-2xl font-semibold">Payment Unsuccessful!</h1>
            <p class="text-center text-gray-500 mt-2">It may take 5-10 business days for funds to settle.</p>
        {/if}
    
        <div class="bg-gray-100 rounded-lg p-6 mt-6">
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="flex items-center col-span-2 w-full text-center justify-between">
                    <div class="text-gray-500">Amount</div>
                    <div class="text-right text-gray-800 font-medium text-lg">£{bookingData?.ClientPrice}</div>
                </div>
    
                {#if !success && bookingData?.errorCode}
                    <div class="flex items-center col-span-2 w-full text-center justify-between">
                        <div class="text-gray-500">Error Code</div>
                        <div class="text-right text-gray-800">{bookingData.errorCode}</div>
                    </div>
                {/if}
    
                <div class="flex items-center col-span-2 w-full text-center justify-between">
                    {#if success}
                        <div class="text-gray-500">Ref Number</div>
                        <div class="text-right text-gray-800">{bookingData?.ReservationID}</div>
                    {:else}
                        {#if bookingData?.error}
                            <div class="text-gray-500">Error</div>
                            <div class="text-right text-gray-800 w-3/4">{bookingData.error}</div>
                        {/if}
                    {/if}
                </div>
    
                {#if bookingData?.Apartment}
                    <div class="flex items-center col-span-2 w-full text-center justify-between">
                        <div class="text-gray-500">Apartment</div>
                        <div class="text-right text-gray-800">{bookingData.Apartment}</div>
                    </div>
                {/if}
    
                {#if bookingData?.CustomerInfo}
                    {#if bookingData.CustomerInfo?.Name}
                        <div class="flex items-center col-span-2 w-full text-center justify-between">
                            <div class="text-gray-500">Name</div>
                            <div class="text-right text-gray-800">{bookingData.CustomerInfo.Name}</div>
                        </div>
                    {/if}
    
                    {#if bookingData.CustomerInfo?.Email}
                        <div class="flex items-center col-span-2 w-full text-center justify-between">
                            <div class="text-gray-500">Email</div>
                            <div class="text-right text-gray-800">{bookingData.CustomerInfo.Email}</div>
                        </div>
                    {/if}
    
                    {#if bookingData.CustomerInfo?.Phone}
                        <div class="flex items-center col-span-2 w-full text-center justify-between">
                            <div class="text-gray-500">Phone Number</div>
                            <div class="text-right text-gray-800">{bookingData.CustomerInfo.Phone}</div>
                        </div>
                    {/if}
                {/if}
    
                <hr class="h-px my-2 bg-gray-300 border-0 col-span-2">
    
                <div class="flex items-center space-x-2 col-span-2 w-full text-center justify-between">
                    {#if bookingData?.DateFrom}
                        <div class="flex items-left space-x-1">
                            <div class="text-gray-500">Check-in</div>
                            <div class="text-left text-gray-800">{formatDate(bookingData.DateFrom)}</div>
                        </div>
                    {/if}
    
                    {#if bookingData?.DateTo}
                        <hr class="h-full w-px bg-gray-300 border-0">
                        <div class="flex items-right space-x-1">
                            <div class="text-gray-500">Check-out</div>
                            <div class="text-right text-gray-800">{formatDate(bookingData.DateTo)}</div>
                        </div>
                    {/if}
                </div>
    
                {#if bookingData?.GuestDetailsInfo}
                    <div class="flex items-center space-x-4 col-span-2 w-full text-center justify-between">
                        {#if bookingData.GuestDetailsInfo?.NumberOfAdults}
                            <div class="flex items-center space-x-4 text-left">
                                <div class="text-gray-500">Adults</div>
                                <div class="text-gray-800">{bookingData.GuestDetailsInfo.NumberOfAdults}</div>
                            </div>
                        {/if}
    
                        {#if bookingData.GuestDetailsInfo?.NumberOfChildren}
                            <hr class="h-full w-px bg-gray-300 border-0">
                            <div class="flex items-center space-x-4 text-center">
                                <div class="text-gray-500">Children</div>
                                <div class="text-gray-800">{bookingData.GuestDetailsInfo.NumberOfChildren}</div>
                            </div>
                        {/if}
    
                        <hr class="h-full w-px bg-gray-300 border-0">
                        <div class="flex items-center space-x-4 text-right">
                            <div class="text-gray-500">Nights</div>
                            <div class="text-gray-800">{nights}</div>
                        </div>
                    </div>
                {/if}
                {#if parseInt(bookingData.GuestDetailsInfo?.NumberOfChildren, 10) > 0}
                    <div class="text-gray-500">Children Ages</div>
                    <div class="text-right text-gray-800">{bookingData.GuestDetailsInfo.ChildrenAges.Age}</div>
                {/if}
            </div>
        </div>
    </div>
    