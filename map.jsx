#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {


// INITIAL SETUP
// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
var data_source = "openpaths_data.csv"; //filename of OpenPaths data. Either CSV or JSON. E.g: "openpaths_username.json"

b.units(b.PX); //all units in pixels

//setup layers
var base = b.layer("base");
var line = b.layer("line");
var ellipse = b.layer("ellipse");
var label = b.layer("label");

//colours in CMYK
var red = b.color(0, 77, 73, 0, "red");
var grey = b.color(65, 52, 37, 10, "grey");
var darkgrey = b.color(34, 25, 20, 0, "darkgrey");
var black = b.color(75, 68, 67, 90, "black");
var white = b.color(0, 0, 0, 0, "white");
var background = b.color(71, 61, 57, 45, "background");

//typeface
b.textFont("Myriad Pro", "Bold");

//set page margin
var page_margin = 50; 
b.margins(page_margin);

//set page bleed 
var page_bleed = 10;
b.bleeds(page_bleed);

var mapwidth = 841.89 - (page_margin *2);
var mapheight = 1190.551 - (page_margin *2);
b.println("Document width: " + mapwidth + "px \nDocument height: " + mapheight + "px"); //print dimensions to console

//set background
b.canvasMode(b.BLEED);
b.layer(base); 
b.fill(background);
b.noStroke();
b.rect(-page_bleed,0,b.width+page_bleed,b.height); 

b.canvasMode(b.MARGIN); //set coordinates according to margin of page

var x = 0;
var y = 0;


// LOAD OPENPATHS DATA
// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//ascertain whether the file is json or csv
var filetypequery = data_source.split('.').pop();
b.println("File format: " +filetypequery);

if( filetypequery === "json") {
    var data = b.JSON.decode( b.loadString(data_source) ); //load data
}
else if (filetypequery === "csv") {
    var data = b.CSV.decode( b.loadString(data_source) ); //load data
}
else {
    var error = "Error! Unrecognised file format. Please provide CSV or JSON.";
    b.println(error);
    alert(error);
    return;
}


var total_locations = data.length;
b.println("Loaded "+total_locations+" locations from OpenPaths"); //count number of items in data


// FIND MAXIMUM AND MINIMUM LATITUDE AND LONGITUDE VALUES
// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//setup arrays
var latinput = [];
var loninput = [];


//put each lon and lat value in an array
for (var i = 0; i < data.length; i++) {      
    //lat
    latinputval = parseFloat(data[i].lat); //parse value to float
    latinput.push(latinputval); //add value to array

    //lon
    loninputval = parseFloat(data[i].lon); //parse value to float
    loninput.push(loninputval); //add value to array    
};

//find maximum value function
function maxval(arrayinput) {
    var maxtest = Math.max.apply(Math,arrayinput);
    return maxtest;
}

//find minimum value function
function minval(arrayinput) {
    var mintest = Math.min.apply(Math,arrayinput);
    return mintest;
}

//set variables based on returned values
var max_latitude = maxval(latinput); //max lat
var min_latitude = minval(latinput); //min lat
var max_longitude = maxval(loninput); //max lon
var min_longitude = minval(loninput); //min lon


// GET POINT FUNCTION
// Returns pixel coordinates from latitude and longtitude input
// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

function getPoint(latinput, loninput, min_longitude, max_longitude, min_latitude, max_latitude, mapwidth, mapheight) {
    
    //convert lat and long into pixel values
    var x = (loninput - min_longitude) / (max_longitude - min_longitude) * mapwidth;
    var y = mapheight - (latinput - min_latitude) / (max_latitude - min_latitude) * mapheight;
    //b.println(i+ " latval " + x + " / lonval " + y); //print converted values to log
    
    return [x, y]; //return values as array
}


// MAIN LOOP
// Loops through each item and draws output to document
// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

for (var i = 0; i < data.length; i++) {
    latinput = parseFloat(data[i].lat); 
    loninput = parseFloat(data[i].lon); 

    b.println(i+ " latval " + latinput + "\n     lonval " + loninput);
    
    if (i > 0) {
        latinput2 = parseFloat(data[i-1].lat);
        loninput2 = parseFloat(data[i-1].lon);
        b.println(i+ " latval2 " + latinput2 + "\n     lonval2 " + loninput2);
    }
  
    var drawvalues = getPoint(latinput, loninput, min_longitude, max_longitude, min_latitude, max_latitude, mapwidth, mapheight); //call function
    var x = drawvalues[0]; //access first value in array
    var y = drawvalues[1]; //access second value in array
    
    if (i > 0) {
        var drawvalues = getPoint(latinput2, loninput2, min_longitude, max_longitude, min_latitude, max_latitude, mapwidth, mapheight); //call function
        var x2 = drawvalues[0]; //access first value in array
        var y2 = drawvalues[1]; //access second value in array        
    }
    
    b.layer(ellipse); //set active layer
    b.fill(red);
    b.stroke(grey);
    b.strokeWeight(0.5);
    b.ellipse(x,y,8,8); //draw ellipse 
    
    if (i > 0) {
        b.layer(line); //set active layer
        b.stroke(grey);
        b.strokeWeight(0.5);
        b.line(x, y, x2, y2); //draw line
    }

};
//loop ends


// CITIES
// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
var city_data = b.CSV.decode(b.loadString("cities.csv")); //load data
b.println("Loaded "+city_data.length+" city locations"); //count number of items in data


for (var i = 0; i < city_data.length; i++) {
    city_latinput = parseFloat(city_data[i].lat);
    city_loninput = parseFloat(city_data[i].lon);
    city_name = city_data[i].city;
    
    b.println(i+ " latval " + city_latinput + "\n     lonval " + city_loninput + "\n     city " + city_name);

    if (city_latinput > min_latitude && city_latinput < max_latitude && city_loninput > min_longitude && city_loninput < max_longitude) {
       b.println("City within map bounds"); 
       
       var drawvalues = getPoint(city_latinput, city_loninput, min_longitude, max_longitude, min_latitude, max_latitude, mapwidth, mapheight); //call function
       var x = drawvalues[0]; //access first value in array
       var y = drawvalues[1]; //access second value in array
       
       b.layer(label); //set active layer       
       b.fill(white);
       b.stroke(grey);
       b.strokeWeight(1);
       b.ellipse(x,y,20,20); //draw ellipse

       //set text box location in relation to ellipse
       x += 14;
       y -= 5; 
   
       b.fill(white);
       var city = b.text(city_name, x, y, 200, 25);
       
    }

}

// TITLES
// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

b.fill(darkgrey);
var subtitle1 = total_locations + " LOCATIONS\n" + "FROM: " + data[0].date + "\n";
total_locations --;
var subtitle2 = "TO: " + data[total_locations].date;

var subtitle = b.text(subtitle1 + subtitle2, 0, 0, 350, 100); 

}

b.go(b.MODEHIDDEN);
