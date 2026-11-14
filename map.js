let worldMapSVG
let currentContinent = ""

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
        name: "Oceans",
        animals: [],
    },

}

let continentsIds = Object.keys(continents)

loadMap()

async function loadMap() {
    // Load svg map
    await fetch("images/world-map.svg")
        .then((response => response.text()))
        .then((svgCode => {
            worldMapSVG = svgCode
            mapContainerHTML.innerHTML += worldMapSVG

            addMapEvents()
        }))

    // Get animals from API
    await fetch("https://globalanimalguide.org/api/animals.json")
        .then((response) => response.json())
        .then((data) => {
            sortAnimalsByContinent(data.animals)
        })

    // Show animals number by continent
    for (let i = 0; i < continentsIds.length; i++) {
        let continentId = continentsIds[i];
        
        renderAnimalCount(continentId);
    }
}

function addMapEvents() {
    for (let i = 0; i < continentsIds.length; i++) {
        if (continentsIds[i] != "oceans") {
            document.getElementById(continentsIds[i]).addEventListener("click", () => showContinentDetails(continentsIds[i]))
        }

        document.getElementById(`circle-${continentsIds[i]}`).addEventListener("click", () => showContinentDetails(continentsIds[i]))
    }
}

function sortAnimalsByContinent(animals) {
    
    // Classify animals by continent
    animals.forEach(animal => {
        animal.range.continents.forEach(continentName => {
            continentsIds.forEach(continentId => {
                if (continentName == continents[continentId].name) {
                    continents[continentId].animals.push(animal)
                }
            })
        })
    });


    // Sort alphabetically the animals in continents
    continentsIds.forEach(continentId => {
        sortAnimalsAlphabetically(continents[continentId].animals)
    });
}

function sortAnimalsAlphabetically(animals) {
    animals.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    })

    return animals
}

function showContinentDetails(continent) {
    currentContinent = continent
    document.getElementById("continents-container").innerHTML = `
    <div id="${continent}-info" class="continent-info">
        <div id="left-page">
            <div id="left-page-map"> 
                ${worldMapSVG}
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
    // Highlight the selected continent / ocean
    if (continent != "oceans") {
        document.getElementById(continent).classList.add("active")

    } else {
        document.getElementById(`left-page-map`).style.background = "var(--accent-background)"
    }

    // Show animals by continent
    renderAnimalList(continent)

    // Hide continent details event
    document.getElementById("close-button").addEventListener("click", hideContinentDetails)

}

function hideContinentDetails() {
    document.getElementById("continents-container").innerHTML = ""
}

function renderAnimalList(continent) {

    let animals = continents[continent].animals

    for (let i = 0; i < animals.length; i++) {
        let conservationStatusClass = animals[i].conservationStatus.toLowerCase().replace(" ", "-")

        document.getElementById("animals-container").innerHTML += `
        <li class="list-item animal-item">
            <h3 class="animal-name italianno-regular" id="${animals[i].slug}">${animals[i].name}</h3>
            <div class="legend-circle ${conservationStatusClass}"></div>
        </li>`
    }

    addSelectEventToAnimalsList(continents, continent)
}

function renderAnimalCount(continentId) {
    document.getElementById(`circle-${continentId}`).innerHTML = `<p class="animals-number inter-regular">${continents[continentId].animals.length}</p>`
}