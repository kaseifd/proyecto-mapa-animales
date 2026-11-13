let svgHTMLtag
let mapContainerHTML = document.getElementById("map-container")

let continents = {
    "europe": {
        name: "Europe",
        animals: [],
    },

    "north-america": {
        name: "North America",
        animals: [],
    },

    "south-america": {
        name: "South America",
        animals: [],
    },

    "asia": {
        name: "Asia",
        animals: [],
    },

    "africa": {
        name: "Africa",
        animals: [],
    },

    "oceania": {
        name: "Oceania",
        animals: [],
    },


    "antarctica": {
        name: "Antarctica",
        animals: [],
    },

    "oceans": {
        name: "oceans",
        animals: [],
    },

}

let animalsFromEurope = continents.europe.animals
let animalsFromNorthAmerica = continents["north-america"].animals
let animalsFromSouthAmerica = continents["south-america"].animals
let animalsFromAsia = continents.asia.animals
let animalsFromOceania = continents.oceania.animals
let animalsFromAfrica = continents.africa.animals
let animalsFromAntarctica = continents.antarctica.animals
let animalsFromOceans = continents.oceans.animals

displayMap()

async function displayMap() {
    await fetch("images/world-map.svg")
        .then((response => response.text()))
        .then((svgCode => {
            svgHTMLtag = svgCode
            mapContainerHTML.innerHTML += svgHTMLtag

            // Open Europe
            document.getElementById("europe").addEventListener("click", () => openContinent("europe"))
            document.getElementById("circle-europe").addEventListener("click", () => openContinent("europe"))

            // Open North America
            document.getElementById("north-america").addEventListener("click", () => openContinent("north-america"))
            document.getElementById("circle-north-america").addEventListener("click", () => openContinent("north-america"))

            // Open South America
            document.getElementById("south-america").addEventListener("click", () => openContinent("south-america"))
            document.getElementById("circle-south-america").addEventListener("click", () => openContinent("south-america"))

            // Open Asia
            document.getElementById("asia").addEventListener("click", () => openContinent("asia"))
            document.getElementById("circle-asia").addEventListener("click", () => openContinent("asia"))

            // Open Antarctica
            document.getElementById("antarctica").addEventListener("click", () => openContinent("antarctica"))
            document.getElementById("circle-antarctica").addEventListener("click", () => openContinent("antarctica"))

            // Open Africa
            document.getElementById("africa").addEventListener("click", () => openContinent("africa"))
            document.getElementById("circle-africa").addEventListener("click", () => openContinent("africa"))

            // Open Oceania
            document.getElementById("oceania").addEventListener("click", () => openContinent("oceania"))
            document.getElementById("circle-oceania").addEventListener("click", () => openContinent("oceania"))

            // Open oceans
            document.getElementById("circle-oceans").addEventListener("click", () => openContinent("oceans"))
        }))

    await fetch("https://globalanimalguide.org/api/animals.json")
        .then((response) => response.json())
        .then((data) => {
            let animals = data.animals 
            // console.log(animals);
            sortAnimalsByContinent(animals)}) 
            
    
    

    displayAnimalsNumber(continents["europe"], "europe")
    displayAnimalsNumber(continents["north-america"], "north-america")
    displayAnimalsNumber(continents["south-america"], "south-america")
    displayAnimalsNumber(continents["asia"], "asia")
    displayAnimalsNumber(continents["antarctica"], "antarctica")
    displayAnimalsNumber(continents["africa"], "africa")
    displayAnimalsNumber(continents["oceania"], "oceania")
    displayAnimalsNumber(continents["oceans"], "oceans")

}

let currentContinent = ""

function openContinent(continent) {
    currentContinent = continent
    document.getElementById("continents-container").innerHTML = `
    <div id="${continent}-info" class="continent-info">
        <div id="left-page">
            <div id="left-page-map"> 
                ${svgHTMLtag}
            </div>

            <ul id="left-page-legend" class="columns-list"> 
                <li class="list-item legend-item"> 
                    <div class="legend-circle critically-endangered"></div>
                    <p class="conservation-status cardenio-regular">Critically endangered</p>
                </li>
                <li class="list-item legend-item"> 
                    <div class="legend-circle endangered"></div>
                    <p class="conservation-status cardenio-regular">Endangered</p>
                </li>
                <li class="list-item legend-item"> 
                    <div class="legend-circle vulnerable"></div>
                    <p class="conservation-status cardenio-regular">Vulnerable</p>
                </li>
                <li class="list-item legend-item"> 
                    <div class="legend-circle near-threatened"></div>
                    <p class="conservation-status cardenio-regular">Near threatened</p>
                </li>
                 <li class="list-item legend-item"> 
                    <div class="legend-circle least-concern"></div>
                    <p class="conservation-status cardenio-regular">Least Concern</p>
                </li>
                <li class="list-item legend-item"> 
                    <div class="legend-circle domesticated"></div>
                    <p class="conservation-status cardenio-regular">Domesticated</p>
                </li>
                <li class="list-item legend-item"> 
                    <div class="legend-circle not-evaluated"></div>
                    <p class="conservation-status cardenio-regular">Not Evaluated</p>
                </li>
            </ul>

        </div>
        <div id="right-page">
            <h2 class="italianno-regular">Animals from ${continents[continent].name}</h2>
            <div id="list-container">
                <ul id="animals-container" class="columns-list"></ul>
            </div>

            <div id="close-button">
                <img class="icon" src="icons/icon-close.svg" alt="">
            </div>
        </div>
    </div>
    `
    // Change color of the selected continent / ocean
    if (continent != "oceans") {
        document.getElementById(`${continent}`).classList.add("active")

    } else {
        document.getElementById(`left-page-map`).style.background = "var(--accent-background)"
    }

    displayAnimals(continent)

    document.getElementById("close-button").addEventListener("click", closeContinent)

}



function closeContinent() {
    document.getElementById("continents-container").innerHTML = ""
}



function sortAnimalsByContinent(animals) {
            // Todo este bucle clasifica los animales por continente y los mete en su array correspondiente
            for (let i = 0; i < animals.length; i++) {
                for (let j = 0; j < animals[i].range.continents.length; j++) {
                    if (animals[i].range.continents[j] == "Europe") {
                        continents.europe.animals.push(animals[i])
                    }

                    if (animals[i].range.continents[j] == "Asia") {
                        continents.asia.animals.push(animals[i])
                    }
                    if (animals[i].range.continents[j] == "North America") {
                        continents["north-america"].animals.push(animals[i])
                    }
                    if (animals[i].range.continents[j] == "South America") {
                        continents["south-america"].animals.push(animals[i])
                    }
                    if (animals[i].range.continents[j] == "Oceania") {
                        continents.oceania.animals.push(animals[i])
                    }
                    if (animals[i].range.continents[j] == "Africa") {
                        continents.africa.animals.push(animals[i])
                    }
                    if (animals[i].range.continents[j] == "Antarctica") {
                        continents.antarctica.animals.push(animals[i])
                    }
                    if (animals[i].range.continents[j] == "Oceans") {
                        continents.oceans.animals.push(animals[i])
                    }
                }
            }

            // Ordena los arrays alfabéticamente
            animalsFromEurope.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            animalsFromAsia.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            animalsFromNorthAmerica.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            animalsFromSouthAmerica.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            animalsFromAfrica.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            animalsFromOceania.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            animalsFromAntarctica.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            animalsFromOceans.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })

            console.log(continents);
             return continents
        }

function displayAnimals(continent) {
    for (let i = 0; i < continents[continent].animals.length; i++) {

        document.getElementById("animals-container").innerHTML += `
        <li class="list-item animal-item">
            <h3 class="animal-name italianno-regular" id="${continents[continent].animals[i].slug}">${continents[continent].animals[i].name}</h3>
            <div class="legend-circle ${continents[continent].animals[i].conservationStatus.toLowerCase().replace(" ", "-")}"></div>
        </li>`
    }
    addSelectEventToAnimalsList(continents, continent)
}

function displayAnimalsNumber(continent, continentName) {
    console.log(continent);
    
    document.getElementById(`circle-${continentName}`).innerHTML = `<p class="animals-number inter-regular">${continent.animals.length}</p>`
}