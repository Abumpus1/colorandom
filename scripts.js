

var colors = document.querySelectorAll(".color-box");
var colorBoxColor = document.querySelectorAll(".color");
var hexAndLock = document.querySelectorAll(".hex-and-lock");
var newPaletteButton = document.querySelector("#new-palette");
var savePaletteButton = document.querySelector("#save-palette");
var savedPalettesContainer = document.querySelector(".saved-palettes");

var hexCharacters = ["A","B","C","D","E","F","0","1","2","3","4","5","6","7","8","9"];
var savedPalettes = [];

var newPalette1 = new Palette;
displayNewColors();
// newPalette1.giveColorsId();
/*
array to contain saved Palettes
function to display array into saved palettes section
have them sized for css

when we save a palette, mayhaps call a method on the palette we are saving
that gives an ID to each color

access color's id with data attributes and give hexcode to div
use something.dataset.id.style.setProperty("background-color", `${dataset.hexcode}`);
*/

// event listeners
newPaletteButton.addEventListener("click", displayNewColors);
savePaletteButton.addEventListener("click", function() {
  savePalette()
  displayPalettes()
  displayNewColors();
  // generateNewPalette();
  // createColorBox();
});

function savePalette() {
  savedPalettes.push(newPalette1);
  console.log(savedPalettes);
  generateNewPalette();
}

function displayPalettes() {
  newPalette1.giveColorsId();
  savedPalettesContainer.innerHTML = ""
  for (var i = 0; i < savedPalettes.length; i++) {
    createColorBox();
  }
}

function generateNewPalette() {
  var newPalette1 = new Palette
  console.log(newPalette1)
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
};

function createHexCode() {
  var hexCode = "#";
  for (var i = 0; i < 6; i++) {
    hexCode += hexCharacters[getRandomIndex(hexCharacters)]
  }
  return hexCode;
};


// function displayNewPalette() {
//   for (let i = 0; i < colors.length; i++) {
//     savedPalettesContainer[i].style.setProperty("background-color", `${newPalette1.colors[i].hexCode}`);
//   }
// }

function createColorBox() {
  var paletteBoxDiv = document.createElement("div");
  paletteBoxDiv.className = "palette-box";
  savedPalettesContainer.appendChild(paletteBoxDiv);
  for (var i = 0; i < newPalette1.colors.length; i++) {
    var miniPaletteDiv = document.createElement("div");
    miniPaletteDiv.className = "miniPalette"
    miniPaletteDiv.style.backgroundColor = `${newPalette1.colors[i].hexCode}`
    paletteBoxDiv.appendChild(miniPaletteDiv)
  }
}


function displayNewColors() {
  newPalette1.newColor();
  for (let i = 0; i < colors.length; i++) {
    colorBoxColor[i].style.setProperty("background-color", `${newPalette1.colors[i].hexCode}`);
    hexAndLock[i].innerHTML = "";
    hexAndLock[i].innerHTML +=
    `<p>${newPalette1.colors[i].hexCode}</p>
    <img src="./src/unlock.png">`
  }
}
