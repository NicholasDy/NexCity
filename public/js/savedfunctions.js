//listens for button click on the delete button
$(function() {
    //on page load want to populate html with already saved jobs
  
    // On-click for starting the job search.
    $(".deleteBtn").on("click", function() {
      console.log("Delete has been clicked.");
  
      const travelerID = $(this).attr("id");
      console.log(travelerID);
  
      $.ajax("/api/destination/" + travelerID, {
        type: "DELETE"
      }).then(function() {
        //reloads page so can view delete
        location.reload();
      });
    });
  });