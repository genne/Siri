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

  images = {
    "HÄST": "http://buzzsharer.com/wp-content/uploads/2015/06/beautiful-running-horse.jpg",
    "BIL": "https://www.moj.io/wp-content/themes/mojio-child/assets/img/home/orangecar.png",
    "BLOMMA": "https://static.pexels.com/photos/39517/rose-flower-blossom-bloom-39517.jpeg",
    "TÅG": "https://www.bahn.com/en/view/mdb/pv/agenturservice/2011/mdb_22990_ice_3_schnellfahrstrecke_nuernberg_-_ingolstadt_1000x500_cp_0x144_1000x644.jpg",
    "FLYGPLAN": "https://y.cdn-expressen.se/images/9d/8b/9d8ba31da54a4e7c850513603cef327d/4x3/632@80.jpg",
    "CYKEL": "https://www.intersport.se/Root/inRiver%20Resources/148648290546715984.png",
    "PIANO": "https://usa.yamaha.com/files/DF3BBFBAC0EB418EAA55B39BBDE6691D_12073_2787x2296_b0d03a194b23e7cf85e62e1a36a7c1ab.jpg",
    "KANIN": "https://www.zoo.se/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/k/a/kanin_utsida_3.jpg",
  }

  category: string;
  currentColor: string;
  currentImage: string;
  words: string[];
  correctAnswer: string;

  level = 1;

  activate() {
    this.randomizeQuestion();
  }

  randomizeQuestion() {
    let image = Math.random() * 2 < 1;
    
    this.category = image ? "Vad är detta?" : "Vilken färg?"; 

    let unusedColors = Object.keys(image ? this.images : this.colors);
    let numAnswers = Math.min(this.level + 1, unusedColors.length);
    this.words = []; 
    for (var i = 0; i < numAnswers; i++) {
      var color = unusedColors[this._getRandomInt(unusedColors.length)];
      this.words.push(color);
      this._removeElement(unusedColors, color);
    }
    this.correctAnswer = this.words[Math.floor(Math.random() * this.words.length)];
    this.currentColor = image ? null : this.colors[this.correctAnswer];
    this.currentImage = image ? this.images[this.correctAnswer] : null;
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
