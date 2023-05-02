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

  print(target) {
    const { code } = target.dataset;
    const { length } = this.textarea.value;
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const values = [...this.textarea.value];

    let value;
    this.textarea.focus();
    if (code === 'lang') {
      return;
    }
    if (code === 'Tab') {
      value = '\t';
    } else if (code === 'Enter') {
      value = '\n';
    } else if (code === 'Space') {
      value = ' ';
    } else if (code === 'Backspace') {
      if (!start) return;
      if (start !== length) {
        values.splice(start - 1, 1);
        this.textarea.value = values.join('');
        this.textarea.selectionEnd -= 1;
        return;
      }
      values.pop();
      this.textarea.value = values.join('');
      return;
    } else {
      value = target.textContent;
    }
    this.textarea.setRangeText(value, start, end);
    this.textarea.selectionStart += 1;
  }
}

const display = new Display();
export default display;
