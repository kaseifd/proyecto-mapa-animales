let svgHTMLtag
let mapContainerHTML = document.getElementById("map-container")


await fetch("images/world-map.svg")
    .then((response => response.text()))
    .then((svgCode => {
        svgHTMLtag = svgCode
        mapContainerHTML.innerHTML += svgHTMLtag
        document.getElementById("europe").addEventListener("click", () => openContinent("europe"))
        document.getElementById("north-america").addEventListener("click", () => openContinent("north-america"))
        document.getElementById("south-america").addEventListener("click", () => openContinent("south-america"))
        document.getElementById("asia").addEventListener("click", () => openContinent("asia"))
        document.getElementById("antarctica").addEventListener("click", () => openContinent("antarctica"))
        document.getElementById("africa").addEventListener("click", () => openContinent("africa"))
        document.getElementById("oceania").addEventListener("click", () => openContinent("oceania"))
    }))


function openContinent(continent) {

    // await fetch(`${continent}-info.html`).then(res => res.text()).then(data => {
    //     document.getElementById("continents-container").innerHTML = data
    // })

    document.getElementById("continents-container").innerHTML = `
    <div id="${continent}-info" class="continent-info">
        <div id="left-page">
            <img src="images/world-map.svg" alt="">
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

    displayAnimals(continent)
    
    document.getElementById("close-button").addEventListener("click", closeContinent)
}

function closeContinent() {
    document.getElementById("continents-container").innerHTML = ""
}



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

await animalsByContinent()

async function animalsByContinent() {
    await fetch("https://globalanimalguide.org/api/animals.json")
        .then((response) => response.json())
        .then((data) => {
            let animals = data.animals

            // Todo este bucle clasifica los animales por continente y los mete en su array correspondiente
            for (let i = 0; i < animals.length; i++) {
                for (let j = 0; j < animals[i].range.continents.length; j++) {
                    if (animals[i].range.continents[j] == "Europe") {
                        continents.europe.animals.push(animals[i].name)
                    }

                    if (animals[i].range.continents[j] == "Asia") {
                        continents.asia.animals.push(animals[i].name)
                    }
                    if (animals[i].range.continents[j] == "North America") {
                        continents["north-america"].animals.push(animals[i].name)
                    }
                    if (animals[i].range.continents[j] == "South America") {
                        continents["south-america"].animals.push(animals[i].name)
                    }
                    if (animals[i].range.continents[j] == "Oceania") {
                        continents.oceania.animals.push(animals[i].name)
                    }
                    if (animals[i].range.continents[j] == "Africa") {
                        continents.africa.animals.push(animals[i].name)
                    }
                    if (animals[i].range.continents[j] == "Antarctica") {
                        continents.antarctica.animals.push(animals[i].name)
                    }
                    if (animals[i].range.continents[j] == "Oceans") {
                        continents.oceans.animals.push(animals[i].name)
                    }
                }
            }

            // Ordena los arrays alfabéticamente
            animalsFromEurope.sort()
            animalsFromAsia.sort()
            animalsFromNorthAmerica.sort()
            animalsFromSouthAmerica.sort()
            animalsFromAfrica.sort()
            animalsFromOceania.sort()
            animalsFromAntarctica.sort()
            animalsFromOceans.sort()
        })
}

function displayAnimals(continent) {
    for (let i = 0; i < continents[continent].animals.length; i++) {
               
        document.getElementById("animals-container").innerHTML += `
        <li class="list-item">
            <h3 class="animal-name italianno-regular">${continents[continent].animals[i]}</h3>
        </li>`
    }
}