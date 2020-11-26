var eventLoc;

initLastSearch();
// Render last search results on load
function initLastSearch() {
  var lastSearch = JSON.parse(window.localStorage.getItem("lastSearch"));
  // console.log(lastSearch) // returns 10 arrays
  if (!lastSearch) {
    return;
  } else {
  for (var i = 0; i < lastSearch.length; i++) {
  var $ulEl = $("<ul>");   // List group containing events 
  $ulEl.addClass("list-group");
  var $eventListItem = $("<li class='list-group-item eventInfo'>");
  $("#event-results").append($ulEl);
  
  var eventList = lastSearch[i];
  // console.log(JSON.parse(window.localStorage.getItem("lastSearch"))); / 10 arrays+ length
  var searchResults = {
    eventTitle: eventList.eventTitle,
    eventDate: eventList.eventDate,
    eventCat: eventList.eventCat,
    eventDescription: eventList.eventDescription,
    eventLoc: eventList.eventLoc
  }
  eventLoc = eventList.eventLoc
  // Create elements with bootstrap card list styling
    var $eventListItem = $("<li class='list-group-item eventInfo'>");
    // Render title, date, category, description, directions button onto card
    $eventListItem.append(
    `<span class='label label-primary'></span><strong>${searchResults.eventTitle}</strong>`
      );
    $eventListItem.append(
      `<li><span class'label'><strong>Date: </strong></span>${searchResults.eventDate}`
    );
    $eventListItem.append(
      `<li><span class'label'><strong>Category: </strong></span>${searchResults.eventCat}`
    );
    $eventListItem.append(
      `<li><span class'label'><strong>Description: </strong></span>${searchResults.eventDescription}`
    );
    $eventListItem.append(
      `<li><button id="directions" class="button is-primary is-outlined"> Get Directions </button>`
    );
    $ulEl.append($eventListItem);
    $(".card").css("visibility", "visible");
  }}
};
function beginSearch() {
  var eventSearch = $("#search-input").val().trim();
// If search input isn't empty
  if (eventSearch !== "") {
    buildIt();
    clearLastSearch();
    $("#msg").empty();
    $("#errorMsg").empty();
    $("#search-input").val('');
  } else {
    $("#errorMsg").text("Nothing entered");
    }
}
// buildIt function runs if beginSearch function is true
function buildIt() {
  var queryURL = buildQueryURL();

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {"Authorization": "Bearer Q0wsOeBlriMife0WbvdpKFrEwbDRTxISnqZTeQzu"}
  }).then(renderResults);
};
  // Gets value from search input & selected distance drop down
function buildQueryURL() {
  var eventSearch = $("#search-input").val().trim();
  var distanceValue = $('option[name="distance-value"]:selected').val();
  var queryLink = "https://api.predicthq.com/v1/events/"
  + "?within=" + distanceValue
  + "@38.7945892,-121.32270899999999"
  + "&start_around.origin=2020-11-17"
  + "&q=" + eventSearch
  + "&country=US&active.gte=2020-11-16"
  $("#event-results").empty(); // Clear any previous event-results 
  return queryLink
}
// API data turns into elements on the page
function renderResults(eventData) {
// Loop and render elements & proceed if there are more than zero 
  for (var i = 0; i < eventData.results.length; i++) {
  if (eventData.count === 0) {
    $("#errorMsg").text("No events found");
    $("#errorMsg").css("class", "text-center")
    } else {
  var eventList = eventData.results[i];
  var $ulEl = $("<ul>");
  $ulEl.addClass("list-group");
  $("#event-results").append($ulEl); // Append elements to DOM
  // Array for each event's: title, start date, category, description & loc
  var searchResults = {
    eventTitle: eventList.title,
    eventDate: eventList.start,
    eventCat: eventList.category,
    eventDescription: eventList.description,
    eventLoc: eventList.location
  }
  eventLoc = eventList.location
  var $eventListItem = $("<li class='list-group-item eventInfo'>");
  // Render title, date, category, description, directions button onto card
  $eventListItem.append(
  `<span class='label label-primary'></span><strong>${searchResults.eventTitle}</strong>`
    );
  $eventListItem.append(
    `<li><span class'label'><strong>Date: </strong></span>${searchResults.eventDate}`
  );
  $eventListItem.append(
    `<li><span class'label'><strong>Category: </strong></span>${searchResults.eventCat}`
  );
  $eventListItem.append(
    `<li><span class'label'><strong>Description: </strong></span>${searchResults.eventDescription}`
  );
  $eventListItem.append(
    `<li><button id="directions" class="button is-primary is-outlined"> Get Directions </button>`
  );
  $ulEl.append($eventListItem);
  $(".card").css("visibility", "visible");
  var lastSearch = JSON.parse(window.localStorage.getItem("lastSearch")) || [];
  lastSearch.push(searchResults)
  window.localStorage.setItem("lastSearch", JSON.stringify(lastSearch));
  }}
}; // Clear last search key (last search data)
function clearLastSearch() {
  window.localStorage.removeItem("lastSearch");
}
// Clear any rendered event results
function clear() {
  $("#event-results").empty();
  $("#search-input").val('');
  $("#msg").empty();
  $("#errorMsg").empty();
  $(".card").css("visibility", "hidden");
  clearLastSearch();
}
// Initiate these functions with button clicks
$("#search-button").on("click", beginSearch);
$("#clear-all").on("click", clear);
    // Initialize and add the map
    const INITIAL_LATLNG = { lat: 38.5816, lng: -121.4944 };
    const INITIAL_OPTIONS = { zoom: 12, scaleControl: true, center: INITIAL_LATLNG };
    const map = new google.maps.Map(document.getElementById('map'), INITIAL_OPTIONS);
    const geocoder = new google.maps.Geocoder();
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // 'callback' here is the function we pass to getUserLocation when we call it below:
    // getUserLocation(() => {})
    function getUserLocation(callback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          // here we call the callback function with the latlng. What we pass to callback here becomes
          // userLatlng below
          callback({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        })
      } else {
        throw new Error("Couldn't get user location");
      }
    }

    function getEventLocation(eventLoc,callback) {
      if (eventLoc) {

          callback({
            lat: eventLoc[1],
            lng: eventLoc[0],
          });

      } else {
        throw new Error("Couldn't get event location");
      }
    }

    function handleGetDirectionsClick(e) {
      // This is making sure that the clicked element is a directions button.
      if (e.target.id != 'directions') return;

      // Get the user location
      getUserLocation((userLatlng) => {
        // Get the event location
        getEventLocation(eventLoc, (eventLatlng) => {

          // Now that we have both latlngs in scope, do the routing
          const route = {
            origin: userLatlng,
            destination: eventLatlng,
            travelMode: 'DRIVING'
          }

          directionsService.route(route, (response, status) => {
            if (status !== 'OK') {
              window.alert('Directions request failed due to ' + status);
              return;
            } else {
              directionsRenderer.setDirections(response); // Add route to the map
              var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
              if (!directionsData) {
                window.alert('Directions request failed');
              } else {
                $("#msg").empty();
                document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
              }
            }
          });
          
        });
      })
    }

    // This happens when the page loads
    (function() {
      // Adding an event handler for any click in the #events div
      document.getElementById('event-results').addEventListener('click', handleGetDirectionsClick);
    }());