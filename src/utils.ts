export class Utils {

  static getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  static removeElement<T>(array: T[], element: T) {
    array.splice(array.indexOf(element), 1);
  }

}