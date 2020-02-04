function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  var x = document.getElementById("location");

  var lat =  position.coords.latitude;
  var long =  position.coords.longitude;
  var data = lat + "," +long;
  console.log(data);
  x.value = data;
}
