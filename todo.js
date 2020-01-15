const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
	const btn = event.target;//해당 이벤트가 일어난 요소 그 자체. 그걸 타겟으로 하여 가져옴...
	const li = btn.parentNode;//버튼만 지우는 것이 아니라 버튼이 속한 리스트 자체를 지워야 하기 때문에.
	toDoList.removeChild(li);
	const cleanToDos = toDos.filter(function(toDo){//filter(콜백fnc) maintains what passes fnc checking algorithm === maintain when return value is TRUE
		return toDo.id !== parseInt(li.id);//int-fy
	});
	toDos = cleanToDos;
	saveToDos();
}

function saveToDos(){
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function loadToDos(){
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if (loadedToDos !== null)	{
		const parsedToDos = JSON.parse(loadedToDos);//object-fy
		parsedToDos.forEach(function(toDo){//call function for each element inside
			paintToDo(toDo.text);
		})
	}
}

function paintToDo(text){
	const li = document.createElement("li");
	const delButton = document.createElement("button");
	delButton.innerText = "X";
	delButton.addEventListener("click", deleteToDo);
	const span = document.createElement("span");
	span.innerText = text;
	li.appendChild(span);
	li.appendChild(delButton);
	li.id = toDos.length + 1;
	toDoList.appendChild(li);
	const toDoObj = {
		text:text,
		id:toDos.length + 1
	};
	toDos.push(toDoObj);
	saveToDos();
}

function handleSubmit(event){
	event.preventDefault();//액션의 전송을 방지
	const currentValue = toDoInput.value;
	paintToDo(currentValue);
	toDoInput.value = "";
}

function init(){
	loadToDos();
	toDoForm.addEventListener("submit",handleSubmit);
}

init();