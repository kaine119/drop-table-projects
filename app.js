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
  for (var i =0;i<electricity_coverage.length;i++){
    Categories.categories[0].polys[0].addPolygon([electricity_coverage[i],i]);
  }
  Categories.categories[1].addHeatmapLayer("mine casualties", mine_casualties);
  Categories.onMap(map);
  map.addListener('click', handleClicks);



  var categoryListApp = new Vue({
    el: "#dataFilter",
    data: {
      categories: Categories.categories
    },
    methods: {
      toggleVisibility: function(layer) {
        if (layer.state) {
          layer.offMap();
        } else {
          layer.onMap(map);
        }
      }
    }
  })


  var elem = document.querySelector('.collapsible');
  var instance = M.Collapsible.init(elem, {});


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
  if(Yposition >= 1400){
    document.getElementById('map').style.zIndex = 1;
  }
}
var elem = document.querySelector('.collapsible');
var instance = M.Collapsible.init(elem, {});

function ckChange(id){
  var indexes = id.split("_");
  Categories.toggle_on_off(parseInt(indexes[0]),parseInt(indexes[1]),parseInt(indexes[2]),map);
}

//console.log(html_collapsible_table(Categories))
//document.getElementById("dataFilter").innerHTML = "<h1>HELLO</h1>"
function scrolltobottom(){
  window.scrollTo(0,1500);
}