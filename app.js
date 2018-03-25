var map;
function initMap() {

  // PUT ALL MAP DRAWING HERE!

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 11.5, lng: 104.8},
    zoom: 7
  });
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

var Yposition = "";
window.addEventListener("scroll", function(){
  Yposition = window.scrollY;
  updatehtml();
});

var viewportheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

function updatehtml(){
  if(Yposition >= 0){
    document.getElementById('map1').style.height = (viewportheight - Yposition)+"px";
  }
  if (Yposition >= viewportheight){
    document.getElementById('map1').style.height = "0";
  }
  if ((1.6*viewportheight - Yposition)<= 0 ){
    document.getElementById('map2').style.height = "0px";
  }
  else if (Yposition >= 0.7*viewportheight){
    document.getElementById('map2').style.height = (1.6*viewportheight - Yposition)+"px";
  } else {
    document.getElementById('map2').style.height = "100vh";
  }
  if(Yposition >= viewportheight*0.7){
    document.getElementById('navbar').style.position = "fixed";
    document.getElementById('navbar').style.top = "0";
    document.getElementById('navbar').style.bottom = "";
  } else {
    document.getElementById('navbar').style.position = "absolute";
    document.getElementById('navbar').style.bottom = "20vh";
    document.getElementById('navbar').style.top = "";
  }
}