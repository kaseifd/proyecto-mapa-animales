// window.addEventListener("keydown", (event) => {
//     if (event.key == "Enter") searchAnimal()
// })

function searchAnimal() {
    let searchBarValue = document.getElementById("search-bar-input").value

    let continentsName = ["europe", "africa", "north-america", "south-america", "oceania", "oceans", "asia", "antarctica"]

    document.getElementById("search-results").innerHTML = ``

    let counter = 0

    continentsName.forEach(continent => {
        continents[continent].animals.forEach(animal => {
            if ((animal.slug.includes(searchBarValue) || animal.name.includes(searchBarValue)) && counter <= 10) {
                document.getElementById("search-results").innerHTML += `
                <li class="search-result">${animal.name}</li>
                `
                counter++
            }
        })
    })

    // openAnimalCard(animalNameForURL)
}

function animalNameToNameForUrl(animalName) {
    return animalName.toLowerCase().replaceAll(" ", "-").normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}