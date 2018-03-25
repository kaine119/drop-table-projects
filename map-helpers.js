/*===========================================================
=            helper functions for the Google map            =
===========================================================*/




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
  heatmap.setMap(null);
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
  polygon.setMap(null)
  // add click listeners to all polygons drawn, because they have an area that blocks clicks from reaching map
  polygon.addListener('click', handleClicks);
  return polygon;
}

// takes an origin point (google.maps.LatLng), layer returned from drawHeatmap() and some distance in meters
// and returns an array of points within distance.
function findNearbyPointsInHeatmap(origin, layer, distance) {
  var count;
  layer.data.forEach(function(point) {
    // if the actualdistance between origin and current point is less than distance....
    if (google.maps.geometry.spherical.computeDistanceBetween(point.location, origin) < distance) {
      // it's counted.
      count++;
    }
  });
  return count;
}

// takes an origin point (google.maps.LatLng) and layer returned from drawHeatmap()
// and returns the nearest point on the layer.
function findClosestPointInHeatmap(origin, layer) {
  var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween; // shortcut
  var toReturn = layer.data.getAt(0).location, // initialize; if nothing else is smaller, first will be returned
      minDistance = google.maps.geometry.spherical.computeDistanceBetween(layer.data.getAt(0).location, origin);
  layer.data.forEach(function(point) {
    currentDistance = distanceBetween(origin, point.location);
    if (currentDistance < minDistance) {
      minDistance = currentDistance;
      toReturn = point;
    }
  });
  return toReturn;
}

// takes a target point (google.maps.LatLng) and array of polygons (google.maps.Polygon)
// returns the first polygon the point is in, or null otherwise.
function findPolygonContaining(target, polygons) {
  var contains = google.maps.geometry.poly.containsLocation // shortcut
  for (var i = 0; i < polygons.length; i++) {
    // if the current polygon contains target
    if (contains(target, polygons[i])) {
      // cut the loop short; this is the first polygon the point is in
      return polygons[i];
    }
  }
  // if none of the polygons contain the target, just...
  return null;
}

function handleClicks(event) {
  if (currentPin) currentPin.setMap(null);
  currentPin = null;
  currentPin = new google.maps.Marker({
    position: event.latLng,
    map: map
  });
}

function 