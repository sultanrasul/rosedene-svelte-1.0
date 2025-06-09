// src/utils/calculateApartmentPrice.js

// @ts-ignore
export function calculateApartmentPrice(prices, guests, dateFrom, dateTo) {
    let totalPrice = 0;
  
    if (prices && prices["Season"]) {
      if (!Array.isArray(prices["Season"])) {
        prices["Season"] = [prices["Season"]];
      }
  
      let currentDate = new Date(dateFrom);
  
      while (currentDate < new Date(dateTo)) {
        // @ts-ignore
        prices["Season"].forEach(season => {
          const seasonStart = new Date(season["@DateFrom"]);
          const seasonEnd = new Date(season["@DateTo"]);
  
          if (!isNaN(seasonStart.getTime()) && !isNaN(seasonEnd.getTime())) {
            const price = parseFloat(season.Price) || 0;
            const extraCharge = parseFloat(season.Extra) || 0;
  
            if (seasonStart <= currentDate && currentDate <= seasonEnd) {
              totalPrice += price;
              if (guests > 2) {
                totalPrice += extraCharge * (guests - 2);
              }
            }
          }
        });
  
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
