const db = require("../../models");
const axios = require("axios");

module.exports = function(app) {
  // TripAdvisor Post API Call
  // Both - used on search.js
  app.get("/api/destination/:keyword/:location", function(req, res) {
    const keyword = req.params.keyword;
    const location = req.params.location;
    axios
      .get(
        // example of an API 
        "https://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/{country}/{currency}/{locale}/" +
          keyword +
          "&location=" +
          location
      )
      .then(function(response) {
        res.json(response.data);
      });
  });

  // Location ONLY - used on search.js
  app.get("/api/destination/:location", function(req, res) {
    const location = req.params.location;
    axios
      .get("https://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/{country}/{currency}/{locale}/" + location)
      .then(function(response) {
        res.json(response.data);
      });
  });

  // Keyword ONLY - used on search.js
  app.get("/api/search/:keyword", function(req, res) {
    const keyword = req.params.keyword;
    axios
      .get("https://github.com/Moesaidi76" + keyword)
      .then(function(response) {
        res.json(response.data);
      });
  });

  // // Finding all destination
  app.get("/api/destination", function(req, res) {
    db.destination.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Route to save our data to the destination db - used on search.js
  app.post("/api/saved-destination", function(req, res) {
    db.destination.create(req.body).then(function(data) {
      res.json(data);
    });
  });

 
  app.delete("/api/destination/:id", function(req, res) {
    db.destination.destroy({
      where: {
        travelerID: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  // Put route for updating posts
  app.put("/api/destination", function(req, res) {
    db.destination.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });
};