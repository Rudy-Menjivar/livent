// Pulls search input from the form to build queryURL for eventData API
function buildQueryURL() {
  // Gets value from search input
  var eventSearch = $("#search-input")
  .val()
  .trim();
  // PredictHQ event search
  var queryLink = "https://api.predicthq.com/v1/events/?q=" + eventSearch
  + "&country=US"
  + "&active.gte=2020-11-16&active.lte=2020-11-30&active.tz=America/Los_Angeles&sort=rank"

    console.log(queryLink);

  return queryLink
}
// API data turns into elements on the page
function renderResults(eventData) {
  console.log(eventData);

// Check which radio is checked to return its value
  var numEvents = $('input[name="search-count"]:checked').val();

// Loop and render elements according to selection 
  for (var i = 0; i < numEvents; i++) {
    
    console.log(eventData.results[i]);
// Get exact number of events according to event count
    var eventList = eventData.results[i];
    
// Track every event count
    var eventCount = i + 1;
    console.log(eventCount);

// List group containing events 
    var $eventList = $("<ul>");
    $eventList.addClass("list-group");

// Add element to DOM
    $("#event-results").append($eventList);
    
    var eventTitle = eventList.title;
    console.log(eventTitle);
    
    var eventCat = eventList.category;
    console.log(eventCat);

    var $eventListItem = $("<li class='list-group-item titleHeadline'>");
    
    // If title & categories are present, then append to $eventList
    if (eventTitle && eventCat) {
      $eventListItem.append(
        `<span class='label label-primary'>${eventCount}. </span><strong>${eventTitle}</strong>`
      );
    }
    
    var eventDate = eventList.start;
    // Render Date
    $eventListItem.append(
      `<br><span class'label'>Date: </span><strong>${eventDate}</strong>`
    );
    // Render categories
    $eventListItem.append(
      `<br><span class'label'>Category: </span><strong>${eventCat}</strong>`
    );

    var eventLoc = eventList.location;
    console.log(eventLoc[0]);
    console.log(eventLoc[1]);
    // Render latitudes
    $eventListItem.append(
      `<br><span class'label'>Longitude: </span><strong>${eventLoc[0]}</strong>`
    );
    // Render longitudes
    $eventListItem.append(
      `<br><span class'label'>Latitude: </span><strong>${eventLoc[1]}</strong>`
    );
    
    // var eventDescription = eventList.description;
    // console.log(eventDescription);

    $eventList.append($eventListItem);
  }
}
// Clear any rendered event results
function clear() {
  $("#event-results").empty();
  $("#search-input").val('');
}

$("#search-button").on("click", function(event) {

  event.preventDefault();

  var queryURL = buildQueryURL();

$.ajax({
  url: queryURL,
  method: "GET",
  headers: {"Authorization": "Bearer Q0wsOeBlriMife0WbvdpKFrEwbDRTxISnqZTeQzu"}
}).then(renderResults);
});

$("#clear-all").on("click", clear);

