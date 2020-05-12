export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error('Can\'t instantiate AbstractComponent, only concrete one.');
    }

    this._element = null;
  }

  _getTemplate() {
    throw new Error('Not implemented exception.');
  }

  getElement() {
    if (!this._element) {
      const el = document.createElement('div');
      el.innerHTML = this._getTemplate();
      this._element = el.firstChild;
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}
