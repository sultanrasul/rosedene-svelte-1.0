import {User, CircleParking, icons, Circle, UtensilsCrossed, Wifi, BedDouble, Sofa, Monitor, Flower2, Fence, ConciergeBellIcon, ConciergeBell, CircleAlert, Lock, MessagesSquare} from "lucide-svelte";
export const amenities = [
    {
      category: "Great for your stay",
      icon: User,
      items: [
        "Parking",
        "Private bathroom",
        "Kitchen",
        "Free WiFi",
        "Flat-screen TV",
        "Free parking",
        "Washing machine",
        "Shower",
        "Private parking",
      ],
    },
    {
      category: "Parking",
      icon: CircleParking,
      items: [
        "Free private parking is possible on site (reservation is not needed).",
      ],
    },
    {
      category: "Internet",
      icon: Wifi,
      items: [
        "WiFi is available in all areas and is free of charge.",
      ],
    },
    {
      category: "Kitchen",
      icon: UtensilsCrossed,
      items: [
        "Dining table",
        "Cleaning products",
        "Toaster",
        "Oven",
        "Kitchenware",
        "Electric kettle",
        "Kitchen",
        "Washing machine",
        "Dishwasher",
        "Microwave",
        "Refrigerator",
      ],
    },
    {
      category: "Bedroom",
      icon: BedDouble,
      items: [
        "Linen",
        "Extra long beds (> 2 metres)",
      ],
    },
    {
      category: "Bathroom",
      icon : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 lucide lucide-toilet w-6 h-6">
                    <path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"/>
                    <path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"/>
                </svg>`,
      items: [
        "Toilet paper",
        "Towels",
        "Private bathroom",
        "Toilet",
        "Free toiletries",
        "Bathrobe",
        "Hairdryer",
        "Shower",
      ],
    },
    {
      category: "Living Area",
      icon: Sofa,
      items: [
        "Dining area",
        "Sofa",
        "Seating Area",
        "Desk",
      ],
    },
    {
      category: "Media & Technology",
      icon: Monitor,
      items: [
        "Flat-screen TV",
      ],
    },
    {
      category: "Room Amenities",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"" class="w-6 h-6 mr-2">
              <path d="M9 16.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0M12 15h8.5c.69 0 1.25.56 1.25 1.25v2.5l.75-.75H12l.75.75v-4.5zm0-1.5a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75v-2.5a2.75 2.75 0 0 0-2.75-2.75zm-10.5 6h21l-.75-.75v3l.75-.75h-21l.75.75v-3zm0-1.5a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h21a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75zm.75 5.25v-9a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0m21 0v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0M19.4 6.001 19.403 6H15.1v.001l.562-4.5V1.5h3.176L19.4 6zm1.49-.187-.564-4.5A1.5 1.5 0 0 0 18.838 0h-3.176a1.5 1.5 0 0 0-1.488 1.314l-.563 4.5A1.5 1.5 0 0 0 15.102 7.5H19.4a1.5 1.5 0 0 0 1.49-1.687zm-4.39.936v4.5a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-1.5 0"></path>
              </svg>`,
      items: [
        "Socket near the bed",
        "Sofa bed",
        "Clothes rack",
        "Hardwood or parquet floors",
        "Soundproofing",
        "Ironing facilities",
      ],
    },
    {
      category: "Accessibility",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 mr-2">
                <path d="M13.125 3.56a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0m1.5 0a3.375 3.375 0 1 0-6.75 0 3.375 3.375 0 0 0 6.75 0m3.454 18.335-1.836-3.67a.75.75 0 0 0-.671-.415H11.25a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v6c0 .414.336.75.75.75h3.75a.75.75 0 0 1 .671.415l2.25 4.5a.75.75 0 0 1-1.342.67m-1.342.671a2.25 2.25 0 1 0 4.026-2.012l-2.25-4.5A2.25 2.25 0 0 0 16.5 14.81h-3.75l.75.75v-6a2.25 2.25 0 0 0-4.5 0v7.5a2.25 2.25 0 0 0 2.25 2.25h4.322l-.67-.415 1.835 3.672zm-4.362-.958a5.25 5.25 0 0 1-5.25-9.096.75.75 0 1 0-.75-1.299 6.75 6.75 0 1 0 6.75 11.694.75.75 0 1 0-.75-1.3z"></path>
              </svg>`,
      items: [
        "Upper floors accessible by stairs only",
      ],
    },
    {
      category: "Outdoors",
      icon: Flower2,
      items: [
        "Garden",
      ],
    },
    {
      category: "Outdoor & View",
      icon: Fence,
      items: [
        "Garden view",
      ],
    },
    {
      category: "Reception services",
      icon: ConciergeBell,
      items: [
        "Invoice provided",
      ],
    },
    {
      category: "Miscellaneous",
      icon: CircleAlert,
      items: [
        "Non-smoking throughout",
        "Heating",
      ],
    },
    {
      category: "Safety & security",
      icon: Lock,
      items: [
        "CCTV outside property",
        "CCTV in common areas",
        "Smoke alarms",
        "24-hour security",
        "Carbon monoxide detector",
      ],
    },
    {
      category: "Languages spoken",
      icon: MessagesSquare,
      items: [
        "English",
      ],
    },
  ];
  