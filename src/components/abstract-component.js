export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error('Can\'t instantiate AbstractComponent, only concrete one.');
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error('Not implemented exception.');
  }

  getElement() {
    if (!this._element) {
      const el = document.createElement('div');
      el.innerHTML = this.getTemplate();
      this._element = el.firstChild;
    }

    return this._element;
  }

  removeElement() {
    this._element.parentNode.removeChild(this._element);
    this._element = null;
  }
}
