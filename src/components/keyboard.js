import en from '../data/en.js';
import ru from '../data/ru.js';
import Key from './key.js';
import arrows from '../data/arrows.js';
import display from './display.js';

class Keyboard {
  constructor() {
    this.container = document.createElement('div');
  }

  setStorage() {
    localStorage.setItem('locallang', this.lang);
  }

  state = {
    isShifted: false,
    isCapsed: false,
    isMeta: false,
  };

  render(state) {
    this.container.remove();
    this.container = document.createElement('div');
    this.container.classList.add('keyboard');
    let arr = [];
    if (this.lang === 'EN') {
      arr = en;
    } else {
      arr = ru;
    }
    this.keys = arr.map((item) => {
      const key = new Key(item);
      this.container.append(key.render(state));
      return key;
    });
    document.body.append(this.container);
  }

  renderArrows() {
    this.arrows = document.createElement('div');
    this.arrows.classList.add('vertical-arrows__container');
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

  setModifiers(target) {
    const { code } = target.dataset;
    if (code === 'ShiftRight' || code === 'ShiftLeft') {
      this.state.isShifted = !this.state.isShifted;
      this.render(this.state);
      this.renderArrows();
    }
    target.classList.toggle('active');
  }

  swithLang(target) {
    if (target.textContent === 'EN') {
      this.lang = 'RU';
    } else {
      this.lang = 'EN';
    }
    this.render(this.state);
    this.renderArrows();
  }

  addListeners() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('locallang', this.lang);
    });
    document.addEventListener('click', (event) => {
      const { target } = event;
      if (target.classList.contains('button') && !target.classList.contains('button--special')) {
        display.print(target);
        for (let i = 0; i < this.keys.length; i += 1) {
          this.keys[i].container.classList.remove('active');
        }
      }

      if (target.classList.contains('button--special')) {
        this.setModifiers(target);
      }

      if (target.dataset.code === 'lang') {
        this.swithLang(target);
      }
    });
  }

  init() {
    // this.getStorage();
    this.lang = localStorage.getItem('locallang') ? localStorage.getItem('locallang') : 'EN';
    this.render(this.state);
    this.renderArrows();
    this.addListeners();
  }
}

const keyboard = new Keyboard();
export default keyboard;
