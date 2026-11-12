window.addEventListener("keydown", (event) => {
    if (event.key == "Enter") searchAnimal()
})

function searchAnimal() {
    let searchBarValue = document.getElementById("search-bar-input").value

    let animalNameForURL = animalNameToNameForUrl(searchBarValue);
    console.log(animalNameForURL);
    

    //No funciona mientras en animal-card.js ponga let animalNameForURL = animal.slug (seria solo animal). Ver mañana como solucionarlo. Habra que cambiar la funcion de openAnimalCard
    openAnimalCard(animalNameForURL)
}

function animalNameToNameForUrl(animalName) {
    return animalName.toLowerCase().replaceAll(" ", "-").normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    
}