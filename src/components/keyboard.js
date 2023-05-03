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

  setShifted() {
    this.state.isShifted = !this.state.isShifted;
    this.render(this.state);
    this.renderArrows();
  }

  setCapsed() {
    this.state.isCapsed = !this.state.isCapsed;
    if (this.state.isCapsed) {
      this.keys.forEach((e) => {
        if (e.container.classList.contains('to-caps')) {
          e.container.textContent = e.container.innerText.toUpperCase();
        }
      });
    } else {
      this.keys.forEach((e) => {
        if (e.container.classList.contains('to-caps')) {
          e.container.textContent = e.container.innerText.toLowerCase();
        }
      });
    }
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
      const { code } = event.target.dataset;
      if (target.classList.contains('button') && !target.classList.contains('button--special')) {
        display.print(target);
        if (this.state.isShifted) {
          this.setShifted();
        }
      }

      if (target.classList.contains('button--special')) {
        target.classList.toggle('active');
      }

      if (target.dataset.code === 'lang') {
        this.swithLang(target);
      }

      if (code === 'ShiftRight' || code === 'ShiftLeft') {
        this.setShifted();
      }

      if (code === 'CapsLock') {
        this.setCapsed();
      }
    });

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      console.log(event);
    });
  }

  init() {
    this.lang = localStorage.getItem('locallang') ? localStorage.getItem('locallang') : 'EN';
    this.render(this.state);
    this.renderArrows();
    this.addListeners();
  }
}

const keyboard = new Keyboard();
export default keyboard;
