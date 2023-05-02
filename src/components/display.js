class Display {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('display');

    this.label = document.createElement('label');
    this.label.classList.add('display-label');
    this.label.setAttribute('for', 'display');

    this.textarea = document.createElement('textarea');
    this.textarea.setAttribute('cols', '125');
    this.textarea.setAttribute('rows', '20');
    this.textarea.setAttribute('placeholder', 'type here...');
    this.textarea.setAttribute('id', 'display');
    this.textarea.setAttribute('name', 'display');

    this.label.append(this.textarea);
    this.container.append(this.label);
  }

  render() {
    document.body.append(this.container);
  }
}

const display = new Display();
export default display;
