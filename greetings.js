const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greetings = document.querySelector(".js-greetings");

const USER_STORAGE = "currentUser";
const SHOWING_CN = "showing";

function saveName(text){
	localStorage.setItem(USER_STORAGE, text);
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = input.value;
	paintGreeting(currentValue);
	saveName(currentValue);
}

function askForName(){
	form.classList.add(SHOWING_CN);
	form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
	form.classList.remove(SHOWING_CN);
	greetings.classList.add(SHOWING_CN);
	greetings.innerText = `Hello ${text}`;
}

function loadName(){
	const currentUser = localStorage.getItem(USER_STORAGE);
	if (currentUser === null){//no user
		askForName();
	} else {//is user
		paintGreeting(currentUser);
	}
}

function init(){
	loadName();
}

init();