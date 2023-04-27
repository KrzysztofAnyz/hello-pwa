  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js');
    });
  }
  function vibrate() {
    window.navigator.vibrate([200]);
  }
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById("coords").innerHTML = `Szerokość: ${latitude}, Długość: ${longitude}`;
  }
  function showError(error) {
    document.getElementById("coords").innerHTML = "Nie udało się pobrać Twojej lokalizacji.";
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("coords").innerHTML = "Twoja przeglądarka nie obsługuje Geolocation.";
  }

  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js');
    });
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
  });
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
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Sortujemy wyniki według odległości od użytkownika
        results.sort((a, b) => {
          const aCoords = a.geometry.location;
          const bCoords = b.geometry.location;
          const aDistance = getDistance(userCoords, { lat: aCoords.lat(), lng: aCoords.lng() });
          const bDistance = getDistance(userCoords, { lat: bCoords.lat(), lng: bCoords.lng() });
          return aDistance - bDistance;
        });
        
        // Wyświetlamy najbliższego mechanika
        const closestMechanic = results[0];
        const mechanicCoords = closestMechanic.geometry.location;
        const marker = new google.maps.Marker({
          position: mechanicCoords,
          map: map,
          title: closestMechanic.name
        });
        
        // Ustawiamy poziom powiększenia mapy, aby pokazać użytkownika i najbliższego mechanika
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(userCoords);
        bounds.extend(mechanicCoords);
        map.fitBounds(bounds);
      }
    });
  }
  
  // Funkcja obliczająca odległość między dwoma punktami na sferze (w tym przypadku na Ziemi)
  function getDistance(from, to) {
    const earthRadius = 6371; // promień Ziemi w kilometrach
    const latDistance = toRadians(to.lat - from.lat);
    const lngDistance = toRadians(to.lng - from.lng);
    const a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
      + Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat))
      * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  }
  function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }