let svgCode
let mapContainerHTML = document.getElementById("map-container")

await fetch("images/world-map.svg")
    .then((response => response.text()))
    .then((data => {
        svgCode = data
        mapContainerHTML.innerHTML += svgCode
        document.getElementById("europe").addEventListener("click", () => showContinent("europe"))
        document.getElementById("north-america").addEventListener("click", () => showContinent("north-america"))
        document.getElementById("south-america").addEventListener("click", () => showContinent("south-america"))
        document.getElementById("asia").addEventListener("click", () => showContinent("asia"))
        document.getElementById("antarctica").addEventListener("click", () => showContinent("antarctica"))
        document.getElementById("africa").addEventListener("click", () => showContinent("africa"))
        document.getElementById("oceania").addEventListener("click", () => showContinent("oceania"))
    }))


async function showContinent(continent){
    console.log(continent);
    
    await fetch("europe-info.html").then(res => res.text()).then(data => {
        console.log(data);
        mapContainerHTML.innerHTML += data
    })
    

}

function getHTML(id) {
    document.getElementById(id)
    
}
    
    
    
// function openContinent() {



    
// }