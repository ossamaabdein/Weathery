//  Declaring variables for manipulation

var searchInput = document.getElementById("searchInput");
var findBtn = document.getElementById("findBtn");
var today = document.getElementById("today");
var todayDate = document.getElementById("todayDate");
var currentLocation = document.getElementById("currentLocation");
var currentTemp = document.getElementById("currentTemp");
var CurrentIcon = document.getElementById("CurrentIcon");
var currentWeatherStatus = document.getElementById("currentWeatherStatus");
var rainIcon = document.getElementById("rainIcon");
var rainChance = document.getElementById("rainChance");
var windIcon = document.getElementById("windIcon");
var windSpeed = document.getElementById("windSpeed");
var CompassIcon = document.getElementById("CompassIcon");
var windDirection = document.getElementById("windDirection");
var Tomorrow = document.getElementById("Tomorrow");
var TomorrowWeatherIcon = document.getElementById("TomorrowWeatherIcon");
var TomorrowHigherTemp = document.getElementById("TomorrowHigherTemp");
var TomorrowLowerTemp = document.getElementById("TomorrowLowerTemp");
var TomorrowWeatherStatus = document.getElementById("TomorrowWeatherStatus");
var afterTomorrow = document.getElementById("afterTomorrow");
var afterTomorrowWeatherIcon = document.getElementById("afterTomorrowWeatherIcon");
var afterTomorrowHigherTemp = document.getElementById("afterTomorrowHigherTemp");
var afterTomorrowLowerTemp = document.getElementById("afterTomorrowLowerTemp");
var afterTomorrowWeatherStatus = document.getElementById("afterTomorrowWeatherStatus");


// default value with "ip" to detect current location
var cityName = "auto:ip";

var weatherData;
var TomorrowData;
var afterTomorrowData;

// initial values for weather on page load
window.onload = allOfThem();

// searchInput.addEventListener("keyup", function(){
//     cityName = searchInput.value;
    
//     // displayData();
//     // displayTomorrowData();
//     // displayafterTomorrowData();
// })

// console.log(cityName);


// Get today`s date
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var d = new Date();
var TodayName = days[d.getDay()];
// console.log(d.toISOString().split('T')[0])

var TomorrowName;
var afterTomorrowName;

if (d.getDay() == days.length-2) {
    TomorrowName = days[days.length-1]
    afterTomorrowName = days[0];
} else if (d.getDay() == days.length-1) {
    TomorrowName = days[0]
    afterTomorrowName = days[1];
} else {
    TomorrowName = days[d.getDay()+1];
    afterTomorrowName = days[d.getDay()+2];
}


today.innerHTML = TodayName;
todayDate.innerHTML = d.toISOString().split('T')[0];
Tomorrow.innerHTML = TomorrowName;
afterTomorrow.innerHTML = afterTomorrowName; 



async function getData(cityName) {
    var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c6e6458ae2cc415aa8191919210809&q=${cityName}&days=3`);
    weatherData = await response.json();
}

findBtn.addEventListener("click", function(){
    cityName = searchInput.value;
    allOfThem();
})


async function allOfThem() {
    await getData(cityName);
    displayData();
    displayTomorrowData();
    displayafterTomorrowData();
}

function displayData() {
    currentLocation.innerHTML = weatherData.location.name;
    currentTemp.innerHTML = `${weatherData.current.temp_c}°C`;
    CurrentIcon.src  = weatherData.current.condition.icon;
    currentWeatherStatus.innerHTML = weatherData.current.condition.text;
    rainChance.innerHTML = `${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    windSpeed.innerHTML = `${weatherData.current.wind_kph}km/h`;
    switch (weatherData.current.wind_dir) {
    case "E":
        windDirection.innerHTML = "East";
        break;
    case "W" :
        windDirection.innerHTML = "West";
        break;
    case "N" :
        windDirection.innerHTML = "North";
        break;
    case "S" :
        windDirection.innerHTML = "South";
        break;
    case "NE" :
        windDirection.innerHTML = "North-East";
        break;
    case "NW" :
        windDirection.innerHTML = "North-West";
        break;
    case "SE" :
        windDirection.innerHTML = "South-East";
        break;
    case "SW" :
        windDirection.innerHTML = "South-West";
        break;
    default:
        windDirection.innerHTML = weatherData.current.wind_dir;
    }
}

function displayTomorrowData() {
    TomorrowWeatherIcon.src = weatherData.forecast.forecastday[1].day.condition.icon;
    TomorrowHigherTemp.innerHTML = `${weatherData.forecast.forecastday[1].day.maxtemp_c}°C`;
    TomorrowLowerTemp.innerHTML = `${weatherData.forecast.forecastday[1].day.mintemp_c}°`;
    TomorrowWeatherStatus.innerHTML = weatherData.forecast.forecastday[1].day.condition.text;
}

function displayafterTomorrowData() {
    afterTomorrowWeatherIcon.src = weatherData.forecast.forecastday[2].day.condition.icon;
    afterTomorrowHigherTemp.innerHTML = `${weatherData.forecast.forecastday[2].day.maxtemp_c}°C`;
    afterTomorrowLowerTemp.innerHTML = `${weatherData.forecast.forecastday[2].day.mintemp_c}°`;
    afterTomorrowWeatherStatus.innerHTML = weatherData.forecast.forecastday[2].day.condition.text;
}



// Saving subscription mail into local storage

var mailInput = document.getElementById("mailInput");
var subscribeBtn = document.getElementById("subscribeBtn");
var subscribers = [];
if (localStorage.getItem("subscribersList") != null) {
    subscribers = JSON.parse(localStorage.getItem("subscribersList"));
}

subscribeBtn.addEventListener("click", function(){
    subscribers.push(mailInput.value);
    localStorage.setItem("subscribersList", JSON.stringify(subscribers))
})



