let svgHTMLtag
let mapContainerHTML = document.getElementById("map-container")


await fetch("images/world-map.svg")
    .then((response => response.text()))
    .then((svgCode => {
        svgHTMLtag = svgCode
        mapContainerHTML.innerHTML += svgHTMLtag
        document.getElementById("europe").addEventListener("click", () => openContinent("europe"))
        // document.getElementById("north-america").addEventListener("click", () => openContinent("north-america"))
        // document.getElementById("south-america").addEventListener("click", () => openContinent("south-america"))
        // document.getElementById("asia").addEventListener("click", () => openContinent("asia"))
        // document.getElementById("antarctica").addEventListener("click", () => openContinent("antarctica"))
        // document.getElementById("africa").addEventListener("click", () => openContinent("africa"))
        // document.getElementById("oceania").addEventListener("click", () => openContinent("oceania"))
    }))


async function openContinent(continent) {

    await fetch(`${continent}-info.html`).then(res => res.text()).then(data => {
        document.getElementById("continents-container").innerHTML = data
    })

    displayAnimals()
    
    document.getElementById("close-button").addEventListener("click", closeContinent)
}



function closeContinent() {
    document.getElementById("continents-container").innerHTML = ""
}




let animalsFromEurope = []
let animalsFromNorthAmerica = []
let animalsFromSouthAmerica = []
let animalsFromAsia = []
let animalsFromOceania = []
let animalsFromAfrica = []
let animalsFromAntarctica = []
let animalsFromOceans = []

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
                        animalsFromEurope.push(animals[i].name)
                    }

                    if (animals[i].range.continents[j] == "Asia") {
                        animalsFromAsia.push(animals[i].name)
                    }
                    if (animals[i].range.continents[j] == "North America") {
                        animalsFromNorthAmerica.push(animals[i].name)
                    }
                    if (animals[i].range.continents[j] == "South America") {
                        animalsFromSouthAmerica.push(animals[i].name)
                    }
                    if (animals[i].range.continents[j] == "Oceania") {
                        animalsFromOceania.push(animals[i].name)
                    }
                    if (animals[i].range.continents[j] == "Africa") {
                        animalsFromAfrica.push(animals[i].name)
                    }
                    if (animals[i].range.continents[j] == "Antarctica") {
                        animalsFromAntarctica.push(animals[i].name)
                    }
                    if (animals[i].range.continents[j] == "Oceans") {
                        animalsFromOceans.push(animals[i].name)
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

// console.log(animalsFromEurope);
// console.log(animalsFromAsia);
// console.log(animalsFromNorthAmerica)
// console.log(animalsFromSouthAmerica)
// console.log(animalsFromAfrica)
// console.log(animalsFromOceania)
// console.log(animalsFromOceans)
// console.log(animalsFromAntarctica)

// hacerlo para que funcionen todos los continentes
function displayAnimals() {
    for (let i = 0; i < animalsFromEurope.length; i++) {
               
        document.getElementById("animals-container").innerHTML += `
        <li class="list-item">
            <h3 class="animal-name italianno-regular">${animalsFromEurope[i]}</h3>
        </li>`
    }
}