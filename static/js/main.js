// Get the current date and time
const now = new Date();
const currentDay = now.getDay();
const currentHour = now.getHours();

function getCurrentSeason(now) {
    const currentMonth = now.getMonth() + 1; // Adding 1 because January is month 0  
    if (currentMonth >= 5 && currentMonth <= 10) {
      if (currentMonth === 7 || currentMonth === 8) {
        return 'summerpeak';
      } else {
        return 'summer';
      }
    } else {
      return 'winter';
    }
}

function getCurrentTimeOfUse(now){
    const currentHour = now.getHours();
    const currentSeason = getCurrentSeason(now);
    let timeOfUse = '';
    if (currentSeason === 'winter') {
      if (currentHour >= 23 || currentHour < 5) {
        timeOfUse = 'Super Off-Peak';
      } else if ((currentHour >= 5 && currentHour < 9) || (currentHour >= 17 && currentHour < 21)) {
        timeOfUse = 'On-Peak';
      } else if ((currentHour >= 9 && currentHour < 17) || (currentHour >= 21 && currentHour < 23)) {
        timeOfUse = 'Off-Peak';
      }
    } else { // Summer and Summer Peak use same on & off-peak times
      if (currentHour >= 23 || currentHour < 5) {
        timeOfUse = 'Super Off-Peak';
      } else if (currentHour >= 14 && currentHour < 20) {
        timeOfUse = 'On-Peak';
      } else {
        timeOfUse = 'Off-Peak';
      }
    }
    return timeOfUse;
  }

function setPricingData() {
    const currentSeason = getCurrentSeason(now);
    const timeOfUse = getCurrentTimeOfUse(now);
    const currentPrice = pricingData[currentSeason][timeOfUse].price;
    return currentPrice;
}

window.onload = setPricingData;
document.addEventListener('DOMContentLoaded', function() {
    const currentPrice = setPricingData();
    document.getElementById('current-price').innerHTML = currentPrice;
    const timeOfUse = getCurrentTimeOfUse(now);
    document.getElementById('timeofuse').innerHTML = timeOfUse;
  });
  