// @ts-nocheck
import { apartments } from "../../apartments";

// Optional: Load apartment data for prerendering
export async function load({ params, url }) {
  console.log(params, url)
  const number = params.number;
  // You can fetch apartment details here if needed

  const apartmentDetails = apartments[number];

  return { number, apartmentDetails, fullUrl: url.href };
}