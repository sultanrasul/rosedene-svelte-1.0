<script>
  import BlurFade from "@/components/BlurFade.svelte";
  import GradualSpacing from "@/components/GradualSpacing.svelte";
  import { CigaretteOff, Info, LogIn, LogOut, PawPrint, PersonStanding, Users } from "lucide-svelte";
</script>

<div class="house-rules space-y-4 text-black p-3">
    <GradualSpacing words="House Rules" class="text-3xl font-bold mb-4"/>
    
    <div class="space-y-4">
      <BlurFade delay={0.1} >
        <div class="flex flex-col sm:flex-row items-start">
          <span class="w-60 font-medium flex items-center">
            <LogIn class="inline-flex mr-1"/> Check-in
          </span>
          <div class="flex-1 mt-2 sm:mt-0">
            <span class="text-sm">From 16:00</span>
            <p class="text-gray-500 text-sm mt-1">
              You'll need to let the property know in advance what time you'll arrive.
            </p>
          </div>
        </div>
      </BlurFade>

      <hr class="h-px my-8 bg-gray-300 border-0">

      <BlurFade delay={0.2} >
        <div class="flex flex-col sm:flex-row items-start">
          <span class="w-60 font-medium flex items-center">
            <LogOut class="inline-flex mr-1"/> Check-out
          </span>
          <span class="flex-1 text-sm mt-2 sm:mt-0">Until 10:00</span>
        </div>
      </BlurFade>

      <hr class="h-px my-8 bg-gray-300 border-0">

      <BlurFade delay={0.3} >
        <div class="flex flex-col sm:flex-row items-start">
          <span class="w-60 font-medium flex items-center">
            <Info class="inline-flex mr-1"/> Cancellation/Prepayment
          </span>
          <span class="flex-1 text-sm mt-2 sm:mt-0">
            Cancellation and prepayment policies vary depending on apartment
            type. Please check the conditions of your required room.
          </span>
        </div>
      </BlurFade>

      <hr class="h-px my-8 bg-gray-300 border-0">

      <BlurFade delay={0.4} >
        <div class="flex flex-col sm:flex-row items-start">
          <span class="w-60 font-medium flex items-center">
            <Users class="inline-flex mr-1"/> Children and Beds
          </span>
          <div class="flex-1 mt-2 sm:mt-0">
            <span class="text-md font-bold">Child policies</span>
            <p class="text-sm pt-4">Children of any age are welcome.</p>
            <p class="text-sm pt-4">
              To see correct prices and occupancy information, please add the number of children in your group and their ages to your search.
            </p>
            <p class="text-md font-bold pt-4">Cot and extra bed policies</p>
            <p class="text-sm pt-4">Cots and extra beds are not available at this property.</p>
          </div>
        </div>
      </BlurFade>

      <hr class="h-px my-8 bg-gray-300 border-0">

      <BlurFade delay={0.5} >
        <div class="flex flex-col sm:flex-row items-start">
          <span class="w-60 font-medium flex items-center">
            <PersonStanding class="inline-flex mr-1"/> No Age Restriction
          </span>
          <span class="flex-1 text-sm mt-2 sm:mt-0">There is no age requirement for check-in.</span>
        </div>
      </BlurFade>

      <hr class="h-px my-8 bg-gray-300 border-0">

      <BlurFade delay={0.6} >
        <div class="flex flex-col sm:flex-row items-start">
          <span class="w-60 font-medium flex items-center">
            <CigaretteOff class="inline-flex mr-1"/> Smoking
          </span>
          <span class="flex-1 text-sm mt-2 sm:mt-0">Smoking is not allowed.</span>
        </div>
      </BlurFade>

      <hr class="h-px my-8 bg-gray-300 border-0">

      <BlurFade delay={0.7} >
        <div class="flex flex-col sm:flex-row items-start">
          <span class="w-60 font-medium flex items-center">
            <PawPrint class="inline-flex mr-1"/> Pets
          </span>
          <span class="flex-1 text-sm mt-2 sm:mt-0">Pets are not allowed.</span>
        </div>
      </BlurFade>

    </div>
</div>