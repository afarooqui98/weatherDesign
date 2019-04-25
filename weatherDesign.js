"strict mode";

let sacLat = 38.5816;
let sacLon = 121.4944;

function getCity(){
	let city = document.getElementById("field").value;
	makeCorsRequest(city, "CA");
}

function createCORSRequest(method, url) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);  // call its open method
	return xhr;
}

function makeCorsRequest(city,state) {

	let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q="+ city + "," + state + ",US+&units=imperial&APPID=a8b5c9cd8b5f14a96877554c0087333a";
	let url2 = "http://api.openweathermap.org/data/2.5/weather?q="+ city + "," + state + ",US+&units=imperial&APPID=a8b5c9cd8b5f14a96877554c0087333a";
	let xhr = createCORSRequest('GET', url);
	let xhr2 = createCORSRequest('GET', url2);
	
	// checking if browser does CORS
	if (!xhr || !xhr2) {
	alert('CORS not supported');
	return;
	}


	// Load some functions into response handlers.
	xhr.onload = function() {
		let responseStr = xhr.responseText;  // get the JSON string 
		let object = JSON.parse(responseStr);  // turn it into an object
		// let result = JSON.stringify(object, undefined, 2);
		
		let list = object["list"];
		for (let i = 0; i < 5; i++) {

		let temp = list[i]["main"]["temp"];
		let status = list[i]["weather"][0]["icon"];

		let date = new Date(list[i]["dt_txt"] + ' UTC');
		let hour = date.getHours().toString();
		let hour_24 = date.getHours().toString();
		hour = (hour > 12)? hour -12 : hour;
		hour = (hour == '00')? 12 : hour;
		suffix = (hour_24 >= 12)? 'pm' : 'am';
		console.log(hour+":00",suffix);
		
		document.getElementById("weather-temp"+i.toString()).innerHTML = temp.toString().substr(0,2) + "&#176;";
		
		document.getElementById("weather-time"+i.toString()).innerHTML = hour+":00 "+suffix;

		// let lat = list[i]["coord"]["lat"];
		// let lon = list[i]["coord"]["lon"];

		// if(getDistanceFromLatLonInKm(sacLat, sacLon, lat, lon) == false){
		// 	alert("Not found");
		// 	makeCorsRequest("Davis", "CA");
		// }

		setImage(status, i + 1);

		}
		// let l1 = list[0]["weather"];
		// console.log(l1);  // print it out as a string, nicely formatted
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();


	// Load some functions into response handlers.
	xhr2.onload = function() {
		let responseStr = xhr2.responseText;  // get the JSON string 
		let object = JSON.parse(responseStr);  // turn it into an object
		// let result = JSON.stringify(object, undefined, 2);
		
		
		let temp = object["main"]["temp"];
		let status = object["weather"][0]["icon"];

		let date = new Date();
		let hour = date.getHours().toString();
		let hour_24 = date.getHours().toString();
		hour = (hour > 12)? hour -12 : hour;
		hour = (hour == '00')? 12 : hour;
		suffix = (hour_24 >= 12)? 'pm' : 'am';
		console.log(hour+":00",suffix);
		
		document.getElementById("cur-weather-temp").innerHTML = temp.toString().substr(0,2) + "&#176;";
		
		document.getElementById("cur-weather-time").innerHTML = hour+suffix;

		// let lat = object["coord"]["lat"];
		// let lon = object["coord"]["lon"];

		// if(getDistanceFromLatLonInKm(sacLat, sacLon, lat, lon) == false){
		// 	alert("Not found");
		// 	makeCorsRequest("Davis", "CA");
		// }

		setImage(status, 0);
		setImage(status, 6);
	};

	xhr2.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr2.send();
}


function setImage(status, index){
	switch(status){
		case "01d":
			document.getElementById("weather-icon"+index.toString()).src = "assets/clearsky.svg";
			break;
		case "01n":
			document.getElementById("weather-icon"+index.toString()).src = "assets/clear-night.svg";
			break;
		case "02d":
			document.getElementById("weather-icon"+index.toString()).src = "assets/fewclouds-day.svg";
			break;
		case "02n":
			document.getElementById("weather-icon"+index.toString()).src = "assets/fewclouds-night.svg";
			break;
		case "03d":
		case "03n":
			document.getElementById("weather-icon"+index.toString()).src = "assets/scatteredclouds.svg";
			break;
		case "04d":
		case "04n":
			document.getElementById("weather-icon"+index.toString()).src = "assets/brokencloud.svg";
			break;
		case "09d":
		case "09n":
			document.getElementById("weather-icon"+index.toString()).src = "assets/showerrain.svg";
			break;
		case "10d":
			document.getElementById("weather-icon"+index.toString()).src = "assets/rain-day.svg";
			break;
		case "10n":
			document.getElementById("weather-icon"+index.toString()).src = "assets/rain-night.svg";
			break;
		case "11d":
		case "11n":
			document.getElementById("weather-icon"+index.toString()).src = "assets/thunderstorms.svg";
			break;
		case "13d":
		case "13n":
			document.getElementById("weather-icon"+index.toString()).src = "assets/snow.svg";
			break;
		case "50d":
		case "50n":
			document.getElementById("weather-icon"+index.toString()).src = "assets/mist.svg";
			break;
	}	
}

function slideUp(){
	document.getElementById("header").style.animation = "slide-up 0.5s steps(600)";
	setTimeout(function(){document.getElementById("header").style.bottom = "100vh";}, 500);
}

function slideDown(){
	document.getElementById("header").style.animation = "slide-down 0.5s steps(600)";
	setTimeout(function(){document.getElementById("header").style.bottom = "0vh";}, 500);
}


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2){
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km

  if(d > 1000){
  	return false;	
  }else{
  	return true;
  }
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// run this code to make request when this script file gets executed