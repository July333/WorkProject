$('#myGr').on('click', function () {
    $("#chartContainer").css("visibility", "visible");
    $("#chartContainer").css("position", "relative");
    $("section").css("visibility", "hidden");
    $("section").css("position", "absolute");
    $("#myAbout").css("visibility", "hidden");
});
function drawGraph(ar) {
    var options = {
        animationEnabled: true,
        title: {
            text: "Graph with temperature changes in "+name
        },
        axisY: {
            title: "Temperature",
            prefix: "°C"
        },
        axisX: {
            title: "hour"
        },
        data: [{
            type: "area",
            markerSize: 5,
            dataPoints: []
        }]
    };
    for (let i = 0; i < ar.length; i++) {
        let date = new Date(ar[i].dt_txt);
        let obj = {
            x: date,
            y: arr[i].main.temp
        }
        options.data[0].dataPoints.push(obj);

    }
    $("#chartContainer").CanvasJSChart(options);
}

// { "coord": { "lon": -0.13, "lat": 51.51 }, 
// "weather": [{ "id": 300, "main": "Drizzle", "description": "light intensity drizzle", "icon": "09d" }], 
// "base": "stations", 
// "main": { "temp": 280.32, "pressure": 1012, "humidity": 81, "temp_min": 279.15, "temp_max": 281.15 }, 
// "visibility": 10000, 
// "wind": { "speed": 4.1, "deg": 80 }, 
// "clouds": { "all": 90 }, 
// "dt": 1485789600, "sys": 
// { "type": 1, "id": 5091, "message": 0.0103, "country": "GB", "sunrise": 1485762037, "sunset": 1485794875 }, 
// "id": 2643743, 
// "name": "London", 
// "cod": 200 }