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
var cityName = "New York"

$("#api-inputs").submit(function (event) {
  event.preventDefault();
  startDate = document.querySelector("#leaving").value;
  returnDate = document.querySelector("#returning").value;
  cityName = document.querySelector("#start-city").value.trim();
  budget = document.querySelector("#amount").value.trim();
  $('#api-inputs').modal('hide');
  return
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
      console.log(response.data.Places[0].CityId);
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
    params:{
      citySymbol: citySymbol,
      endCity: endCitySymbol,
      startDate: startDate,
      returnDate: returnDate  
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
  axios
    .request(flightoptions)
    .then(function (response) {
      console.log(response.data.Carriers[0].Name);
      // data.quotes & data.carriers
      // generateFlightList(response)
    })
    .catch(function (error) {
      console.error(error);
    });
}


// 
