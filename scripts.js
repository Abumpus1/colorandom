// variables
var colors = document.querySelectorAll(".color-box");
var colorBoxColor = document.querySelectorAll(".color");
var hexAndLock = document.querySelectorAll(".hex-and-lock");
var newPaletteButton = document.querySelector("#new-palette");
var savePaletteButton = document.querySelector("#save-palette");
var savedPalettesContainer = document.querySelector(".saved-palettes");
var colorBoxContainer = document.querySelector(".color-box-container");

var hexCharacters = ["A","B","C","D","E","F","0","1","2","3","4","5","6","7","8","9"];
var savedPalettes = [];

var newPalette1 = new Palette;
displayNewColors();

// event listeners
newPaletteButton.addEventListener("click", displayNewColors);
savePaletteButton.addEventListener("click", function() {
  savePalette()
  displayPalettes()
  displayNewColors();
});
colorBoxContainer.addEventListener("click", function(event){
  lockColor(event)
});
savedPalettesContainer.addEventListener("click", function(event) {
  deletePalette(event);
})




// functions
function savePalette() {
  savedPalettes.push(newPalette1);
  generateNewPalette();
}

function generateNewPalette() {
  newPalette1 = new Palette()
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

function displayPalettes() {
  newPalette1.giveColorsId();
  savedPalettesContainer.innerHTML = ""
  for (var i = 0; i < savedPalettes.length; i++) {
    createColorBox(savedPalettes[i]);

  }
}

function createColorBox(palette) {
  var paletteBoxDiv = document.createElement("div");
  paletteBoxDiv.className = "palette-box";

  savedPalettesContainer.appendChild(paletteBoxDiv);
  for (var i = 0; i < palette.colors.length; i++) {
    var miniPaletteDiv = document.createElement("div");
    miniPaletteDiv.className = "miniPalette"
    miniPaletteDiv.style.backgroundColor = `${palette.colors[i].hexCode}`
    paletteBoxDiv.appendChild(miniPaletteDiv)
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



function displayNewColors() {
  newPalette1.newColor();
  newPalette1.giveColorsId();
  for (let i = 0; i < colors.length; i++) {
    colorBoxColor[i].style.setProperty("background-color", `${newPalette1.colors[i].hexCode}`);
    hexAndLock[i].innerHTML = "";
    hexAndLock[i].innerHTML +=
    `<p class="hex-code">${newPalette1.colors[i].hexCode}</p>`
    if (!newPalette1.colors[i].locked) {
      hexAndLock[i].innerHTML +=
        `<img src="./src/unlock.png">`
    } else {
      hexAndLock[i].innerHTML +=
        `<img src="./src/padlock.png">`
    }
  }
};

function lockColor(event) {
  for (var i = 0; i < newPalette1.colors.length; i++) {
    if (event.target.closest(".color-box").id === newPalette1.colors[i].divId) {
      newPalette1.colors[i].locked = true
      hexAndLock[i].innerHTML = "";
      hexAndLock[i].innerHTML +=
      `<p class="hex-code">${newPalette1.colors[i].hexCode}</p>
      <img src="./src/padlock.png">`
    }
  }
};

function deletePalette(event) {
  for (let i = 0; i < savedPalettes.length; i++) {
    if (event.target.className === "delete-button" && event.target.id === savedPalettes[i].id) {
      savedPalettes.splice(i, 1);
    }
  }
  displayPalettes();
}
