<script>
  import Navbar from "../Navbar.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { supabase } from "@/supabase";
  
  let email = "";
  let countdown = 10;
  let canResend = false;
  let isResending = false;
  
onMount(() => {
    // Get email from query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    
    if (emailParam) {
      email = decodeURIComponent(emailParam);
      
      // Clean the URL by removing the email parameter
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      email = "your email";
    }
    
    // Start countdown timer
    const timer = setInterval(() => {
      if (countdown > 0) {
        countdown--;
      } else {
        canResend = true;
        clearInterval(timer);
      }
    }, 1000);
  });
  
  async function resendVerification() {
    sendEmail(email);
    isResending = true;
    // Add your resend verification email logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    // Reset the resend functionality
    canResend = false;
    isResending = false;
    countdown = 60;
    
    // Restart countdown
    const timer = setInterval(() => {
      if (countdown > 0) {
        countdown--;
      } else {
        canResend = true;
        clearInterval(timer);
      }
    }, 1000);
    
    // Show success message (you can use your toast library here)
    // toast.success("Verification email sent!");
  }

  async function sendEmail(email) {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });

    if (error) {
      console.error("Resend failed:", error.message);
      return false;
    }

    console.log("Verification email resent:", data);
    return true;
  }
  
  function openEmailClient() {
    // This will try to open the default email client
    if (!email.includes("@")) return "/";
    const domain = email.split("@")[1].toLowerCase();

    if (domain.includes("gmail")) return "https://mail.google.com";
    if (domain.includes("yahoo")) return "https://mail.yahoo.com";
    if (domain.includes("outlook") || domain.includes("hotmail") || domain.includes("live"))
        return "https://outlook.live.com";
    if (domain.includes("icloud")) return "https://www.icloud.com/mail";
    return "https://" + domain;
  }
</script>

<div class="min-h-screen flex bg-[#233441]">
  <div class="absolute w-full z-10">
    <Navbar />
  </div>

  <!-- Main Content -->
  <div class="w-full flex items-center justify-center p-8 mt-[80px]">
    <div class="max-w-md w-full text-white text-center">
      <!-- Icon -->
      <div class="mb-6 flex justify-center">
        <div class="w-20 h-20 p-2 rounded-full bg-[#C09A5B]/20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-[#C09A5B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-3xl mb-4 text-[#C09A5B] font-bold">Verify your email</h1>
      
      <!-- Description -->
      <p class="text-gray-300 mb-6">
        We've sent a verification link to <span class="text-white font-medium">{email}</span>. 
        Please check your inbox and click the link to verify your account.
      </p>

      <!-- Open Email Button -->
      <a 
        target="_blank"
        href={openEmailClient(email)}
        class="w-full mb-6 px-6 py-3 bg-[#C09A5B] hover:bg-[#B08A4F] text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Open Email App
    </a>

      <!-- Resend Email Section -->
      <div class="mt-8 pt-6 border-t border-gray-700">
        <p class="text-gray-400 mb-4">Didn't receive the email?</p>
        
        {#if canResend}
          <button 
            on:click={resendVerification}
            class="text-[#C09A5B] hover:text-[#B08A4F] font-medium underline transition-colors duration-200"
            disabled={isResending}
          >
            {#if isResending}
              Sending...
            {:else}
              Resend verification email
            {/if}
          </button>
        {:else}
          <p class="text-gray-400">
            You can request a new verification email in <span class="text-white">{countdown}</span> seconds
          </p>
        {/if}
      </div>

      <!-- Support Text -->
      <div class="mt-10 text-sm text-gray-500">
        <p>If you're having trouble, please contact our support team.</p>
        <a href="mailto:support@example.com" class="text-[#C09A5B] hover:underline">support@example.com</a>
      </div>

      <!-- Back to Login -->
      <div class="mt-8">
        <a href="/login" class="text-[#C09A5B] hover:text-[#B08A4F] font-medium flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to login
        </a>
      </div>
    </div>
  </div>
</div>