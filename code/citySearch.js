//variables
const apiId = '7a330d30a698e17be279ad095370f739'; //my key
var arr = [];
var name='';
//current temp by city name
$('#search').on('click', function () {
    $("#chartContainer").css("visibility", "hidden");
    $("#myAbout").css("visibility", "hidden");
    $("section").css("visibility", "visible");
    $("section").css("position", "relative");
    let city = $('#inp').val();
    getApi(city);
    futureWeather(city);
    $('#inp').val("");
});
const getApi = async (selectedCity) => {
    const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + selectedCity
        + '&units=metric&appid=' + apiId);
    const cityWeather = await res.json();
    name=cityWeather.name.toUpperCase();
    $('#n1 span').text(cityWeather.name.toUpperCase());
    $('#n2 span').text(cityWeather.main.temp);
    $('#n3 #w').text(cityWeather.weather[0].description);
    $('#n3 #wi').text(cityWeather.wind.speed+' km/h');
    $('#n4').attr('src','https://openweathermap.org/img/wn/'+cityWeather.weather[0].icon+'@2x.png');
    return cityWeather;
}
//forecast weather
const getHisApi = async (selectedCity) => {
    const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='
        + selectedCity
        + '&units=metric&appid=' + apiId);
    const cityWeather = await res.json();
    return cityWeather.list;
}
const futureWeather = async (selectedCity) => {
    arr = await getHisApi(selectedCity); let date = arr[0].dt_txt;
    date = date.split(' ');
    let place = date[1].split(':')[0];
    let i = 0;
    let inx = 1;
    if (place == 00) {
        i += 2;
    }
    if (place == 03 || place == 09 || place == 15 || place == 21) {
        i++;
    }
    if(place == 09 || place == 12){
        inx=2;
    }
    if(place == 15 || place == 18){
        inx=3;
    }
    if(place == 21){
        inx=4;
    }
    let str = '';
    for (i; i < arr.length - 6; i = i + 2) {
        str = `<div class="inIM col-auto"><img src="https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png" alt="image" class="inIM img-responsive"></div>
        <div class="col-auto cur">
<strong>${arr[i].dt_txt.split(' ')[1]}</strong>
<br />Temperature is: <strong>${arr[i].main.temp}°C</strong>
<br />The weather is: <strong>${arr[i].weather[0].description} </strong>
<br />The wind speed is: <strong>${arr[i].wind.speed} km/h</strong>
</div>`;
        $('#d' + inx).html(str);
        inx++;
    }
    //graph call
    drawGraph(arr);
}