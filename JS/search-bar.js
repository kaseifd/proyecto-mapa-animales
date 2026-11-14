function searchAnimal() {
    let searchBarValue = document.getElementById("search-bar-input").value
        .toLowerCase()
        .trim()

    let continentsName = ["europe", "africa", "north-america", "south-america", "oceania", "oceans", "asia", "antarctica"]

    document.getElementById("search-results").innerHTML = ``
    let maxResults = 10
    let resultsCounter = 0

    continentsIds.forEach(continentId => {
        continents[continentId].animals.forEach(animal => {
            if (
                (animal.slug.includes(searchBarValue) || 
                animal.name.toLowerCase().includes(searchBarValue)) && 
                resultsCounter < maxResults
            ) {
                document.getElementById("search-results").innerHTML += `
                    <li class="search-result">${animal.name}</li>
                    `

                resultsCounter++
            }
        })
    })

    // openAnimalCard(animalNameForURL)
}

// function animalNameToNameForUrl(animalName) {
//     return animalName.toLowerCase().replaceAll(" ", "-").normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "");

// }