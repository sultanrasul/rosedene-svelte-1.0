<script>
// @ts-nocheck

  import Footer from "../Footer.svelte";
  import Navbar from "../Navbar.svelte";
  import SlideshowModal from "./SlideshowModal.svelte";
  import Slideshow from "./SlideshowModal.svelte";

  let modalRef;
</script>

<svelte:head>
  <title>Gallery | Rosedene Highland House</title>
</svelte:head>

<div class="min-h-screen bg-[#233441] text-white">
  <Navbar />

  <div class="pt-24 px-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-semibold mb-8 text-center">Gallery</h1>

    <!-- Responsive Grid with auto-fit and minmax -->
    <div class="grid gap-6 pb-20"
         style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
      {#each { length: 12 } as _, i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class=" cursor-pointer aspect-square overflow-hidden rounded-xl shadow-lg" type="button" 
                   aria-haspopup="dialog" 
                   aria-expanded="false" 
                   aria-controls="hs-scale-animation-modal-slideshow" 
                   data-hs-overlay="#hs-scale-animation-modal-slideshow"
                   data-hs-overlay-options={'{"backdropClasses":"hs-overlay-backdrop transition duration fixed inset-0 bg-[#233441] "}'}
                   on:click={ () => {modalRef?.goToSlide(i);} }
                   >

          <img
            src={`/gallery/${i + 1}.jpg`}
            alt="Gallery image"
            class="w-full h-full object-cover transition-transform duration-300 "
          />
        </div>
      {/each}
    </div>
  </div>

  <Footer />
</div>


<SlideshowModal bind:this={modalRef} amountOfPictures={12}/>