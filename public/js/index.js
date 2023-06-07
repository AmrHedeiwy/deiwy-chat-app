const socket = io();

const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const loginEmail = document.querySelector('#loginEmail').value;
  const loginPssword = document.querySelector('#loginPassword').value;
  const loginCheck = document.querySelector('#loginCheck').checked;

  console.log(loginCheck, loginEmail, loginPssword);
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const registerFirstName = document.querySelector('#registerFirstName').value;
  const registerLastName = document.querySelector('#registerLastName').value;
  const registerUsername = document.querySelector('#registerUsername').value;
  const registerEmail = document.querySelector('#registerEmail').value;
  const registerPassword = document.querySelector('#registerPassword').value;
  const registerRepeatPassword = document.querySelector(
    '#registerRepeatPassword'
  ).value;
  const registerCheck = document.querySelector('#registerCheck').checked;
  console.log(
    registerFirstName,
    registerLastName,
    registerUsername,
    registerEmail,
    registerPassword,
    registerRepeatPassword,
    registerCheck
  );
});
