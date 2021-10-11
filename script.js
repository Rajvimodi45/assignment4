/*
    Assignment 4
    Rajvi Nilesh Modi
*/

$(document).ready(function() {
    // your code here

    navigator.geolocation.getCurrentPosition((position) => {

        var longitudetwo;
        var latitudetwo;
        var login = true;
        debugger;
        if (localStorage.getItem("LAT1") != null) {
            latitudetwo = localStorage.getItem("LAT1");
            longitudetwo = localStorage.getItem("LON1");

            if (latitudetwo != position.coords.latitude && longitudetwo != position.coords.longitude) {
                $('.lastlongitude').eq(0).html("The last longitude is: " + longitudetwo);
                $('.lastlatitude').eq(0).html("The last latitude is: " + latitudetwo);

            } else {
                $('.lastlatitude').eq(0).html("The last visited vales are same as current one");
            }
            login = false;
            $('.locationstored').eq(0).html("The Stored Location is: " + latitudetwo + ", " + longitudetwo);
            $('.lastlongitude').eq(0).html("The Distance you travelled is: " + calcDistance(position.coords.latitude, position.coords.longitude, latitudetwo, longitudetwo));
        }

        localStorage.setItem("LAT1", position.coords.latitude);
        localStorage.setItem("LON1", position.coords.longitude);

        $('.latitude').eq(0).html("The latitude is: " + position.coords.latitude);
        $('.longitude').eq(0).html(`The longitude is: ${position.coords.longitude}`);

        history.pushState({ page_id: 1 }, "Testing", "index.html");

        if (firstLogin) {
            $('.welcomemessage').eq(0).html("Welcome to the Place !!!");
            $('.emptyoldvalue').eq(0).html("Empty Old Value");

        }

    }, () => {
        $('#error').text("Please allow to show your location");
    });





    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript


    function calcDistance(lat1, lon1, lat2, lon2) {

        var toRadians = function(num) {
            num * Math.PI / 180;
            console.log(num);
            return num;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var num1 = (R * c);

        console.log(num1);
        return num1;

    }
});