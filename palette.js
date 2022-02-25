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

  giveColorsId() {
    for(var i = 0; i < this.colors.length; i++) {
      this.colors[i].id = `${Date.now()}` + i;
      this.colors[i].divId = `${i}`;
    }
  }
};
