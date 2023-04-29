export default class Key {
  constructor(code) {
    this.container = document.createElement('button');
    switch (code) {
      case 'Backspace':
        this.addClasses('button button__right button__bottom button__delete');
        break;
      case 'Tab':
        this.addClasses('button button__left button__bottom button__tab');
        break;
      case 'CapsLock':
        this.addClasses('button button__left button__bottom button__capslock');
        break;
      case 'Enter':
        this.addClasses('button button__right button__bottom button__return');
        break;
      case 'ShiftLeft':
        this.addClasses('button button__left button__bottom button__shift');
        break;
      case 'ShiftRight':
        this.addClasses('button button__left button__bottom button__shift');
        break;
      case 'EN':
        this.addClasses('button button__language');
        break;
      case 'ControlLeft':
        this.addClasses('button button__bottom button__control');
        break;
      case 'AltLeft':
        this.addClasses('button button__bottom button__alt');
        break;
      case 'MetaLeft':
        this.addClasses('button button__bottom button__meta');
        break;
      case 'Space':
        this.addClasses('button button__bottom button__space');
        break;
      case 'MetaRight':
        this.addClasses('button button__bottom button__meta button__meta--right');
        break;
      case 'AltRight':
        this.addClasses('button button__bottom button__alt button__alt--right');
        break;
      default:
        this.addClasses('button');
    }
  }

  addClasses(classList) {
    this.container.classList.add(classList);
  }
}
