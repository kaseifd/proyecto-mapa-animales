function addSelectEventToAnimalsList(continents, continent) {
    continents[continent].animals.forEach(animal => {
        document.getElementById(animal.slug).addEventListener("click", () => openAnimalCard(animal.slug))
    })
}

async function openAnimalCard(animalSlug) {
    // Get animal info
    let response = await fetch(`https://globalanimalguide.org/api/animals/${animalSlug}.json`);
    let animalInfo = await response.json();

    // Show animal card
    renderAnimalCard(animalInfo)

    // Load animal photo
    await renderAnimalPhoto(animalSlug)

    // Add buttons events
    document.getElementById("close-button").addEventListener("click", closeAnimalCard)

    document.getElementById("back-button").addEventListener("click", back)
}


function renderAnimalCard(animalInfo) {
    document.getElementById("continents-container").innerHTML = `
        <div id="${animalInfo.slug}-info" class="animal-info">
    <div id="left-page">
        <div id="back-button">
            <img class="icon" src="icons/icon-back.svg" alt="">
        </div>

        <div>
            <img id="animal-photo" src="../images/world-map.svg" alt="">
        </div>

        <div id="animal-continents-map">
            ${worldMapSVG}
        </div>

        <div id="animal-native-range">
            <p class="italianno-regular">${animalInfo.range.nativeRange}</p>
        </div>
    </div>

    <div id="right-page">
        <div id="animal-name">
            <h2 class="cardenio-bold" id="common-name">${animalInfo.name}</h2>
            <h3 class="italianno-regular" id="scientific-name">${animalInfo.scientificName}</h3>
        </div>

        <hr>
        <div id="animal-chips">
            <div id="animal-category">
                <p>${animalInfo.category}</p>
            </div>
            <div id="animal-conservation-status" class="${animalInfo.conservationStatus.toLowerCase().replaceAll(" ", "-")}">
                <p>${animalInfo.conservationStatus}</p>
            </div>
        </div>

        <ul id="animal-taxonomy">
            <li class="taxonomy-level">
                <label>Kingdom</label>
                <p>${animalInfo.taxonomy.kingdom}</p>
            </li>
            <li class="taxonomy-level">
                <label>Phylum</label>
                <p>${animalInfo.taxonomy.phylum}</p>
            </li>
            <li class="taxonomy-level">
                <label>Class</label>
                <p>${animalInfo.taxonomy.class}</p>
            </li>
            <li class="taxonomy-level">
                <label>Order</label>
                <p>${animalInfo.taxonomy.order}</p>
            </li>
            <li class="taxonomy-level">
                <label>Family</label>
                <p>${animalInfo.taxonomy.family}</p>
            </li>
            <li class="taxonomy-level">
                <label>Genus</label>
                <p>${animalInfo.taxonomy.genus}</p>
            </li>
        </ul>

        <hr>

        

        <div>
            <p id="animal-description" class="inter-light">${animalInfo.summary}</p>
        </div>

        <div id="close-button">
            <img class="icon" src="icons/icon-close.svg" alt="">
        </div>
    </div>
</div>
        `
}

function closeAnimalCard() {
    document.getElementById("continents-container").innerHTML = ""
}

function back() {
    showContinentDetails(currentContinent)
}

async function getAnimalImageURL(animalName) {

    let params = new URLSearchParams({
        action: "query",
        generator: "search",
        gsrsearch: `filetype:bitmap ${animalName}`,
        gsrnamespace: 6,
        gsrlimit: 1,
        prop: "imageinfo",
        iiprop: "url",
        iiurlwidth: 400,
        format: "json",
        origin: "*"
    });



    return await fetch(`https://commons.wikimedia.org/w/api.php?${params}`)
        .then(response => response.json())
        .then(data => {

            let images = data.query.pages;
            let firstImage = Object.values(images)[0];

            return firstImage.imageinfo[0].url;
        });
}

async function renderAnimalPhoto(animalName) {
    let animalImageURL = await getAnimalImageURL(animalName)

    document.getElementById("animal-photo").src = animalImageURL
}