import en from '../data/en.js';
import ru from '../data/ru.js';
import Key from './key.js';
import arrows from '../data/arrows.js';
import display from './display.js';
import desc from '../data/description.js';

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

  render() {
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
      this.container.append(key.render());
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
    const shiftLang = this.lang === 'EN' ? en : ru;
    this.state.isShifted = !this.state.isShifted;
    if (this.state.isCapsed) {
      this.setCapsed();
      this.keys.forEach((e) => {
        if (e.container.dataset.code === 'CapsLock') {
          e.container.classList.remove('active');
        }
      });
    }
    if (this.state.isShifted) {
      this.keys.forEach((e, i) => {
        if (e.container.classList.contains('to-shift')) {
          e.container.textContent = shiftLang[i].shift;
        }
      });
    } else {
      this.keys.forEach((e, i) => {
        if (e.container.classList.contains('to-shift')) {
          e.container.textContent = shiftLang[i].key;
        }
      });
      this.keys.forEach((e) => {
        if (e.container.dataset.code.match('Shift(Right|Left)')) {
          e.container.classList.remove('active');
        }
      });
    }
  }

  setCapsed() {
    this.state.isCapsed = !this.state.isCapsed;
    if (this.state.isCapsed) {
      this.keys.forEach((e) => {
        if (e.container.classList.contains('to-caps')) {
          e.container.textContent = e.container.textContent.toUpperCase();
        }
      });
    } else {
      this.keys.forEach((e) => {
        if (e.container.classList.contains('to-caps')) {
          e.container.textContent = e.container.textContent.toLowerCase();
        }
      });
    }
  }

  switchLang(lang) {
    if (lang === 'EN') {
      this.lang = 'RU';
    } else {
      this.lang = 'EN';
    }
    this.render();
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
        display.print(event, this.state);
        if (this.state.isShifted) {
          this.setShifted();
        }
        if (this.state.isMeta) {
          this.state.isMeta = !this.state.isMeta;
          this.keys.forEach((e) => {
            if (e.container.classList.contains('button__meta')) {
              e.container.classList.remove('active');
            }
          });
        }
        this.keys.forEach((e) => {
          if (e.container.dataset.code.match('Alt(Left|Right)|Control(Left|Right)')) {
            e.container.classList.remove('active');
          }
        });
      }

      if (target.classList.contains('button--special')) {
        target.classList.toggle('active');
      }

      if (target.dataset.code === 'lang') {
        this.switchLang(this.lang);
      }

      if (code === 'ShiftRight' || code === 'ShiftLeft') {
        this.setShifted();
      }

      if (code === 'CapsLock') {
        this.setCapsed();
      }

      if (code === 'MetaLeft' || code === 'MetaRight') {
        this.state.isMeta = !this.state.isMeta;
      }
    });

    document.addEventListener('keydown', (key) => {
      const { code } = key;
      if (code.match('Arrow(Up|Down|Left|Right)')) {
        return;
      }
      key.preventDefault();
      this.keys.forEach((e) => {
        if (code === e.container.dataset.code) {
          e.container.classList.add('active');
          if (code === 'CapsLock' && !this.state.isMeta) {
            this.setCapsed();
          }
          if (code.match('Shift(Right|Left)')) {
            this.setShifted();
          }
          display.print(e.container, this.state);
        }
      });
    });

    document.addEventListener('keyup', (key) => {
      key.preventDefault();
      const { code } = key;
      this.keys.forEach((e) => {
        if (code === e.container.dataset.code) {
          e.container.classList.remove('active');
          if (code === 'CapsLock') {
            this.setCapsed();
          }
          if (code.match('Shift(Right|Left)')) {
            this.setShifted();
          }
        }
      });
    });
  }

  init() {
    this.lang = localStorage.getItem('locallang') ? localStorage.getItem('locallang') : 'EN';
    this.render();
    this.renderArrows();
    this.addListeners();
    document.body.append(desc);
  }
}

const keyboard = new Keyboard();
export default keyboard;
