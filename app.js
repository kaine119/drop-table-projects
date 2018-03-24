var map;
var currentPin;
var Categories = new catObj();
function initMap() {

  // PUT ALL MAP DRAWING HERE!

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 11.5, lng: 104.8},
    zoom: 7
  });

  Categories.addCategory("electrity");
  Categories.addCategory("health hazard");
  Categories.categories[0].addPolyLayer("coverage");
  for (i =0;i<electricity_coverage.length;i++){
  	Categories.categories[0].polys[0].addPolygon([electricity_coverage[i],i]);
  	Categories.categories[0].polys[0].layerObj[i].onMap(map);
  }
  Categories.categories[1].addHeatmapLayer("mine casualties", mine_casualties);
  Categories.categories[1].heatmaps[0].onMap(map);
  
  map.addListener('click', handleClicks)

  /*===============================
  =            TESTING            =
  ===============================*/
  var mineCasualtiesHeatmap = drawHeatmapLayer(mine_casualties);
  mineCasualtiesHeatmap.set("radius", 30);
  new google.maps.Marker({
    position: map.center,
    map: map
  });
  // console.log(findNearbyPointsInHeatmap(map.center, mineCasualtiesHeatmap, 30))
  // console.log(mineCasualtiesHeatmap.data)
  new google.maps.Marker({
    position: findClosestPointInHeatmap(map.center, mineCasualtiesHeatmap).location,
    map: map,
    label: "Closest"
  });


  var polygons = []
  for (var i = 0; i < electricity_coverage.length; i++) {
    var region = drawPolygon(electricity_coverage[i])
    polygons.push(region);
    region.strokeWeight = 0
  }
  // console.log(findPolygonContaining(map.center, polygons))

}
