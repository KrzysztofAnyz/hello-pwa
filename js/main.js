if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js');
  });
}

let map; // Define the map object outside the getCurrentPosition function

function vibrate() {
  window.navigator.vibrate([200]);
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  document.getElementById("coords").innerHTML = `Szerokość: ${latitude}, Długość: ${longitude}`;

  const latlng = new google.maps.LatLng(latitude, longitude); // Create a LatLng object

  map = L.map('map').setView([latitude, longitude], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);
  L.marker([latitude, longitude]).addTo(map);
}
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      initMap(currentLocation);
    }, function() {
      // Handle Geolocation error
    });
  } else {
    // Browser doesn't support Geolocation
  }
}

function showError(error) {
  document.getElementById("coords").innerHTML = "Nie udało się pobrać Twojej lokalizacji.";
}
