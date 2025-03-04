<script>
    
    import { Section, Contact } from 'flowbite-svelte-blocks';
    import { Toast, Label, Input, Textarea, Button } from 'flowbite-svelte';
    import { slide, fly } from 'svelte/transition';
    import { PaperPlaneOutline, CheckCircleSolid,ExclamationCircleSolid   } from 'flowbite-svelte-icons';
    import BlurFade from '$lib/components/BlurFade.svelte';
    import InputSpotlightBorder from '$lib/components/InputSpotlightBorder.svelte';

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
      <!-- #28FFF8 -->


    
    <Section sectionClass="" name="contact">
        <Contact>
            <div class="max-w-2xl mx-auto p-4 bg-gray-500/50 rounded-xl border border-[#C09A5B]/20 shadow-2xl">
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
                            <Label for="name" class="block mb-3 text-[#C09A5B] font-medium">Name</Label>
                            <InputSpotlightBorder 
                                placeholder={"Your Name"} 
                                bind:value={name}
                                class="bg-gray-800/50 border-gray-700 hover:border-[#C09A5B]/40 focus:border-[#C09A5B] text-white"
                            />
                        </div>
                    </BlurFade>
                    
                    <BlurFade delay={0.75/2}>
                        <div>
                            <Label for="email" class="block mb-3 text-[#C09A5B] font-medium">Your Email</Label>
                            <InputSpotlightBorder 
                                placeholder={"email@address.com"} 
                                bind:value={contact}
                                class="bg-gray-800/50 border-gray-700 hover:border-[#C09A5B]/40 focus:border-[#C09A5B] text-white"
                            />
                        </div>
                    </BlurFade>
                    
                    <BlurFade delay={1/2}>
                        <div>
                            <Label for="message" class="block mb-3 text-[#C09A5B] font-medium">Message</Label>
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
                                    <PaperPlaneOutline class="w-5 h-5"/>
                                    <span>Send Message</span>
                                </button>
                            {/if}
                        </div>
                    </BlurFade>
                </form>
            </div>
        </Contact>
    </Section>

<!-- Success Toast -->
<div class="fixed mt-5 top-20 right-5 z-50 ">
    <Toast bind:open={openSuccess} transition={slide} divClass="w-full max-w p-4 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-800 gap-1" dismissable={true} contentClass="flex space-x-4 rtl:space-x-reverse divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-700">
        <PaperPlaneOutline class="w-0 h-0 hidden" />
        <svelte:fragment slot="icon">
            <PaperPlaneOutline class="w-5 h-5 rotate-45" />
            <span class="sr-only">Warning icon</span>
          </svelte:fragment>        
          <div class="ps-4 text-sm font-normal">Message sent successfully</div>
    </Toast>
</div>

<!-- 429 Error Toast -->
<div class="fixed mt-5 top-20 right-5 z-50 ">
    <Toast bind:open={openError} transition={slide} divClass="w-full max-w p-4 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-800 gap-1" dismissable={true} contentClass="flex space-x-4 rtl:space-x-reverse divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-700">
        <ExclamationCircleSolid class="w-0 h-0 hidden" />
        <svelte:fragment slot="icon">
            <ExclamationCircleSolid class="w-5 h-5" />
            <span class="sr-only">Warning icon</span>
          </svelte:fragment>        
          <div class="ps-4 text-sm font-normal">You have sent too many messages <br>Please Try again Later</div>
    </Toast>
</div>