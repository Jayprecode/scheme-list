let f = document.querySelector("#s__form"),
	sl = document.querySelector(".s__collection"),
	clearBtn = document.querySelector(".clear__scheme"),
	fltr = document.querySelector("#s__filter"),
	s__Input = document.querySelector("#scheme");

loadEventlisteners();
//Load All event listeners
function loadEventlisteners() {
	//DOM Load event
	document.addEventListener("DOMContentLoaded", getSchemes);
	//Add task events
	f.addEventListener("submit", addScheme);
	//Remove task event
	sl.addEventListener("click", removeScheme);
	//Clear task event
	clearBtn.addEventListener("click", clearSchemes);
	//Filter tasks event
	fltr.addEventListener("keyup", filterSchemes);
}

//Get tasks from Local Storage
function getSchemes() {
	let scheme_s;
	if (localStorage.getItem("scheme_s") === null) {
		scheme_s = [];
	} else {
		scheme_s = JSON.parse(localStorage.getItem("scheme_s"));
	}

	scheme_s.forEach(function (scheme) {
		//Create li element
		const li = document.createElement("li");
		//Add class
		li.className = "collection-item";
		//Create text node and append to li
		li.appendChild(document.createTextNode(scheme));
		//Create new link element
		const link = document.createElement("a");
		//Add class
		link.className = "delete-item secondary-content";
		//Add icon html
		link.innerHTML = "<i class='fa fa-remove'></i>";
		//Append the link to li
		li.appendChild(link);
		//Append the li to ul
		sl.appendChild(li);
	});
}

//Add Scheme
function addScheme(e) {
	if (s__Input.value === "") {
		alert("Add Scheme?");
	}

	//Create li element
	const li = document.createElement("li");
	//Add class
	li.className = "collection-item";
	//Create text node and append to li
	li.appendChild(document.createTextNode(s__Input.value));
	//Create new link element
	const link = document.createElement("a");
	//Add class
	link.className = "delete-item secondary-content";
	//Add icon html
	link.innerHTML = "<i class='fa fa-remove'></i>";
	//Append the link to li
	li.appendChild(link);
	//Append the li to ul
	sl.appendChild(li);

	//Store in Local Storage
	storeSchemeLs(s__Input.value);

	//Clear input
	s__Input.value = "";

	//Prevents browser from refreshing
	e.preventDefault();
}

//Store Scheme
function storeSchemeLs(scheme) {
	let scheme_s;
	if (localStorage.getItem("scheme_s") === null) {
		scheme_s = [];
	} else {
		scheme_s = JSON.parse(localStorage.getItem("scheme_s"));
	}
	scheme_s.push(scheme);

	localStorage.setItem("scheme_s", JSON.stringify(scheme_s));
}




//Remove Scheme
function removeScheme(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		if (confirm("Are you Sure?")) {
			e.target.parentElement.parentElement.remove();
			//Remove from Local Storage
			removeSchemeLs(e.target.parentElement.parentElement);
		}
	}
}

//Remove from Local Storage
function removeSchemeLs(schemeItem) {
	let scheme_s;
	if (localStorage.getItem("scheme_s") === null) {
		scheme = [];
	} else {
		scheme_s = JSON.parse(localStorage.getItem("scheme_s"));
	}
	scheme_s.forEach(function (scheme, index) {
		if (schemeItem.textContent === scheme) {
			scheme_s.splice(index, 1);
		}
	});
	localStorage.setItem("scheme_s", JSON.stringify(scheme_s));
}




//Clear Schemes
function clearSchemes() {
	// sl.innerHTML = "";
	//or
	while (sl.firstChild) {
		sl.removeChild(sl.firstChild);
	}

	//Clear from Local storage
	clearSchemesLs();
}

//Clear from Local storage

function clearSchemesLs() {
	localStorage.clear();
}





//Filter Scheme
function filterSchemes(e) {
	const text = e.target.value.toLowerCase();
	document.querySelectorAll(".collection-item").forEach(function (scheme) {
		const item = scheme.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			scheme.style.display = "block";
		} else {
			scheme.style.display = "none";
		}
	});
}
