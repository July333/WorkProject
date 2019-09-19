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
    $('#n1 span').text(cityWeather.name.toUpperCase());
    $('#n2 span').text(cityWeather.main.temp);
    $('#n3 #w').text(cityWeather.weather[0].description);
    $('#n3 #wi').text(cityWeather.wind.speed + ' km/h');
    $('#n4').attr('src', 'http://openweathermap.org/img/wn/' + cityWeather.weather[0].icon + '@2x.png');
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
    let date = arr[0].dt_txt;
    date = date.split(' ');
    let place = date[1].split(':')[0];
    place /= 6;
    let i = 0;
    if ((place % Math.ceil(place)) != 0) {
        i++;
        place = Math.ceil(place);
    }
    let inx;
    console.log(arr);
    for (let j = 1; j < 5; j++) {
        let d = new Date();
        d.setDate(d.getDate() + j - 1);
        $('#day' + j).text(d.toLocaleString("en-US", { weekday: 'long' })+' '+d.getDate()+'/'+d.getMonth());
    }
    let str = '';
    for (i; i < arr.length - 6; i = i + 2) {
        inx = Math.floor(i / 2) + place;
        str = `<img src="http://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png" alt="image">
        <div>
            Temperature is: <strong>${arr[i].main.temp} °C</strong>
            <br />
            The weather is: <strong>${arr[i].weather[0].description} </strong>
            <br />
            The wind speed is: <strong>${arr[i].wind.speed} km/h</strong>
        </div>`;
        $('#d' + inx).html(str);
        // $('#d' + inx+' img').attr('src','http://openweathermap.org/img/wn/'+arr[i].weather[0].icon+'@2x.png');
        // $('#d' + inx+' div strong:nth-child(1)').text(arr[i].main.temp+' °C');
        // $('#d' + inx+' div strong:nth-child(2)').text(arr[i].weather[0].description);
        // $('#d' + inx+' div strong:last-child()').text(arr[i].wind.speed+' km/h');
    }
}

