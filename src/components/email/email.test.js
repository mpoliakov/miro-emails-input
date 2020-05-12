import Email from './email';

describe('Testing Email component...', () => {
  it('Email component snapshot', () => {
    const emailComponent = new Email('john@miro.com', null, 'emails-input__email');
    expect(emailComponent.getElement()).toMatchSnapshot();
  });

  it('Click on delete button removes element and calls delete handler', () => {
    const handleDelete = jest.fn();
    const emailComponent = new Email('john@miro.com', handleDelete, 'emails-input__email');
    emailComponent.getElement().querySelector('.email__btn-delete').click();
    expect(handleDelete).toBeCalledTimes(1);
    expect(handleDelete).toBeCalledWith('john@miro.com');
    expect(emailComponent._element).toEqual(null);
  });
});
