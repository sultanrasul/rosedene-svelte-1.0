<script lang="ts">
    import { cubicOut } from "svelte/easing";
    import { onMount } from "svelte";
    import { spring, tweened } from "svelte/motion";
    import { cn } from "$lib/utils";
    export let value = 100;
    export let initial = 3750;
    export let duration = 3000;
    let num = tweened(initial, {
      duration: duration,
      easing: cubicOut,
    });
    let className: any = "";
    export { className as class };
    onMount(() => {
      num.set(value);
    });
  </script>
  
  <div
    class={cn(
      "text-4xl font-bold text-[#C09A5B]",
      className
    )}
    {...$$restProps}
  >
    £{$num.toFixed(0)}
  </div>
  