//download page and Home
$(document).ready(function () {
    getLocation(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getLocApi(lat, lon);
        futureWeatherForLoc(lat, lon);
    });
});
$('#home').on('click', function () {
    getLocation(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getLocApi(lat, lon);
        futureWeatherForLoc(lat, lon);
    });
});
function getLocation(callback) {
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
    return cityWeather;
}

//future temp
const getHisApiForLoc = async (lat, lon) => {
    const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?'
        + 'lat=' + lat + '&lon=' + lon
        + '&units=metric&appid='
        + apiId);
    const cityWeather = await res.json();
    return cityWeather.list;
}
const futureWeatherForLoc = async (lat, lon) => {
    arr = await getHisApiForLoc(lat, lon);
    console.log(arr);
    let temp = '';
    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-auto card border-info mb-3 tempCard">
            <div class="card-header">The current temperature is: ${arr[i].main.temp}</div>
            <div class="card-body">
                <h5 id="n" class="card-subtitle">The current temperature is: ${arr[i].weather[0].main}</h5> 
                <p class="card-text"></p>
            </div>
        </div>
        `;
    }
    $('#arr').empty();
    $('#arr').append(temp);
}
//main: "Clouds", description: "broken clouds", icon: "04n"}