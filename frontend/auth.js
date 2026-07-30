const signInForm = document.getElementById('signin');
const signUpForm = document.getElementById('signup');

const signInEmail = document.getElementById('si-email');
const signInPassword = document.getElementById('si-pass');
const signUpEmail = document.getElementById('su-email');
const signUpPassword = document.getElementById('su-pass');
const signUpPasswordCheck = document.getElementById('su-passCheck');

function createStatusElement() {
  const status = document.createElement('p');
  status.className = 'auth-note';
  status.style.marginTop = '0.8rem';
  return status;
}

function setStatus(form, message, isError = false) {
  const existing = form.querySelector('.auth-note');
  const status = existing || createStatusElement();
  status.textContent = message;
  status.style.color = isError ? 'var(--tea-bright)' : 'var(--gold-bright)';

  if (!existing) {
    form.appendChild(status);
  }
}

async function submitAuth(endpoint, payload, form) {
  try {
    const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Request failed.');
    }

    setStatus(form, data.message || 'Success.', false);
  } catch (error) {
    setStatus(form, error.message, true);
  }
}

if (signInForm) {
  signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitAuth('login', {
      email: signInEmail?.value,
      password: signInPassword?.value
    }, signInForm);
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (signUpPassword?.value !== signUpPasswordCheck?.value) {
      setStatus(signUpForm, 'Passwords do not match.', true);
      return;
    }

    if (signUpPassword?.value.length < 8) {
      setStatus(signUpForm, 'Password must be at least 8 characters long.', true);
      return;
    }

    submitAuth('signup', {
      email: signUpEmail?.value,
      password: signUpPassword?.value
    }, signUpForm);
  });
}

