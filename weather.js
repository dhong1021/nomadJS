const jsWeather = document.querySelector(".js-weather");
const API_KEY = "4c09b694d04516a5578269bfd19d2016";//simple way of getting data from other servers
const COORDS = 'coords';

function getWeather(lat, lon){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
		return response.json()
	}).then(function(json){
		const temperature = json.main.temp;
		const place = json.name;
		jsWeather.innerText = `${temperature} @ ${place}`;
	});
}

function saveCoords(coordsObj){
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCoords(coordsObj);
	getWeather(latitude,longitude);
}	

function handleGeoError(){
	console.log("access error");
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);
	if (loadedCoords === null)	{
		askForCoords();
	} else {
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude);

	}
}

function init(){
	loadCoords();
}

init();