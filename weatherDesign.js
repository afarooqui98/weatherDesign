"strict mode";


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
		let status = list[i]["weather"][0]["description"];

		let date = new Date(list[i]["dt_txt"] + ' UTC');
		hour_24 = date.getHours().toString();
		hour = (hour_24 > 12)? hour_24 -12 : hour_24;
		hour = (hour_24 == '00')? 12 : hour_24;
		suffix = (hour_24 >= 12)? 'pm' : 'am';
		console.log(hour+":00",suffix);
		
		document.getElementById("weather-temp"+i.toString()).innerHTML = temp.toString().substr(0,2) + "&#176;";
		
		document.getElementById("weather-time"+i.toString()).innerHTML = hour+":00 "+suffix;

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
		let status = object["weather"][0]["description"];

		let date = new Date();
		hour_24 = date.getHours().toString();
		hour = (hour_24 > 12)? hour_24 -12 : hour_24;
		hour = (hour_24 == '00')? 12 : hour_24;
		suffix = (hour_24 >= 12)? 'pm' : 'am';
		console.log(hour+":00",suffix);
		
		document.getElementById("cur-weather-temp").innerHTML = temp.toString().substr(0,2) + "&#176;";
		
		document.getElementById("cur-weather-time").innerHTML = hour+":00 "+suffix;

		
	};

	xhr2.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr2.send();
}

// run this code to make request when this script file gets executed 