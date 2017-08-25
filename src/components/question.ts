import { viewResources, bindable } from "aurelia-framework";
import { Graphics } from "./graphics";
import { Word } from "./word";
import { Utils } from "../utils";

@viewResources(
    Graphics,
    Word)
export class Question {   


  colors = {
    "RÖD": "red",
    "GRÖN": "green",
    "BLÅ": "blue",
    "grå": "gray",
    "gul": "yellow",
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

  @bindable level: number;

    category: string;
    color: string;
    image: string;
    words: string[];
    correctAnswer: string;

    answer: string = null;
 
    @bindable onSelect: ({isCorrect: boolean}) => void;

    attached() {
        this._randomizeQuestion();
    }

  selected(choice) {
    if (this.answer) return;

    this.answer = choice;
    if (this.onSelect) {
        this.onSelect({isCorrect: choice === this.correctAnswer});
    }
  }

  private _randomizeQuestion() {
    let image = Math.random() * 2 < 1;
    
    this.category = image ? "Vad är detta?" : "Vilken färg?"; 

    let maxLength = Math.floor(this.level / 3) + 3;
    let unusedColors = Object.keys(image ? this.images : this.colors).filter(w => w.length <= maxLength);
    let numAnswers = Math.min(Math.floor(this.level / 5) + 2, unusedColors.length);
    this.words = []; 
    for (var i = 0; i < numAnswers; i++) {
      var color = unusedColors[Utils.getRandomInt(unusedColors.length)];
      this.words.push(color);
      Utils.removeElement(unusedColors, color);
    }
    this.correctAnswer = this.words[Math.floor(Math.random() * this.words.length)];
    this.color = image ? null : this.colors[this.correctAnswer];
    this.image = image ? this.images[this.correctAnswer] : null;
  }

}