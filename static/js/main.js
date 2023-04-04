function openNav(){
	document.getElementById("mySidenav").style.width="250px";
}

function closeNav(){
	document.getElementById("mySidenav").style.width="0";

}

function viewAboutme() {
	document.getElementById('aboutme').style.display = "inline-block";
	hideExp();
	hideProyects();
	hideContactme();
}

function hideAboutme() { document.getElementById('aboutme').style.display = "none";}

function viewExp() {
	document.getElementById('exp').style.display = "inline-block";
	hideAboutme();
	hideProyects();
	hideContactme();
}

function hideExp() { document.getElementById('exp').style.display = "none"; }

function viewProyects() {
	document.getElementById('proyects').style.display = "inline-block";
	hideAboutme();
	hideExp();
	hideContactme();
}

function hideProyects() { document.getElementById('proyects').style.display = "none"; }

function viewContactme() {
	document.getElementById('contactme').style.display = "inline-block";
	hideAboutme();
	hideExp();
	hideProyects();
}

function hideContactme() { document.getElementById('contactme').style.display = "none"; }
