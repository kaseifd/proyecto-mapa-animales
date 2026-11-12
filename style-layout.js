loadCurrentPalette()

function loadCurrentPalette() {
   let currentPalette = localStorage.getItem("currentPalette")
   console.log(currentPalette);

   if (currentPalette == "default-palette" || !currentPalette) {
      document.getElementById("color-palette").href = "CSS/default-palette.css"
      localStorage.setItem("currentPalette", "default-palette")
   }

   if (currentPalette == "alternative-palette") {
      document.getElementById("color-palette").href = "CSS/alternative-palette.css"
      localStorage.setItem("currentPalette", "alternative-palette")
   }
}


function changePalette() {
   if (localStorage.getItem("currentPalette") == "default-palette") {
      document.getElementById("color-palette").href = "CSS/alternative-palette.css"
      localStorage.setItem("currentPalette", "alternative-palette")
      return

   }

   //cambiar esto
   if (localStorage.getItem("currentPalette") == "alternative-palette") {
      document.getElementById("color-palette").href = "CSS/default-palette.css"
      localStorage.setItem("currentPalette", "default-palette")
      return
   }
}