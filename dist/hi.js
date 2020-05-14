function generateRandomEmail() {
  const names = ['Alex', 'Kate', 'Igor', 'John', 'Max', 'Ann', 'Mary', 'Nick', 'Lucy', 'Helena', 'Victor'];
  const domains = ['miro.com', 'gmail.com', 'yandex.ru', 'mail.ru', 'outlook.com', 'yahoo.com'];
  return (names[Math.floor(names.length * Math.random())] + '@' + domains[Math.floor(domains.length * Math.random())]);
}

const inputContainer1 = document.querySelector('#emails-input-container-1');
const emailsInput1 = new EmailsInput(inputContainer1, function(curState, prevState) {
  console.log('Current state:', curState);
  console.log('Previous state:', prevState);
});

document.querySelector('#btn-add-email').addEventListener('click', function() {
  emailsInput1.addEmails(generateRandomEmail());
});

document.querySelector('#btn-emails-count').addEventListener('click', function() {
  alert(emailsInput1.getEmails(true).length);
});

const inputContainer2 = document.querySelector('#emails-input-container-2');
const emailsInput2 = new EmailsInput(inputContainer2);

document.querySelector('#btn-replace-emails').addEventListener('click', function() {
  const randomLength = (1 + Math.floor(4 * Math.random()));
  const randomEmails = new Array(randomLength);
  for(let i = 0; i < randomLength; i++) {
    randomEmails[i] = generateRandomEmail();
  }
  emailsInput2.replaceEmails(randomEmails);
});
