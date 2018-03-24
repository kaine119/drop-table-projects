var map;
function initMap() {

  // PUT ALL MAP DRAWING HERE!

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 11.5, lng: 104.8},
    zoom: 8
  });

  var testing = [
    {lat: 11.25, lng: 104.2, weight: 35}
  ]
  addHeatmapLayer(testing)
}

// takes an array of data in the form {lat, lng, weight} 
// and plots all of them on the map.
// lat, lng: coordinates for point
// weight: weight of heatmap point (standard = 1)
function addHeatmapLayer(data) {
  var dataToPlot = [];
  for (var i = 0; i < data.length; i++) { 
    dataToPlot.push({
      location: new google.maps.LatLng(data[i]['lat'], data[i]['lng']),
      weight: data[i]['weight']
    });
  }
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: dataToPlot
  });
  heatmap.setMap(map);
}

