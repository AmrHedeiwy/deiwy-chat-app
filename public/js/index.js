const socket = io();

const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formElements = {
    loginEmail: '',
    loginPassword: '',
    loginCheck: false
  };
  document.querySelectorAll('input').forEach((input) => {
    if (input.id in formElements) {
      if (input.type === 'checkbox') {
        formElements[input.id] = input.checked;
      } else {
        formElements[input.id] = input.value;
      }
    }
  });

  console.log(
    formElements.loginEmail,
    formElements.loginPassword,
    formElements.loginCheck
  );
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formElements = {
    registerFirstname: '',
    registerLastname: '',
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    registerRepeatPassword: '',
    registerCheck: false
  };

  document.querySelectorAll('input').forEach((input) => {
    if (input.id in formElements) {
      if (input.type === 'checkbox') {
        formElements[input.id] = input.checked;
      } else {
        formElements[input.id] = input.value;
      }
    }
  });

  const body = {
    Firstname: formElements.registerFirstname,
    Lastname: formElements.registerLastname,
    Username: formElements.registerUsername,
    Email: formElements.registerEmail,
    Password: formElements.registerPassword
  };

  console.log(body.Password);
  requestToServer('/auth/register', 'POST', body);
});

const requestToServer = async (url, method, body) => {
  const params = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  try {
    const data = await fetch(url, params).then((response) => {
      if (response.ok) return response.json();
      throw response;
    });
    if (data.error) throw data.error;
    console.log(data);
  } catch (err) {
    const errorObject = JSON.parse(await err.text());
    const message = errorObject.message;
    const field = errorObject.field || undefined;

    // For server errors
    if (err.status === 500) {
      return console.log(message);
    }

    // For field errors
    console.log(message);
    console.log(field);
  }
};
