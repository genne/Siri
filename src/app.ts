import { viewResources } from "aurelia-framework";
import { Question } from "./components/question";
import { ScrollToCustomAttribute } from "./resources/attributes/scroll-to";

@viewResources(Question, ScrollToCustomAttribute)
export class App {

  level = 1;
  questions: number[] = [this.level];

  selected(isCorrect: boolean) {
    if (isCorrect) {
      this.level++;
    }
    else {
      this.level--;
      if (this.level < 1) this.level = 1;
    }
    this.questions.push(this.level);
  }

}
