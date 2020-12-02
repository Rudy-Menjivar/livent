# Livent Application

## Description
Livent is an application that allows anyone to search for events by any criteria. A search button will kick off the search and render details.

Only relevant event information will populate for each event found.  Directions will also be displayed using Google Maps API.

## Preview
<img src="assets/livent.gif" width="50%" height="50%" alt="Hazy image of concert performers & crowd with hands in the air">

## User Story
As an event-seeker, who likes to plan for events accordingly, they expect:
- Events presented must be based on the search critera
- Events populated should also be the closest events
- Directions and distance should also populate with a click
- Last searched events must also be displayed or found easily

## Project Outline

Welcome page loads with an event dashboard that includes input options and a map
- A map is centered on Sacramento
- Includes a search input, distance option input, as well as search and clear buttons

When an event is searched
- Information for events are rendered and the search results are saved to local storage
- The last search results are rendered on the page, even after refreshing or reloading page

Each event's details are displayed in a card list group
- Which presents the event information and a get directions button
- When the Get Directions button is clicked
- Permission via a prompt is requested for client's geolocation access
- If permission is granted, the directions are outlined on the map
- Distance and driving time are also relayed

## Project Links
* [GitHub Repository](https://github.com/Rudy-Menjivar/livent)
* [Deployed Site](https://rudy-menjivar.github.io/livent/)

## API's Used
* [PredictHQ](https://www.predicthq.com/api)
* [GoogleMaps](https://developers.google.com/maps/documentation)

## Technologies Used
* [Geolocation](https://developers.google.com/maps/documentation/geolocation/overview)
* [Bulma](https://bulma.io/)
* [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
* [HTML](https://developer.mozilla.org/en-US/docs/Glossary/HTML)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [CSS](https://developer.mozilla.org/en-US/docs/Glossary/CSS)
* [GIF Maker](https://ezgif.com/)

## Created By
Livent was created by team members from UC Davis's Part-Time Full Stack Coding Bootcamp: Rudy, Vijay, Alex and Steven.