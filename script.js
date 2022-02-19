function weatherBYZIP(){
    zip = document.getElementById("search").value;
    const weather = fetch("https://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&appid=8314393c09be58a0efed7852aaa25d8c&units=imperial")
    weather.then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        console.log(data.main.temp)
        elementChange(data);
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function elementChange(data)
{
    document.getElementById("city").innerHTML = "Weather in "+data.name;
    document.getElementById("temp").innerHTML = Math.ceil(data.main.temp) +"°F";
    document.getElementById("description").innerHTML= capitalizeFirstLetter(data.weather[0].description);
    document.getElementById("humid").innerHTML = "Humidity: "+ data.main.humidity +"%";
    document.getElementById("wind").innerHTML = "Wind Speed: "+ Math.ceil(data.wind.speed)+" MPH"

}

function cToF(celsius) {
  var cTemp = celsius;
  var cToFahr = cTemp * 9 / 5 + 32;
  return cToFahr;
}

function fToC(fahrenheit) {
    var fTemp = fahrenheit;
    var fToCel = (fTemp - 32) * 5 / 9;
    return fToCel;
} //ftoC

var fahrenheit = true;
var savedFaren;
function fTempChange() {
    if (fahrenheit == true) {
        var currTemp = parseInt(document.getElementById("temp").innerHTML, 10);
        savedFaren = currTemp;
        var converted = fToC(currTemp);
        document.getElementById("temp").innerHTML = Math.ceil(converted) + "°C";
        fahrenheit = false;
    } else if (fahrenheit == false) {
        document.getElementById("temp").innerHTML = savedFaren + "°F";
        fahrenheit = true;
    }
}