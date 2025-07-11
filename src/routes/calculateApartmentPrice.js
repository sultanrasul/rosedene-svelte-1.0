// src/utils/calculateApartmentPrice.js

// @ts-ignore
// This function is used so that when they check the dates it ignores the time
// @ts-ignore
function normalizeDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// @ts-ignore
export function calculateApartmentPrice(prices, guests, dateFrom, dateTo) {
  let totalPrice = 0;

  if (prices && prices["Season"]) {
    if (!Array.isArray(prices["Season"])) {
      prices["Season"] = [prices["Season"]];
    }

    // @ts-ignore
    const normalizeDate = date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

    let currentDate = normalizeDate(new Date(dateFrom));
    const endDate = normalizeDate(new Date(dateTo));

    while (currentDate < endDate) {
      // @ts-ignore
      const matchedSeason = prices["Season"].find(season => {
        const seasonStart = normalizeDate(new Date(season["@DateFrom"]));
        const seasonEnd = normalizeDate(new Date(season["@DateTo"]));
        return seasonStart <= currentDate && currentDate <= seasonEnd;
      });

      if (matchedSeason) {
        const price = parseFloat(matchedSeason.Price) || 0;
        const extraCharge = parseFloat(matchedSeason.Extra) || 0;

        totalPrice += price;
        if (guests > 2) {
          totalPrice += extraCharge * (guests - 2);
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return parseFloat(totalPrice.toFixed(2));
}

  
  
  
  // @ts-ignore
  export function calculateRefundableRate(baseRate) {
    const WORST_CASE_PERCENTAGE = 0.0575; // 5.75%
    
    const feeAmount = baseRate * WORST_CASE_PERCENTAGE;

    return parseFloat(feeAmount.toFixed(2));
}
