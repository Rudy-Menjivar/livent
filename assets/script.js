// Pulls search input from the form to build queryURL for eventData
function buildQueryURL() {
  // Gets value from search input
  var eventSearch = $("#search-input").val().trim();
  // PredictHQ event search
  var queryLink = "https://api.predicthq.com/v1/events/"
  + "?within=300mi@38.7945892,-121.32270899999999"
  + "&start_around.origin=2020-11-17"
  + "&q=" + eventSearch
  + "&country=US&active.gte=2020-11-16"
  console.log(queryLink);
  // Clear any previous event-results 
  $("#event-results").empty();
  return queryLink
}
var eventLoc;
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
// Get title, start date, category, pass location, description & add button 
    var eventTitle = eventList.title;
    var eventDate = eventList.start; 
    var eventCat = eventList.category;
    var eventDescription = eventList.description;
    eventLoc = eventList.location;
    var $eventListItem = $("<li class='list-group-item eventInfo'>");
    
    // If title & categories are present, then append to $eventList
    if (eventTitle && eventCat) {
      $eventListItem.append(
      `<span class='label label-primary'></span><strong>${eventTitle}</strong>`
      );
    }
    // Render Date
    $eventListItem.append(
      `<li><span class'label'><strong>Date: </strong></span>${eventDate}`
    );
    // Render categories
    $eventListItem.append(
      `<li><span class'label'><strong>Category: </strong></span>${eventCat}`
    );
    $eventListItem.append(
      `<li><span class'label'><strong>Description: </strong></span>${eventDescription}`
    );
    // Get Directions Button
    $eventListItem.append(
      `<li><p><button class="directions"> Get Directions </button></p>`
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
  $("#msg").empty();
  $(".card").css("visibility", "hidden");
}

function beginSearch() {
  var eventSearch = $("#search-input").val().trim();
  // If search input isn't empty
  if (eventSearch !== "") {
    buildIt();
    $("#msg").empty();
  } else {
    $("#msg").text("There's nothing to search!");
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

// Initiate these functions with button clicks
$("#search-button").on("click", beginSearch)
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
      if (e.target.className != 'directions') return;

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