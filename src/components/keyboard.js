import en from '../data/en.js';
import Key from './key.js';

class Keyboard {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('keyboard');
  }

  lang = 'en';

  buttons = [];

  init() {
    this.keys = en.map((i) => {
      const key = new Key(i);
      this.buttons.push(key.render());
      return key;
    });

    this.container.append(this.keys);
    document.body.append(this.container);
  }
}

const keyboard = new Keyboard();
export default keyboard;
