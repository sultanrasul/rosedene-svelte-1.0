<script>
    
    import { slide, fly } from 'svelte/transition';
    import BlurFade from '$lib/components/BlurFade.svelte';
    import InputSpotlightBorder from '$lib/components/InputSpotlightBorder.svelte';
    import { Send } from 'lucide-svelte';

    let name = '';
    let contact = '';
    let message = '';
    let disableButton = false;
    

    /**
	 * @param {{ preventDefault: () => void; }} event
	 */
    async function sendMessage(event) {
        disableButton = true;
        setTimeout(function() { disableButton = false}, 2500); 
        event.preventDefault();
        // Prepare the payload
        const messageData = { name, contact, message };

        try {
            const response = await fetch('https://contact.funkypanda.dev/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });

            if (response.ok) {
                // Message sent successfully
                triggerSuccess();
                // Clear the form
                name = '';
                contact = '';
                message = '';
            } else if (response.status === 429) {
                // Too many requests error
                trigger429();
            } else {
                // Other errors
                alert('Failed to send the message.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('An error occurred. Please try again.');
        }
    }

    // Function to trigger the success toast
    let openSuccess = false;
    let openError = false;

    function triggerSuccess() {
        openSuccess = true;
        setTimeout(() => { openSuccess = false; }, 2500); // Adjust timeout as needed
    }

    function trigger429() {
        openError = true;
        setTimeout(() => { openError = false; }, 2500); // Adjust timeout as needed
    }

   
</script>
<div class="max-w-2xl mx-auto p-4 bg-gray-500/80 rounded-xl border border-[#C09A5B]/20 shadow-2xl">
    <BlurFade>
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-[#C09A5B]">
            Contact Us
        </h2>
    </BlurFade>

    <BlurFade delay={0.25/2}>
        <p class="mb-8 lg:mb-12 font-light text-center text-gray-300 sm:text-xl">
            Have questions about your upcoming stay or need personalized assistance?<br>
            We're just a message away to make your experience unforgettable.
        </p>
    </BlurFade>

    <form class="space-y-6" on:submit={sendMessage} id="Contact">
        <BlurFade delay={0.50/2}>
            <div>
                <p class="block mb-3 text-[#C09A5B] font-medium">Name</p>
                <InputSpotlightBorder 
                    placeholder={"Your Name"} 
                    bind:value={name}
                    class="bg-gray-800/50 border-gray-700 hover:border-[#C09A5B]/40 focus:border-[#C09A5B] text-white"
                />
            </div>
        </BlurFade>
        
        <BlurFade delay={0.75/2}>
            <div>
                <p class="block mb-3 text-[#C09A5B] font-medium">Your Email</p>
                <InputSpotlightBorder 
                    placeholder={"email@address.com"} 
                    bind:value={contact}
                    class="bg-gray-800/50 border-gray-700 hover:border-[#C09A5B]/40 focus:border-[#C09A5B] text-white"
                />
            </div>
        </BlurFade>
        
        <BlurFade delay={1/2}>
            <div>
                <p class="block mb-3 text-[#C09A5B] font-medium">Message</p>
                <InputSpotlightBorder 
                    placeholder={"Leave a comment..."} 
                    bind:value={message} 
                    textArea
                    class="bg-gray-800/50 border-gray-700 hover:border-[#C09A5B]/40 focus:border-[#C09A5B] text-white h-32"
                />
            </div>
        </BlurFade>

        <BlurFade delay={1.25/2}>
            <div class="pt-4 flex justify-end">
                {#if disableButton}
                    <button 
                        class="w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold 
                                bg-[#C09A5B]/20 text-gray-400 cursor-not-allowed
                                transition-all duration-200"
                        disabled
                        type="submit"
                    >
                        Sending...
                    </button>
                {:else}
                    <button 
                        class="w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold 
                                bg-[#C09A5B] hover:bg-[#B08A4F] text-white 
                                shadow-lg hover:shadow-xl transition-all duration-200
                                flex items-center gap-2 justify-center"
                        type="submit"
                    >
                        <Send class="w-5 h-5"/>
                        <span>Send Message</span>
                    </button>
                {/if}
            </div>
        </BlurFade>
    </form>
</div>
