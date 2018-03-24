var map;
function initMap() {

  // PUT ALL MAP DRAWING HERE!

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 11.5, lng: 104.8},
    zoom: 7
  });

  // testing
  var testing = [
    {lat: 11.25, lng: 104.2, weight: 35}
  ]
  var heatmap = drawHeatmapLayer(testing);
  heatmap.set('radius', 50)

  var polygonTest = [
    {lat: 11.25, lng: 104.2},
    {lat: 11.75, lng: 104.2},
    {lat: 11.50, lng: 105.0}
  ];
  var polygon = drawPolygon(polygonTest);
  polygon.strokeColor = "#0000ff"
}

// takes an array of data in the form {lat, lng, weight} 
// and plots all of them on the map.
// lat, lng: coordinates for point
// weight: weight of heatmap point (standard = 1)
function drawHeatmapLayer(data) {
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
  return heatmap;
}

// takes an array of coordinates {lat, lng}
// and draws a polygon through those points, in order.
// returns a polygon object
function drawPolygon(points) {
  var polygon = new google.maps.Polygon({
    paths: points,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  polygon.setMap(map)
  return polygon;
}