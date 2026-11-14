function searchAnimal() {
    let searchBarValue = document.getElementById("search-bar-input").value
        .toLowerCase()
        .trim()

    let searchResultsUl = document.getElementById("search-results")

    let resultsCounter = 0
    let maxResults = 10
    let addedAnimals = []

    searchResultsUl.innerHTML = ""

    if (searchBarValue == "") {
        searchResultsUl.style.display = "none"
        searchResultsUl.innerHTML = ""
        return
    }

    for (let i = 0; i < continentsIds.length; i++) {
        let animals = continents[continentsIds[i]].animals

        for (let j = 0; j < animals.length; j++) {
            let animal = animals[j]
            let animalName = animal.name.toLowerCase()

            if (
                (animal.slug.includes(searchBarValue) ||
                animalName.includes(searchBarValue)) &&
                !addedAnimals.includes(animal.slug) &&
                resultsCounter < maxResults
            ) {
                searchResultsUl.style.display = "block"

                searchResultsUl.innerHTML += `
                <li class="search-result inter-light" data-slug="${animal.slug}">${animal.name}</li>
                `

                addedAnimals.push(animal.slug)
                resultsCounter++

            }
        }
    }
    
    if (resultsCounter == 0) {
        searchResultsUl.innerHTML += `
                <li class="search-result inter-light">Animal not found</li>
                `
    }

    let searchResults = document.querySelectorAll(".search-result")

    searchResults.forEach(result => {
        result.addEventListener("click", () => {
            openAnimalCardFromSearch(result.dataset.slug)
            searchResultsUl.style.display = "none"      
        })
    });
}

async function openAnimalCardFromSearch(animalSlug) {
    await openAnimalCard(animalSlug)
    removeBackButton()
    document.getElementById("search-bar-input").value = ""
}

function removeBackButton() {
    document.getElementById("back-button").style.display = "none"
}

// Close elements when clicking outside
document.addEventListener("click", (event) => {
    let searchBarContainer = document.getElementById("search-bar")
    let searchResultsUl =  document.getElementById("search-results")

    let filterOptionsContainer = document.getElementById("filter-options-container")
    let filterButton = document.getElementById("filter-settings-button")

    if (!searchBarContainer.contains(event.target)) {
        searchResultsUl.style.display = "none"
    }

    if (
        !filterOptionsContainer.contains(event.target) &&
        !filterButton.contains(event.target)    
    ) {
        closeFilters()
    }
})