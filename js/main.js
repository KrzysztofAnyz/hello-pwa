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