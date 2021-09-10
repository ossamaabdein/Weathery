//  Declaring letiables for manipulation

let searchInput = document.getElementById("searchInput");
let findBtn = document.getElementById("findBtn");
let today = document.getElementById("today");
let todayDate = document.getElementById("todayDate");
let currentLocation = document.getElementById("currentLocation");
let currentTemp = document.getElementById("currentTemp");
let CurrentIcon = document.getElementById("CurrentIcon");
let currentWeatherStatus = document.getElementById("currentWeatherStatus");
let rainIcon = document.getElementById("rainIcon");
let rainChance = document.getElementById("rainChance");
let windIcon = document.getElementById("windIcon");
let windSpeed = document.getElementById("windSpeed");
let CompassIcon = document.getElementById("CompassIcon");
let windDirection = document.getElementById("windDirection");
let Tomorrow = document.getElementById("Tomorrow");
let TomorrowWeatherIcon = document.getElementById("TomorrowWeatherIcon");
let TomorrowHigherTemp = document.getElementById("TomorrowHigherTemp");
let TomorrowLowerTemp = document.getElementById("TomorrowLowerTemp");
let TomorrowWeatherStatus = document.getElementById("TomorrowWeatherStatus");
let afterTomorrow = document.getElementById("afterTomorrow");
let afterTomorrowWeatherIcon = document.getElementById("afterTomorrowWeatherIcon");
let afterTomorrowHigherTemp = document.getElementById("afterTomorrowHigherTemp");
let afterTomorrowLowerTemp = document.getElementById("afterTomorrowLowerTemp");
let afterTomorrowWeatherStatus = document.getElementById("afterTomorrowWeatherStatus");
let sunriseValue = document.getElementById("sunriseValue");
let sunsetValue = document.getElementById("sunsetValue");
let humidityValue = document.getElementById("humidityValue");
let localTimeValue = document.getElementById("localTimeValue");
let pressureValue = document.getElementById("pressureValue");
let visibilityValue = document.getElementById("visibilityValue");
let travelLink = document.getElementById("travelLink");


// More Days
let FourthDay = document.getElementById("FourthDay");
let FourthDayWeatherIcon = document.getElementById("FourthDayWeatherIcon");
let FourthDayHigherTemp = document.getElementById("FourthDayHigherTemp");
let FourthDayLowerTemp = document.getElementById("FourthDayLowerTemp");
let FourthDayWeatherStatus = document.getElementById("FourthDayWeatherStatus");
// Fifth
let FifthDay = document.getElementById("FifthDay");
let FifthDayWeatherIcon = document.getElementById("FifthDayWeatherIcon");
let FifthDayHigherTemp = document.getElementById("FifthDayHigherTemp");
let FifthDayLowerTemp = document.getElementById("FifthDayLowerTemp");
let FifthDayWeatherStatus = document.getElementById("FifthDayWeatherStatus");
// Sixth
let SixthDay = document.getElementById("SixthDay");
let SixthDayWeatherIcon = document.getElementById("SixthDayWeatherIcon");
let SixthDayHigherTemp = document.getElementById("SixthDayHigherTemp");
let SixthDayLowerTemp = document.getElementById("SixthDayLowerTemp");
let SixthDayWeatherStatus = document.getElementById("SixthDayWeatherStatus");



// default value with "ip" to detect current location
let cityName = "auto:ip";
let countryName;

let weatherData;
let fourthData, fifthData, sixthData;

// initial values for weather on page load
window.onload = allOfThem();

searchInput.addEventListener("keyup", function(){
    cityName = searchInput.value;
    allOfThem();
})

console.log(cityName);


// Get today`s date
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let d = new Date();
let TodayName = days[d.getDay()];
let dateOfToday = d.toISOString().split('T')[0];

let TomorrowName;
let afterTomorrowName;
let FourthDayName;
let FifthDayName;
let SixthDayName;

if (d.getDay() == days.length-2) {
    TomorrowName = days[days.length-1]
    afterTomorrowName = days[0];
    FourthDayName = days[1];
    FifthDayName = days[2];
    SixthDayName = days[3];
} else if (d.getDay() == days.length-1) {
    TomorrowName = days[0]
    afterTomorrowName = days[1];
    FourthDayName = days[2];
    FifthDayName = days[3];
    SixthDayName = days[4];
} else {
    TomorrowName = days[d.getDay()+1];
    afterTomorrowName = days[d.getDay()+2];
    FourthDayName = days[d.getDay()+3];
    FifthDayName = days[d.getDay()+4];
    SixthDayName = days[d.getDay()+4];
}


// Fourth day date
d.setDate(d.getDate() + 3);
var fourth = d.toISOString().split('T')[0];
// Fifth day date
d.setDate(d.getDate() + 1);
let fifth = d.toISOString().split('T')[0];
// Sixth day date
d.setDate(d.getDate() + 1);
let sixth = d.toISOString().split('T')[0];






async function getData(cityName) {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c6e6458ae2cc415aa8191919210809&q=${cityName}&days=3`);
    let fourthResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c6e6458ae2cc415aa8191919210809&q=${cityName}&dt=${fourth}`);
    let fifthResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c6e6458ae2cc415aa8191919210809&q=${cityName}&dt=${fifth}`)
    let sixthResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c6e6458ae2cc415aa8191919210809&q=${cityName}&dt=${sixth}`)
    weatherData = await response.json();
    fourthData = await fourthResponse.json();
    fifthData = await fifthResponse.json();
    sixthData = await sixthResponse.json();
}

// Real-time search
findBtn.addEventListener("click", function(){
    cityName = searchInput.value;
    allOfThem();
})


async function allOfThem() {
    await getData(cityName);
    displayData();
    displayTomorrowData();
    displayafterTomorrowData();
    displayMoreDaysData();
}

function displayData() {
    today.innerHTML = TodayName;
    todayDate.innerHTML = dateOfToday;
    currentLocation.innerHTML = weatherData.location.name;
    currentTemp.innerHTML = `${weatherData.current.temp_c}°C`;
    CurrentIcon.src  = weatherData.current.condition.icon;
    currentWeatherStatus.innerHTML = weatherData.current.condition.text;
    rainChance.innerHTML = `${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    windSpeed.innerHTML = `${weatherData.current.wind_kph}km/h`;
    travelLink.href = `https://www.tripadvisor.com/Search?q=${currentLocation.innerHTML}`;
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
    // More Details
    feelsLikeValue.innerHTML = `${weatherData.current.feelslike_c}°C`
    sunriseValue.innerHTML = weatherData.forecast.forecastday[0].astro.sunrise;
    sunsetValue.innerHTML = weatherData.forecast.forecastday[0].astro.sunset;
    humidityValue.innerHTML = `${weatherData.current.humidity}%`;
    localTimeValue.innerHTML = weatherData.location.localtime.slice(10);
    pressureValue.innerHTML = `${weatherData.current.pressure_mb} mb`;
    countryName = weatherData.location.country;
}

function displayTomorrowData() {
    Tomorrow.innerHTML = TomorrowName;
    TomorrowWeatherIcon.src = weatherData.forecast.forecastday[1].day.condition.icon;
    TomorrowHigherTemp.innerHTML = `${weatherData.forecast.forecastday[1].day.maxtemp_c}°C`;
    TomorrowLowerTemp.innerHTML = `${weatherData.forecast.forecastday[1].day.mintemp_c}°`;
    TomorrowWeatherStatus.innerHTML = weatherData.forecast.forecastday[1].day.condition.text;
}

function displayafterTomorrowData() {
    afterTomorrow.innerHTML = afterTomorrowName; 
    afterTomorrowWeatherIcon.src = weatherData.forecast.forecastday[2].day.condition.icon;
    afterTomorrowHigherTemp.innerHTML = `${weatherData.forecast.forecastday[2].day.maxtemp_c}°C`;
    afterTomorrowLowerTemp.innerHTML = `${weatherData.forecast.forecastday[2].day.mintemp_c}°`;
    afterTomorrowWeatherStatus.innerHTML = weatherData.forecast.forecastday[2].day.condition.text;
}

function displayMoreDaysData() {
    //  Fourth
    FourthDay.innerHTML = FourthDayName;
    FourthDayWeatherIcon.src = fourthData.forecast.forecastday[0].day.condition.icon;
    FourthDayHigherTemp.innerHTML = `${fourthData.forecast.forecastday[0].day.maxtemp_c}°C`;
    FourthDayLowerTemp.innerHTML = `${fourthData.forecast.forecastday[0].day.mintemp_c}°`;
    FourthDayWeatherStatus.innerHTML = fourthData.forecast.forecastday[0].day.condition.text;
    // Fifth
    FifthDay.innerHTML = FifthDayName;
    FifthDayWeatherIcon.src = fifthData.forecast.forecastday[0].day.condition.icon;
    FifthDayHigherTemp.innerHTML = `${fifthData.forecast.forecastday[0].day.maxtemp_c}°C`;
    FifthDayLowerTemp.innerHTML = `${fifthData.forecast.forecastday[0].day.mintemp_c}°`;
    FifthDayWeatherStatus.innerHTML = fifthData.forecast.forecastday[0].day.condition.text;
    // Sixth
    SixthDay.innerHTML = SixthDayName;
    SixthDayWeatherIcon.src = sixthData.forecast.forecastday[0].day.condition.icon;
    SixthDayHigherTemp.innerHTML = `${sixthData.forecast.forecastday[0].day.maxtemp_c}°C`;
    SixthDayLowerTemp.innerHTML = `${sixthData.forecast.forecastday[0].day.mintemp_c}°`;
    SixthDayWeatherStatus.innerHTML = sixthData.forecast.forecastday[0].day.condition.text;
}


// Saving subscription mail into local storage

let mailInput = document.getElementById("mailInput");
let subscribeBtn = document.getElementById("subscribeBtn");
let subscribers = [];
if (localStorage.getItem("subscribersList") != null) {
    subscribers = JSON.parse(localStorage.getItem("subscribersList"));
}

subscribeBtn.addEventListener("click", function(){
    subscribers.push(mailInput.value);
    localStorage.setItem("subscribersList", JSON.stringify(subscribers))
})



