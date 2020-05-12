import EmailsInput from './emails-input';

jest.mock('./emails-input.less', () => jest.fn());
jest.mock('../email/email.less', () => jest.fn());

describe('Testing EmailsInput component...', () => {
  it('EmailsInput component snapshot', () => {
    const container = document.createElement('div');
    const emailInputComponent = new EmailsInput(container);
    expect(emailInputComponent.getElement()).toMatchSnapshot();
  });
});
