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

  

  $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 2000,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  } );

  $('#api-inputs').submit(function(event){
    event.preventDefault(); 
    startDate = document.querySelector("#leaving").value
    returnDate = document.querySelector("#returning").value
    cityName = document.querySelector("#start-city").value.trim()
    budget = document.querySelector("#amount").value.trim()

    let arr = []
    arr.push({start: startDate}, {returnD: returnDate}, {cityN: cityName}, {budget:budget})
    
    console.log(arr)
    
  })