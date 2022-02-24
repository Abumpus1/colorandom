var colors = document.querySelectorAll(".color-box");
var colorBoxColor = document.querySelectorAll(".color");
var hexAndLock = document.querySelectorAll(".hex-and-lock");

var hexCharacters = ["A","B","C","D","E","F","0","1","2","3","4","5","6","7","8","9"];

window.addEventListener('load', generateNewPalette)

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

class Color {
  constructor() {
    this.hexCode = createHexCode()
    this.locked = false;
  }
};

class Palette {
  constructor() {
    this.colors = [
      new Color,
      new Color,
      new Color,
      new Color,
      new Color
    ];
    this.id = Date.now();
  };

  newColor() {
    for (var i = 0; i < this.colors.length; i++) {
      if (!this.colors[i].locked) {
        this.colors[i].hexCode = createHexCode();
      }
    }
  }
};

function generateNewPalette(event) {
  var newPalette = new Palette;
  for (let i = 0; i < colors.length; i++) {
    colorBoxColor[i].style.setProperty("background-color", `${newPalette.colors[i].hexCode}`);
    hexAndLock[i].innerHTML = "";
    hexAndLock[i].innerHTML +=
    `<p>${newPalette.colors[i].hexCode}</p>
    <img src="./src/unlock.png">`
  }
}
