import EmailsInput from './emails-input';

describe('Testing EmailsInput component...', () => {
  it('EmailsInput component snapshot', () => {
    const container = document.createElement('div');
    const emailInputComponent = new EmailsInput(container);
    expect(emailInputComponent.getElement()).toMatchSnapshot();
  });
});
