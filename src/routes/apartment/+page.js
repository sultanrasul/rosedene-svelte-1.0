// @ts-nocheck
import { apartments } from '../apartments';

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
    const number = url.searchParams.get('number');
    const check_in = url.searchParams.get('check_in');
    const check_out = url.searchParams.get('check_out');
    const adults = url.searchParams.get('adults');
    const children = url.searchParams.get('children');
    const ages = children ? url.searchParams.getAll('ages').map(Number) : []; // Convert ages to an array of numbers
    // @ts-ignore
    const apartmentDetails = apartments[number];

    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed
    };
    const nights = Math.floor((parseDate(check_out) - parseDate(check_in)) / (1000 * 60 * 60 * 24));


    const guests = (adults ? parseInt(adults, 10) : 0) + (children ? parseInt(children, 10) : 0);

    let Prices = null;
    let disabledDates = null;


    // Function to fetch apartment price
    // @ts-ignore
    async function fetchApartmentPrice(propertyId) {
        try {

            const response = await fetch('http://127.0.0.1:5000/check_price', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({property_id: propertyId }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            return data["Prices"];
        } catch (error) {
            console.error('Failed to fetch apartment price:', error);
            return null;
        }
    }

    // Function to fetch blocked apartments
    // @ts-ignore
    async function fetchBlockedApartments(propertyId) {
        try {
            const response = await fetch('http://127.0.0.1:5000/check_calendar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ property_id: propertyId }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const blockedData = await response.json();


            return blockedData
                // @ts-ignore
                .filter(item => item.IsBlocked === "true") // Keep only blocked dates
                // @ts-ignore
                .map(item => item["@Date"]); // Extract the date
                
        } catch (error) {
            console.error('Failed to fetch blocked apartments:', error);
            return null;
        }
    }

    if (apartmentDetails) {
        // Parse dates if provided
        let dateFrom = null;
        let dateTo = null;

        if (check_in && check_out) {
            // @ts-ignore
            const parseDate = (dateStr) => {
                const [day, month, year] = dateStr.split('/').map(Number);
                return { day, month, year };
            };

            dateFrom = parseDate(check_in);
            dateTo = parseDate(check_out);
        }

        // Fetch price data
        // @ts-ignore
        Prices = await fetchApartmentPrice(apartmentDetails.id);

        // Fetch blocked dates
        disabledDates = await fetchBlockedApartments(apartmentDetails.id);
    }

    return {
        number,
        check_in,
        check_out,
        adults,
        children,
        ages, // Array of children's ages
        guests,
        apartmentDetails,
        Prices,
        disabledDates,
        nights,
    };
}
