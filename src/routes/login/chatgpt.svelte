<script>
  import BlurFade from "@/components/BlurFade.svelte";
  import Navbar from "../Navbar.svelte";
  import WordPullUp from "@/components/WordPullUp.svelte";

  let password = "";
  let email = "";
  let isProcessing = false;

  function loginButton(){

  }

</script>
<div class="min-h-screen flex">
  <!-- Right Form Section (Navbar) -->
  <div class="absolute w-full z-10">
    <Navbar/>
  </div>

  <!-- Left Image Section -->
  <BlurFade delay={0.2/2} class="z-0 w-1/2 hidden sm:block bg-cover bg-center bg-[url('/2/3.jpg')]">
    <div class="h-full flex items-end p-12 bg-black/30">
      <!-- Optional overlay text or testimonials here -->
    </div>
  </BlurFade>

  <!-- Right Login Form Section -->
  <div class="w-full sm:w-1/2 bg-[#233441] flex items-center justify-center p-8">
    <div class="max-w-md w-full text-white">
      <!-- Header -->
      <WordPullUp duration={0.1/2} class="text-4xl mb-5 text-center text-[#C09A5B]" words={"Login"} />

      <!-- Form Instructions -->
      <BlurFade delay={0.3/2}>
        <p class="text-center text-gray-400 mb-8">
          Enter your email and password to access your account
        </p>
      </BlurFade>

      <!-- Login Form -->
      <div class="space-y-6">
        <!-- Email Input -->
        <BlurFade delay={0.4/2} class="flex-1 relative">
          <input 
            id="email"
            type="email"
            bind:value={email}
            class="focus:ring-1 focus:ring-[#C09A5B] w-full pl-4 pr-4 py-3 text-gray-700 placeholder-gray-400 bg-white rounded-lg border-2 border-gray-200 focus:border-[#C09A5B] focus:outline-none transition-all shadow-sm"
            placeholder="name@example.com"
          />
        </BlurFade>

        <!-- Password Input -->
        <BlurFade delay={0.5/2} class="flex-1 relative">
          <input 
            id="password"
            type="password"
            bind:value={password}
            class="focus:ring-1 focus:ring-[#C09A5B] w-full pl-4 pr-4 py-3 text-gray-700 placeholder-gray-400 bg-white rounded-lg border-2 border-gray-200 focus:border-[#C09A5B] focus:outline-none transition-all shadow-sm"
            placeholder="Password"
          />
        </BlurFade>

        <!-- Login Button (Gold overlay style) -->
        <BlurFade delay={0.6/2} class="w-full sm:w-auto">
          <button
            on:click={loginButton}
            class="relative w-full px-8 py-3 text-lg font-semibold rounded-xl text-white border border-[#C09A5B]/80 overflow-hidden transition-all transform hover:scale-100 active:scale-95 shadow-lg disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-[#C09A5B]"
            disabled={!email || !password || isProcessing}
          >
            <!-- Black base -->
            <span class="absolute inset-0 bg-black"></span>
            <!-- Gold overlay -->
            <span class="absolute inset-0 bg-[#C09A5B]/50"></span>
            <!-- Text -->
            <span class="relative z-10">
              {#if isProcessing}
                <div class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              {:else}
                Login
              {/if}
            </span>
          </button>
        </BlurFade>

        <!-- Forgot password -->
        <BlurFade delay={0.7/2}>
          <p class="text-sm text-gray-500 text-center">
            Forgot your password? <a href="/reset" class="text-[#C09A5B] hover:text-[#B08A4F]">Reset it here</a>
          </p>
        </BlurFade>
      </div>
    </div>
  </div>
</div>
