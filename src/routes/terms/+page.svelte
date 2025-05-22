<!-- Amenities.svelte -->
<script>
    import BlurFade from "@/components/BlurFade.svelte";
    import Footer from "../Footer.svelte";
    import Navbar from "../Navbar.svelte";
    import WordPullUp from "@/components/WordPullUp.svelte";
  
      export let title = "Aparthotel Amenities";
      export let ctaText = "Tell Me More";
      
      const amenities = [
          {
              image: '/10/5.jpg',
              title: 'Luxury Bedding',
              description: 'Premium emperor beds with high-thread-count linens'
          },
          {
              image: '/3/1.jpg',
              title: 'Full Kitchen',
              description: 'Fully equipped kitchens with modern appliances'
          },
          {
              image: '/2/0.jpg',
              title: 'living spaces',
              description: "Curl up on the couch with a book or enjoy a movie night from bed. There's plenty of space to roll out a yoga mat or get some work done."
          },
          {
              image: '/parking.png',
              title: 'Free Parking',
              description: 'Parking on site'
          },
          {
              image: '/parking.png',
              title: 'High-Speed WiFi',
              description: 'Enterprise-grade connectivity throughout'
          },
          {
              image: '/parking.png',
              title: 'Washing Machine',
              description: 'Stay fresh with our washing machines. Super handy for longer stays!'
          },
      ];
  </script>
  
  <div class="bg-[#233441]">
      <Navbar/>
  </div>
  <section class="bg-[#233441] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div class="max-w-6xl mx-auto relative z-10">
        <!-- heading -->
        <div class="w-full md:1/2 block md:inline-flex pb-[100px] pl-10">
              <div class="w-full md:w-[40%]">
                  <BlurFade delay={0.2}>
                      <p class="mt-1 mb-5 text-white/9 tracking-widest">IMPORTANT</p>
                  </BlurFade>
  
                  <!-- <h2 class="text-[#C09A5B] text-5xl md:leading-tight">what is an <br/> aparthotel?</h2> -->
                   <BlurFade>
                        <h2 class="text-[#C09A5B] text-5xl md:leading-tight font-normal text-left">Terms and</h2>
                   </BlurFade>
                   <BlurFade delay={0.2}>
                        <h2 class="text-[#C09A5B] text-5xl md:leading-tight font-normal text-left">Conditions</h2>
                   </BlurFade>
                  <!-- <WordPullUp duration={0.05} class="text-[#C09A5B] text-5xl md:leading-tight font-normal text-left" words={"What is an"} /> -->
                  <!-- <WordPullUp duration={0.05} delay={0.2} class="text-[#C09A5B] text-5xl md:leading-tight font-normal text-left" words={"aparthotel?"} /> -->
              </div>
              <div class="w-full md:w-[60%] mt-1 text-sm text-white/90">
                  <BlurFade delay={0.2}>
                      <p class="mt-4">Use of this website, is subject to the terms and conditions outlined below. By using this website the Customer agrees to be legally bound by these terms and conditions.</p>
                  </BlurFade>
                  <BlurFade delay={0.25}>
                      <p class="mt-4">Please read these booking terms and conditions carefully before proceeding with your booking. </p>
                  </BlurFade>
                  <BlurFade delay={0.3}>
                      <p class="mt-4">View our privacy notice here</p>
                  </BlurFade>
              </div>
              <!-- End Col -->
        </div>
        
        <!-- terms and conditions -->
        <div>
            <p class="mt-1 mb-5 text-white text-[13px]">
                Terms & Conditions
                
                Boardbeach Ltd is the owner of Rosedene Highland House and will be referred to as Rosedene Highland House in the Terms and Conditions. Please read through the terms and conditions that apply to the accommodation, pre-bookable packages and promotions. You will be asked to accept these terms and conditions and confirm that you have read and understood them before you complete your booking. You warrant that you are 18 years and older and possess the legal authority to enter into this agreement and to use this website in accordance with the terms and conditions.</p>
        </div>
      </div>
  </section>
  <Footer/>