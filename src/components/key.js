export default class Key {
  constructor(key) {
    this.container = document.createElement('button');
    this.container.setAttribute('data-code', key.code);
    this.key = key;
    this.lang = 'EN';
    this.container.innerText = this.key.key;
    switch (this.key.code) {
      case 'Backspace':
        this.container.classList.add('button', 'button__right', 'button__bottom', 'button__delete');
        break;
      case 'Tab':
        this.container.classList.add('button', 'button__left', 'button__bottom', 'button__tab');
        break;
      case 'CapsLock':
        this.container.classList.add('button', 'button--special', 'button__left', 'button__bottom', 'button__capslock');
        break;
      case 'Enter':
        this.container.classList.add('button', 'button__right', 'button__bottom', 'button__return');
        break;
      case 'ShiftLeft':
        this.container.classList.add('button', 'button--special', 'button__left', 'button__bottom', 'button__shift');
        break;
      case 'ShiftRight':
        this.container.classList.add('button', 'button--special', 'button__right', 'button__bottom', 'button__shift');
        break;
      case 'lang':
        this.container.classList.add('button', 'button__language');
        break;
      case 'ControlLeft':
        this.container.classList.add('button', 'button--special', 'button__bottom', 'button__control');
        break;
      case 'AltLeft':
        this.container.classList.add('button', 'button--special', 'button__bottom', 'button__alt');
        break;
      case 'MetaLeft':
        this.container.classList.add('button', 'button--special', 'button__bottom', 'button__meta');
        break;
      case 'Space':
        this.container.classList.add('button', 'button__bottom', 'button__space');
        break;
      case 'MetaRight':
        this.container.classList.add('button', 'button--special', 'button__bottom', 'button__meta', 'button__meta--right');
        break;
      case 'AltRight':
        this.container.classList.add('button', 'button--special', 'button__bottom', 'button__alt', 'button__alt--right');
        break;
      case 'ArrowLeft':
        this.container.classList.add('button', 'button-arrow', 'button-arrow__left');
        break;
      case 'ArrowUp':
        this.container.classList.add('button', 'button-arrow', 'button-arrow__up');
        break;
      case 'ArrowDown':
        this.container.classList.add('button', 'button-arrow', 'button-arrow__down');
        break;
      case 'ArrowRight':
        this.container.classList.add('button', 'button-arrow', 'button-arrow__right');
        break;
      default:
        this.container.classList.add('button', 'to-shift');
    }
    if (key.caps) {
      this.container.classList.add('to-caps');
    }
  }

  render() {
    // const { isShifted, isCapsed, isMeta } = state;
    // if (isShifted) {
    //   this.container.innerText = state && this.key.shift ? this.key.shift : this.key.key;
    //   // console.log('@');
    //   return this.container;
    // } if (isCapsed) {
    //   console.log(isCapsed);
    // } else if (isMeta) {
    //   console.log(isMeta);
    // } else {
    //   this.container.innerText = this.key.key;
    // }

    return this.container;
  }

  renderArrows() {
    return this.container;
  }
}
