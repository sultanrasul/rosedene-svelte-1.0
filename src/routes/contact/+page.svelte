<script>
// @ts-nocheck

    // @ts-ignore
    import Contact from "../components/Contact.svelte";
    // @ts-ignore
    import Hero from "../components/Hero.svelte";
  import Footer from "../Footer.svelte";
  import { toast } from "svelte-sonner";


    import Navbar from "../Navbar.svelte";

    let name = "";
    let email = "";
    let message = ""; // really the message
    let disableButton = false;


    // @ts-ignore
    async function submitForm(event) {
        // @ts-ignore
        disableButton = true;
        // @ts-ignore
        setTimeout(function() { disableButton = false}, 2500); 
        event.preventDefault();
        // Prepare the payload
        // @ts-ignore
        const messageData = { name, contact: email, message };

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
                document.getElementById("name").value = ""
                document.getElementById("email").value = ""
                document.getElementById("message").value = ""
                name = '';
                email = '';
                message = '';
                toast.success('You message has been sent successfully!')
            } else if (response.status === 429) {
                // Too many requests error
                // @ts-ignore
                toast.error("You have sent to many requests please try again later!");
            } else {
                // Other errors
                toast.error('Failed to send the message.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('An error occurred. Please try again.');
        }
    }


</script>
<!-- <div class="relative" id="Home">

    <div class="absolute inset-0 bg-black opacity-[0.4] z-[-1]"
        style="background-image: url('background.png'); background-size: cover; background-position: center;">
    </div>

    <div class="relative z-10 min-h-screen flex flex-col items-center">
        <Navbar />

        </div>
        <Contact/>
</div> -->

<div class="absolute w-full z-50">
    <Navbar/>
</div>


<!-- Background Sections with Diagonal Split -->
<div class=" z-0 relative min-h-screen w-full overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-[#233441]  via-[#233441] to-white/30 w-full h-full transform -rotate-3 scale-125 origin-top"></div>
</div>

<!-- Contact Container -->
<div class="absolute top-0 left-0 w-full min-h-screen pointer-events-none z-10">
    <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-0 min-h-screen">
        <!-- Contact Info Section -->
        <div class="relative bg-[#233441]/95 backdrop-blur-sm p-8 flex items-center justify-center min-h-[50vh] md:min-h-screen pointer-events-auto">
            <div class="max-w-md w-full space-y-8 ">
                <div class="text-center md:text-left">
                    <h2 class="text-4xl font-bold mb-4 text-white">
                        <span class="border-b-2 border-[#C09A5B] pb-2">Get In Touch</span>
                    </h2>
                    <p class="mt-6 text-gray-200 leading-relaxed">
                        Need assistance with reservations or general inquiries? Our team is here to help. Reach out via email or phone for prompt support.
                    </p>
                </div>

                <div class="space-y-6">
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
                </div>
            </div>
        </div>

        <!-- Contact Form Section -->
        <div class="flex items-center justify-center min-h-[50vh] md:min-h-screen pointer-events-auto bg-white/90 backdrop-blur-sm">
            <div class="p-8 md:p-12 rounded-2xl shadow-xl bg-white max-w-[90%] md:max-w-[480px] w-full transform hover:shadow-2xl transition-shadow duration-300">
                <h3 class="text-3xl font-bold text-gray-800 mb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-[#C09A5B]">
                    Send Message
                </h3>
                <form class="space-y-6">
                    <div>
                        <input 
                            id="name"
                            type="text"
                            placeholder="Name"
                            class="text-[#233441] w-full pr-4 py-3 rounded-lg bg-white border-2 border-[#C09A5B]/30 focus:border-[#C09A5B] focus:ring-2 focus:ring-[#C09A5B]/50 transition-all duration-300" required
                        >
                    </div>

                    <div>
                        <input 
                            id="email"
                            type="email" 
                            placeholder="Email"
                            class="text-[#233441] w-full pr-4 py-3 rounded-lg bg-white border-2 border-[#C09A5B]/30 focus:border-[#C09A5B] focus:ring-2 focus:ring-[#C09A5B]/50 transition-all duration-300" required
                        >
                    </div>

                    <div>
                        <textarea 
                            id="message"
                            placeholder="Phone"
                            class="text-[#233441] w-full pr-4 py-3 rounded-lg bg-white border-2 border-[#C09A5B]/30 focus:border-[#C09A5B] focus:ring-2 focus:ring-[#C09A5B]/50 transition-all duration-300" required
                        ></textarea>
                    </div>

                    <button 
                        disabled={disableButton}
                        on:click={submitForm(event)}
                        type="submit"
                        class=" disabled:bg-[#C09A5B]/60 disabled:cursor-default w-full bg-[#C09A5B] text-white py-4 rounded-lg font-semibold hover:bg-[#A8854E] duration-300 transform hover:scale-[1.02]"
                    >
                        Submit Message
                    </button>
                </form>
            </div>          
        </div>
    </div>
</div>
      

<Footer/>