$(function() {
    //on page load want to populate html with already saved jobs
  
    // On-click for starting the job search.
    $("#searchBtn").on("click", function() {
      //put in code to clear previous search results
      $("#results").empty();
      console.log("Search has been clicked.");
  
      const keyword = $("#autocomplete-keyword-input").val();
      const location = $("#autocomplete-location-input").val();
  
      // This portion gets the API's information based off your search
  
      // Both Searches
      if (keyword.length > 0 && location.length > 0) {
        $.get("/api/destination/" + keyword + "/" + location).then(function(data) {
          console.log(data);
          generateResults(data);
        });
  
        //   Location ONLY
      } else if (location.length > 0 && keyword.length === 0) {
        $.get("/api/destination/" + location).then(function(data) {
          console.log(data);
          generateResults(data);
        });
  
        //   Keyword ONLY
      } else if (keyword.length > 0 && location.length === 0) {
        $.get("/api/search/" + keyword).then(function(data) {
          console.log(data);
          generateResults(data);
        });
      } else {
        alert("Please enter a search");
      }
    });
  });
  
  function generateResults(data) {
    //returns json response with trip result 
  
    // For-Loop that dynamically adds data in tables using Materialize i.e. What you see after you hit search
    for (const i = 0; i < data.length; i++) {
      const row = $("<tr>");
      const td = $("<td>");
      td.append(
        data[i].quotes +
          "<br>" +
          data[i].location +
          "<br>" +
          data[i].places +
          "<br>" +
          data[i].how_to_apply +
          "<br>" +
          data[i].travelerID +
          "<br><br>"
      );
  
      //   Dynamically created Save button and adding data attributes to them
      const button = $("<button>");
      button.text("Save");
      button.attr("class", "saveBtn waves-effect waves-light btn");
      button.attr("data-id", data[i].id);
      button.attr("data-index", i);
  
      //   Adds everything to table
      td.append(button);
      row.append(td);
      $("#results").append(row);
    }
  
    $("#numResults").html(data.length);
  
    // Save button that saves data to our database
    $(".saveBtn").on("click", function() {
      const i = $(this).attr("data-index");
      console.log(data[i]);
      const savedSearch = {};
  
      savedSearch.quotes = data[i].quotes;
      savedSearch.location = data[i].location;
      savedSearch.places = data[i].places;
      savedSearch.recievePackages = data[i].how_to_apply;   // fix this issue ******************
      savedSearch.travelerID = data[i].id;
  
      $.ajax("/api/saved-destination", {
        type: "POST",
        data: savedSearch
      }).then(function() {
        console.log("Save has been clicked.");
      });
  
      // } //closes else
    });
  }