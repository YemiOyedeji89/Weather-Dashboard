var searchInput = $("#search-input");

var cities = [];


/// FUNCTION TO BUILD THE URL FOR THE SEARCHED CITY NEEDED FOR THE AJAX CALL FOR THE CITY COORDINATES
function buildURL(){
    //BASE QUERY URL 
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?";

    //STORING THE QUERY PARAMATER IN A VARIABLE
    var queryParam = {"appid":"d6ca1a88a6b8972287493346d6dfc71c"};
    
    // GETTING THE INPUT DATA FROM THE SEARCH CITY
    queryParam.q = searchInput
    .val()
    .trim();
    //SETTING THE LIMIT TO RETURN
    queryParam.limit = 1;
   // console.log(queryURL + $.param(queryParam))

    return queryURL + $.param(queryParam)
}

///SAVING THE SEARCH INPUT IN AN ARRAY
var searches = [];

///ONCLICK OF THE SEARCH BUTTON
$("#search-button").on("click", function(event){
    event.preventDefault();

    ///URL FOR THE AJAX CALL 
    var queryURL = buildURL();

    ///STORING THE LONGITUTE, LATITUDE, CITY AND COUNTRY IN A VARIABLE 
    const cityLongLat = {
        city: " ",
        latitude: " ",
        longitude: " ",
        country: " "
    };

    ///SENDING THE AJAX CALL TO GET THE CITY CORDINATES
    $.ajax({
    url:queryURL,
    method: "GET"
    }).then(function(response){
        ///STORING THE DATA RETUNED IN THE FIRST INDEX IN A VARIABLE
       var cityretuned = response[0];
       
        cityLongLat.city = cityretuned.name;
        cityLongLat.latitude = cityretuned.lat;
        cityLongLat.longitude = cityretuned.lon;
        cityLongLat.country = cityretuned.country;
    }); 
    ///CLEAR THE HISTORY AND UPDATE SEARCH 
    clear();

    ///ADDING SEARCH INPUT TO A VARIABLE
    searches.push(searchInput.val().trim());

    ///STORING SEARCH INPUT TO THE LOCAL STORAGE
    localStorage.setItem("city", JSON.stringify(searches));

    ///RETRIEVING SEARCH STORED TO THE LOCAL STORAGE
    var storedSearch = JSON.parse(localStorage.getItem("city"));
    console.log(storedSearch);

    ///LOOPING THROUGH LOCAL STORAGE DATA, CREATE A BUTTON AND APPEND TO THE HISTORY SECTION
    for(let i =0; i< storedSearch.length; i++){
        var $searchBtn = $("<button>").addClass("search-btn");
        $("#history").append($searchBtn);
        $searchBtn.append(storedSearch[i]);
    }
    ///DISPLAYING THE CURRENT WEATHER
});

///FUNCTION TO REMOVE BUTTON BEFORE UPDATING THE SEARCH HISTORY
function clear(){
    $(".search-btn").remove();
}