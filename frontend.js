
let closestAngle = 0;
let waitingForGPS = true, waitingForOrientation = true;

function updateGeoLocation(){
if ("geolocation" in navigator) {
    // Get the current position
    navigator.geolocation.getCurrentPosition(
      // Success callback
      function(position) {
        // console.log("Latitude:", position.coords.latitude);
        // console.log("Longitude:", position.coords.longitude);
        window.closest = findClosest(position.coords.latitude, position.coords.longitude);
        document.getElementById('distance').innerText = Math.round(window.closest.distance) + " m";
        document.getElementById('info').innerText = "Aiming for " + window.closest.name + " dons :)";
        closestAngle = window.closest.angle;
        document.getElementById('gps').style.display = 'none';
        waitingForGPS = false;
      },
      // Error callback
      function(error) {
        console.error("Error getting geolocation:", error);
        document.getElementById('gps').innerText = 'GPS not supported :(';
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 30000 //large timeout to accomodate slow GPS lock on some devices
      }
    );
  } else {
    console.log("Geolocation is not supported by your browser");
    document.getElementById('gps').innerText = 'GPS not supported :(';
  }
}

updateGeoLocation();
setInterval(updateGeoLocation, 4000);

if ('DeviceOrientationEvent' in window) {
    window.addEventListener('deviceorientationabsolute', handleOrientation);
} else {
    document.getElementById('orientation').innerText = 'Orientation not supported :(';
}

function handleOrientation(event) {
    var alpha = event.alpha; // rotation around z-axis

    if (alpha !== null) {
        window.angle = alpha;
        waitingForOrientation = false;
        if(!waitingForOrientation && !waitingForGPS){
            document.getElementById('mask').remove();
        }
    }else{
        window.angle = 0;
    }
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) 
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

function calculateAlphaAngle(lat1, lon1, lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    lat1 = toRad(lat1);
    lon1 = toRad(lon1);
    lat2 = toRad(lat2);
    lon2 = toRad(lon2);
  
    // Calculate the differences between the two longitudes and latitudes
    const dLon = lon2 - lon1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  
    // Calculate the angle (bearing) in radians
    let angle = Math.atan2(y, x);
  
    // Convert angle from radians to degrees
    angle = toDegrees(angle);
  
    // Normalize the angle to be between 0 and 360 degrees
    angle = (angle + 360) % 360;
  
    return angle;
  }

// Converts numeric degrees to radians
function toRad(value) 
{
    return value * Math.PI / 180;
}

function toDegrees(value) 
{
    return value * 180 / Math.PI
}


let McDonalds = [
    [ 53.51547, -113.49503, 'Strathcona' ] ,
    [ 53.51767, -113.44172, 'Whyte & 75th' ] ,
    [ 53.52075, -113.51163, 'Garneau' ] ,
    [ 53.50365, -113.45275, 'Avonmore' ] ,
    [ 53.53919, -113.41788, 'Capilano Mall (Relo)' ] ,
    [ 53.56155, -113.46683, 'Stadium 11' ] ,
    [ 53.54658, -113.52284, 'Unity Square' ] ,
    [ 53.55933, -113.50216, 'Kingsway Corner' ] ,
    [ 53.4984, -113.51256, '109th Triangle' ] ,
    [ 53.48752, -113.49573, 'Calgary Trail' ] ,
    [ 53.48107, -113.44356, 'Michaels Park' ] ,
    [ 53.58456, -113.46676, 'Delton Square' ] ,
    [ 53.57064, -113.53547, 'Inglewood' ] ,
    [ 53.56147, -113.55202, 'Westmount (Relo)' ] ,
    [ 53.46808, -113.48691, 'Millwoods' ] ,
    [ 53.51991, -113.57899, 'Lynwood' ] ,
    [ 53.58696, -113.41782, 'Hermitage Square' ] ,
    [ 53.47418, -113.39298, 'Meadowbrook' ] ,
    [ 53.55927, -113.57865, 'Coronation' ] ,
    [ 53.59915, -113.48724, 'Northgate Mall' ] ,
    [ 53.51973, -113.59475, 'Meadowlark' ] ,
    [ 53.59727, -113.42492, 'Fort Road' ] ,
    [ 53.4531, -113.48659, 'S. Edmonton Common' ] ,
    [ 53.4547, -113.42405, 'Hewes Way' ] ,
    [ 53.4795, -113.3667, '17th & Tamarack' ] ,
    [ 53.45346, -113.51351, 'Heritage' ] ,
    [ 53.5997, -113.40139, 'WM Clareview' ] ,
    [ 53.54083, -113.61043, 'Stony Plain' ] ,
    [ 53.51243, -113.33084, 'Sherwood Park - Ordze Road' ] ,
    [ 53.59694, -113.38683, 'Belmont' ] ,
    [ 53.60246, -113.54041, 'Kensington' ] ,
    [ 53.52533, -113.61754, 'Westgate' ] ,
    [ 53.44057, -113.48138, 'WM South Edmonton Common' ] ,
    [ 53.52265, -113.62044, 'West Edmonton' ] ,
    [ 53.53895, -113.3207, 'Baseline Rd' ] ,
    [ 53.6145, -113.51542, 'Castle Downs (Relo)' ] ,
    [ 53.46913, -113.58625, 'Riverbend Square' ] ,
    [ 53.53845, -113.62656, 'Summerlea' ] ,
    [ 53.50288, -113.62609, 'Callingwood Sq' ] ,
    [ 53.56602, -113.32162, 'Roadking' ] ,
    [ 53.62615, -113.49122, 'Namao' ] ,
    [ 53.61936, -113.39878, 'Manning Town Centre' ] ,
    [ 53.42536, -113.4832, 'Ellerslie Crossing Centre' ] ,
    [ 53.53915, -113.64387, 'WM Edmonton West' ] ,
    [ 53.54173, -113.64431, 'Sunwapta' ] ,
    [ 53.42441, -113.51429, 'Southbrook (Ellerslie)' ] ,
    [ 53.42443, -113.42265, 'Harvest Pointe' ] ,
    [ 53.62904, -113.54511, 'Albany Centre' ] ,
    [ 53.4386, -113.60088, 'WM Windermere' ] ,
    [ 53.4949, -113.6647, 'Glastonbury Husky' ] ,
    [ 53.56848, -113.28041, 'Emerald Hills' ] ,
    [ 53.61936, -113.60726, 'Tudor Glen' ] ,
    [ 53.5417, -113.26478, 'Sherwood Park' ] ,
    [ 53.4358, -113.6084, 'Windermere' ] ,
    [ 53.40525, -113.53638, 'Heritage Valley Town Centre' ] ,
    [ 53.52905, -113.6883, 'Lewis Estates' ] ,
    [ 53.63897, -113.62394, 'St. Albert' ] ,
    [ 53.65812, -113.63083, 'Villeneuve' ] ,
    [ 53.65983, -113.6352, 'WM St Albert' ] ,
    [ 53.36477, -113.41606, 'Rue Montalet Centre' ],
    [53.696622361, -113.21049223, 'Fort Sask Walmart'],
    [53.701670118, -113.20300654, 'Fort Sask Main']

]



// McDonalds.forEach(location => {
//     console.log(calcCrow(myLocation[0], myLocation[1], location[0], location[1])*1000);
// });

function findClosest(mylat, mylong){
    shortestDistance = 10000000;
    closest = {distance:"waiting...",angle:0};
    McDonalds.forEach(location => {
        distance = calcCrow(mylat, mylong, location[0], location[1])*1000;
        _angle = calculateAlphaAngle(mylat, mylong, location[0], location[1]);
        if(distance < shortestDistance){
            shortestDistance = distance;
            closest = {
                name : location[2],
                distance : distance,
                angle : _angle
            }
        }
    });
    return closest;
}

function setRotation(angle){
    if(!Number.isNaN(angle)){
      document.getElementById('line').setAttribute("transform", "rotate(" + angle + " 0 0)");
    }
    else console.log('value was not a number')
}

let distanceText = document.getElementById('distance');

function draw(){
    // Get the screen width
    var screenWidth = document.documentElement.clientWidth;
    var screenHeight = document.documentElement.clientHeight;

    let constraint = screenWidth;
    if(screenHeight < constraint){
        constraint = screenHeight;
    }
    
    // Set the radius to half the screen width, minus a little
    var radius = (constraint / 2) - 20; // Subtracting 20 for a little gap
    
    // Set the radius of the circle
    var circle = document.getElementById("circle");
    circle.setAttribute("r", radius);

    // if(window?.closest.angle) closestAngle = window.closest.angle;

    compassRotation = window.angle + closestAngle;

    let radRotation = toRad(compassRotation);

    distanceText.style.left = (screenWidth/2 + (radius + 10) * Math.sin(radRotation) - 40) + 'px';
    distanceText.style.top = (screenHeight/2 - (radius + 10) * Math.cos(radRotation)) + 'px';

    setRotation(compassRotation);

    requestAnimationFrame(draw);
}
draw();