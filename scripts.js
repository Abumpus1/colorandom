var colors = document.querySelectorAll(".color-box");
var colorBoxColor = document.querySelectorAll(".color");

var hexCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
]

// window.onload = generateNewPalette();

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

var thing = new Palette;

console.log(thing);

generateNewPalette();

function generateNewPalette() {
  console.log('it worked!')
  var newPalette = new Palette;
  console.log(newPalette);
  for (let i = 0; i < colors.length; i++) {

   colors[i].innerHTML = "";
   colors[i].innerHTML += `
      <div class="color">
      </div>
      <div class="hex-and-lock">
        <p>${newPalette.colors[i].hexCode}</p>
        <img src="./src/unlock.png">
      </div>`;
    }
    colorBoxColor.style.backgroundColor = "pink";
}

// Assigning random hexcode both to the color of the boxes,
// and to the text displayed below the boxes on page load.

// Create a function that instantiates a new palette.
// Call that function on page load.
