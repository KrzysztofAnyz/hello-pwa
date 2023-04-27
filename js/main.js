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

function showError(error) {
  document.getElementById("coords").innerHTML = "Nie udało się pobrać Twojej lokalizacji.";
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  document.getElementById("coords").innerHTML = "Twoja przeglądarka nie obsługuje Geolocation.";
}

function getClosestMechanic() {
  // Pobieramy współrzędne użytkownika
  const userCoords = {
    lat: parseFloat(document.getElementById('lat').textContent),
    lng: parseFloat(document.getElementById('lng').textContent)
  };

  // Tworzymy obiekt Google Places Service
  const service = new google.maps.places.PlacesService(map);

  // Określamy parametry wyszukiwania
  const request = {
    location: new google.maps.LatLng(userCoords.lat, userCoords.lng),
    radius: '500',
    type: ['car_repair']
  };

  // Wywołujemy metodę placesNearby, aby wyszukać mechaników w okolicy użytkownika
  service.nearbySearch(request, handleSearchResults); // Pass the request object and the callback function
}

function handleSearchResults(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    // Sort the results by distance from the user
    results.sort((a, b) => {
      const aDistance = google.maps.geometry.spherical.computeDistanceBetween(a.geometry.location, map.getCenter());
      const bDistance = google.maps.geometry.spherical.computeDistanceBetween(b.geometry.location, map.getCenter());
      return aDistance - bDistance;
    });

    // Display the closest mechanic
    const closest = results[0];
    const name = closest.name;
    const vicinity = closest.vicinity;
    const location = closest.geometry.location;
    // Add a marker for the closest mechanic
const marker = new google.maps.Marker({
  position: location,
  map: map
});

// Add an info window for the marker
const infowindow = new google.maps.InfoWindow({
  content: `<strong>${name}</strong><br>${vicinity}`
});

// Open the info window
infowindow.open(map, marker);
}
}

document.getElementById("find-mechanic").addEventListener("click", getClosestMechanic);