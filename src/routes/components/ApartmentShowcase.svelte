<!-- Create a new component: ApartmentShowcase.svelte -->
<script>
  import { Button } from "flowbite-svelte";

    export let apartment = {
      title: "Luxury Studio Apartment",
      description: "Spacious 45m² studio with panoramic city views",
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      amenities: ['WiFi', 'Air Conditioning', 'Kitchenette', 'Smart TV', 'Coffee Maker', 'Safe'],
      price: 159,
      images: [
        '/1/0.jpg',
        '/1/1.jpg',
        '/1/2.jpg'
      ]
    };
  
    let activeImage = 0;
  </script>
  
  <section id="apartment-showcase" class="py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Image Gallery -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-4">
          <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <img 
              src={apartment.images[activeImage]}
              alt="Main apartment view"
              class="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
          <div class="grid grid-cols-3 gap-2">
            {#each apartment.images as image, index}
              <button
                on:click={() => activeImage = index}
                class={`aspect-square rounded overflow-hidden ${activeImage === index ? 'ring-2 ring-primary' : ''}`}
              >
                <img 
                  src={image} 
                  alt="Apartment thumbnail {index + 1}"
                  class="w-full h-full object-cover"
                />
              </button>
            {/each}
          </div>
        </div>
  
        <!-- Details Section -->
        <div class="space-y-6">
          <h2 class="text-4xl font-bold text-gray-900">{apartment.title}</h2>
          <p class="text-lg text-gray-600">{apartment.description}</p>
          
          <div class="grid grid-cols-2 gap-4 text-gray-700">
            <div class="flex items-center space-x-2">
              <span class="font-semibold">Guests:</span>
              <span>{apartment.guests}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="font-semibold">Bedrooms:</span>
              <span>{apartment.bedrooms}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="font-semibold">Beds:</span>
              <span>{apartment.beds}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="font-semibold">Bathrooms:</span>
              <span>{apartment.bathrooms}</span>
            </div>
          </div>
  
          <div class="border-t border-b py-6">
            <h3 class="text-xl font-semibold mb-4">Amenities</h3>
            <div class="grid grid-cols-2 gap-2">
              {#each apartment.amenities as amenity}
                <div class="flex items-center space-x-2">
                  <span>•</span>
                  <span>{amenity}</span>
                </div>
              {/each}
            </div>
          </div>
  
          <div class="space-y-4">
            <div class="text-2xl font-bold">
              ${apartment.price} <span class="text-lg font-normal">/ night</span>
            </div>
            <Button size="xl" class="w-full">
              Book Now
            </Button>
            <p class="text-sm text-gray-500 text-center">
              Includes all taxes and fees
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>