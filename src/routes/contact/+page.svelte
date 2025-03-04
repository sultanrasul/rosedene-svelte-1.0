<script>
    import Contact from "../components/Contact.svelte";
    import Hero from "../components/Hero.svelte";


    import Navbar from "../Navbar.svelte";

</script>
<div class="relative" id="Home">

    <div class="absolute inset-0 bg-black opacity-[0.4] z-[-1]"
        style="background-image: url('background.png'); background-size: cover; background-position: center;">
    </div>

    <div class="relative z-10 h-screen flex flex-col items-center">
        <Navbar />

        <Contact/>
    </div>
</div>