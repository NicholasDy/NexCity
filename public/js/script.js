// $( function() {
//     var dateFormat = "mm/dd/yy",
//     leaving = $( "#leaving" )
//         .datepicker({
//           defaultDate: "+1w",
//           changeMonth: true,
//           numberOfMonths: 3
//         })
//         .on( "change", function() {
//           returning.datepicker( "option", "minDate", getDate( this ) );
//         }),
//       to = $( "#returning" ).datepicker({
//         defaultDate: "+1w",
//         changeMonth: true,
//         numberOfMonths: 3
//       })
//       .on( "change", function() {
//         leaving.datepicker( "option", "maxDate", getDate( this ) );
//       });

//     function getDate( element ) {
//       var date;
//       try {
//         date = $.datepicker.parseDate( dateFormat, element.value );
//       } catch( error ) {
//         date = null;
//       }

//       return date;
//     }
//   } );

// $(function () {
//   $("#slider-range").slider({
//     range: true,
//     min: 0,
//     max: 2000,
//     values: [75, 300],
//     slide: function (event, ui) {
//       $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
//     },
//   });
//   $("#amount").val(
//     "$" +
//       $("#slider-range").slider("values", 0) +
//       " - $" +
//       $("#slider-range").slider("values", 1)
//   );
// });

// let startDate;
// let returnDate;
// let cityName;
// let budget;

// function getResponse() {
//   const responsePage = {
//     method: "GET",
//     url: "/response",
//     params: {
//       cityName: cityName,
//       budget: budget,
//       startDate: startDate,
//       returnDate: returnDate,
//     },
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   axios.request(responsePage)
//   .then( )
// }

// const resultSect = document.querySelector(".results-section")
// const saveFlights = document.querySelector(".save-flight")
// const resultFlight = document.querySelector(".results")

var endCity = "Tokyo"; // later input used in case we are switching cities or building out the end point
var endCitySymbol = "TYOA";
var travelId = "298184";

var citySymbol = "";
var cityName = "New York";

var resultSect = document.querySelector(".results");

$("#api-inputs").submit(function (event) {
  event.preventDefault();
  startDate = document.querySelector("#leaving").value;
  returnDate = document.querySelector("#returning").value;
  cityName = document.querySelector("#start-city").value.trim();
  budget = document.querySelector("#amount").value.trim();
  $("#api-inputs").modal("hide");
  return;
  // show buttons
});

$("#get-flights").click(gettingTheCityCode);



// skyscanner api
// request for the city code
function gettingTheCityCode() {
  const skyscannerCityName = {
    method: "GET",
    url: "/api/destination/cities/" + cityName,
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .request(skyscannerCityName)
    .then(function (response) {
      // console.log(response.data.Places[0].CityId);
      citySymbol = response.data.Places[0].CityId;
      gettingFlightData(citySymbol);
    })

    .catch(function (error) {
      console.error(error);
    });
}

function gettingFlightData() {
  let flightoptions = {
    method: "GET",
    url: "api/destination/flights",
    params: {
      citySymbol: citySymbol,
      endCity: endCitySymbol,
      startDate: startDate,
      returnDate: returnDate,
    },
    // we can send a post request (bad practice)
    // query string
    // ?symbol=SYM&endSymbol=END&startDate=whatever&returnDate=anotherDate
    // req.query.symbol = SYM
    // req.query.endSymbol = END
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios.request(flightoptions).then(function (response) {
    // console.log(response.data);
    // data.quotes & data.carriers
    generateFlightList(response);
  });
}

function generateFlightList(response) {
  // flightPrice = response.data.Quotes[1].minPrice; //this is added to show what the lowest price option is in the list
  // console.log(response.data.Carriers[0].Name);

  for (let i = 0; i <= response.data.Quotes.length; i++) {
    // generate the list from the options given
    // try to give no more than 10 options

    let flightCells = `
  <div class="card-body results" data-marker='${i}'>
                    <h5 class="card-title">Flight Option #${i + 1}</h5>
                    <p class="card-text">Carrier: <span data-marker='${i}' id="carrier${i}">${
      response.data.Carriers[i].Name
    }</span></p>
                    <p class="card-text">Airport: <span data-marker='${i}' id="airport${i}">${
      response.data.Places[i].IataCode
    }</span></p>
                    <p class="card-text">Min Price: $<span data-marker='${i}' id="price${i}">${
      response.data.Quotes[i].MinPrice
    }</span></p>
                    <button class="save-flight btn btn-primary" id='${i}' onClick='saveFlights(this.id)'>Save Flight</button>
                </div>
  `;
    resultSect.innerHTML += flightCells;
  }
}

function saveFlights(ID) {
  console.log(ID)

  let carrier = document.querySelector(`#carrier${ID}`).textContent
  let price = document.querySelector(`#price${ID}`).textContent
  let budgetLeft = budget - price

  //this is a early version of the save file, when the hotels are going to be added the values will be pushed to an array that will display on the side of the user's page. All of that data will then be what is submitted to the database.
  let savedTrip = {
    method:"POST",
    url:"/apis/trips",
    params: {
      budget: budgetLeft,
      carrier: carrier,
    },
    headers: {
      "Content-Type": "application/json",
    },    
  }

  axios.request(savedTrip)
  .then(function () {
    res.json();

  console.log(carrier,price, budgetLeft)
})
}
