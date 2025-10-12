<script>
    import Navbar from "../Navbar.svelte"
    
    let activeSection = 'bookings'; // 'bookings', 'profile', 'settings'
    let activeBookingTab = 'upcoming'; // 'upcoming', 'past'
    
    // Mock data
    let upcomingBookings = [
        {
            id: 1,
            hotel: "Dublin City Centre",
            roomType: "Deluxe King Room",
            checkIn: "2024-12-15",
            checkOut: "2024-12-18",
            guests: 2,
            price: 420,
            status: "Confirmed",
            bookingRef: "BK-DUB-2024-001",
            image: "/api/placeholder/400/250"
        },
        {
            id: 2,
            hotel: "Dublin Tivoli",
            roomType: "Executive Suite",
            checkIn: "2024-12-22",
            checkOut: "2024-12-26",
            guests: 3,
            price: 680,
            status: "Confirmed",
            bookingRef: "BK-DUB-2024-002",
            image: "/api/placeholder/400/250"
        },
        {
            id: 3,
            hotel: "Dublin City Centre",
            roomType: "Premium Double",
            checkIn: "2025-01-05",
            checkOut: "2025-01-08",
            guests: 2,
            price: 320,
            status: "Pending Payment",
            bookingRef: "BK-DUB-2025-001",
            image: "/api/placeholder/400/250"
        }
    ];
    
    let pastBookings = [
        {
            id: 4,
            hotel: "Dublin City Centre",
            roomType: "Standard Queen Room",
            checkIn: "2024-08-10",
            checkOut: "2024-08-12",
            guests: 2,
            price: 280,
            status: "Completed",
            bookingRef: "BK-DUB-2024-015",
            image: "/api/placeholder/400/250",
            reviewSubmitted: true
        },
        {
            id: 5,
            hotel: "Dublin Tivoli",
            roomType: "Family Suite",
            checkIn: "2024-06-20",
            checkOut: "2024-06-25",
            guests: 4,
            price: 890,
            status: "Completed",
            bookingRef: "BK-DUB-2024-012",
            image: "/api/placeholder/400/250",
            reviewSubmitted: false
        },
        {
            id: 6,
            hotel: "Dublin City Centre",
            roomType: "Business Room",
            checkIn: "2024-04-15",
            checkOut: "2024-04-17",
            guests: 1,
            price: 220,
            status: "Completed",
            bookingRef: "BK-DUB-2024-008",
            image: "/api/placeholder/400/250",
            reviewSubmitted: true
        },
        {
            id: 7,
            hotel: "Dublin Tivoli",
            roomType: "Luxury Suite",
            checkIn: "2024-02-14",
            checkOut: "2024-02-16",
            guests: 2,
            price: 550,
            status: "Completed",
            bookingRef: "BK-DUB-2024-005",
            image: "/api/placeholder/400/250",
            reviewSubmitted: true
        }
    ];
    
    // User profile data
    let userProfile = {
        firstName: "Sultan",
        lastName: "Rasul",
        email: "sultanrasuls@gmail.com",
        phone: {
            dialingCode: "+353",
            number: "851234567"
        }
    };
    
    let accountSettings = {
        currency: "GBP",
        language: "English"
    };
    
    // Edit states
    let editingField = null;
    let tempValue = "";
    
    // Available options
    const dialingCodes = ["+1", "+44", "+353", "+61", "+64"];
    const currencies = ["GBP", "EUR", "USD", "CAD", "AUD"];
    const languages = ["English", "French", "German", "Spanish", "Italian"];
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    
    function calculateNights(checkIn, checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    function startEditing(field, currentValue) {
        editingField = field;
        tempValue = currentValue;
    }
    
    function cancelEditing() {
        editingField = null;
        tempValue = "";
    }
    
    function saveField(field) {
        if (field.startsWith('user.')) {
            const fieldName = field.split('.')[1];
            userProfile[fieldName] = tempValue;
        } else if (field.startsWith('phone.')) {
            const fieldName = field.split('.')[1];
            userProfile.phone[fieldName] = tempValue;
        } else if (field.startsWith('account.')) {
            const fieldName = field.split('.')[1];
            accountSettings[fieldName] = tempValue;
        }
        cancelEditing();
    }
</script>

<div class="min-h-screen bg-[#233441]">
    <div class="absolute w-full z-10">
        <Navbar />
    </div>
    
    <div class="pt-[100px] px-4 sm:px-8 pb-12 max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-4xl font-bold text-[#C09A5B] mb-2">Hello Globetrotter</h1>
            <p class="text-gray-400">Manage your bookings and account settings</p>
        </div>
        
        <div class="flex flex-col lg:flex-row gap-8">
            <!-- Sidebar Navigation -->
            <div class="lg:w-64 flex-shrink-0">
                <div class="bg-[#2a3f4d] rounded-xl p-6 border border-gray-700 sticky top-32">
                    <h2 class="text-xl font-semibold text-white mb-4">Bookings</h2>
                    <nav class="space-y-2">
                        <button
                            on:click={() => { 
                                activeSection = 'bookings';
                                activeBookingTab = 'upcoming';
                            }}
                            class="w-full text-left px-3 py-2 rounded-lg transition-all
                                {activeSection === 'bookings' 
                                    ? 'bg-[#C09A5B] text-white' 
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'}"
                        >
                            All upcoming and past bookings
                        </button>
                        
                        <button
                            on:click={() => activeSection = 'profile'}
                            class="w-full text-left px-3 py-2 rounded-lg transition-all
                                {activeSection === 'profile' 
                                    ? 'bg-[#C09A5B] text-white' 
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'}"
                        >
                            Profile
                        </button>
                        
                        <button
                            on:click={() => activeSection = 'settings'}
                            class="w-full text-left px-3 py-2 rounded-lg transition-all
                                {activeSection === 'settings' 
                                    ? 'bg-[#C09A5B] text-white' 
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'}"
                        >
                            View your account settings
                        </button>
                    </nav>
                    
                    <div class="mt-6 pt-6 border-t border-gray-700">
                        <button class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to My Account
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Main Content -->
            <div class="flex-1">
                <!-- Bookings Section -->
                {#if activeSection === 'bookings'}
                    <div>
                        <h2 class="text-2xl font-semibold text-white mb-6">My Bookings</h2>
                        
                        <!-- Booking Tabs -->
                        <div class="flex gap-4 mb-6 border-b border-gray-700">
                            <button
                                on:click={() => activeBookingTab = 'upcoming'}
                                class="px-4 py-2 font-medium transition-all relative
                                    {activeBookingTab === 'upcoming' 
                                        ? 'text-[#C09A5B] border-b-2 border-[#C09A5B]' 
                                        : 'text-gray-400 hover:text-white'}"
                            >
                                Upcoming
                                {#if upcomingBookings.length > 0}
                                    <span class="ml-2 px-2 py-0.5 text-xs bg-[#C09A5B] text-white rounded-full">
                                        {upcomingBookings.length}
                                    </span>
                                {/if}
                            </button>
                            
                            <button
                                on:click={() => activeBookingTab = 'past'}
                                class="px-4 py-2 font-medium transition-all relative
                                    {activeBookingTab === 'past' 
                                        ? 'text-[#C09A5B] border-b-2 border-[#C09A5B]' 
                                        : 'text-gray-400 hover:text-white'}"
                            >
                                Past
                                {#if pastBookings.length > 0}
                                    <span class="ml-2 px-2 py-0.5 text-xs bg-gray-600 text-white rounded-full">
                                        {pastBookings.length}
                                    </span>
                                {/if}
                            </button>
                        </div>
                        
                        <!-- Upcoming Bookings -->
                        {#if activeBookingTab === 'upcoming'}
                            {#if upcomingBookings.length === 0}
                                <div class="text-center py-16">
                                    <h3 class="text-2xl text-gray-400 mb-4">NO UPCOMING BOOKINGS</h3>
                                    <p class="text-gray-500 mb-2">No stays planned *</p>
                                    <p class="text-gray-400 mb-8">Or as we'd like to call this: a great opportunity for new adventure</p>
                                    <button class="px-8 py-3 bg-[#C09A5B] hover:bg-[#B08A4F] text-white font-semibold rounded-lg transition-all transform hover:scale-105">
                                        START NEW BOOKING
                                    </button>
                                    
                                    <!-- Hotel Locations -->
                                    <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                        <div class="bg-[#2a3f4d] rounded-xl p-6 border border-gray-700 text-center">
                                            <h4 class="text-lg font-semibold text-white mb-2">Dublin City Centre</h4>
                                            <p class="text-gray-400">IRELAND</p>
                                        </div>
                                        <div class="bg-[#2a3f4d] rounded-xl p-6 border border-gray-700 text-center">
                                            <h4 class="text-lg font-semibold text-white mb-2">Dublin Tivoli</h4>
                                            <p class="text-gray-400">IRELAND</p>
                                        </div>
                                    </div>
                                </div>
                            {:else}
                                <div class="space-y-6">
                                    {#each upcomingBookings as booking}
                                        <div class="bg-[#2a3f4d] rounded-xl overflow-hidden border border-gray-700 hover:border-[#C09A5B] transition-all">
                                            <div class="flex flex-col md:flex-row">
                                                <!-- Image -->
                                                <div class="md:w-1/3 h-48 md:h-auto bg-gray-700 bg-cover bg-center" style="background-image: url('{booking.image}')"></div>
                                                
                                                <!-- Content -->
                                                <div class="flex-1 p-6">
                                                    <div class="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 class="text-2xl font-semibold text-white mb-2">{booking.roomType}</h3>
                                                            <p class="text-[#C09A5B] font-medium mb-1">{booking.hotel}</p>
                                                            <p class="text-gray-400 text-sm">Booking Reference: <span class="text-[#C09A5B] font-mono">{booking.bookingRef}</span></p>
                                                        </div>
                                                        <span class="px-3 py-1 bg-green-900/40 text-green-400 text-sm rounded-full border border-green-700 flex items-center gap-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                    
                                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                                        <div>
                                                            <p class="text-gray-400 text-sm mb-1">Check-in</p>
                                                            <p class="text-white font-medium">{formatDate(booking.checkIn)}</p>
                                                        </div>
                                                        <div>
                                                            <p class="text-gray-400 text-sm mb-1">Check-out</p>
                                                            <p class="text-white font-medium">{formatDate(booking.checkOut)}</p>
                                                        </div>
                                                        <div>
                                                            <p class="text-gray-400 text-sm mb-1">Guests</p>
                                                            <p class="text-white font-medium">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                                                        </div>
                                                        <div>
                                                            <p class="text-gray-400 text-sm mb-1">Nights</p>
                                                            <p class="text-white font-medium">{calculateNights(booking.checkIn, booking.checkOut)}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                        <div>
                                                            <p class="text-gray-400 text-sm">Total Price</p>
                                                            <p class="text-3xl font-bold text-[#C09A5B]">€{booking.price}</p>
                                                        </div>
                                                        <div class="flex gap-3">
                                                            <button class="px-6 py-2.5 bg-[#C09A5B] hover:bg-[#B08A4F] text-white font-semibold rounded-lg transition-all transform hover:scale-105">
                                                                View Details
                                                            </button>
                                                            <button class="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all">
                                                                Modify Booking
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        {/if}
                        
                        <!-- Past Bookings -->
                        {#if activeBookingTab === 'past'}
                            {#if pastBookings.length === 0}
                                <div class="text-center py-16">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 class="text-xl text-gray-400 mb-2">No Past Bookings</h3>
                                    <p class="text-gray-500">Your previous stays will appear here</p>
                                </div>
                            {:else}
                                <div class="space-y-6">
                                    {#each pastBookings as booking}
                                        <div class="bg-[#2a3f4d] rounded-xl overflow-hidden border border-gray-700 hover:border-[#C09A5B] transition-all">
                                            <div class="flex flex-col md:flex-row">
                                                <!-- Image -->
                                                <div class="md:w-1/3 h-48 md:h-auto bg-gray-700 bg-cover bg-center" style="background-image: url('{booking.image}')"></div>
                                                
                                                <!-- Content -->
                                                <div class="flex-1 p-6">
                                                    <div class="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 class="text-2xl font-semibold text-white mb-2">{booking.roomType}</h3>
                                                            <p class="text-[#C09A5B] font-medium mb-1">{booking.hotel}</p>
                                                            <p class="text-gray-400 text-sm">Booking Reference: <span class="text-[#C09A5B] font-mono">{booking.bookingRef}</span></p>
                                                        </div>
                                                        <span class="px-3 py-1 bg-blue-900/40 text-blue-400 text-sm rounded-full border border-blue-700 flex items-center gap-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                    
                                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                                        <div>
                                                            <p class="text-gray-400 text-sm mb-1">Check-in</p>
                                                            <p class="text-white font-medium">{formatDate(booking.checkIn)}</p>
                                                        </div>
                                                        <div>
                                                            <p class="text-gray-400 text-sm mb-1">Check-out</p>
                                                            <p class="text-white font-medium">{formatDate(booking.checkOut)}</p>
                                                        </div>
                                                        <div>
                                                            <p class="text-gray-400 text-sm mb-1">Guests</p>
                                                            <p class="text-white font-medium">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                                                        </div>
                                                        <div>
                                                            <p class="text-gray-400 text-sm mb-1">Nights</p>
                                                            <p class="text-white font-medium">{calculateNights(booking.checkIn, booking.checkOut)}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                        <div>
                                                            <p class="text-gray-400 text-sm">Total Paid</p>
                                                            <p class="text-3xl font-bold text-[#C09A5B]">€{booking.price}</p>
                                                        </div>
                                                        <div class="flex gap-3">
                                                            {#if !booking.reviewSubmitted}
                                                                <button class="px-6 py-2.5 bg-[#C09A5B] hover:bg-[#B08A4F] text-white font-semibold rounded-lg transition-all transform hover:scale-105">
                                                                    Write Review
                                                                </button>
                                                            {:else}
                                                                <button class="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all">
                                                                    View Review
                                                                </button>
                                                            {/if}
                                                            <button class="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all">
                                                                Download Invoice
                                                            </button>
                                                            <button class="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all">
                                                                Book Again
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        {/if}
                    </div>
                {/if}
                
                <!-- Profile Section -->
                {#if activeSection === 'profile'}
                    <div class="max-w-2xl">
                        <h2 class="text-2xl font-semibold text-white mb-6">Personal details</h2>
                        
                        <div class="bg-[#2a3f4d] rounded-xl p-6 border border-gray-700 space-y-6">
                            <!-- First Name -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                <label class="text-gray-300 font-medium">First name</label>
                                <div class="md:col-span-2">
                                    {#if editingField === 'user.firstName'}
                                        <div class="space-y-2">
                                            <input
                                                type="text"
                                                bind:value={tempValue}
                                                class="w-full p-3 rounded bg-[#233441] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C09A5B] focus:border-transparent transition-all"
                                            />
                                            <p class="text-sm text-gray-400">Your legal first name as it appears on official documents</p>
                                            <div class="flex gap-2">
                                                <button 
                                                    on:click={() => saveField('user.firstName')}
                                                    class="px-4 py-2 bg-[#C09A5B] hover:bg-[#B08A4F] text-white text-sm rounded transition-all"
                                                >
                                                    Confirm
                                                </button>
                                                <button 
                                                    on:click={cancelEditing}
                                                    class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded transition-all"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    {:else}
                                        <div class="flex justify-between items-center">
                                            <span class="text-white">{userProfile.firstName}</span>
                                            <button 
                                                on:click={() => startEditing('user.firstName', userProfile.firstName)}
                                                class="text-[#C09A5B] underline hover:text-[#B08A4F] transition-colors text-sm"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                            
                            <!-- Last Name -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                <label class="text-gray-300 font-medium">Last name</label>
                                <div class="md:col-span-2">
                                    {#if editingField === 'user.lastName'}
                                        <div class="space-y-2">
                                            <input
                                                type="text"
                                                bind:value={tempValue}
                                                class="w-full p-3 rounded bg-[#233441] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C09A5B] focus:border-transparent transition-all"
                                            />
                                            <p class="text-sm text-gray-400">Your legal last name as it appears on official documents</p>
                                            <div class="flex gap-2">
                                                <button 
                                                    on:click={() => saveField('user.lastName')}
                                                    class="px-4 py-2 bg-[#C09A5B] hover:bg-[#B08A4F] text-white text-sm rounded transition-all"
                                                >
                                                    Confirm
                                                </button>
                                                <button 
                                                    on:click={cancelEditing}
                                                    class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded transition-all"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    {:else}
                                        <div class="flex justify-between items-center">
                                            <span class="text-white">{userProfile.lastName}</span>
                                            <button 
                                                on:click={() => startEditing('user.lastName', userProfile.lastName)}
                                                class="text-[#C09A5B] underline hover:text-[#B08A4F] transition-colors text-sm"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                            
                            <!-- Email -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                <label class="text-gray-300 font-medium">Email</label>
                                <div class="md:col-span-2">
                                    {#if editingField === 'user.email'}
                                        <div class="space-y-2">
                                            <input
                                                type="email"
                                                bind:value={tempValue}
                                                class="w-full p-3 rounded bg-[#233441] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C09A5B] focus:border-transparent transition-all"
                                            />
                                            <p class="text-sm text-gray-400">Your primary email address for booking confirmations and notifications</p>
                                            <div class="flex gap-2">
                                                <button 
                                                    on:click={() => saveField('user.email')}
                                                    class="px-4 py-2 bg-[#C09A5B] hover:bg-[#B08A4F] text-white text-sm rounded transition-all"
                                                >
                                                    Confirm
                                                </button>
                                                <button 
                                                    on:click={cancelEditing}
                                                    class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded transition-all"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    {:else}
                                        <div class="flex justify-between items-center">
                                            <span class="text-white">{userProfile.email}</span>
                                            <button 
                                                on:click={() => startEditing('user.email', userProfile.email)}
                                                class="text-[#C09A5B] underline hover:text-[#B08A4F] transition-colors text-sm"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                            
                            <!-- Phone Number -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                <label class="text-gray-300 font-medium">Phone number</label>
                                <div class="md:col-span-2">
                                    {#if editingField === 'phone'}
                                        <div class="space-y-2">
                                            <div class="flex gap-2">
                                                <select
                                                    bind:value={userProfile.phone.dialingCode}
                                                    class="flex-1 p-3 rounded bg-[#233441] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C09A5B] focus:border-transparent transition-all"
                                                >
                                                    <option value="">Please select</option>
                                                    {#each dialingCodes as code}
                                                        <option value={code}>{code}</option>
                                                    {/each}
                                                </select>
                                                <input
                                                    type="tel"
                                                    bind:value={userProfile.phone.number}
                                                    class="flex-2 p-3 rounded bg-[#233441] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C09A5B] focus:border-transparent transition-all"
                                                    placeholder="Phone number"
                                                />
                                            </div>
                                            <p class="text-sm text-gray-400">Your contact number for booking updates and emergency communications</p>
                                            <div class="flex gap-2">
                                                <button 
                                                    on:click={() => saveField('phone')}
                                                    class="px-4 py-2 bg-[#C09A5B] hover:bg-[#B08A4F] text-white text-sm rounded transition-all"
                                                >
                                                    Confirm
                                                </button>
                                                <button 
                                                    on:click={cancelEditing}
                                                    class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded transition-all"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    {:else}
                                        <div class="flex justify-between items-center">
                                            <span class="text-white">
                                                {#if userProfile.phone.dialingCode && userProfile.phone.number}
                                                    {userProfile.phone.dialingCode} {userProfile.phone.number}
                                                {:else}
                                                    Not set
                                                {/if}
                                            </span>
                                            <button 
                                                on:click={() => startEditing('phone', '')}
                                                class="text-[#C09A5B] underline hover:text-[#B08A4F] transition-colors text-sm"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
                
                <!-- Account Settings Section -->
                {#if activeSection === 'settings'}
                    <div class="max-w-2xl">
                        <h2 class="text-2xl font-semibold text-white mb-6">Account Settings</h2>
                        
                        <div class="bg-[#2a3f4d] rounded-xl p-6 border border-gray-700 space-y-6">
                            <!-- Currency -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                <label class="text-gray-300 font-medium">Currency</label>
                                <div class="md:col-span-2">
                                    {#if editingField === 'account.currency'}
                                        <div class="space-y-2">
                                            <select
                                                bind:value={tempValue}
                                                class="w-full p-3 rounded bg-[#233441] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C09A5B] focus:border-transparent transition-all"
                                            >
                                                {#each currencies as currency}
                                                    <option value={currency}>{currency}</option>
                                                {/each}
                                            </select>
                                            <p class="text-sm text-gray-400">Preferred currency for displaying prices and payments</p>
                                            <div class="flex gap-2">
                                                <button 
                                                    on:click={() => saveField('account.currency')}
                                                    class="px-4 py-2 bg-[#C09A5B] hover:bg-[#B08A4F] text-white text-sm rounded transition-all"
                                                >
                                                    Confirm
                                                </button>
                                                <button 
                                                    on:click={cancelEditing}
                                                    class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded transition-all"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    {:else}
                                        <div class="flex justify-between items-center">
                                            <span class="text-white">{accountSettings.currency}</span>
                                            <button 
                                                on:click={() => startEditing('account.currency', accountSettings.currency)}
                                                class="text-[#C09A5B] underline hover:text-[#B08A4F] transition-colors text-sm"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                            
                            <!-- Language -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                <label class="text-gray-300 font-medium">Language</label>
                                <div class="md:col-span-2">
                                    {#if editingField === 'account.language'}
                                        <div class="space-y-2">
                                            <select
                                                bind:value={tempValue}
                                                class="w-full p-3 rounded bg-[#233441] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C09A5B] focus:border-transparent transition-all"
                                            >
                                                {#each languages as language}
                                                    <option value={language}>{language}</option>
                                                {/each}
                                            </select>
                                            <p class="text-sm text-gray-400">Preferred language for the application interface</p>
                                            <div class="flex gap-2">
                                                <button 
                                                    on:click={() => saveField('account.language')}
                                                    class="px-4 py-2 bg-[#C09A5B] hover:bg-[#B08A4F] text-white text-sm rounded transition-all"
                                                >
                                                    Confirm
                                                </button>
                                                <button 
                                                    on:click={cancelEditing}
                                                    class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded transition-all"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    {:else}
                                        <div class="flex justify-between items-center">
                                            <span class="text-white">{accountSettings.language}</span>
                                            <button 
                                                on:click={() => startEditing('account.language', accountSettings.language)}
                                                class="text-[#C09A5B] underline hover:text-[#B08A4F] transition-colors text-sm"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                            
                            <!-- Action Buttons -->
                            <div class="flex gap-4 pt-4">
                                <button class="px-6 py-2.5 bg-[#C09A5B] hover:bg-[#B08A4F] text-white font-semibold rounded-lg transition-all">
                                    SAVE
                                </button>
                                <button class="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>