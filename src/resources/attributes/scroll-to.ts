import {autoinject} from 'aurelia-framework';
import * as $ from "jquery";

@autoinject()
export class ScrollToCustomAttribute {

  value: boolean;

  constructor(private element: Element) { }

  attached() {
    if (this.value) {
         $('html, body').animate({
            scrollTop: $(this.element).offset().top
        }, 2000, "swing");
    }
  }
}

