// Pulls search input from the form to build queryURL for eventData API
function buildQueryURL() {
  // Gets value from search input
  var eventSearch = $("#search-input")
  .val()
  .trim();
  // PredictHQ event search
  var queryLink = "https://api.predicthq.com/v1/events/"
  // + "location_around.origin=40.782409,-73.971885&location_around.offset=1km"
  // + "?relevance=q,within"
  + "?q=" + eventSearch
  // + "?within=100mi@38.7945892,-121.32270899999999"
  // + "?location_around.origin=38.7945892,-121.32270899999999"
  // + "?location_around.offset=10km"
  + "&country=US"
  + "&active.gte=2020-11-17&active.lte=2020-11-30"
  + "&active.tz=America/Los_Angeles&sort=rank"

    console.log(queryLink);
  // Clear any previous event-results 
$("#event-results").empty();
  return queryLink
}
// API data turns into elements on the page
function renderResults(eventData) {
  console.log(eventData);

// Check which radio is checked to return its value
  var numEvents = $('input[name="search-count"]:checked').val();
// Loop and render elements according to selection 
  for (var i = 0; i < numEvents; i++) {
// Get exact number of events according to event count
    var eventList = eventData.results[i];
    console.log(eventData.results[i]);
// Track every event count
    var eventCount = i + 1;
    console.log(eventCount);
// List group containing events 
    var $eventList = $("<ul>");
    $eventList.addClass("list-group");
// Add element to DOM
    $("#event-results").append($eventList);
    
    var eventTitle = eventList.title;
    var eventCat = eventList.category;
    var $eventListItem = $("<li class='list-group-item titleHeadline'>");
    
    // If title & categories are present, then append to $eventList
    if (eventTitle && eventCat) {
      $eventListItem.append(
        `<span class='label label-primary'></span><strong>${eventTitle}</strong>`
      );
    }
    // Render Date
    var eventDate = eventList.start;
    $eventListItem.append(
      `<br><span class'label'><strong>Date: </strong></span>${eventDate}`
    );
    // Render categories
    $eventListItem.append(
      `<br><span class'label'><strong>Category: </strong></span>${eventCat}`
    );
    // Provide event locatation coordinates
    var eventLoc = eventList.location;
    $eventListItem.append(
      `<br><span class'label'>Longitude: </span><strong>${eventLoc[0]}</strong>`
    );
    $eventListItem.append(
      `<br><span class'label'>Latitude: </span><strong>${eventLoc[1]}</strong>`
    );
    // Render search data & make card appear
    $eventList.append($eventListItem);
    $(".card").css("visibility", "visible");
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

