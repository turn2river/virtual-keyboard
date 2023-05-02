import en from '../data/en.js';
import Key from './key.js';
import arrows from '../data/arrows.js';
import display from './display.js';

class Keyboard {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('keyboard');
    this.arrows = document.createElement('div');
    this.arrows.classList.add('vertical-arrows__container');
  }

  lang = 'en';

  render() {
    this.keys = en.map((item) => {
      const key = new Key(item);
      this.container.append(key.render());
      return key;
    });
    document.body.append(this.container);
  }

  renderArrows() {
    this.arrows = arrows.map((arrow) => {
      const arrowKey = new Key(arrow);
      if ((arrowKey.key.code === 'ArrowUp') || (arrowKey.key.code === 'ArrowDown')) {
        this.arrows.append(arrowKey.renderArrows());
        this.container.append(this.arrows);
      } else {
        this.container.append(arrowKey.renderArrows());
      }
      return arrowKey;
    });
    document.body.append(this.container);
  }

  makeModifiers(target) {
    this.nod = null;
    // const modCode = target.code;
    console.log(target.dataset);
  }

  addListeners() {
    document.addEventListener('click', (event) => {
      const { target } = event;
      if (target.classList.contains('button') && !target.classList.contains('button--special')) {
        display.print(target);
      } else if (target.classList.contains('button--special')) {
        this.makeModifiers(target);
      }
    });
  }

  init() {
    this.render();
    this.renderArrows();
    this.addListeners();
  }
}

const keyboard = new Keyboard();
export default keyboard;
