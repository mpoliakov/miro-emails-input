import {validateEmail} from './utils';

describe('Testing utils...', () => {
  it('validateEmail() works correctly', () => {
    expect(validateEmail('')).toEqual(false);
    expect(validateEmail('john@miro.com')).toEqual(true);
    expect(validateEmail('john.doe@miro.com')).toEqual(true);
    expect(validateEmail('invalid.email')).toEqual(false);
    expect(validateEmail('john@miro')).toEqual(false);
  });
});
