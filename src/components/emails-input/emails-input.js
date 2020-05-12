import AbstractComponent from '../abstract-component';
import Email from '../email/email';

const createEmailsInputTemplate = () => {
  return (
    `<div class="emails-input">
      <div class="emails-input__container"></div><input class="emails-input__input" type="email" placeholder="add more people...">
    </div>`
  );
};

export default class EmailsInput extends AbstractComponent {
  constructor(container) {
    super();

    this._emails = [
      'ann@miro.com',
      'invalid.email',
      'john@miro.com',
      'mpoliakov@gmail.com'
    ];

    if (!container) {
      throw new Error('Container should be provided');
    }

    container.append(this.getElement());

    this._containerEl = this.getElement().querySelector('.emails-input__container');

    this._deleteEmail = this._deleteEmail.bind(this);

    this._emails.forEach((email) => {
      const emailComponent = new Email(email, this._deleteEmail, 'emails-input__email').getElement();
      this._containerEl.append(emailComponent);
    })

    this._subscribe();
  }

  _getTemplate() {
    return createEmailsInputTemplate();
  }

  removeElement() {
    this._unsubscribe();
    super.removeElement();
  }

  _subscribe() {
  }

  _unsubscribe() {
  }

  _deleteEmail(email) {
    const index = this._emails.indexOf(email);

    if (index > -1) {
      this._emails.splice(index, 1);
    }
  }
}
