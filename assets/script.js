
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

    console.log(queryLink + eventSearch);
    console.log(queryLink);

  return queryLink
}
// API data turns into elements on the page
function renderResults(eventData) {
  console.log(eventData);
}

function clear() {
  $("#event-section").empty();
}

$("#search-button").on("click", function(event) {

  event.preventDefault();

  clear();

  var queryURL = buildQueryURL();

$.ajax({
  url: queryURL,
  method: "GET",
  headers: {"Authorization": "Bearer Q0wsOeBlriMife0WbvdpKFrEwbDRTxISnqZTeQzu"}
}).then(renderResults);
});

$("#clear-all").on("click", clear);