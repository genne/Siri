import { bindable } from "aurelia-framework";

export class Word {
    @bindable correct: boolean;    
    @bindable incorrect: boolean;    
}