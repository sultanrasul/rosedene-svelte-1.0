<script>
  import { DatePicker } from '@svelte-plugins/datepicker';
  import { CalendarDays } from 'lucide-svelte';
  import { format, parseISO } from 'date-fns';

  export let date = null; // timestamp internally
  export let formattedDate = ""; // always 'yyyy-MM-dd'
  let isOpen = false;
  let error = "";

  const toggleDatePicker = () => (isOpen = !isOpen);

  const formatForInput = (date) => {
    if (!date || isNaN(new Date(date))) return '';
    return format(new Date(date), 'yyyy-MM-dd');
  };

  const handleInputChange = (e) => {
    const newDate = parseISO(e.target.value);
    if (isNaN(newDate)) {
      error = "Invalid date";
      date = null;
    } else {
      date = newDate.getTime(); // keep timestamp
      error = "";
    }
  };

  // input value for the <input> field
  $: inputDateValue = formatForInput(date);

  // reactive formattedDate: always updates when `date` changes
  $: formattedDate = date ? format(new Date(date), 'yyyy-MM-dd') : '';
</script>


<div class="flex flex-col w-full">
  <label class="block text-sm font-medium mb-2 text-white">Arrival date</label>

  <div class="relative w-full">
    <DatePicker
      bind:isOpen
      bind:startDate={date}
      theme="custom-datepicker"
      showYearControls={false}
      enableFutureDates
    >
      <input
        type="date"
        bind:value={inputDateValue}
        on:input={handleInputChange}
        on:click={() => (isOpen = true)}
        placeholder="dd/mm/yyyy"
        class="w-full p-3 rounded font-light text-black border-2 bg-white transition-all pr-10
        focus:outline-none focus:ring-1 focus:ring-[#C09A5B] focus:border-[#C09A5B]
        {error 
          ? 'border-red-400 focus:border-[#ff4444] focus:ring-[#ff4444]' 
          : 'border-[#CFD7DF]'}"
        required
      />
    </DatePicker>

    <button
      type="button"
      on:click={toggleDatePicker}
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C09A5B]"
      aria-label="Toggle date picker"
    >
      <CalendarDays class="w-5 h-5" />
    </button>
  </div>

  {#if error}
    <p class="text-red-400 text-sm mt-1">{error}</p>
  {/if}
</div>


<style>
  /* Hide native date picker icon, keep typing */
  input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    position: absolute;
    right: 0;
    width: 100%;
    cursor: pointer;
  }

  input[type="date"]::-ms-clear,
  input[type="date"]::-ms-expand {
    display: none;
  }

  input[type="date"] {
    color-scheme: light;
  }

  input::-webkit-calendar-picker-indicator{
    display: none;
}

input[type="date"]::-webkit-input-placeholder{ 
    visibility: hidden !important;
}

  
  :global(.datepicker[data-picker-theme="custom-datepicker"]) {
      --datepicker-calendar-range-selected-background: #C09A5B;
  }
</style>
