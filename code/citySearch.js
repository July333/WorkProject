//variables
const apiId = '7a330d30a698e17be279ad095370f739'; //my key
var arr = [];
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
    //let date=arr[i].dt_txt;
    let temp = '';
    //let day=new Date().getDay();
    let date = arr[0].dt_txt;
    date = date.split(' ');
    let place = date[1].split(':')[0];
    place /= 6;
    let j = 0;
        if((place%Math.ceil(place)) != 0){
            j++;
            place=Math.ceil(place);
        }
    console.log(place);
    let inx;
    console.log(arr);
    for (let i=j; i < arr.length-6; i=i+2) {
        // let date = arr[i].dt_txt;
        // date = date.split(' ');
        // let day = date[0].split('-')[3];
        // console.log(date);
        inx = Math.floor(i/2) + place;
        console.log(i+' '+inx);
        $('#d' + inx).text(arr[i].main.temp);
        console.log(i+' '+arr[i].main.temp);
        // temp += `
        // <div class="col-auto card border-info mb-3 tempCard">
        //     <div class="card-header">The current temperature is: ${arr[i].main.temp}</div>
        //     <div class="card-body">
        //         <h5 id="n" class="card-subtitle">The current temperature is: ${arr[i].weather[0].main}</h5> 
        //         <p class="card-text"></p>
        //     </div>
        // </div>
        // `;
    }
    //$('#arr').empty();
    //$('#arr').append(temp);
}


