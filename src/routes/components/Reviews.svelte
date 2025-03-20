<script>
// @ts-nocheck

    import { fade } from 'svelte/transition';
    
    let sortBy = 'date';
    let sortDirection = 'desc';
    
    let reviews = [
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "Grant",
    "Location": 10,
    "Negative review": "",
    "Positive review": "",
    "Property reply": "",
    "Reservation Number": "2487605521",
    "Review date": "2022-03-06 0:25:02",
    "Review score": 10,
    "Review title": "",
    "Staff": 10,
    "Value for money": 10
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "Keith",
    "Location": 10,
    "Negative review": "Nothing",
    "Positive review": "Amjed, the property manager, personally met us on arrival and enthusiastically showed us around and made us feel at home.  Very spacious and modern facilities.  Easy walking distance to river and restaurants in Inverness.  On site parking and good Wifi.",
    "Property reply": "Dear Keith, thanks for your great feedback. It was a delight to see you both and we are really happy that everything was to your satisfaction. We are very proud of the achievements at Rosedene and what makes us even more proud is receiving and hosting wonderful guests like you! We look forward to seeing you again soon. All the very best from all at Rosedene Highland House.    ",
    "Reservation Number": "2254010771",
    "Review date": "2022-03-29 14:13:17",
    "Review score": 10,
    "Review title": "A great property with very welcoming host",
    "Staff": 10,
    "Value for money": 10
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "Jacqueline",
    "Location": 10,
    "Negative review": "",
    "Positive review": "",
    "Property reply": "",
    "Reservation Number": "2683436060",
    "Review date": "2022-03-30 15:09:07",
    "Review score": 9,
    "Review title": "",
    "Staff": 10,
    "Value for money": 10
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "Gaynor",
    "Location": 10,
    "Negative review": "The bed was a little too firm for my preference.",
    "Positive review": "",
    "Property reply": "Dear Gaynor, we hope you are well and enjoyed your tour of Inverness and the Highlands. We are just getting an opportunity to say a massive thanks to you both for staying at Rosedene and also for leaving us a wonderful review. It was great to meet you and although you had a short stay it was wonderful to see you both. We hope that you will return again soon. All the very best from all at Rosedene. ",
    "Reservation Number": "2821951016",
    "Review date": "2022-03-31 8:18:40",
    "Review score": 9,
    "Review title": "",
    "Staff": 10,
    "Value for money": 10
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "다은",
    "Location": 10,
    "Negative review": "nothing at all",
    "Positive review": "nice staff, such a clean room, every facilities :)",
    "Property reply": "",
    "Reservation Number": "3643893777",
    "Review date": "2022-04-03 7:01:16",
    "Review score": 9,
    "Review title": "awesome!",
    "Staff": 10,
    "Value for money": 7.5
  },
  {
    "Cleanliness": 0,
    "Comfort": 0,
    "Facilities": 0,
    "Guest name": "다은",
    "Location": 0,
    "Negative review": "",
    "Positive review": "",
    "Property reply": "",
    "Reservation Number": "3794786333",
    "Review date": "2022-04-03 21:06:38",
    "Review score": 9,
    "Review title": "",
    "Staff": 0,
    "Value for money": 0
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "Michelle",
    "Location": 10,
    "Negative review": "",
    "Positive review": "Amazing service we upgraded the room and it was well worth it. Would definitely recommend to friends and will be booking again",
    "Property reply": "Dear Michelle, thank you for your kind review. We are so glad that you enjoyed your stay and it was an absolute pleasure to see you both. We look forward to welcoming you back soon and will take care of your friends and family also. All the best from all at Rosedene Highland House. ",
    "Reservation Number": "3324915730",
    "Review date": "2022-04-03 22:30:07",
    "Review score": 10,
    "Review title": "",
    "Staff": 10,
    "Value for money": 10
  },
  {
    "Cleanliness": 10,
    "Comfort": 7.5,
    "Facilities": 10,
    "Guest name": "JOSE LUIS",
    "Location": 10,
    "Negative review": "maybe, they were carrying out improvement works and the stairs were not clean",
    "Positive review": "Localization (very close the center), kindness of the owner and room quality ",
    "Property reply": "",
    "Reservation Number": "3775128540",
    "Review date": "2022-04-04 18:44:57",
    "Review score": 9,
    "Review title": "Great!",
    "Staff": 10,
    "Value for money": 7.5
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "Scott",
    "Location": 10,
    "Negative review": "",
    "Positive review": "really well presented and owner was very friendly",
    "Property reply": "",
    "Reservation Number": "2336225926",
    "Review date": "2022-04-09 14:50:41",
    "Review score": 10,
    "Review title": "",
    "Staff": 10,
    "Value for money": 10
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "Sarina Martina",
    "Location": 7.5,
    "Negative review": "",
    "Positive review": "",
    "Property reply": "",
    "Reservation Number": "2192755199",
    "Review date": "2022-04-11 15:51:05",
    "Review score": 10,
    "Review title": "",
    "Staff": 10,
    "Value for money": 10
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "Randy",
    "Location": 10,
    "Negative review": "N/A",
    "Positive review": "Wonderful location and spacious, perfect room. Amjed was a gracious host and always available to help us navigate the area. Thanks Amjed!!",
    "Property reply": "Dear Randy, we are just getting an opportunity to thank you for leaving us such a wonderful review. It was an absolute honour to host you at Rosedene, you were such great guests and the memory of your visit will always be here at Rosedene. We are so glad that you enjoyed our great location and facilities. You are welcome back anytime and we really hope to see you again soon. Take care and all the very best from all here at Rosedene Highland House.    ",
    "Reservation Number": "3382092782",
    "Review date": "2022-04-12 14:10:14",
    "Review score": 10,
    "Review title": "Wonderful accommodations that are located just a beautiful stroll along the water from town.",
    "Staff": 10,
    "Value for money": 10
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "Carla",
    "Location": 10,
    "Negative review": "Nada.",
    "Positive review": "O alojamento está preparado para uma estadia ultra confortável, com um conjunto de pequenos luxos que nos n faz querer voltar. O atendimento foi muito simpático e sempre disponível em qualquer momento.",
    "Property reply": "",
    "Reservation Number": "3067297949",
    "Review date": "2022-04-12 22:56:51",
    "Review score": 10,
    "Review title": "alojamento perfeito pelo serviço, condições do apartamento e localização.",
    "Staff": 10,
    "Value for money": 10
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 7.5,
    "Guest name": "Eve",
    "Location": 7.5,
    "Negative review": "Just a few little things which didn't meet expectations when considering the star rating and the price - like providing a washing machine but no washing tablets or powder, there were no cleaning products like anti bac spray or wipes. There was also no bottle opener and some of the dishes were dirty that had been put away in the cupboards. The shower door bangs shut and might break eventually, it needs a soft close solution. It's new and I'm sure these things will get rectified. ",
    "Positive review": "Lovely new apartment! Its very modern and comfortable, the staff member was extremely nice and helpful too. Lovely grounds, about a 15 minute flat walk to the city centre along the river ness which is beautiful. We really did enjoy our stay. ",
    "Property reply": "",
    "Reservation Number": "3570124550",
    "Review date": "2022-04-15 12:15:22",
    "Review score": 0,
    "Review title": "Lovely modern apartment 15 minute walk to centre ",
    "Staff": 10,
    "Value for money": 7.5
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "Neil",
    "Location": 10,
    "Negative review": "",
    "Positive review": "The Accommodation was comfortable, clean and spacious. Amjed was very attentive and was always available if needed. Would definitely recommend for couples, groups or families.\r\n",
    "Property reply": "",
    "Reservation Number": "2690485999",
    "Review date": "2022-04-19 9:50:07",
    "Review score": 10,
    "Review title": "",
    "Staff": 10,
    "Value for money": 10
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "Carole",
    "Location": 10,
    "Negative review": "",
    "Positive review": "Couldn’t fault this overnight stay. Amjed, the owner, was there to welcome us when we arrived and couldn’t have been more helpful. The accommodation was very well furnished and equipped - wish we could have made more use of it but we had to be up and out for the Etape Loch Ness! Would certainly return and recommend to others.",
    "Property reply": "",
    "Reservation Number": "2513736460",
    "Review date": "2022-04-26 13:14:45",
    "Review score": 10,
    "Review title": "Excellent host, accommodation and location.",
    "Staff": 10,
    "Value for money": 10
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 7.5,
    "Guest name": "Esther",
    "Location": 10,
    "Negative review": "Ik miste een bad",
    "Positive review": "De locatie is top!",
    "Property reply": "Dear Esther, we take this opportunity to thank you for choosing to stay at Rosedene, you were fabulous guests. We are delighted that you enjoyed your stay and our fabulous location. \r\n\r\nWe do recall on your final night stay you brought to our attention that you thought you had booked an apartment with a bath. We checked this and you had definitely not booked an apartment with a bath and your booking notes didn’t have any request for a bath either.\r\n \r\nWe would like to take this opportunity to mention that we are on the path towards accreditation for our sustainable tourism efforts, as a part of these efforts there was a reduction in the number of baths incorporated into the building design. Had we known that you would have liked an apartment with a bath we would have happily allocated one to you at the time of your booking. \r\n\r\nThank you so much again for being our special guests and we look forward to welcoming you back to Rosedene very soon. All the best from all at Rosedene Highland House. \r\n\r\n",
    "Reservation Number": "2949262043",
    "Review date": "2022-04-26 15:13:04",
    "Review score": 8,
    "Review title": "Heerlijk appartement, vriendelijke host op een geweldige plek ten opzichte van de stad!",
    "Staff": 10,
    "Value for money": 7.5
  },
  {
    "Cleanliness": 10,
    "Comfort": 7.5,
    "Facilities": 10,
    "Guest name": "Stephen",
    "Location": 10,
    "Negative review": "",
    "Positive review": "",
    "Property reply": "",
    "Reservation Number": "3162488185",
    "Review date": "2022-04-28 12:29:36",
    "Review score": 8,
    "Review title": "",
    "Staff": 7.5,
    "Value for money": 7.5
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 10,
    "Guest name": "Matthew",
    "Location": 10,
    "Negative review": "Hard to say! ",
    "Positive review": "The building is stunning, the room was very spacious and the staff extremely welcoming and helpful!",
    "Property reply": "Dear Matthew, we just wanted to say a big thank you for adding such a fabulous review for us, it really means so much to all our teams here who go out of their way to assist all Guests, its wonderful to get the great feedback. You were fabulous Guests and it was such a pleasure to have you at Rosedene, we would have you back again at Rosedene anytime. Take care and we hope to see you again soon. Best Regards from all at Rosedene Highland House. ",
    "Reservation Number": "3825355743",
    "Review date": "2022-04-28 22:33:05",
    "Review score": 10,
    "Review title": "We had great communication with easy instructions to gain access, met by our host who was great, friendly and informativ",
    "Staff": 10,
    "Value for money": 10
  },
  {
    "Cleanliness": 7.5,
    "Comfort": 10,
    "Facilities": 7.5,
    "Guest name": "Roland",
    "Location": 10,
    "Negative review": "",
    "Positive review": "",
    "Property reply": "",
    "Reservation Number": "2687048159",
    "Review date": "2022-04-29 21:40:25",
    "Review score": 9,
    "Review title": "",
    "Staff": 10,
    "Value for money": 7.5
  },
  {
    "Cleanliness": 10,
    "Comfort": 10,
    "Facilities": 7.5,
    "Guest name": "kim",
    "Location": 7.5,
    "Negative review": "TV too complicated",
    "Positive review": "good facilities and location",
    "Property reply": "Dear Kim,\r\n\r\nThank you so much for adding a lovely review for us, it is greatly appreciated and it was a pleasure to have you both at Rosedene. We are so pleased that you found everything to your satisfaction during your brief stay with us, it was a pleasure to get a chance to give you a small tour and to share some of the fascinating history of this great building. We note your comments regarding the Smart TV’s, we are sorry that you couldn’t operate them, certainly no one has found them difficult. they are so easy to operate and you had a personal demonstration during your check-in, it is a one button action on the remote to put the TV on and then another for all your selections, we were also available 24hrs to assist you if you needed further help and it would have been no problem to assist you anytime if you had asked. We do hope to see you again soon. Thank you from all at Rosedene Highland House. ",
    "Reservation Number": "2554615623",
    "Review date": "2022-05-09 9:53:55",
    "Review score": 9,
    "Review title": "good location,facilities and very clean",
    "Staff": 7.5,
    "Value for money": 7.5
  }
]
    function formatScore(score) {
        const num = Number(score);
        if (num === 10) return '10';
        return num % 1 === 0 ? num.toFixed(1) : num.toFixed(1);
    }

    function formatDateToMonthYear(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric'
        }).format(date);
    }
    // Sorting functions
    const sortReviews = (reviews) => {
        return [...reviews].sort((a, b) => {
            if (sortBy === 'date') {
                return sortDirection === 'asc' 
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            }
            if (sortBy === 'apartment') {
                return sortDirection === 'asc'
                    ? a.apartment.localeCompare(b.apartment)
                    : b.apartment.localeCompare(a.apartment);
            }
            if (sortBy === 'stars') {
                return sortDirection === 'asc'
                    ? a.stars - b.stars
                    : b.stars - a.stars;
            }
            return 0;
        });
    };

    const toggleSortDirection = () => {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    };
</script>

<div class="bg-[#233441] py-24 px-6 relative overflow-hidden min-h-screen">
    <!-- Background Layers -->
    <div class="absolute inset-0 z-0">
        <img 
            src="reviewsBackground.png"
            alt="Scenic background"
            class="w-full h-full object-cover opacity-30 transition-opacity duration-1000"
            style="mask-image: linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%);"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#233441]/90 via-[#233441]/50 to-transparent"></div>
        <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#233441] via-[#233441]/80 to-transparent"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
        <!-- Header Section -->
        <div class="text-center mb-14 space-y-5">
            <div class="inline-flex flex-col items-center">
                <span class="text-[#D1A054] uppercase tracking-widest text-sm mb-3 font-medium">
                    Guest Reviews
                </span>
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-5 relative">
                    Experiences That Speak Volumes
                    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#D1A054]"></div>
                </h2>
                
                <!-- Rating Summary -->
                <div class="mt-6 flex items-center gap-3 text-white/90">
                    <div class="flex items-center gap-1 text-[#D1A054]">
                        {#each Array(5) as _, i}
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        {/each}
                    </div>
                    <span class="text-lg font-medium">4.9/5</span>
                    <span class="text-sm">(Based on 284 reviews)</span>
                </div>
            </div>
        </div>

        <!-- Review Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {#each Array(11) as _, i}
                {#if reviews[i]["Positive review"] != ""}             
                    <div 
                        class="relative bg-white/10 rounded-xl p-6 transition-all hover:bg-white/20 border border-white/20 hover:border-white/30 group"
                        transition:fade
                    >
                        <!-- Header -->
                        <div class="flex items-start justify-between mb-4">
                            <!-- Author Info -->
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#D1A054] to-amber-700 flex items-center justify-center text-white font-medium">
                                    {reviews[i]["Guest name"].split(' ').map(n => n[0]).join('')}                                
                                </div>
                                <div>
                                    <h3 class="text-white font-semibold">{reviews[i]["Guest name"]}</h3>
                                    <p class="text-sm text-white/60">United Kingdom</p>
                                </div>
                            </div>
                            
                            <!-- Date -->
                            <span class="text-sm text-white/50">{formatDateToMonthYear(reviews[i]["Review date"])}</span>
                        </div>

                        <!-- Rating & Details -->
                        <div class="mb-4 flex items-center justify-between">

                            <div class="flex items-center justify-center text-white bg-[#003B95] rounded font-bold rounded-bl-[0px] w-8 h-8">
                                <p >{formatScore(reviews[i]["Review score"])}</p>
                            </div>

                            <span class="text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full">
                                Emperor 1
                            </span>
                        </div>

                        <!-- Review Content -->
                        <p class="text-white/90 mb-5 line-clamp-4">
                            {reviews[i]["Positive review"]}
                        </p>

                        <!-- Stay Details -->
                        <div class="pt-4 border-t border-white/10">
                            <div class="flex flex-wrap gap-3 text-sm text-white/60">
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    2 nights
                                </span>
                                <span>•</span>
                                <span>Group Type</span>
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>

        <!-- CTA Button -->
        <div class="text-center">
            <button 
                on:click={() => { window.location.href = "/reviews"; }}
                class="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D1A054] hover:bg-amber-600 text-white rounded-lg transition-all font-medium group"
            >
                Read All Reviews
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
            </button>
        </div>
    </div>

</div>

<style>
    /* Responsive adjustments */
    @media (max-width: 345px) {
        /* Make rating badge stack vertically */
        .rating-badge {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
        }

    }
</style>