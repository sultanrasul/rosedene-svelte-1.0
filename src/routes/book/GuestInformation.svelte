<script>
  import { BACKEND_URL } from "../conf";

    export let name = "";
    export let phone = "";
    export let email = "";
    export let specialRequests = "";
    export let nameError = "";
    export let emailError = "";
    export let phoneError = "";
    export let guestInformationConfirmed = false;
    export let clientSecret = "";
    export let showEditButton = true;

    let originalName = "";
    let originalPhone = "";
    let originalEmail = "";
    let originalSpecialRequests = "";
    let editMode = false;
    let error;
    let updateDetailsProcessing = false


    function scrollToElementWithOffset(id) {
        const element = document.getElementById(id);
        const yOffset = -100; // Adjust this value as needed
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    }

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

    async function updateDetails(){
        if (originalName === name && originalPhone === phone && originalEmail === email && originalSpecialRequests === specialRequests){
            editMode = false;
            return;
        }

        if (!validateForm()) {
            scrollToElementWithOffset("guestInformation");
            return false;
        }

        updateDetailsProcessing = true;
        try {
            //fetch client secret
            const response = await fetch(`${BACKEND_URL}/update-guest-info`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    client_secret: clientSecret,

                    name: name,
                    email: email,
                    phone: phone,
                    special_requests: specialRequests,
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
            editMode = false;

        } catch (err) {
        // @ts-ignore
            console.error('Payment error:', err);
        } finally {
            updateDetailsProcessing = false;
        }
    }

    function handleEdit() {
        originalName = name;
        originalPhone = phone;
        originalEmail = email;
        originalSpecialRequests = specialRequests;
        editMode = true;
    }

    function handleConfirm() {
        

        editMode = false;

    }

    function handleCancel() {
        name =  originalName;
        phone = originalPhone;
        email = originalEmail;
        specialRequests = originalSpecialRequests;
        editMode = false;
    }
</script>


<div class="bg-white rounded-xl p-6">
    <div class="flex justify-between items-start mb-6">
        <h2 class="text-2xl font-bold" style="color: #233441">Guest information</h2>
        {#if guestInformationConfirmed && !editMode}
            <button
                on:click={handleEdit}
                class="{showEditButton ? 'block' : 'hidden'} flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#C09A5B] bg-[#C09A5B]/10 border border-[#C09A5B] rounded-lg hover:bg-[#C09A5B]/20 transition-colors"
                type="button"
                
            >
                Edit
            </button>
        {/if}
    </div>
    
    <div class="space-y-4">
        <div>
            <label class="block text-sm font-medium mb-2 {guestInformationConfirmed && !editMode ? 'text-gray-500' : 'text-[#233441]'}">Full name</label>
            <input
                type="text"
                disabled={guestInformationConfirmed && !editMode}

                bind:value={name}

                on:input={() => nameError = ''}
                class="w-full p-3 border rounded focus:ring-[3px] focus:outline-none font-light text-black {nameError ? 'border-red-400 focus:border-[#ff4444] focus:ring-[#ff4444]/25' : (guestInformationConfirmed && !editMode ? 'bg-gray-100 border-gray-300 text-gray-500' : 'border-[#CFD7DF] focus:border-[#C09A5B] focus:ring-[#C09A5B]/25 text-black')}"
                placeholder="John Doe"
                required
            />
            {#if nameError}
                <p class="text-red-500 text-sm mt-1">{nameError}</p>
            {/if}
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-2 {guestInformationConfirmed && !editMode ? 'text-gray-500' : 'text-[#233441]'}">Email</label>
                <input
                    disabled={guestInformationConfirmed && !editMode}
                    type="email"
                    bind:value={email}
                    on:input={() => emailError = ''}
                    class="w-full p-3 border rounded focus:ring-[3px] focus:outline-none font-light text-black {emailError ? 'border-red-400 focus:border-[#ff4444] focus:ring-[#ff4444]/25' : (guestInformationConfirmed && !editMode ? 'bg-gray-100 border-gray-300 text-gray-500' : 'border-[#CFD7DF] focus:border-[#C09A5B] focus:ring-[#C09A5B]/25 text-black')}"
                    placeholder="john@example.com"
                    required
                />
                {#if emailError}
                    <p class="text-red-500 text-sm mt-1">{emailError}</p>
                {/if}
            </div>
            <div>
                <label class="block text-sm font-medium mb-2 {guestInformationConfirmed && !editMode ? 'text-gray-500' : 'text-[#233441]'}">Phone</label>
                <input
                    disabled={guestInformationConfirmed && !editMode}
                    type="tel"
                    bind:value={phone}
                    on:input={() => phoneError = ''}
                    class="w-full p-3 border rounded focus:ring-[3px] focus:outline-none font-light text-black {phoneError ? 'border-red-400 focus:border-[#ff4444] focus:ring-[#ff4444]/25' : (guestInformationConfirmed && !editMode ? 'bg-gray-100 border-gray-300 text-gray-500' : 'border-[#CFD7DF] focus:border-[#C09A5B] focus:ring-[#C09A5B]/25 text-black')}"
                    placeholder="+44 1234 567890"
                    required
                />
                {#if phoneError}
                    <p class="text-red-500 text-sm mt-1">{phoneError}</p>
                {/if}
            </div>
        </div>
        
        <div class="{guestInformationConfirmed && !editMode && specialRequests == '' ? 'hidden' : 'block'}">
            <label class="block text-sm font-medium mb-2 {guestInformationConfirmed && !editMode ? 'text-gray-500' : 'text-[#233441]'}">Special Requests</label>
            <textarea 
                disabled={guestInformationConfirmed && !editMode}
                bind:value={specialRequests}
                class="w-full p-3 border rounded focus:ring-[3px] focus:outline-none font-light text-black {guestInformationConfirmed && !editMode ? 'bg-gray-100 border-gray-300 text-gray-500' : 'border-[#CFD7DF] focus:border-[#C09A5B] focus:ring-[#C09A5B]/25 text-black'}"
                placeholder="Accessibility needs, crib requirements, etc."
            ></textarea>
        </div>
    </div>
    

    {#if editMode}
        <div class="mt-6 flex justify-end gap-4">
            <button
                on:click|preventDefault={handleCancel}
                class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                type="button"
            >
                Cancel
            </button>
            <button
                on:click|preventDefault={updateDetails}
                class="px-4 py-2 bg-[#C09A5B] text-white rounded-lg hover:opacity-90 font-medium"
                type="button"
                disabled={updateDetailsProcessing}
            >
            {#if updateDetailsProcessing}
            <div class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
            </div>
        {:else}
            Confirm Details
        {/if}
            </button>
        </div>
    {/if}
</div>