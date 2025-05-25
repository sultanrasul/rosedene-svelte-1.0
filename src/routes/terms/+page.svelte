<script>
    import BlurFade from "@/components/BlurFade.svelte";
    import Footer from "../Footer.svelte";
    import Navbar from "../Navbar.svelte";

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
                  <BlurFade delay={0.4}>
                      <p class="mt-4">Use of this website, is subject to the terms and conditions outlined below. By using this website the Customer agrees to be legally bound by these terms and conditions.</p>
                  </BlurFade>
                  <BlurFade delay={0.45}>
                      <p class="mt-4">Please read these booking terms and conditions carefully before proceeding with your booking. </p>
                  </BlurFade>
                  <BlurFade delay={0.5}>
                      <p class="mt-4">View our privacy notice here</p>
                  </BlurFade>
              </div>
              <!-- End Col -->
        </div>
        
        <!-- terms and conditions -->
        <div>
            <p class="mt-1 mb-5 text-white text-[13px]">
                <span class="font-bold text-[14px]">Terms & Conditions</span><br><br>
                Boardbeach Ltd is the owner of Rosedene Highland House and will be referred to as Rosedene Highland House in the Terms and Conditions. Please read through the terms and conditions that apply to the accommodation, pre-bookable packages and promotions. You will be asked to accept these terms and conditions and confirm that you have read and understood them before you complete your booking. You warrant that you are 18 years and older and possess the legal authority to enter into this agreement and to use this website in accordance with the terms and conditions.
            </p>
            
            <p class="mt-4 mb-2 font-bold text-white text-[14px]">1. Apartment Prices:</p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li>Apartment prices are per Apartment, per night and inclusive of VAT where applicable.</li>
                <li>Prices do not include any incidental charges, which you may incur during your stay, such charges are payable by you prior to check-out. Should you fail to pay these charges, you irrevocably authorize Rosedene Highland House to debit your credit or debit card for the amount outstanding.</li>
                <li>Rosedene Highland House reserves the right to review its prices at any time. You will pay the price as quoted at the point of booking.</li>
                <li>Note that quoted prices at any time may change up to the date of arrival. For details of our most current prices please check our website, <a class="underline text-blue-400" href="/">rosedenedirect.com</a></li>
                <li>Apartments are subject to availability at the time of booking.</li>
            </ul>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">2. Payment:</p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li>Rosedene Highland House accepts payments by cash, credit or debit card (VISA, MasterCard, American Express, Maestro, Electron). We do not accept cheques. An imprint of a valid credit or debit card is required upon check-in to guarantee incidentals.</li>
                <li>Guests paying with cash are required to provide identification upon check-in. Acceptable forms of ID are: current driving license, ID card or passport.</li>
                <li>Bookings will be reserved with a valid credit or debit card and payment taken in full at the time of the booking. The credit or debit card used at time of booking must be presented at check-in to validate the booking. If payment is being made by a third party we must have a valid third party authorization form completed and emailed prior to booking confirmation.</li>
                <li>We require clients to double check all confirmations. It is the client's responsibility to ensure that all details are correct and that the confirmation is consistent with the client's requirements.</li>
                <li>Guests who arrive at Rosedene Highland House without a reservation are deemed as Walk Ins. The full payment for your stay is due on arrival.</li>
                <li>Guests paying with cash are required to provide identification on check-in. Acceptable forms of ID are: current driving license, ID card or passport.</li>
                <li>A damages deposit of £200.00 will be requested upon check-in and a valid credit card will be required to pre-authorize this payment which will be released upon successful check-out.</li>
                <li>Children under the age of 5, stay free.</li>
            </ul>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">3. Cancellation Policy:</p>
            <p class="mt-1 mb-5 text-white text-[13px]">
                As a small boutique operator, we believe that it is only fair to others that we make a charge if you cancel at the last minute and don’t let us know in advance. It helps keep the prices down, too, for everyone. Therefore, should you wish to make any changes to your confirmed booking, please note the following terms and conditions:
            </p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li><span class="font-bold text-[14px]">Best Available Rate: </span> A credit or debit card is required to secure your reservation. There will be no cancellation charge if the booking is cancelled before 11am GMT two days prior to arrival. If the booking is cancelled later, or in the case of a no-show, the whole stay is fully chargeable.</li>
                <li><span class="font-bold text-[14px]">Non Refundable Rate: </span> Full pre-payment is required at the time of booking and your credit/ debit card will be charged in order to confirm the booking. This booking is non-cancellable, non-refundable or amendable.</li>
                <li><span class="font-bold text-[14px]">Long Stay Rate: </span> 7 days or more, 50% of the total cost of your stay will be taken as a deposit at the time of confirmation which is non-refundable and non-transferable. Our cancellation policy requires 7 days’ notice by 11:00 on the day prior to arrival. The deposit cannot be used as a reduction towards the entire stay if the number of nights have been reduced. If your stay is reduced to 6 or less nights then the discounted rate booked will revert to our standard Best Available Rates. The 50% non-refundable deposit applies to each night booked.</li>
            </ul>

            <p class="mt-3 mb-2 text-white font-bold text-[14px]">
                All Bookings:
            </p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li>If you fail to cancel and do not show up, you will be charged for the total amount of your reserved booking.</li>
                <li>Any request to cancel a reservation cannot be considered complete until you receive our cancellation confirmation or cancellation reference number. Until you do so, your booking will still be considered valid and cancellation penalties may be incurred. If you do not receive a confirmation of your cancellation or cancellation reference number within 24-hours of your initial request, please ensure you contact us without delay.</li>
                <li>Changes or cancellations, where admissible, may be made by email or by phone.</li>
                <li>If you make the booking via a third party site (i.e. a booking agency or affiliate site), you must cancel through them.</li>
                <li>Credit or debit cards which are unable to be pre-authorised will result in the reservation being null and void.</li>
                <li>If a booking is not cancelled and the guest(s) does not arrive this is deemed as a No Show. The total cost for the accommodation would still be applicable.</li>
                <li>If you wish to check-out before your reserved departure date, the full amount is still applicable and no refund would be applicable.</li>
            </ul>
        </div>
          
      </div>
  </section>
  <Footer/>