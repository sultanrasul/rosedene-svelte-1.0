<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import { DarkMode } from 'flowbite-svelte';
    import { CodeOutline } from 'flowbite-svelte-icons';
    
    /**
	 * @param {string} id
	 */
    function scrollToElementWithOffset(id) {
        const element = document.getElementById(id);
        const yOffset = -100; // Adjust this value as needed
        // @ts-ignore
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    }

</script>

<div>
    <Navbar color="primary"  class="fixed z-20 top-0 start-0">
        <NavBrand href="/">
        <CodeOutline class="w-15 h-10 m-2 text-primary-600 dark:text-primary-400"/>
          <span class="text-gray-700 self-center whitespace-nowrap text-xl font-bold dark:text-white">Funkypanda</span>
        </NavBrand>
        <NavHamburger/>
        <NavUl class="cursor-pointer select-none">
          <NavLi class="text-xl" on:click={() => scrollToElementWithOffset('home')}>Home</NavLi>
          <NavLi class="text-xl" on:click={() => scrollToElementWithOffset('projects')} >Projects</NavLi>
          <NavLi class="text-xl" on:click={() => scrollToElementWithOffset('contact')}>Contact</NavLi>
          <DarkMode btnClass="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-1.5" size="lg"/>
        </NavUl>
      </Navbar>
</div>
<style>
    
</style>