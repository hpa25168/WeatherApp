function weatherBYZIP(){
    zip = document.getElementById("search").value;
    const weather = fetch("https://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&appid=8314393c09be58a0efed7852aaa25d8c")
    weather.then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
    document.getElementById("city").innerHTML = "Weather in "+data.name
    document.getElementById("description").innerHTML= capitalizeFirstLetter(data.weather[0].description);
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

