let axios = require("axios").default;

//static inputs for Tokyo
let endCity = "Tokyo"; // later input used in case we are switching cities or building out the end point
let endCitySymbol = "TYOA";
let travelId = "298184";

// inputs for the city
let citySymbol = "";
let cityName = "New York";

//user inputs budgets and nights/people
let budget = 4000;
let adultsNum = 3;
let roomNum = 2;
let flightPrice = "";
let startDate = "2021/05/10";
let returnDate = "2021/05/15";
let nights = "1";

function dateDifference() {
  let date1 = new Date(startDate);
  let date2 = new Date(returnDate);
  let dateDifference = date2.getTime() - date1.getTime();
  nights = dateDifference / (1000 * 3600 * 24);
  console.log(nights);
  gettingLocalHotelAttra();
}

// travel advisor api
async function gettingLocalHotelAttra() {
  const options = {
    method: "GET",
    url: "https://travel-advisor.p.rapidapi.com/hotels/list",
    params: {
      location_id: travelId,
      adults: adultsNum,
      rooms: roomNum,
      nights: nights,
      offset: "0",
      currency: "USD",
      order: "asc",
      limit: "10",
      sort: "recommended",
      lang: "en_US",
    },
    headers: {
      "x-rapidapi-key": "f9ac14ff9dmshd8e1f7338983235p19bab2jsn70df5227ecc6",
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
        let hotelList = response.data.data //don't ask why this is the way that it is
        createHotelOptions (hotelList)
    })
    .catch(function (error) {
      console.error(error);
    });
}

function createHotelOptions(hotelList){
    // creating the list for the user to use from 
    for(let i = 0; i <= hotelList.length; i++){
        //going to pull 
        hotelList[i].photo.images[1];
        hotelList[i].name;
        hotelList[i].reviews;

    }
}

// function to get the lat and long from the hotel selected
function getLatLong() {
  restLatLong(lat, long);
}

//get resturants by Lat/long once the user selects the resturants
//will have to require another function to run that
async function restLatLong(lat, long) {
  const options = {
    method: "GET",
    url: "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng",
    params: {
      latitude: "12.91285",
      longitude: "100.87808",
      limit: "30",
      currency: "USD",
      distance: "3",
      open_now: "true",
      lunit: "mi",
      lang: "en_US",
    },
    headers: {
      "x-rapidapi-key": "f9ac14ff9dmshd8e1f7338983235p19bab2jsn70df5227ecc6",
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

//skyscanner api
// request for the city code
async function gettingTheCityCode() {
  const skyscannerCityName = await {
    method: "GET",
    url:
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/",
    params: { query: cityName },
    headers: {
      "x-rapidapi-key": "f9ac14ff9dmshd8e1f7338983235p19bab2jsn70df5227ecc6",
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    },
  };
  axios
    .request(skyscannerCityName)
    .then(function (response) {
      console.log(response.data.Places[0].CityId);
      citySymbol = response.data.Places[0].CityId;
      gettingFlightData();
    })
    .catch(function (error) {
      console.error(error);
    });
}
async function gettingFlightData() {
  let flightoptions = {
    method: "GET",
    url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${citySymbol}/${endCitySymbol}/${startDate}/${returnDate}`,
    headers: {
      "x-rapidapi-key": "f9ac14ff9dmshd8e1f7338983235p19bab2jsn70df5227ecc6",
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    },
  };
  axios
    .request(flightoptions)
    .then(function (response) {
      flightPrice = response.data.Quotes[1].minPrice;
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// function calls
// gettingTheCityCode();
dateDifference();

// we can get the lat and long from locaHotelAttra()
// the function would be a certain amount of degrees off of the resturant location



//event listener for the calls for the things to do

// will be adding the event listener for the gettingTheCityCode after the user wants to save the data

// function readjustingTheBudget(amountTaken){
// code for taking the correct budget
// }

//we need to loop over the quotes and then display that over to the display page
//we want to create buttons for each of the options so that they can be added to the users account

//then when we add it to the list the remaining budget is readjusted after factoring in the amount from the new add
