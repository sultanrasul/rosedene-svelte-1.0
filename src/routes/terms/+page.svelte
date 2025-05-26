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
            
            <p class="mt-4 mb-2 font-bold text-white text-[14px]">1. Apartment Prices</p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li>Apartment prices are per Apartment, per night and inclusive of VAT where applicable.</li>
                <li>Prices do not include any incidental charges, which you may incur during your stay, such charges are payable by you prior to check-out. Should you fail to pay these charges, you irrevocably authorize Rosedene Highland House to debit your credit or debit card for the amount outstanding.</li>
                <li>Rosedene Highland House reserves the right to review its prices at any time. You will pay the price as quoted at the point of booking.</li>
                <li>Note that quoted prices at any time may change up to the date of arrival. For details of our most current prices please check our website, <a class="underline text-blue-400" href="/">rosedenedirect.com</a></li>
                <li>Apartments are subject to availability at the time of booking.</li>
            </ul>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">2. Payment</p>
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

            <p class="mt-3 mb-2 text-white text-[14px]">
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

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">4. Arrival and Departure</p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li>Check In time is from 16:00 until on the day of arrival. Please let Rosedene Highland House know if you intend to arrive after 20:00, charges may apply.</li>
                <li>Check Out time is up until 10:00 on the day of Departure. If you depart after this time a late check-out fee would apply starting from £35.00.</li>
            </ul>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">5. Particular Requirements</p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li>Our Emperor Apartments sleeps 6 Adults containing 1 Emperor Bed which can also be changed to twin singles, a double sofa bed and two guest beds. The layout of our rooms is described when booking.</li>
                <li>Our Emperor Studio sleeps 4 Adults containing 1 Emperor Bed which can also be changed to twin singles, a double sofa bed. The layout of our rooms is described when booking.</li>
                <li>Our King Studios sleep 4 containing 1 King Bed and 1 double sofa bed. The layout of our Apartments are described when booking.</li>
                <li>Our Cottage Apartments sleep 6 containing 1 Super King Size Bed + one single bed (Cottage Apartment 8) and one double bed (cottage Apartment 10), with double sofa beds. The layouts of our Apartments are described when booking.</li>
                <li>Sofa beds are not full size beds and may not be suitable for some adults.</li>
                <li>The twin room Apartment layout may vary from Apartment to Apartment. Please refer to the Apartment type description when booking.</li>
                <li>All of our apartments operate a 100% no smoking no vaping policy throughout. Smoking vaping in a bedroom or anywhere else inside the premises will result in a £250 fine.</li>
                <li>Rosedene Highland House will make every possible effort to ensure that our guests’ requirements are met, however all rooms are subject to availability. We apologize in advance if your particular requirements cannot be met.</li>
                <li>Please note there is on-site parking available subject to availability and charges may apply please enquire of the status when booking.</li>
            </ul>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">6. Accessible Bedrooms</p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li>Rosedene Highland House have no lifts however we do offer wheel chair accessible Apartments, subject to availability.</li>
                <li>The dimensions and nature of the facilities available in these rooms may differ. All of our Apartments have one accessible spaced bathroom. Apartments are available on the ground floor subject to availability.</li>
                <li>The Apartments are designed to allow standard wheelchair users adequate space to travel around the room and manoeuvre their wheelchair.</li>
                <li>Fire evacuation procedures are displayed on the back of the bedroom door.</li>
                <li>Guests are reminded to inform Rosedene Highland House management if they would require any assistance in the event of a fire evacuation.</li>
                <li>In accordance with Rosedene Highland House policy, all of our bedrooms are No Smoking No Vaping. </li>
                <li>Please note that not all apartments are located on the ground floor. Please contact our Reservations Team for more details.</li>
            </ul>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">7. Liability</p>
            <p class="mt-1 mb-5 text-white text-[13px]">
                We will not be responsible for any injury, illness, death, loss (for example loss of enjoyment), damage, expense, cost or other sum or claim of any description whatsoever which results from any of the following:
            </p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li>The fault of the person(s) affected or any member(s) of their party or</li>
                <li>The fault of a third party not connected with the provision of your stay which we could not have predicted or avoided or</li>
                <li>An event or circumstance which we or the supplier of the service(s) in question could not have predicted or avoided even after taking all reasonable care.</li>
                <li>The fault of anyone who is not carrying out work for us (generally or in particular) at the time.</li>
                <li>In addition, we will not be responsible where you do not enjoy your stay or suffer any problems because of a reason you did not inform us of when you made your booking or where any problems you suffer did not result from any breach of our contract or other fault of ourselves.</li>
                <li>Rosedene Highland House is not liable for any loss or damage to the property of the Client or any person as may occur within the constraints of the Hotel Proprietors Act 1956.</li>
                <li>In the event of an insurance claim you must provide us and our insurers with any assistance we may reasonably require. You must also agree to cooperate fully with us and our insurers if we or our insurers want to enforce any rights which are transferred</li>
            </ul>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">8. Guest Consideration</p>
            <p class="mt-1 mb-5 text-white text-[13px]">
                We would like to ensure that all our guests’ stays with us are peaceful and enjoyable. We politely ask all our guests to respect each other’s stay with us. Our quiet hours are between 10pm and 10am daily. We may ask you and/or any member of your party to leave immediately if your conduct is considered by us to be inappropriate, likely to cause harm or discomfort to other guests, us or our staff, or is likely to breach this term/policy. No refunds will be given in these circumstances. We have the right either during or after your stay to recover from you the costs of any of the following: any compensation we may pay to others, including our guests; any property or accommodation damage; any other charges, fees, or levies we may incur resulting from your action or inaction and from any breach of this policy, such payment will be automatically deducted from the payment card used at the time of booking or <span class="text-[#FFCBA4]">any subsequent payment card provided for this use</span>. Please note that by staying with us you agree to abide by the terms of this policy. 
            </p>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">9. Non-Smoking Policy</p>
            <p class="mt-1 mb-5 text-white text-[13px]">
                All of our Suites operate a 100% no smoking no vaping policy throughout. Smoking or vaping in a bedroom or anywhere else inside the premises will result in a £250.00 fine deductible from the card used at the time of your booking.
            </p>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">10. Agency Commission</p>
            <p class="mt-1 mb-5 text-white text-[13px]">
                Agency bookings are welcomed at Rosedene Highland House, however all bookings are non-commissionable unless otherwise agreed with Rosedene Highland House. For more information please contact our Reservations Team.
            </p>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">11. General terms and conditions</p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li>We regret that, with the exception of assistance dogs, no pets are allowed into Rosedene Highland House.</li>
                <li>Reservations for Apartments are nontransferable and must not, under any circumstances, be sold or otherwise transferred to a third party who is not a member of your group.</li>
                <li>All the information provided by guest is their responsibility and should be correct at the time of submission, in particular the email address. Rosedene Highland House cannot be held responsible for missing or delayed emails.</li>
                <li>You must not advertise, market or otherwise offer any of the Rosedene Highland House accommodation for sale either on its own or as part of a combined offer.</li>
                <li>Prices include VAT, unless otherwise stated. All prices and details are correct at the time of publishing and are subject to change without prior notice.</li>
                <li>Rosedene Highland House do not accept liability for any failure to provide services contracted due to circumstances beyond our control including industrial action, postal communication, plant failures, supply of gas, electricity and water or fire alarm evacuation.</li>
                <li>Occasionally the Management may need to change the Apartment booked due to unforeseeable changes which may be out of our control and we reserve the right to do so.</li>
                <li>
                    A change could be made for the whole or a major part of your stay; to accommodation of a lower official classification or standard. Should we need to make a change or cancellation, we would advise you as soon as possible. If there is time to do so before your arrival, we would offer you the choice of the following options:
                    <ul class="list-[circle] pl-5 mt-2 space-y-1">
                      <li>Accepting the changed arrangements or</li>
                      <li>Paying the difference for a suite of higher official classification or standard.</li>
                      <li>Cancelling or accepting the cancellation in which case you would not be charged by us.</li>
                    </ul>
                </li>
                <li>No liability can be accepted where we are forced to make a change or cancel as a result of unusual and unforeseeable circumstances beyond our control, the consequences of which we could not have avoided even with all due care. No compensation will be payable and the above options would not be available if we cancel as a result of your failure to comply with any requirement of the booking, entitling us to cancel.</li>
                <li>Rosedene Highland House reserves the right to book you into another Apartment with similar accommodation, should the service or accommodation you require not be available due to unforeseen circumstances.</li>
                <li>In all cases, our liability for significant changes and cancellations is limited to offering you the above mentioned choices. We regret we cannot pay any expenses, cost or losses incurred by you as a result of any change or cancellation</li>
                <li>All packages and offer promotions are standalone, and are not valid in conjunction with any other offer or package and may be withdrawn at any time without notice</li>
            </ul>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">12. Group Bookings</p>
            <p class="text-white text-[13px]">
                A booking of two Apartments or more is considered a group booking within Rosedene Highland House. If a group of individuals have booked separately for e.g. weddings, parties, then Rosedene Highland House reserves the right to enforce Group terms and conditions to those bookings regardless of the booking channel used to book.
            </p>

            <p class="mt-4 mb-2 font-semibold text-white text-[13px]">12.1 Whole Property Booking</p>
            <p class="text-white text-[13px]">
                Rosedene Highland House is available to book as whole, special terms and conditions apply. Please contact Management for further information.
            </p>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">13. Group Bookings</p>

            <p class="mt-4 mb-2 font-semibold text-white text-[13px]">13.1 Confirming Group Bookings</p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li>All group bookings can be reserved with a non-refundable £1000 deposit, payable upon confirming the booking.</li>
                <li>A 30% deposit is required 6 months prior to arrival. This deposit is fully refundable up to 3 months prior to the first arrival date. Following this, the deposit is fully non-refundable.</li>
                <li>Rosedene Highland House will require a contract to be entered into that sets out the terms of the options and booking conditions. The remaining 70% would be charged 14 days prior to arrival. Any extra spend will be settled during the group’s stay.</li>
                <li>Bookings will be reserved with a valid credit or debit card. The credit or debit card used at time of booking must be presented at check-in to validate the booking. The deposits can also be paid for by BACS transfer.</li>
                <li>If payment is being made by a third party we must have a valid third party authorization form completed and presented prior to booking confirmation</li>
                <li>Credit or debit cards which are unable to be charged will result in the reservation being null and void.</li>
                <li>Cancellations or amendments are not permissible.</li>
                <li>If a booking is not cancelled and the guest(s) does not arrive this is deemed as a No Show. The total cost for the accommodation would still be applicable. Rosedene Highland House reserves the right to amend any portion of an individual or group booking, partially or fully. All effort will be made to ensure guest satisfaction.</li>
            </ul>

            <p class="mt-4 mb-2 font-semibold text-white text-[13px]">13.2 Making a Group Booking</p>
            <p class="text-white text-[13px]">
                If you have any questions about booking group accommodation with Rosedene Highland House please call our dedicated team on <a href="tel:01463218233" class="underline text-white">01463 218 233</a>  or email <a href="mailto:bookings@rosedene-highland-house.com" class="underline text-white">bookings@rosedene-highland-house.com</a>.
            </p>

            <p class="mt-4 mb-2 font-semibold text-white text-[13px]">13.3 Rosedene Highland House Expectations of Your Group</p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li>
                    You are responsible for any damages caused to the allocated rooms or the furnishings including tampering with or moving furnishings and fixtures. If any act, default or neglect by the guests or organizers results in damage or complaints from other guests, the customer shall be liable to pay to Rosedene Highland House on demand the amount required to make good or remedy such damage, Rosedene Highland House may also automatically deduct the amount without notice to you from the payment card used for the booking or any subsequent payment card provided for this use.
                </li>
                <li>
                    In the event of willful or negligent interruption to the business or other customers, Rosedene Highland House will charge the amount of any loss to the Customer and terminate the contract. Rosedene Highland House will not be liable for any refund or compensation in such circumstances.
                </li>
                <li>
                    The contract means the agreement between Rosedene Highland House and the customer for a specific booking or series of bookings. This contract applies Rosedene Highland House and the customer of Rosedene Highland House and no payment will be made to any third parties.
                </li>
                <li>
                    Rosedene Highland House reserves the right to cancel the Customer’s reservation without further notice if there is a breach of these Terms and Conditions.
                </li>
                <li>
                    Rosedene Highland House do not accept liability for any failure to provide services contracted due to circumstances beyond our control including industrial action, postal communication, plant failures, supply of gas, electricity and water or fire alarm evacuation
                </li>
                <li>
                    The details of these Terms and Conditions do not remove the common law duty to mitigate losses.
                </li>
            </ul>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">14. Complaints and Comments</p>
            <p class="mt-1 mb-5 text-white text-[13px]">
                Any complaint or comment regarding a stay at Rosedene Highland House should be made in the first instance to the Management at the time of your stay so that it can be resolved at the time. Any verbal notification must be put in writing and given to the Management as soon as possible. If you are still dissatisfied, you must notify us at the earliest opportunity. If you remain dissatisfied, however, you must write to the General Manager of the property you’re staying in, within 7 days of the end of the stay you have purchased from us giving your booking reference and full details of your complaint. We regret we cannot accept liability if you fail to notify the complaint or claim entirely in accordance with this clause.
            </p>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">15. Internet Fair Use Policy</p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li> The use of the free internet service is subject to the Rosedene Highland House ‘Fair Use Policy’ which we apply so that we can deliver a reliable broadband service to all our guests. The Fair Use Policy means that the performance of our network is monitored and we may restrict the bandwidth available to heavy users during busy periods, so that we can ensure that all guests can enjoy reasonable internet access. Guests wishing to download large files or who are making heavy use of the internet are offered the option of upgrading to the unrestricted secure broadband service by Ethernet cable available at a fee of £2.00 per hour or £40.00 for 24 hours (from when you first log on).</li>
                <li>We will use all reasonable endeavors to make the Service available 24 hours a day, however we will not be liable if for any reason the service is not available at any time or for any period. Access to the service may be suspended at any time. If you require any assistance in relation to the service, you should contact the reception desk.</li>
            </ul>

            <p class="mt-10 mb-2 font-bold text-white text-[14px]">16. Liability</p>
            <ul class="list-disc pl-5 text-white text-[13px] space-y-2">
                <li>Nothing in this agreement shall exclude or limit your or our liability for death or personal injury.</li>
                <li>We shall not be liable to you in contract, tort or otherwise arising in connection with this agreement for any economic losses (including, without limitation, loss of revenues, profits, contracts, business or anticipated savings), any loss of goodwill or reputation, any special, indirect or consequential losses or any destruction or loss of data, software or equipment.</li>
                <li>Prices include VAT. All prices and details are correct at current time and are subject to change without notice.</li>
            </ul>

            




        </div>
          
      </div>
  </section>
  <Footer/>