## Miro - Frontend test assessment

### 💻 Live versions

One component: [http://mpoliakov.com/miro-emails-input/dist/](http://mpoliakov.com/miro-emails-input/dist/)

Two components on a page: [http://mpoliakov.com/miro-emails-input/dist/hi.html](http://mpoliakov.com/miro-emails-input/dist/hi.html)

- Email block will be created by pressing Enter, entering comma, or by losing focus on the input field; 
- Pasted emails will be converted into blocks. Comma-separated emails (“ivan@mail.ru, max@mail.ru”) will be converted into multiple blocks;
- Pressing Backspace on empty input field will remove last email (*there was no such requirement in the problem statement, but from my perspective it improves user experience*).

Tested in the latest version of Chrome, Firefox, Safari, Edge and IE11 (required some [changes](https://github.com/mpoliakov/miro-emails-input/commit/1a0277719eb530b2f6373030348cc3e191555fc8) for support).

### 🔨 Usage in your project

Add components script on a page:

```html
<script src="{path}/components.js"></script>
```

Add styles:

```html
<link href="{path}/components.css" rel="stylesheet">
```

Create component:

```js
const inputContainer = document.querySelector('#emails-input-container');

const emailsInput = new EmailsInput(inputContainer, function(curState, prevState) {
  console.log('Current state:', curState);
  console.log('Previous state:', prevState);
});
```

#### API

- addEmails(emails) - "emails" parameter can be both an array (`["hi@miro.com", "john@miro.com]`), or a string with emails separated by a comma (`"hi@miro.com, john@miro.com"`);
- replaceEmails(emails) - "emails" parameter has the same signature as in addEmails() method, but this method removes all stored emails and puts new ones instead;
- getEmails(validOnly) - setting "validOnly" to true will return valid emails only;
- onChange - you can subscribe to email list changes, handler can be provided as a second parameter in the constructor or set in code.

Examples of using:
 - [index.html](./dist/index.html), [index.js](./dist/index.js)
 - [hi.html](./dist/hi.html), [hi.js](./dist/hi.js)

### 🚀 Launch locally

You need `node.js 12.16.2+` and `npm 6.14.4+`.

1) `npm i`
2) `npm start`

### ⚙ Implementation

Project infrastructure can look a bit excessive for the current problem statement, but it's good for further development and extension.

Components are implemented with ES6 classes:

- AbstractComponent ([abstract-component.js](./src/components/abstract-component.js)) is responsible for component template and rendering;

- EmailsInput component ([emails-input](./src/components/emails-input/emails-input.js)) contains the main logic. It uses Email component ([email.js](./src/components/email/email.js)) to render email block in the list.

Styles are build with `LESS`. Also, processing styles with `postcss` and `autoprefixer`.

Project is built using `webpack`([webpack.config.js](./webpack.config.js)) with `babel-loader` ([.babelrc](./.babelrc)).  

#### 🤖 Auto-tests

Launch tests: `npm test`

Command executes next tools:
- `Stylelint` ([.stylelintrc](./.stylelintrc)) - linter for .less files;
- `Eslint` ([.eslintrc](./.eslintrc)) - linter for .js files;
- `Jest` - unit-tests;

Components tests:
- [email.test.js](./src/components/email/email.test.js)
- [emails-input.test.js](./src/components/emails-input/emails-input.test.js)

Jest tests has unit-tests for EmailsInput API, user actions and snapshot tests for components markup.





