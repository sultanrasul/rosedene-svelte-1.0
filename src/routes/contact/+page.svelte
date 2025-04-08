<script>
// @ts-nocheck

    // @ts-ignore
    import Contact from "../components/Contact.svelte";
    // @ts-ignore
    import Hero from "../components/Hero.svelte";
    import Footer from "../Footer.svelte";
    import { toast } from "svelte-sonner";


    import Navbar from "../Navbar.svelte";
  import BlurFade from "@/components/BlurFade.svelte";
  import WordPullUp from "@/components/WordPullUp.svelte";

    let name = "";
    let email = "";
    let message = ""; // really the message
    let nameError = "";
    let emailError = "";
    let messageError = "";
    let disableButton = false;

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

        // Message validation
        if (!message.trim()) {
            messageError = 'Message is required';
            isValid = false;
        } else if(message.length < 30){
            messageError = 'Minimum message length is 30 characters';
            isValid = false;
        } else {
            nameError = '';
        }

        return isValid;
    };

    // @ts-ignore
    async function submitForm() {
        // @ts-ignore
        // @ts-ignore
        // Prepare the payload
        // @ts-ignore

        // Validate form
        if (!validateForm()) {
            return;
        }

        const messageData = { name: name, contact: email, message: message };

        try {
            const response = await fetch('https://contact.sultanrasul.com/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });

            if (response.ok) {
                // Message sent successfully
                // Clear the form
                name = '';
                email = '';
                message = '';
                toast.success('You message has been sent successfully!')
                disableButton = true;
                setTimeout(function() { disableButton = false}, 1500); 

            } else if (response.status === 429) {
                // Too many requests error
                // @ts-ignore
                toast.error("You have sent to many requests please try again later!");
            } else {
                // Other errors
                toast.error('Failed to send the message.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error('Error sending message:', error);
        }
    }

    function scrollToElement(id) {
        const element = document.getElementById(id);
        const yOffset = 0; // Adjust this value as needed
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    }

</script>

<div class="absolute w-full z-50 md:bg-transparent bg-[#233441]">
    <Navbar/>
</div>




<!-- Contact Container -->
<div class="relative top-0 left-0 w-full min-h-screen pointer-events-none z-10">
    <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-0 min-h-screen">
        <!-- Contact Info Section -->
        <div class="relative bg-[#233441]/95 backdrop-blur-sm p-8 flex items-center justify-center min-h-screen pointer-events-auto">
            <div class="max-w-md w-full space-y-8 ">
                <div class="text-center md:text-left">
                    <h2 class="text-4xl font-bold mb-4 text-white">
                        <WordPullUp duration={0.1/2} class="text-4xl mb-5 text-[#C09A5B] pb-2 text-left" words="Get In Touch" />
                    </h2>
                    <hr class="h-px my-4 bg-[#C09A5B] border-0 w-1/2">

                    <BlurFade delay={0.3/2}>
                        <p class="mt-6 text-gray-200 leading-relaxed text-left">
                            Need assistance with reservations or general inquiries? Our team is here to help. Reach out via email or phone for prompt support.
                        </p>
                    </BlurFade>
                </div>

                <div class="space-y-6">
                    <BlurFade delay={0.4/2}>
                        <div class="flex items-start gap-4 group">
                            <div class="p-3 bg-[#C09A5B]/10 rounded-full">
                                <svg class="w-6 h-6 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm text-[#C09A5B] font-semibold mb-1">Phone Number</p>
                                <p class="text-lg text-white">470-601-1911</p>
                            </div>
                        </div>
                    </BlurFade>
                    
                    <BlurFade delay={0.5/2}>
                        <div class="flex items-start gap-4 group">
                            <div class="p-3 bg-[#C09A5B]/10 rounded-full">
                                <svg class="w-6 h-6 text-[#C09A5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm text-[#C09A5B] font-semibold mb-1">Email Address</p>
                                <p class="text-lg text-white break-all">booking@rosedenehighlandhouse.com</p>
                            </div>
                        </div>
                    </BlurFade>

                    <BlurFade delay={0.6/2}>
                        <!-- Button -->
                        <div class="text-center relative block md:hidden mt-8">
                            <button on:click={() => {scrollToElement("contactForm")}}
                                class="bg-[#C09A5B] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#B28F55] transition-all 
                                    transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg shadow-[#C09A5B]/20 
                                    border border-[#C09A5B]/50 flex items-center gap-3 mx-auto
                                    relative z-20 group duration-300 ease-out">
                                <span class="text-sm tracking-wide">Message us here</span>
                                <svg class="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" 
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                </svg>
                            </button>
                        </div>
                    </BlurFade>
                </div>
            </div>
        </div>

        <!-- Contact Form Section -->
        <div id="contactForm" class="flex items-center justify-center min-h-[50vh] md:min-h-screen pointer-events-auto bg-white/90 backdrop-blur-sm">
            <div class="p-8 md:p-12 rounded-2xl shadow-xl bg-white max-w-[90%] md:max-w-[480px] w-full transform hover:shadow-2xl transition-shadow duration-300">
                <WordPullUp duration={0.15/2} class="text-left text-3xl font-normal text-gray-800 mb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-[#C09A5B]" words="Send Message" />

                <form class="space-y-6">
                    <BlurFade delay={0.1/2}>
                        <div>
                            <input 
                                id="name"
                                bind:value={name}
                                on:input={() => nameError = ''}
                                type="text"
                                placeholder="Name"
                                class="text-[#233441] w-full pr-4 py-3 rounded-lg bg-white border-2 border-[#C09A5B]/30 focus:border-[#C09A5B] focus:ring-2 focus:ring-[#C09A5B]/50 transition-all duration-300"
                            >
                            {#if nameError}
                                <p class="text-red-500 text-sm mt-1 pl-1">{nameError}</p>
                            {/if}
                        </div>
                    </BlurFade>

                    <BlurFade delay={0.2/2}>
                        <div>
                            <input 
                                on:input={() => emailError = ''}
                                bind:value={email}
                                id="email"
                                type="email" 
                                placeholder="Email"
                                class="text-[#233441] w-full pr-4 py-3 rounded-lg bg-white border-2 border-[#C09A5B]/30 focus:border-[#C09A5B] focus:ring-2 focus:ring-[#C09A5B]/50 transition-all duration-300"
                            >
                            {#if emailError}
                                <p class="text-red-500 text-sm mt-1 pl-1">{emailError}</p>
                            {/if}
                            
                        </div>
                    </BlurFade>
                    <BlurFade delay={0.3/2}>
                        <div>
                            <textarea 
                            bind:value={message}
                            on:input={() => messageError = ''}
                            id="message"
                            placeholder="Message"
                            class="text-[#233441] w-full pr-4 py-3 rounded-lg bg-white border-2 border-[#C09A5B]/30 focus:border-[#C09A5B] focus:ring-2 focus:ring-[#C09A5B]/50 transition-all duration-300"
                            ></textarea>
                            {#if messageError}
                                <p class="text-red-500 text-sm mt-1 pl-1">{messageError}</p>
                            {/if}
                        </div>
                    </BlurFade>
                    <BlurFade delay={0.4/2}>
                        <button 
                            disabled={disableButton}
                            on:click={submitForm}
                            class=" disabled:bg-[#C09A5B]/60 disabled:cursor-default w-full bg-[#C09A5B] text-white py-4 rounded-lg font-semibold hover:bg-[#A8854E] duration-300 transform hover:scale-[1.02]"
                        >
                            Submit Message
                        </button>
                    </BlurFade>
                </form>
            </div>          
        </div>
    </div>
</div>
      

<Footer/>


<style>
    .wobble-hor-top {
	-webkit-animation: wobble-hor-top 0.8s both;
	        animation: wobble-hor-top 0.8s both;
}

@-webkit-keyframes wobble-hor-top {
  0%,
  100% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-30px) rotate(6deg);
            transform: translateX(-30px) rotate(6deg);
  }
  30% {
    -webkit-transform: translateX(15px) rotate(-6deg);
            transform: translateX(15px) rotate(-6deg);
  }
  45% {
    -webkit-transform: translateX(-15px) rotate(3.6deg);
            transform: translateX(-15px) rotate(3.6deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(-2.4deg);
            transform: translateX(9px) rotate(-2.4deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(1.2deg);
            transform: translateX(-6px) rotate(1.2deg);
  }
}
@keyframes wobble-hor-top {
  0%,
  100% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-30px) rotate(6deg);
            transform: translateX(-30px) rotate(6deg);
  }
  30% {
    -webkit-transform: translateX(15px) rotate(-6deg);
            transform: translateX(15px) rotate(-6deg);
  }
  45% {
    -webkit-transform: translateX(-15px) rotate(3.6deg);
            transform: translateX(-15px) rotate(3.6deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(-2.4deg);
            transform: translateX(9px) rotate(-2.4deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(1.2deg);
            transform: translateX(-6px) rotate(1.2deg);
  }
}

</style>