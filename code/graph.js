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
            text: "Graph with temperature changes"
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
    for(let i=0;i<ar.length;i++){
        let date = new Date(ar[i].dt_txt);
        let obj = {
            x: date,
            y: arr[i].main.temp
        }
        options.data[0].dataPoints.push(obj);

    }
    $("#chartContainer").CanvasJSChart(options);
}