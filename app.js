var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 11.5, lng: 104.8},
    zoom: 7
  });
}
