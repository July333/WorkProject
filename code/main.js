//variables
const apiId = '7a330d30a698e17be279ad095370f739'; //my key
//current temp by city name
const getApi = async (selectedCity) => {
    const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + selectedCity
        + '&units=metric&appid=' + apiId);
    const cityWeather = await res.json();
    $('#n1').text("City name is: " + selectedCity.toUpperCase());
    $('#n2').text("The current temperature is: " + cityWeather.main.temp + "°C");
    console.log(cityWeather);
    return cityWeather;
}
$('#search').on('click', function () {
    let city = $('#inp').val();
    let a = getApi(city);
    console.log(a);
});

//current temp by current location
$(document).ready(function () {
    getLocation(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getLocApi(lat, lon);

    });
});
$('#home').on('click', function () {
    getLocation(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getLocApi(lat, lon);

    });
});
function getLocation(callback) {
    debugger;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, function () { }, {
            enableHighAccuracy: true
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
const getLocApi = async (lat, lon) => {
    const res = await fetch('https://api.openweathermap.org/data/2.5/weather?'
        + 'lat=' + lat + '&lon=' + lon
        + '&units=metric&appid='
        + apiId);
    const cityWeather = await res.json();
    $('#n1').text("City name is: " + cityWeather.name.toUpperCase());
    $('#n2').text("The current temperature is: " + cityWeather.main.temp + "°C");
    console.log(cityWeather);
    console.log(cityWeather);
    return cityWeather;
}
//future temp
const getHisApi = async (selectedCity) => {
    const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='
        + selectedCity
        + '&units=metric&appid=' + apiId);
    const cityWeather = await res.json();
    console.log(cityWeather);
    //return cityWeather;
}
//getApi('kiev');
getHisApi('kiev');
//getTestApi();
