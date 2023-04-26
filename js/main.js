  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js');
    });
  }
  function vibrate() {
    window.navigator.vibrate([200, 100, 200]);
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // wyświetlenie lokalizacji na mapie
      // ...
    });
  } else {
    alert("Twoja przeglądarka nie obsługuje geolokalizacji.");
  }
  