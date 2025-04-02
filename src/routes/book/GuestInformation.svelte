<script>
    export let name = "";
    export let phone = "";
    export let email = "";
    export let specialRequests = "";
    export let nameError = "";
    export let emailError = "";
    export let phoneError = "";

    export let readOnly = false
</script>

<div class="bg-white rounded-xl p-6">
    <h2 class="text-2xl font-bold mb-6" style="color: #233441">Guest information</h2>
    <div class="space-y-4">
        <div>
            <label class="block text-sm font-medium mb-2" style="color: #233441">Full name</label>
            <input
                type="text"
                disabled={readOnly}
                bind:value={name}
                on:input={() => nameError = ''}
                class="text-black font-light w-full p-3 border rounded focus:ring-2 focus:outline-none focus:border-[#C09A5B] focus:ring-[#C09A5B]"
                style="border-color: {nameError ? '#ff4444' : '#CFD7DF'};"
                placeholder="John Doe"
                required
            />
            {#if nameError}
                <p class="text-red-500 text-sm mt-1">{nameError}</p>
            {/if}
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-2" style="color: #233441">Email</label>
                <input
                    disabled={readOnly}
                    type="email"
                    bind:value={email}
                    on:input={() => emailError = ''}
                    class="text-black font-light w-full p-3 border rounded focus:ring-2 focus:outline-none focus:border-[#C09A5B] focus:ring-[#C09A5B]"
                    style="border-color: {emailError ? '#ff4444' : '#CFD7DF'};"
                    placeholder="john@example.com"
                    required
                />
                {#if emailError}
                    <p class="text-red-500 text-sm mt-1">{emailError}</p>
                {/if}
            </div>
            <div>
                <label class="block text-sm font-medium mb-2" style="color: #233441">Phone</label>
                <input
                    disabled={readOnly}
                    type="tel"
                    bind:value={phone}
                    on:input={() => phoneError = ''}
                    class="text-black font-light w-full p-3 border rounded focus:ring-2 focus:outline-none focus:border-[#C09A5B] focus:ring-[#C09A5B]"
                    style="border-color: {phoneError ? '#ff4444' : '#CFD7DF'};"
                    placeholder="+44 1234 567890"
                    required
                />
                {#if phoneError}
                    <p class="text-red-500 text-sm mt-1">{phoneError}</p>
                {/if}
            </div>
        </div>
        <div class="{readOnly && specialRequests == '' ? 'hidden' : 'block'}">
            <label class="block text-sm font-medium mb-2" style="color: #233441">Special Requests</label>
            <textarea 
                disabled={readOnly}
                bind:value={specialRequests}
                class="text-black font-light w-full p-3 border rounded focus:ring-2 focus:outline-none focus:border-[#C09A5B] focus:ring-[#C09A5B] h-32"
                style="border-color: #CFD7DF;"
                placeholder="Accessibility needs, crib requirements, etc.">
            </textarea>
        </div>
    </div>
</div>