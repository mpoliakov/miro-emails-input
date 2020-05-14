function generateRandomEmail() {
  const names = ['Alex', 'Kate', 'Igor', 'John', 'Max', 'Ann', 'Mary', 'Nick', 'Lucy', 'Helena', 'Victor'];
  const domains = ['miro.com', 'gmail.com', 'yandex.ru', 'mail.ru', 'outlook.com', 'yahoo.com'];
  return (names[Math.floor(names.length * Math.random())] + '@' + domains[Math.floor(domains.length * Math.random())]);
}

const inputContainer = document.querySelector('.emails-input-container');
const emailsInput = new EmailsInput(inputContainer);

document.querySelector('#btn-add-email').addEventListener('click', function() {
  emailsInput.addEmails(generateRandomEmail());
});

document.querySelector('#btn-emails-count').addEventListener('click', function() {
  alert(emailsInput.getEmails(true).length);
});
