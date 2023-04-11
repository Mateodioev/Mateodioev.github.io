// window.addEventListener("")
const defaultPage = "aboutme";

window.addEventListener("load", function(event) {
	view(defaultPage);
});

function openNav(){
	document.getElementById("mySidenav").style.width="250px";
}

function closeNav(){
	document.getElementById("mySidenav").style.width="0";

}

function view(page) {
	hideAboutme();
	hideExp();
	hideProyects();
	hideContactme();
	document.getElementById(page).style.display = "inline-block";
}

function viewAboutme() {
	document.getElementById('aboutme').style.display = "inline-block";
	hideExp();
	hideProyects();
	hideContactme();
}

const hideAboutme = () => document.getElementById('aboutme').style.display = "none";

function viewExp() {
	document.getElementById('exp').style.display = "inline-block";
	hideAboutme();
	hideProyects();
	hideContactme();
}

const hideExp = () => document.getElementById('exp').style.display = "none";

function viewProyects() {
	document.getElementById('proyects').style.display = "inline-block";
	hideAboutme();
	hideExp();
	hideContactme();
}

const hideProyects = () => document.getElementById('proyects').style.display = "none";

function viewContactme() {
	document.getElementById('contactme').style.display = "inline-block";
	hideAboutme();
	hideExp();
	hideProyects();
}

const hideContactme = () => document.getElementById('contactme').style.display = "none";
