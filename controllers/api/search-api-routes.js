const db = require("../../models");
const axios = require("axios");
const router = require("express").Router();

// TripAdvisor Post API Call
// Both - used on search.js

//getting the citycode
router.get("/cities/:name", function (req, res) {
  // do not have to take out the space in the city name for it to run
  const skyscannerCityName = {
    method: "GET",
    url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/",
    params: { query: req.params.name },
    headers: {
      "x-rapidapi-key": process.env.API,
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    },
  };
  axios
    .request(skyscannerCityName)
    .then(function (cityCodeRes) {
      res.json(cityCodeRes.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//getting skyscanner to grab flights
router.get("/flights", function (req, res) {
  // try {
  let endCity = req.query.endCity;
  let citySymbol = req.query.citySymbol;
  let startDate = req.query.startDate;
  let returnDate = req.query.returnDate;

  let flightoptions = {
    method: "GET",
    url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${citySymbol}/${endCity}/${startDate}/${returnDate}`,
    headers: {
      "x-rapidapi-key": process.env.API,
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    },
  };
  axios.request(flightoptions).then(function (flightres) {
    res.json(flightres.data);
  });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

// travel advisor API
// get hotels
router.get("/hotel/:travelId/:people/:rooms/:nights", function (req, res) {
  const hotelOptions = {
    method: "GET",
    url: "https://travel-advisor.p.rapidapi.com/hotels/list",
    params: {
      location_id: req.params.travelId,
      adults: req.params.people,
      rooms: req.params.rooms,
      nights: req.params.nights,
      offset: "0",
      currency: "USD",
      order: "asc",
      limit: "10",
      sort: "recommended",
      lang: "en_US",
    },
    headers: {
      "x-rapidapi-key": process.env.API,
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    },
  };

  axios
    .request(hotelOptions)
    .then(function (response) {
      let hotelList = response.data.data; //don't ask why this is the way that it is
      createHotelOptions(hotelList);
    })
    .catch(function (error) {
      console.error(error);
    });
});
// get rest
// get attractions

router.get("/resturants/:lat/:long", function (req,res){
  const options = {
    method: "GET",
    url: "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng",
    params: {
      latitude: req.params.lat,
      longitude: req.params.long,
      limit: "30",
      currency: "USD",
      distance: "3",
      open_now: "true",
      lunit: "mi",
      lang: "en_US",
    },
    headers: {
      "x-rapidapi-key": process.env.API,
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      createRestOptions(response);
    })
    .catch(function (error) {
      console.error(error);
    });
})


router.get("/attract/:lat/:long")
// Route to save our data to the destination db - used on search.js
router.post("/api/saved-destination", function (req, res) {
  db.destination.create(req.body).then(function (data) {
    res.json(data);
  });
});

router.delete("/api/destination/:id", function (req, res) {
  db.destination
    .destroy({
      where: {
        travelerID: req.params.id,
      },
    })
    .then(function (data) {
      res.json(data);
    });
});

// Put route for updating posts
router.put("/api/destination", function (req, res) {
  db.destination
    .update(req.body, {
      where: {
        id: req.body.id,
      },
    })
    .then(function (data) {
      res.json(data);
    });
});

module.exports = router;
