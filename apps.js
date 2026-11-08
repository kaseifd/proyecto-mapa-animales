// Fetch Golbal Animal Guide:
// - Nombre común animal (name)
// - Nombre científico animal (scientificName)
// - Categoría animal (Mamífero, Ave, Reptil, Peces, Anfibios, Invertebrados) (category)
// - Descripción animal (summary)
// - Conservación animal (conservationStatus)
// - Taxonomía animal (taxonomy)
// - Estadísticas animal (stats)
// - Datos animal (facts)
// - Continentes que habita (range.continents)


fetch("https://globalanimalguide.org/api/animals.json")
    .then((response) => response.json())
    .then((data) => {console.log(data.animals)}
)


// Fetch Ornithophile
// Nombre científico ave (para hacer la comparación con al otra API) (scientific_name)
// Canto pájaros (sound)

fetch("https://ornithophile.vercel.app/api/birds")
    .then((response) => response.json())
    .then((data) => {console.log(data)}
)


// Fetch Wikimedia
// Imágenes animales

// console.log(await getAnimalImage("housecat"))

async function getAnimalImage(animalName) {

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

