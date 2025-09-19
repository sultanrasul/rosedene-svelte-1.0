<script>
    import Navbar from "../Navbar.svelte";
    import { supabase } from "@/supabase";
    import { onMount } from "svelte";
    import { toast } from "svelte-sonner";

    let authError = "";

    let firstName = "";
    let firstNameError = "";

    let lastName = "";
    let lastNameError = "";


    let email = "";
    let emailError = "";

    let password = "";
    let passwordError = "";
    
    let confirmPassword = "";
    let confirmPasswordError = "";
    
    let showPassword = false;
    let showConfirmPassword = false;
    let isLoading = false;
    let rememberMe = false;

    async function signUp() {
        // Reset errors
        authError = "";
        firstNameError = "";
        lastNameError = "";
        emailError = "";
        passwordError = "";
        confirmPasswordError = "";
        
        // Validation
        let isValid = true;
        
        if (!firstName.trim()) {
            firstNameError = "First name is required";
            isValid = false;
        }

        if (!lastName.trim()) {
            lastNameError = "Last name is required";
            isValid = false;
        }
        
        if (!email.trim()) {
            emailError = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            emailError = "Email is invalid";
            isValid = false;
        }
        
        if (!password) {
            passwordError = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            passwordError = "Password must be at least 6 characters";
            isValid = false;
        }
        
        if (password !== confirmPassword) {
            confirmPasswordError = "Password does not match";
            isValid = false;
        }
        
        if (!isValid) return;
        
        isLoading = true;
        
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                    }
                }
            });

            if (error) {
                authError = error.message || "Failed to create account";
            } else {
                // Redirect to login or home page after a short delay
                window.location.href = `/verify-email?email=${email}`;
            }
        } catch (error) {
            authError = "An unexpected error occurred";
            console.error("Sign up error:", error);
        } finally {
            isLoading = false;
        }
    }

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.origin + "/"
        }
        });

        if (error) {
        console.error("Google sign-in error:", error.message);
        }
    }

    async function signInWithFacebook() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "facebook",
            options: {
                redirectTo: window.location.origin + "/"
            }
        });

        if (error) {
            console.error("Facebook sign-in error:", error.message);
        }
    }

    // After redirect back from Google
    onMount(async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
        // Supabase automatically stores Google's profile info in user_metadata
        const { full_name, name, given_name, family_name } = user.user_metadata;

        // Update the profile table if you want to keep first/last name separately
        const { error: updateError } = await supabase
            .from("profiles")
            .upsert({
            id: user.id,
            first_name: given_name || name?.split(" ")[0],
            last_name: family_name || name?.split(" ")[1] || "",
            });

        if (updateError) {
            console.error("Error updating profile:", updateError.message);
        }
        }
    });

</script>

<div class="min-h-screen flex bg-[#233441]">
    <div class="absolute w-full z-10">
        <Navbar/>
    </div>

    <!-- Left Form Section -->
    <div class="w-full sm:w-[65%] flex items-center justify-center p-8 mt-[80px]">
        <div class="max-w-md w-full text-white">
            <!-- Header -->
            <h1 class="text-4xl mb-5 text-center text-[#C09A5B]">Create Account</h1>
            
            <!-- Form Content -->
            <div class="space-y-6">
                <p class="text-center text-gray-400 mb-8">Sign up to start your journey with us</p>
                
                <!-- Centralized Error Display -->
                {#if authError}
                    <div class="mb-6 p-3 bg-red-900/40 border border-red-700 rounded-lg flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-red-200 text-sm">{authError}</p>
                    </div>
                {/if}
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <!-- First Name Field -->
                    <div class="flex-1 relative">
                        <label class="block text-sm font-medium mb-2 text-white">First Name</label>
                        <input
                        type="text"
                        bind:value={firstName}
                        on:input={() => firstNameError = ''}
                        class="w-full p-3 rounded font-light text-black border-2 transition-all
                        focus:outline-none focus:ring-1 focus:ring-[#C09A5B] focus:border-[#C09A5B]
                                {firstNameError 
                                    ? 'border-red-400 focus:border-[#ff4444] focus:ring-[#ff4444]' 
                                    : 'border-[#CFD7DF]'}"
                            placeholder="John"
                            required
                        />
                        {#if firstNameError}
                            <p class="text-red-500 text-sm mt-1">{firstNameError}</p>
                        {/if}
                    </div>

                    
                    <!-- Last Name Field -->
                    <div class="flex-1 relative">
                        <label class="block text-sm font-medium mb-2 text-white">Last Name</label>
                        <input
                            type="text"
                            bind:value={lastName}
                            on:input={() => lastNameError = ''}
                            class="w-full p-3 rounded font-light text-black border-2 transition-all
                                focus:outline-none focus:ring-1 focus:ring-[#C09A5B] focus:border-[#C09A5B]
                                {lastNameError 
                                    ? 'border-red-400 focus:border-[#ff4444] focus:ring-[#ff4444]' 
                                    : 'border-[#CFD7DF]'}"
                            placeholder="Smith"
                            required
                        />
                        {#if lastNameError}
                            <p class="text-red-500 text-sm mt-1">{lastNameError}</p>
                        {/if}
                    </div>
                    
                </div>

                <!-- Email Field -->
                <div class="flex-1 relative">
                    <label class="block text-sm font-medium mb-2 text-white">Email</label>
                    <input
                        type="email"
                        bind:value={email}
                        on:input={() => emailError = ''}
                        class="w-full p-3 rounded font-light text-black border-2 transition-all
                            focus:outline-none focus:ring-1 focus:ring-[#C09A5B] focus:border-[#C09A5B]
                            {emailError 
                                ? 'border-red-400 focus:border-[#ff4444] focus:ring-[#ff4444]' 
                                : 'border-[#CFD7DF]'}"
                        placeholder="john@example.com"
                        required
                    />
                    {#if emailError}
                        <p class="text-red-500 text-sm mt-1">{emailError}</p>
                    {/if}
                </div>
                
                <!-- Password Field -->
                <div class="flex-1 relative">
                    <label class="block text-sm font-medium mb-2 text-white">Password</label>
                    <div class="relative">
                        <input
                            bind:value={password}
                            on:input={() => passwordError = ''}
                            type={showPassword ? 'text' : 'password'}
                            class="placeholder-gray-400 w-full p-3 pr-10 rounded font-light text-black border-2 transition-all
                                    focus:outline-none focus:ring-1 focus:ring-[#C09A5B] focus:border-[#C09A5B]
                                    {passwordError 
                                        ? 'border-red-400 focus:border-[#ff4444] focus:ring-[#ff4444]' 
                                        : 'border-[#CFD7DF]'}"
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="button"
                            on:click={() => showPassword = !showPassword}
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-[#C09A5B] transition-colors duration-200"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {#if showPassword}
                                <!-- Eye off icon (visible password state) -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            {:else}
                                <!-- Eye icon (hidden password state) -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            {/if}
                        </button>
                    </div>
                    {#if passwordError}
                        <p class="text-red-500 text-sm mt-1">{passwordError}</p>
                    {/if}
                </div>
                
                <!-- Confirm Password Field -->
                <div class="flex-1 relative">
                    <label class="block text-sm font-medium mb-2 text-white">Confirm Password</label>
                    <div class="relative">
                        <input
                            bind:value={confirmPassword}
                            on:input={() => confirmPasswordError = ''}
                            type={showConfirmPassword ? 'text' : 'password'}
                            class="placeholder-gray-400 w-full p-3 pr-10 rounded font-light text-black border-2 transition-all
                                    focus:outline-none focus:ring-1 focus:ring-[#C09A5B] focus:border-[#C09A5B]
                                    {confirmPasswordError 
                                        ? 'border-red-400 focus:border-[#ff4444] focus:ring-[#ff4444]' 
                                        : 'border-[#CFD7DF]'}"
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="button"
                            on:click={() => showConfirmPassword = !showConfirmPassword}
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-[#C09A5B] transition-colors duration-200"
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                            {#if showConfirmPassword}
                                <!-- Eye off icon (visible password state) -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            {:else}
                                <!-- Eye icon (hidden password state) -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            {/if}
                        </button>
                    </div>
                    {#if confirmPasswordError}
                        <p class="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
                    {/if}
                </div>

                <div class="flex items-center justify-between">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox"
                            bind:checked={rememberMe}
                            class="cursor-pointer h-5 w-5 rounded border border-gray-500 text-[#C09A5B] 
                                    focus:ring-0 focus:ring-offset-0 checked:bg-[#C09A5B] checked:hover:bg-[#B08A4F]
                                    transition-colors duration-200"
                        />
                        <span class="text-sm text-gray-400">Remember me</span>
                    </label>
                    
                    <a href="/forgot-password" class="text-sm text-[#C09A5B] hover:text-[#B08A4F] transition-colors">
                        Forgot password?
                    </a>
                </div>

                <div class="w-full sm:w-auto">
                    <button
                        on:click|preventDefault={signUp}
                        disabled={isLoading}
                        class="w-full px-8 py-3 text-lg bg-[#C09A5B] hover:bg-[#B08A4F] disabled:bg-gray-500 text-white font-semibold rounded-xl transition-all transform hover:scale-100 active:scale-95 shadow-lg flex items-center justify-center"
                    >
                        {#if isLoading}
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Account...
                        {:else}
                            Sign Up
                        {/if}
                    </button>
                </div>

                <div class="relative flex items-center justify-center my-6">
                    <div class="border-t border-gray-600 w-full"></div>
                    <span class="text-gray-400 text-sm bg-[#233441] px-4 absolute">or continue with</span>
                </div>

                <div class="grid grid-cols-1 gap-4">
                    <button on:click={signInWithGoogle} class="py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center">
                        <svg class="w-8 h-8 mr-2"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        Google
                    </button>
                </div>

                <p class="text-sm text-gray-500 text-center mt-8">
                    Already have an account? 
                    <a href="/login" class="text-[#C09A5B] hover:text-[#B08A4F] transition-colors ml-1">Sign in</a>
                </p>
            </div>
        </div>
    </div>

    <!-- Right Image Section -->
    <div class="z-0 w-[35%] hidden sm:block bg-cover bg-center bg-[url('/2/3.jpg')]">
        <div class="h-full flex items-end p-12 bg-black/30">
            <!-- Optional: Add some text or content here -->
        </div>
    </div>
</div>