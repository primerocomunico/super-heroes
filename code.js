// FUNCIONES
function createObjSuperHero(id) {
// "id" es el argumento vinculado al nombre del super heroe
/*
Función que crea el objeto con base en el id
*/
	const requester = new XMLHttpRequest();
	requester.onreadystatechange = function () {
		if (this.readyState != 4) {
			return
		}
		if (this.status == 200) {
			let arrInfoSuperHero = JSON.parse(this.responseText);
			let objSuperHero = {};
      // objSuperHero engloba todos los datos del super heroe elegido "name"
			objSuperHero.name = (arrInfoSuperHero["name"]);
			objSuperHero.inteligence = (arrInfoSuperHero["powerstats"]["intelligence"]);
			objSuperHero.strength = (arrInfoSuperHero["powerstats"]["strength"]);
			objSuperHero.speed = (arrInfoSuperHero["powerstats"]["speed"]);
			objSuperHero.durability = (arrInfoSuperHero["powerstats"]["durability"]);
			objSuperHero.power = (arrInfoSuperHero["powerstats"]["power"]);
			objSuperHero.combat = (arrInfoSuperHero["powerstats"]["combat"]);
			objSuperHero.fullName = (arrInfoSuperHero["biography"]["full-name"]);
			objSuperHero.alterEgos = (arrInfoSuperHero["biography"]["alter-egos"]);
			objSuperHero.aliases = (arrInfoSuperHero["biography"]["aliases"]);
      objSuperHero.birthPlace = (arrInfoSuperHero["biography"]["place-of-birth"]);
      objSuperHero.firstAppearance = (arrInfoSuperHero["biography"]["first-appearance"]);
      objSuperHero.alignment = (arrInfoSuperHero["biography"]["alignment"]);
      objSuperHero.gender = (arrInfoSuperHero["appearance"]["gender"]);
      objSuperHero.race = (arrInfoSuperHero["appearance"]["race"]);
      objSuperHero.height = (arrInfoSuperHero["appearance"]["height"][1]);
      objSuperHero.weight = (arrInfoSuperHero["appearance"]["weight"][1]);
      objSuperHero.occupation = (arrInfoSuperHero["work"]["occupation"]);
      objSuperHero.base = (arrInfoSuperHero["work"]["base"]);
      objSuperHero.affiliation = (arrInfoSuperHero["connections"]["group-affiliation"]);
      objSuperHero.relatives = (arrInfoSuperHero["connections"]["relatives"]);
      objSuperHero.image = (arrInfoSuperHero["image"]["url"]);
			// Esta función recibe la orden de ejecutar el objeto
			// En funciones no afecta si están el local o global (scope)
      showObjSuperHero(objSuperHero);
		}
	}
	requester.open("GET", "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/2257128831033444/" + id);
	requester.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	requester.send();
}

function getSuperHeroName(name) {
/*
Función que obtiene el nombre del superheroe a través del id
*/
  const requester = new XMLHttpRequest();
  requester.onreadystatechange = function () {
    if (this.readyState != 4) {return}
    if (this.status == 200) {
        let objSuperHeroId = JSON.parse(this.responseText);
        let superHeroId = objSuperHeroId["results"][0]["id"];
				createObjSuperHero(superHeroId);
    }
  }
    requester.open("GET", "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/2257128831033444/search/" + name);
		requester.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    requester.send()
}

function showObjSuperHero(objSuperHero) {
/*
Función que genera la card en el DOM con info del objeto
*/
	const nameCard = document.querySelector('#head-name');
	nameCard.innerHTML = `<h2 class="hero-name">${objSuperHero.name}</h2>`;

	const imageCard = document.querySelector('#image');
	imageCard.innerHTML = `<img src="${objSuperHero.image}" class="img-responsive fit-image">`;

	const biographyCard = document.querySelectorAll('#collapseOne > div')[0];
	biographyCard.innerHTML =
	`<div class="card-body">
		<p><b>Full Name:</b> <h3>${objSuperHero.fullName}</h3></p>
		<p><b>Alter Egos:</b> ${objSuperHero.alterEgos}</p>
		<p><b>Alias:</b> ${objSuperHero.aliases}</p>
		<p><b>Birth Place:</b> ${objSuperHero.birthPlace}</p>
		<p><b>First Appearance:</b> ${objSuperHero.firstAppearance}</p>
		<p><b>Alignment:</b> ${objSuperHero.alignment}</p>
		</div>
	`

	const powerStatsCard = document.querySelectorAll('#collapseTwo > div')[0];
	powerStatsCard.innerHTML =
	`<div class="card-body">
		<p><b>Intelligence:</b> <span class="description">${objSuperHero.inteligence}</span></p>
		<p><b>Strength:</b> <span class="description">${objSuperHero.strength}</span></p>
		<p><b>Speed:</b> <span class="description">${objSuperHero.speed}</span></p>
		<p><b>Durability:</b> <span class="description">${objSuperHero.durability}</span></p>
		<p><b>Power:</b> <span class="description">${objSuperHero.power}</span></p>
		<p><b>Combat:</b> <span class="description">${objSuperHero.combat}</span></p>
		</div>
	`

	const appearanceCard = document.querySelectorAll('#collapseThree > div')[0];
	appearanceCard.innerHTML =
	`<div class="card-body">
		<p><b>Gender:</b> <span class="description">${objSuperHero.gender}</span></p>
		<p><b>Race:</b> <span class="description">${objSuperHero.race}</span></p>
		<p><b>Height:</b> <span class="description">${objSuperHero.height}</span></p>
		<p><b>Weight:</b> <span class="description">${objSuperHero.weight}</span></p>
		</div>
	`

	const workCard = document.querySelectorAll('#collapseFour > div')[0];
	workCard.innerHTML =
	`<div class="card-body">
		<p><b>Occupation:</b> ${objSuperHero.occupation}</p>
		<p><b>Headquarkers:</b> ${objSuperHero.base}</p>
		</div>
	`

	const connectionsCard = document.querySelectorAll('#collapseFive > div')[0];
	connectionsCard.innerHTML =
	`<div class="card-body">
		<p><b>Affiliation:</b> ${objSuperHero.affiliation}</p>
		<p><b>Relatives:</b> ${objSuperHero.relatives}</p>
	`
}

// BINDS - Ejecuciones
// Vincula el value del input con la acción del button
const clickButton = document.querySelector('#button');
clickButton.addEventListener('click', function () {
	let name = document.querySelectorAll('#get-super-hero')[0].value;
	getSuperHeroName(name);
});
//
