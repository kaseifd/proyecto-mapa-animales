
function openFilters() {
    document.getElementById("filter-options-container").classList.add("opened")

}

function closeFilters() {
    document.getElementById("filter-options-container").classList.remove("opened")
}


function doFilter(category) {
    let continentsName = ["europe", "africa", "north-america", "south-america", "oceania", "oceans", "asia", "antarctica"]
    let animals = []


    continentsName.forEach(continent => {
        continents[continent].animals.forEach(animal => { 
            
            if (animal.category == category) {
                animals.push(animal)
            }
        })
    })
    continentsName.forEach(continent => {
    displayAnimalsNumber(sortAnimalsByContinent(animals)[continent], continent)
    })

}