import './emails-input.less';

import AbstractComponent from '../abstract-component';
import Email from '../email/email';
import {validateEmail} from '../../utils';

const createEmailsInputTemplate = () => {
  return (
    `<div class="emails-input">
      <div class="emails-input__container"></div><input class="emails-input__input" type="email" aria-label="add more people..." placeholder="add more people...">
    </div>`
  );
};

export default class EmailsInput extends AbstractComponent {
  constructor(container) {
    super();

    this._emails = [];

    if (!container) {
      throw new Error('Container should be provided');
    }

    container.append(this.getElement());

    this._containerEl = this.getElement().querySelector('.emails-input__container');
    this._inputEl = this.getElement().querySelector('.emails-input__input');

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onInputBlur = this._onInputBlur.bind(this);
    this._onInputPaste = this._onInputPaste.bind(this);
    this._handleDeleteEmail = this._handleDeleteEmail.bind(this);

    this._subscribe();
  }

  _subscribe() {
    this._inputEl.onkeydown = this._onKeyDown;
    this._inputEl.onblur = this._onInputBlur;
    this._inputEl.onpaste = this._onInputPaste;
  }

  _onKeyDown(evt) {
    switch (evt.key) {
      case 'Enter':
      case ',':
        evt.preventDefault();
        this.addEmails(this._inputEl.value);
        this._inputEl.value = null;
        break;
      case 'Backspace':
        this._removeLastEmail();
        break;
    }
  }

  _onInputBlur(evt) {
    this.addEmails(evt.currentTarget.value);
    evt.currentTarget.value = null;
  }

  _onInputPaste(evt) {
    evt.preventDefault();
    const data = evt.clipboardData.getData('text/plain');
    this.addEmails(data);
  }

  _handleDeleteEmail(email) {
    const index = this._emails.indexOf(email);

    if (index > -1) {
      this._emails.splice(index, 1);
    }
  }

  _removeLastEmail() {
    if (this._inputEl.value) {
      // ignore if input is not empty
      return;
    }

    if (!this._emails.length) {
      return;
    }

    this._emails.splice(this._emails.length - 1, 1);

    if (this._containerEl.lastChild) {
      this._containerEl.lastChild.remove();
    }
  }

  getTemplate() {
    return createEmailsInputTemplate();
  }

  addEmails(emails) {
    if (!emails) {
      return;
    }

    let emailsArr = [];

    if (typeof emails === 'string') {
      emailsArr = emails.split(',').map(email => email.trim());
    }
    else if (Array.isArray((emails))) {
      emailsArr = emails;
    }

    emailsArr = emailsArr.map((email) => email.toLowerCase()).filter((email) => email && !this._emails.includes(email));

    if (!emailsArr.length) {
      return;
    }

    const fragment = document.createDocumentFragment();

    new Set(emailsArr).forEach((email) => {
      this._emails.push(email);

      const emailComponent = new Email(email, this._handleDeleteEmail, 'emails-input__email');
      fragment.appendChild(emailComponent.getElement());
    });

    this._containerEl.append(fragment);
  }

  replaceEmails(emails) {
    this._emails = [];

    while (this._containerEl.firstChild) {
      this._containerEl.removeChild(this._containerEl.lastChild);
    }

    this.addEmails(emails);
  }

  getEmails(validOnly) {
    if (validOnly) {
      return this._emails.filter((email) => validateEmail(email));
    }

    return this._emails;
  }
}
