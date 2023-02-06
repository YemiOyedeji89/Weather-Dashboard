var searchInput = $("#search-input");


/// FUNCTION TO BUILD THE URL FOR THE SEARCHED CITY NEEDED FOR THE AJAX CALL FOR THE CITY COORDINATES
function buildCordUrl(){

    //BASE QUERY URL 
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?";

    //STORING THE QUERY PARAMATER IN A VARIABLE
    queryParam = {"appid":"d6ca1a88a6b8972287493346d6dfc71c"};

    // GETTING THE INPUT DATA FROM THE SEARCH CITY
    queryParam.q = searchInput
    .val()
    .trim();

    
    //SETTING THE LIMIT TO RETURN
    queryParam.limit = 1;
   

    return queryURL + $.param(queryParam);
}

///SAVING THE SEARCH INPUT IN AN ARRAY
var searches = [];


///ONCLICK OF THE SEARCH BUTTON
$("#search-button").on("click", cityWeatherForecast );


function cityWeatherForecast(event){
    event.preventDefault();
    
    

   //var today = moment().format("dddd, MMMM Do YYYY");
   var today = moment().format("DD/MM/YYYY");
   var foreCastday1 = moment().add(1, "days").format("YYYY-MM-DD 12:00:00");
   var foreCastday2 = moment().add(2, "days").format("YYYY-MM-DD 12:00:00");
   var foreCastday3 = moment().add(3, "days").format("YYYY-MM-DD 12:00:00");
   var foreCastday4 = moment().add(4, "days").format("YYYY-MM-DD 12:00:00");
   var foreCastday5 = moment().add(5, "days").format("YYYY-MM-DD 12:00:00");

  ///SAVING THE LONGITUDE AND LATITUDE INTO OF THE SEARCHED CITY INTO A VARIABLE OBJECT
    const cityLongLat = {
    city: " ",
    latitude: " ",
    longitude: " ",
    country: " "
    }; 

    ///URL FOR THE AJAX CALL 
    var queryURL = buildCordUrl();

    ///SENDING THE AJAX CALL TO GET THE CITY CORDINATES
    $.when($.ajax(queryURL,
        ))
    .then(function(response){
        ///STORING THE DATA RETUNED IN THE FIRST INDEX IN A VARIABLE
       var cityretuned = response[0];
       
        cityLongLat.city = cityretuned.name;
        cityLongLat.latitude = parseFloat(cityretuned.lat).toFixed(2);
        cityLongLat.longitude =  parseFloat(cityretuned.lon).toFixed(2);
        cityLongLat.country = cityretuned.country;

        ///CALLING THE SECOND AJAX CALL TO GET THE CURRENT WEATHER DATA
        var currentQueryURL =  buildUrlCurrentApi();
        
        ///AJAX CALL TO GET THE CURRENT WEATHER DATA 
        $.ajax({
        url:currentQueryURL,
        method: "GET"
        }).then(function(data){

            //DISPLAYING THE CURRENT WEATHER
            var todayWeatherData = data;
            var currentDiv = $("<div>").addClass("current");
            var cityName =  $("<h2>").text(todayWeatherData.name + " " + "(" + today + ")");
            var cityTemp =  $("<h3>").text("Temp: " + todayWeatherData.main.temp + " C");
            var cityWind =  $("<h3>").text("Wind: " + parseFloat(todayWeatherData.wind.speed + " m/s").toFixed(2));
            var cityHumidity =  $("<h3>").text("Humidity: " + parseInt(todayWeatherData.main.humidity + " %"));
            var weatherNow = currentDiv. append(cityName, cityTemp, cityWind, cityHumidity)

            ///DISPLAYING THE CURRENT WEATHER ON THE WEBPAGE
            $("#today").prepend(weatherNow);
         

            
            ///AJAX CALL FOR THE FORECAST
            var forcastDataURL = buildForcastDataUrl();
           
            $.ajax({
                url:forcastDataURL,
                method: "GET"
            }).then(function(forcasteData)
            {
                var forecastFiveDays = forcasteData.list;
            
                ////LOOPING INTO THE DATA RETURNED FROM THE API 
                for(var f = 0; f < forecastFiveDays.length; f++){
                
                    var days = forecastFiveDays[f].dt_txt
                    
                    if(days == foreCastday1){

                        var foreCastCards = $("<div>").addClass("fore-cast");
                        var pDate1 = $("<p>").text(moment().add(1, "days").format("DD/MM/YYYY"));
                        var pTemp1 = $("<p>").text("Temp: " + forecastFiveDays[f].main.temp + "C");
                        var pWind1 = $("<p>").text("Wind: " + forecastFiveDays[f].wind.speed + "m/s");
                        var pHumidity1 = $("<p>").text("Humidity: " + forecastFiveDays[f].main.humidity + "%");
                        var ForeCast1 = foreCastCards.append(pDate1,pTemp1,pWind1, pHumidity1);

                        $("#forecast").append(ForeCast1);
                    }
                    if(days == foreCastday2){

                        var foreCastCards2 = $("<div>").addClass("fore-cast");
                        var pDate2 = $("<p>").text(moment().add(2, "days").format("DD/MM/YYYY"));
                        var pTemp2 = $("<p>").text("Temp: " + forecastFiveDays[f].main.temp + "C");
                        var pWind2 = $("<p>").text("Wind: " + forecastFiveDays[f].wind.speed + "m/s");
                        var pHumidity2 = $("<p>").text("Humidity: " + forecastFiveDays[f].main.humidity + "%");
                        var ForeCast2 = foreCastCards2.append(pDate2,pTemp2,pWind2, pHumidity2);

                        $("#forecast").append(ForeCast2);
                    }

                    if(days == foreCastday3){
                        
                        var foreCastCards3 = $("<div>").addClass("fore-cast");
                        var pDate3 = $("<p>").text(moment().add(3, "days").format("DD/MM/YYYY"));
                        var pTemp3 = $("<p>").text("Temp: " + forecastFiveDays[f].main.temp + "C");
                        var pWind3 = $("<p>").text("Wind: " + forecastFiveDays[f].wind.speed + "m/s");
                        var pHumidity3 = $("<p>").text("Humidity: " + forecastFiveDays[f].main.humidity+ "%");
                        var ForeCast3 = foreCastCards3.append(pDate3,pTemp3,pWind3, pHumidity3);

                        $("#forecast").append(ForeCast3);
                    }

                    if(days == foreCastday4){
                    
                        var foreCastCards4 = $("<div>").addClass("fore-cast");
                        var pDate4 = $("<p>").text(moment().add(4, "days").format("DD/MM/YYYY"));
                        var pTemp4 = $("<p>").text("Temp: " + forecastFiveDays[f].main.temp + "C");
                        var pWind4 = $("<p>").text("Wind: " + forecastFiveDays[f].wind.speed + "m/s");
                        var pHumidity4 = $("<p>").text("Humidity: " + forecastFiveDays[f].main.humidity + "%");
                        var ForeCast4 = foreCastCards4.append(pDate4,pTemp4,pWind4, pHumidity4);

                        $("#forecast").append(ForeCast4);
                    }
                    if(days == foreCastday5){
                        //console.log(forcasteData);
                        var foreCastCards5 = $("<div>").addClass("fore-cast");
                        var pDate5 = $("<p>").text(moment().add(5, "days").format("DD/MM/YYYY"));
                        var pTemp5 = $("<p>").text("Temp: " + forecastFiveDays[f].main.temp + "C");
                        var pWind5 = $("<p>").text("Wind: " + forecastFiveDays[f].wind.speed + "m/s");
                        var pHumidity5 = $("<p>").text("Humidity: " + forecastFiveDays[f].main.humidity + "%");
                        var ForeCast5 = foreCastCards5.append(pDate5,pTemp5,pWind5, pHumidity5);

                        $("#forecast").append(ForeCast5);

                    }
                };
     
            }); 

        }); 
        
    }); 
    ///CLEAR CURRENT WEATHER DETAILS TO REPLACE WITH NEW SEARCH INPUT
    $(".current").remove();

    ///CLEAR WEATHER FORECAST DETAILS TO REPLACE WITH NEW SEARCH INPUT
    $(".fore-cast").remove();
    

    ///CLEAR THE HISTORY AND UPDATE SEARCH 
    clear();

    ///ADDING SEARCH INPUT TO A VARIABLE
    searches.push(searchInput.val().trim());

    ///STORING SEARCH INPUT TO THE LOCAL STORAGE
    localStorage.setItem("city", JSON.stringify(searches));

    ///RETRIEVING SEARCH STORED TO THE LOCAL STORAGE
    var storedSearch = JSON.parse(localStorage.getItem("city"));
    
    ///LOOPING THROUGH LOCAL STORAGE DATA, CREATE A BUTTON AND APPEND TO THE HISTORY SECTION
    for(let i =0; i< storedSearch.length; i++){
        var $searchBtn = $("<button>").addClass("search-btn");
        $("#history").append($searchBtn);
        $searchBtn.append(storedSearch[i]);
        searchInput.val(" ") ;
        $searchBtn.on("click", cityWeatherForecast);   

    }
    ////FUNCTION TO BUILD THE SECOUND URL FOR THE CURRENT WEATHER PASSING THE LONGITUDE AND LATITUDE PARAMETERS
    function buildUrlCurrentApi(){
    var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?";
     queryParam1 = {"appid":"d6ca1a88a6b8972287493346d6dfc71c"};
     queryParam1.lat = cityLongLat.latitude;
     queryParam1.lon = cityLongLat.longitude;
     queryParam1.units = "metric";
     
     return currentQueryURL + $.param(queryParam1); 
    }   
 ////FUNCTION TO BUILD THE URL FOR THE FORECAST WEATHER 
    function buildForcastDataUrl(){
     var forcastDataURL = "https://api.openweathermap.org/data/2.5/forecast?"
     queryParam1 = {"appid":"d6ca1a88a6b8972287493346d6dfc71c"};
     queryParam1.lat = cityLongLat.latitude;
     queryParam1.lon = cityLongLat.longitude;
     queryParam1.units = "metric";
     
     return forcastDataURL + $.param(queryParam1);
    }
 ///FUNCTION TO REMOVE BUTTON BEFORE UPDATING THE SEARCH HISTORY
    function clear(){
     $(".search-btn").remove();
    }
}


