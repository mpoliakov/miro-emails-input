import './email.less';

import AbstractComponent from '../abstract-component';
import {validateEmail} from '../../utils';

const createEmailTemplate = (email, valid, classMix) => {
  const className = `${classMix} email ${valid ? '' : 'email--invalid'}`.trim();
  return (
    `<div class="${className}">${email}
        <button class="email__btn-delete" title="Delete email">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038"/>
          </svg>
        </button>
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

  getTemplate() {
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
