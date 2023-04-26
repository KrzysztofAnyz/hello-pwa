  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js');
    });
  }
  function vibrate() {
    window.navigator.vibrate([200, 100, 200, 100, 200, 100, 1000, 100, 1000, 100, 1000, 100, 200, 100, 200, 100, 200]);
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