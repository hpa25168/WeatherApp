// true = using fahrenheit, false = using celsius
var fahrenheit = true;
// save the fahrenheit value when displaying celsius, that way, we can convert back without rounding errors
var savedFaren;
function weatherBYZIP(){
    zip = document.getElementById("search").value;
    const weather = fetch("https://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&appid=8314393c09be58a0efed7852aaa25d8c&units=imperial")
    weather.then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
       // switchBg(data.weather[0].description)
        elementChange(data);
    }).catch(function(){
      alert("Could not get Weather Data")
    })
}
function weatherByCity()
{
    city = document.getElementById("searchCity").value;
    var select = document.getElementById("state")
    var state = select.options[select.selectedIndex].text;
    if (state == "State"){
      alert("Invalid State")
    } else {
      
      const weather = fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+","+state+",us&appid=8314393c09be58a0efed7852aaa25d8c&units=imperial")
      weather.then(function(resp) { return resp.json() }) // Convert data to json
      .then(function(data) {
        // switchBg(data.weather[0].description)
          elementChange(data);
      }).catch(function(){
        alert("Could not get Weather Data")
      })
    }
    
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function elementChange(data)
{
  if (data.name){
    document.getElementById("city").innerHTML = "Weather in "+data.name;
  }
    if (fahrenheit)
    {
        document.getElementById("temp").innerHTML = Math.ceil(data.main.temp) +"°F";
    } else 
    {
      savedFaren = Math.ceil(data.main.temp);
      let cel =Math.ceil(fToC(savedFaren))
      document.getElementById("temp").innerHTML = cel +"°C";

    }
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

function fTempChange() {
    if (fahrenheit == true) {
        var currTemp = parseInt(document.getElementById("temp").innerHTML, 10);
        console.log(currTemp)
        if (!isNaN(currTemp))
        {
          savedFaren = currTemp;
          var converted = fToC(currTemp);
          document.getElementById("temp").innerHTML = Math.ceil(converted) + "°C";
        }
        fahrenheit = false;
    } else if (fahrenheit == false) {
      if (!isNaN(savedFaren)){
        document.getElementById("temp").innerHTML = savedFaren + "°F";
      }
        fahrenheit = true;
    }
}
/*
function switchBg(main){
    switch (main) {
        case "Snow":
          document.getElementById("wrapper-bg").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
          break;
        case "Clouds":
          document.getElementById("wrapper-bg").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
          break;
        case "Fog":
          document.getElementById("wrapper-bg").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
          break;
        case "Rain":
          document.getElementById("wrapper-bg").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
          break;
        case "Clear":
          document.getElementById("wrapper-bg").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
          break;
        case "Thunderstorm":
          document.getElementById("wrapper-bg").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
          break;
        default:
          document.getElementById("wrapper-bg").style.backgroundImage =
            "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
          break;
    }
}  
*/
function zipOrCity()
{
  zipStr= document.getElementById("search").value;
  cityStr=document.getElementById("searchCity").value;
  if(zipStr != "")
  {
    const reg = new RegExp("[0-9]{5}")
    if (reg.test(zipStr))
    {
      weatherBYZIP();
    } else {
      alert("Invaild Zip Code")
    }
  } else if (cityStr != ""){
    weatherByCity()
  } else {
    alert("There is no input")
  }
}

document.addEventListener("keyup", function(event) {
  if (event.code === 'Enter' || event.code == 'NumpadEnter') {
      zipOrCity();
  }
});