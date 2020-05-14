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
  constructor(container, onChange) {
    super();

    this._emails = [];

    if (!container) {
      throw new Error('Container should be provided');
    }

    container.appendChild(this.getElement());

    this.onChange = onChange;

    this._containerEl = this.getElement().querySelector('.emails-input__container');
    this._inputEl = this.getElement().querySelector('.emails-input__input');

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onInputBlur = this._onInputBlur.bind(this);
    this._onInputPaste = this._onInputPaste.bind(this);
    this._focusInput = this._focusInput.bind(this);
    this._handleDeleteEmail = this._handleDeleteEmail.bind(this);

    this._subscribe();
  }

  _subscribe() {
    this._inputEl.onkeydown = this._onKeyDown;
    this._inputEl.onblur = this._onInputBlur;
    this._inputEl.onpaste = this._onInputPaste;
    this.getElement().onclick = this._focusInput;
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

    let data;

    if (window.clipboardData && window.clipboardData.getData) { // IE
      data = window.clipboardData.getData('Text');
    } else if (evt.clipboardData && evt.clipboardData.getData) { // other browsers
      data = evt.clipboardData.getData('text/plain');
    }

    this.addEmails(data);
  }

  _focusInput(evt) {
    if (evt.target === this.getElement()) {
      this._inputEl.focus();
    }
  }

  _handleDeleteEmail(email) {
    const index = this._emails.indexOf(email);

    if (index > -1) {
      const prevState = this._emails.concat();
      this._emails.splice(index, 1);
      this._onDataChange(prevState);
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

    const prevState = this._emails.concat();

    this._emails.splice(this._emails.length - 1, 1);

    if (this._containerEl.lastChild) {
      this._containerEl.lastChild.parentNode.removeChild(this._containerEl.lastChild);
    }

    this._onDataChange(prevState);
  }

  _onDataChange(prevState) {
    if (this.onChange) {
      this.onChange(this._emails, prevState);
    }
  }

  getTemplate() {
    return createEmailsInputTemplate();
  }

  addEmails(emails, replace) {
    if (!emails) {
      return;
    }

    let emailsArr = [];

    if (typeof emails === 'string') {
      emailsArr = emails.split(',').map(email => email.trim());
    } else if (Array.isArray((emails))) {
      emailsArr = emails;
    }

    emailsArr = emailsArr.map((email) => email.toLowerCase()).filter((email) => email && !this._emails.includes(email));

    const prevState = this._emails.concat();

    if (replace) {
      this._emails = [];

      while (this._containerEl.firstChild) {
        this._containerEl.removeChild(this._containerEl.lastChild);
      }
    }

    if (!emailsArr.length) {
      return;
    }

    const fragment = document.createDocumentFragment();

    new Set(emailsArr).forEach((email) => {
      this._emails.push(email);

      const emailComponent = new Email(email, this._handleDeleteEmail, 'emails-input__email');
      fragment.appendChild(emailComponent.getElement());
    });

    this._containerEl.appendChild(fragment);

    this._onDataChange(prevState);
  }

  replaceEmails(emails) {
    this.addEmails(emails, true);
  }

  getEmails(validOnly) {
    if (validOnly) {
      return this._emails.filter((email) => validateEmail(email));
    }

    return this._emails;
  }
}
