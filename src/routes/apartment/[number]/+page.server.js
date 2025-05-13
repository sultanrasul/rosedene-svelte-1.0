// @ts-nocheck
import { apartments } from "../../apartments";

// @ts-nocheck
export const prerender = true;

export function entries() {
  return Array.from({ length: 10 }, (_, i) => ({ number: (i + 1).toString() }));
}

// Optional: Load apartment data for prerendering
export async function load({ params, url }) {
  console.log(params, url)
  const number = params.number;
  // You can fetch apartment details here if needed

  const apartmentDetails = apartments[number];

  return { number, apartmentDetails };
}