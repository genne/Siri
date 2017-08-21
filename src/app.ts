export class App {

  colors = {
    "RÖD": "red",
    "GRÖN": "green",
    "BLÅ": "blue",
    "VIT": "white",
    "SVART": "black",
    "rosa": "pink",
    "lila": "purple",
  }

  category: string = "Vilken färg?";
  currentColor: string;
  words: string[];
  correctAnswer: string;

  level = 1;

  activate() {
    this.randomizeQuestion();
  }

  randomizeQuestion() {
    let unusedColors = Object.keys(this.colors);
    let numAnswers = Math.min(this.level + 1, unusedColors.length);
    this.words = []; 
    for (var i = 0; i < numAnswers; i++) {
      var color = unusedColors[this._getRandomInt(unusedColors.length)];
      this.words.push(color);
      this._removeElement(unusedColors, color);
    }
    this.correctAnswer = this.words[Math.floor(Math.random() * this.words.length)];
    this.currentColor = this.colors[this.correctAnswer];
  }

  selected(choice) {
    if (choice == this.correctAnswer) {
      this.level++;
    }
    else {
      this.level--;
      if (this.level < 1) this.level = 1;
    }
    if (this.level )
    this.randomizeQuestion();
  }

  private _getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  private _removeElement<T>(array: T[], element: T) {
    array.splice(array.indexOf(element), 1);
  }
}
