<script>
  import BlurFade from '@/components/BlurFade.svelte';

// @ts-nocheck
    import { DatePicker } from '@svelte-plugins/datepicker';
  import { AirVent, CalendarDays } from 'lucide-svelte';

    export let type;
    export let value;
    export let error;
    export let placeholder;
    export let label;
    let isOpen = false;
    export let arrivalDate;
</script>

<div class="flex-1 relative">
    {#if label}
        <label class="block text-sm font-medium mb-2 text-white">{label}</label>
    {/if}

    <input
        type={type}
        bind:value={value}
        on:input={() => { 
            error = "";
        }}
        class="w-full p-3 rounded font-light text-black border-2 transition-all
        focus:outline-none focus:ring-1 focus:ring-[#C09A5B] focus:border-[#C09A5B]
        {error 
                ? 'border-red-400 focus:border-[#ff4444] focus:ring-[#ff4444]' 
                : 'border-[#CFD7DF]'}"
        placeholder={placeholder}
        required
    />

</div>

<style>
    /* Hide number input arrows for Chrome, Safari, Edge */
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Hide number input arrows for Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
</style>