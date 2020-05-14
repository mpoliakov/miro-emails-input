import EmailsInput from './emails-input';

jest.mock('./emails-input.less', () => jest.fn());
jest.mock('../email/email.less', () => jest.fn());

describe('Testing EmailsInput component...', () => {
  it('EmailsInput component snapshot', () => {
    const container = document.createElement('div');
    const emailInputComponent = new EmailsInput(container);
    emailInputComponent.addEmails(['ann@miro.com', 'invalid.email', 'john@miro.com', 'mpoliakov@gmail.com']);
    expect(emailInputComponent.getElement()).toMatchSnapshot();
  });

  describe('Testing EmailsInput API...', () => {
    it('addEmails() works correctly', () => {
      const container = document.createElement('div');
      const emailInputComponent = new EmailsInput(container);
      expect(emailInputComponent.getEmails()).toEqual([]);

      emailInputComponent.addEmails('max@miro.com , ,hi@miro.com');
      expect(emailInputComponent.getEmails()).toEqual(['max@miro.com', 'hi@miro.com']);

      emailInputComponent.addEmails('');
      expect(emailInputComponent.getEmails()).toEqual(['max@miro.com', 'hi@miro.com']);

      emailInputComponent.addEmails([]);
      expect(emailInputComponent.getEmails()).toEqual(['max@miro.com', 'hi@miro.com']);

      emailInputComponent.addEmails(['hi@miro.com', 'john@miro.com', 'invalid.email']);
      expect(emailInputComponent.getEmails()).toEqual(['max@miro.com', 'hi@miro.com', 'john@miro.com', 'invalid.email']);
    });

    it('replaceEmails() works correctly', () => {
      const container = document.createElement('div');
      const emailInputComponent = new EmailsInput(container);

      emailInputComponent.addEmails('max@miro.com , ,hi@miro.com');
      expect(emailInputComponent.getEmails()).toEqual(['max@miro.com', 'hi@miro.com']);

      emailInputComponent.replaceEmails('john@miro.com, ann@miro.com, ,');
      expect(emailInputComponent.getEmails()).toEqual(['john@miro.com', 'ann@miro.com']);

      emailInputComponent.replaceEmails(['user@miro.com']);
      expect(emailInputComponent.getEmails()).toEqual(['user@miro.com']);

      emailInputComponent.replaceEmails([]);
      expect(emailInputComponent.getEmails()).toEqual([]);

      emailInputComponent.replaceEmails('');
      expect(emailInputComponent.getEmails()).toEqual([]);

      emailInputComponent.replaceEmails('john@miro.com');
      expect(emailInputComponent.getEmails()).toEqual(['john@miro.com']);
    });

    it('getEmails() works correctly', () => {
      const container = document.createElement('div');
      const emailInputComponent = new EmailsInput(container);

      emailInputComponent.addEmails('max@miro.com , ,hi@miro.com, invalid.email');
      expect(emailInputComponent.getEmails()).toEqual(['max@miro.com', 'hi@miro.com', 'invalid.email']);
      expect(emailInputComponent.getEmails(true)).toEqual(['max@miro.com', 'hi@miro.com']);
    });

    it('onChange subscription', () => {
      const container = document.createElement('div');

      const onChange = jest.fn();
      const emailInputComponent = new EmailsInput(container, onChange);

      emailInputComponent.addEmails('max@miro.com, invalid.email');
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith(['max@miro.com', 'invalid.email'], []);

      emailInputComponent.addEmails('hi@miro.com');
      expect(onChange).toBeCalledTimes(2);
      expect(onChange).toBeCalledWith(['max@miro.com', 'invalid.email', 'hi@miro.com'], ['max@miro.com', 'invalid.email']);

      emailInputComponent.replaceEmails('john@miro.com');
      expect(onChange).toBeCalledTimes(3);
      expect(onChange).toBeCalledWith(['john@miro.com'], ['max@miro.com', 'invalid.email', 'hi@miro.com']);

      emailInputComponent.getElement().querySelector('.email__btn-delete').click();
      expect(onChange).toBeCalledTimes(4);
      expect(onChange).toBeCalledWith([], ['john@miro.com']);
    });
  });

  describe('Testing user actions...', () => {
    it('Click on delete button of Email component removes email from the list', () => {
      const container = document.createElement('div');
      const emailInputComponent = new EmailsInput(container);

      emailInputComponent.addEmails('max@miro.com, hi@miro.com, invalid.email');
      expect(emailInputComponent.getEmails()).toEqual(['max@miro.com', 'hi@miro.com', 'invalid.email']);

      emailInputComponent.getElement().querySelector('.email__btn-delete').click();
      expect(emailInputComponent.getEmails()).toEqual(['hi@miro.com', 'invalid.email']);
    });

    it('Pressing Enter, entering comma, losing focus on input adds email', () => {
      const container = document.createElement('div');
      const emailInputComponent = new EmailsInput(container);

      const inputEl = emailInputComponent.getElement().querySelector('.emails-input__input');

      inputEl.value = 'hi@miro.com';
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(emailInputComponent.getEmails()).toEqual(['hi@miro.com']);

      inputEl.value = 'kate@miro.com';
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: ',' }));
      expect(emailInputComponent.getEmails()).toEqual(['hi@miro.com', 'kate@miro.com']);

      inputEl.focus();
      inputEl.value = 'maria@miro.com';
      inputEl.blur();
      expect(emailInputComponent.getEmails()).toEqual(['hi@miro.com', 'kate@miro.com', 'maria@miro.com']);
    });

    it('Pressing Backspace on empty input removes last email', () => {
      const container = document.createElement('div');
      const emailInputComponent = new EmailsInput(container);
      emailInputComponent.addEmails('hi@miro.com, invalid.email, john@miro.com');
      expect(emailInputComponent.getEmails()).toEqual(['hi@miro.com', 'invalid.email', 'john@miro.com']);

      const inputEl = emailInputComponent.getElement().querySelector('.emails-input__input');

      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
      expect(emailInputComponent.getEmails()).toEqual(['hi@miro.com', 'invalid.email']);

      inputEl.value = 'kate@miro.com';
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
      expect(emailInputComponent.getEmails()).toEqual(['hi@miro.com', 'invalid.email']);
    });
  });
});
