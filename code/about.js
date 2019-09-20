$("#about").on('click', function () {
    console.log('hi');
    $("#chartContainer").css("visibility", "hidden");
    $("section").css("visibility", "hidden");
    $("section").css("position", "relative");
    $("section").css("position", "absolute");
    $("#chartContainer").css("position", "absolute");
    $("#myAbout").css("visibility", "visible");
});