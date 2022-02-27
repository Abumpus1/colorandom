// variables
var colors = document.querySelectorAll(".color-box");
var colorBoxColor = document.querySelectorAll(".color");
var hexAndLock = document.querySelectorAll(".hex-and-lock");
var newPaletteButton = document.querySelector("#new-palette");
var savePaletteButton = document.querySelector("#save-palette");
var savedPalettesContainer = document.querySelector(".saved-palettes");
var colorBoxContainer = document.querySelector(".color-box-container");

var savedPalettes = [];
var newPalette = new Palette;

displayNewColors();

// event listeners
newPaletteButton.addEventListener("click", displayNewColors);
savePaletteButton.addEventListener("click", savePalette);
colorBoxContainer.addEventListener("click", function(event){
  lockColor(event);
});
savedPalettesContainer.addEventListener("click", function(event) {
  deletePalette(event);
});

// functions
function savePalette() {
  pushPalette();
  displayPalettes();
  displayNewColors();
}

function pushPalette() {
  savedPalettes.push(newPalette);
  generateNewPalette();
}

function generateNewPalette() {
  newPalette = new Palette();
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createHexCode() {
  var hexCharacters = ["A","B","C","D","E","F","0","1","2","3","4","5","6","7","8","9"];
  var hexCode = "#";
  for (let i = 0; i < 6; i++) {
    hexCode += hexCharacters[getRandomIndex(hexCharacters)];
  }
  return hexCode;
}

function displayPalettes() {
  newPalette.giveColorsId();
  savedPalettesContainer.innerHTML = "";
  for (let i = 0; i < savedPalettes.length; i++) {
    createColorBox(savedPalettes[i]);
  }
}

function createColorBox(palette) {
  var paletteBoxDiv = document.createElement("div");
  paletteBoxDiv.className = "palette-box";
  savedPalettesContainer.appendChild(paletteBoxDiv);
  for (let i = 0; i < palette.colors.length; i++) {
    var miniPaletteDiv = document.createElement("div");
    miniPaletteDiv.className = "miniPalette";
    miniPaletteDiv.style.backgroundColor = `${palette.colors[i].hexCode}`;
    paletteBoxDiv.appendChild(miniPaletteDiv);
  }
  addDeleteButton(palette, paletteBoxDiv);
}

function addDeleteButton(savedIndex, paletteBoxDiv) {
  var deleteButton = document.createElement("img");
  deleteButton.className = "delete-button";
  assignDeleteButtonId(deleteButton, savedIndex);
  deleteButton.src = "./src/delete.png";
  paletteBoxDiv.appendChild(deleteButton);
}

function assignDeleteButtonId(deleteButton, savedIndex) {
    deleteButton.id = savedIndex.id;
}

function toggleLock(i) {
  if (!newPalette.colors[i].locked) {
    hexAndLock[i].innerHTML += `<img src="./src/unlock.png">`;
  } else {
    hexAndLock[i].innerHTML += `<img src="./src/padlock.png">`;
  }
}

function displayNewColors() {
  newPalette.newColor();
  newPalette.giveColorsId();
  for (let i = 0; i < colors.length; i++) {
    colorBoxColor[i].style.setProperty("background-color", `${newPalette.colors[i].hexCode}`);
    hexAndLock[i].innerHTML = "";
    hexAndLock[i].innerHTML += `<p class="hex-code">${newPalette.colors[i].hexCode}</p>`;
    toggleLock(i);
  }
}

function lockColor(event) {
  for (let i = 0; i < newPalette.colors.length; i++) {
    if (event.target.closest(".color-box").id === newPalette.colors[i].divId) {
      newPalette.colors[i].locked = !newPalette.colors[i].locked;
      hexAndLock[i].innerHTML = "";
      hexAndLock[i].innerHTML +=
      `<p class="hex-code">${newPalette.colors[i].hexCode}</p>`;
      toggleLock(i);
    }
  }
}

function deletePalette(event) {
  for (let i = 0; i < savedPalettes.length; i++) {
    if (event.target.className === "delete-button" && event.target.id === savedPalettes[i].id) {
      savedPalettes.splice(i, 1);
    }
  }
  displayPalettes();
}
