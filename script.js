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
  

