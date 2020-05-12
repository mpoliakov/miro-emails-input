import AbstractComponent from '../abstract-component';
import {validateEmail} from '../../utils';

const createEmailTemplate = (email, valid, classMix) => {
  const className = `${classMix} email ${valid ? '' : 'email--invalid'}`.trim();
  return (
    `<div class="${className}">${email}
        <button class="email__btn-delete" title="Delete email">&#x2716</button>
    </div>`
  );
}

export default class Email extends AbstractComponent {
  constructor(email, handleDelete, classMix) {
    super();

    this._email = email;
    this._handleDelete = handleDelete;
    this._classMix = classMix;

    this._subscribe();
  }

  _getTemplate() {
    return createEmailTemplate(this._email, validateEmail(this._email), this._classMix);
  }

  _subscribe() {
    const btnDeleteEl = this.getElement().querySelector('.email__btn-delete');

    btnDeleteEl.onclick = () => {
      this._handleDelete(this._email);
      this.removeElement();
    };
  }
}
