<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import * as RangeCalendar from "./index.js";
	// import CaretLeft from "phosphor-svelte/lib/CaretLeft";
	// import CaretRight from "phosphor-svelte/lib/CaretRight";
	import { cn } from "$lib/utils.js";

	type $$Props = RangeCalendarPrimitive.Props;
	type $$Events = RangeCalendarPrimitive.Events;

	export let value: $$Props["value"] = undefined;
	export let placeholder: $$Props["placeholder"] = undefined;
	export let weekdayFormat: $$Props["weekdayFormat"] = "short";
	export let startValue: $$Props["startValue"] = undefined;
	export let className: $$Props["class"] = undefined;

	export { className as class };
</script>

<RangeCalendarPrimitive.Root
	on:keydown
	bind:value
	bind:placeholder
	bind:startValue
	{weekdayFormat}
	class={cn(
		"rounded-15px border-dark-10 bg-background-white shadow-card mt-6 border p-[22px]",
		className
	)}
	{...$$restProps}
	let:months
	let:weekdays
>
	<!-- Header -->
	<RangeCalendar.Header class="flex items-center justify-between">
		<RangeCalendar.PrevButton
			class="rounded-9px bg-background-alt hover:bg-muted active:scale-98 inline-flex size-10 items-center justify-center"
		>
			<!-- <CaretLeft class="size-6" /> -->
		</RangeCalendar.PrevButton>
		<RangeCalendar.Heading class="text-[15px] font-medium" />
		<RangeCalendar.NextButton
			class="rounded-9px bg-background-alt hover:bg-muted active:scale-98 inline-flex size-10 items-center justify-center"
		>
			<!-- <CaretRight class="size-6" /> -->
		</RangeCalendar.NextButton>
	</RangeCalendar.Header>

	<!-- Calendar Body -->
	<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
		{#each months as month}
			<RangeCalendar.Grid class="w-full border-collapse select-none space-y-1">
				<!-- Weekdays Header -->
				<RangeCalendar.GridHead>
					<RangeCalendar.GridRow class="mb-1 flex w-full justify-between">
						{#each weekdays as day}
							<RangeCalendar.HeadCell
								class="text-muted-foreground w-10 rounded-md text-xs !font-normal"
							>
								<div>{day.slice(0, 2)}</div>
							</RangeCalendar.HeadCell>
						{/each}
					</RangeCalendar.GridRow>
				</RangeCalendar.GridHead>

				<!-- Days Grid -->
				<RangeCalendar.GridBody>
					{#each month.weeks as weekDates}
					
						<RangeCalendar.GridRow class="flex w-full">
							
							{#each weekDates as date}
								<RangeCalendar.Cell {date} class="relative m-0 size-10 !p-0 text-center text-sm focus-within:z-20"
								>
									<RangeCalendar.Day
										class={cn(
											"rounded-9px bg-background text-foreground hover:border-foreground focus-visible:!ring-foreground data-[selection-end]:rounded-9px data-[selection-start]:rounded-9px data-[highlighted]:bg-muted data-[selected]:bg-muted data-[selection-end]:bg-foreground data-[selection-start]:bg-foreground data-[disabled]:text-foreground/30 data-[selected]:text-foreground data-[selection-end]:text-background data-[selection-start]:text-background data-[unavailable]:text-muted-foreground data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:border-foreground group relative inline-flex size-10 items-center justify-center overflow-visible whitespace-nowrap border border-transparent bg-transparent p-0 text-sm font-normal data-[disabled]:pointer-events-none data-[outside-month]:pointer-events-none data-[highlighted]:rounded-none data-[selected]:font-medium data-[selection-end]:font-medium data-[selection-start]:font-medium data-[unavailable]:line-through data-[selection-start]:focus-visible:ring-2 data-[selection-start]:focus-visible:!ring-offset-2 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:rounded-none data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:!ring-0 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:!ring-offset-0"
										)}
										{date} month={month.value}
									>
										<div
											class="bg-foreground group-data-[selected]:bg-background absolute top-[5px] hidden size-1 rounded-full group-data-[today]:block"
										></div>
										{date.day}
									</RangeCalendar.Day>
								</RangeCalendar.Cell>
							{/each}
						</RangeCalendar.GridRow>
					{/each}
				</RangeCalendar.GridBody>
			</RangeCalendar.Grid>
		{/each}
	</div>
</RangeCalendarPrimitive.Root>
