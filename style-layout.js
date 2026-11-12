function changePalette() {
   let currentCSS = document.getElementById("color-palette").title

   if (currentCSS === "default-palette") {
      document.getElementById("color-palette").href = "../CSS/alternative-palette.css"
      currentCSS = document.getElementById("color-palette").title =  "alternative-palette"

   } else if (currentCSS === "alternative-palette") {
      document.getElementById("color-palette").href = "CSS/default-palette.css"
      currentCSS = document.getElementById("color-palette").title = "default-palette"
      
   }
}