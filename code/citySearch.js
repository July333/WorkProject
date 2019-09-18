//variables
const apiId = '7a330d30a698e17be279ad095370f739'; //my key
var arr=[];
//current temp by city name
const getApi = async (selectedCity) => {
    const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + selectedCity
        + '&units=metric&appid=' + apiId);
    const cityWeather = await res.json();
    $('#n1').text("City name is: " + selectedCity.toUpperCase());
    $('#n2').text("The current temperature is: " + cityWeather.main.temp + "°C");
    return cityWeather;
}
$('#search').on('click', function () {
    let city = $('#inp').val();
    getApi(city);
    futureWeather(city);
});

const getHisApi = async (selectedCity) => {
    const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='
        + selectedCity
        + '&units=metric&appid=' + apiId);
    const cityWeather = await res.json();
    return cityWeather.list;
}
const futureWeather = async (selectedCity) => {
    arr = await getHisApi(selectedCity);
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


