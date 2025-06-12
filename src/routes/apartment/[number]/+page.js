// @ts-nocheck
import { apartments } from '../../apartments';

export function load({ params }) {
  const number = params.number;
  const apartmentDetails = apartments[number];

  if (!apartmentDetails) {
    throw error(404, 'Apartment not found');
  }

  return { number, apartmentDetails };
}
