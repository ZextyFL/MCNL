(() => {
  const form = document.getElementById('loginForm');
  const message = form.querySelector('.form-message');
  const button = form.querySelector('button[type="submit"]');

  const existingUser = localStorage.getItem('mc_current_user');
  if (existingUser) {
    window.location.replace('portal.html');
    return;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    message.textContent = '';
    message.classList.remove('error');

    if (!form.reportValidity()) return;

    const email = form.email.value.trim().toLowerCase();
    const allowedUsers = Array.isArray(window.ALLOWED_USERS) ? window.ALLOWED_USERS : [];
    const user = allowedUsers.find(account => String(account.email).trim().toLowerCase() === email);

    button.disabled = true;
    button.classList.add('loading');

    window.setTimeout(() => {
      if (!user) {
        message.textContent = 'Dit e-mailadres is niet geactiveerd voor het mentorship portal.';
        message.classList.add('error');
        button.disabled = false;
        button.classList.remove('loading');
        return;
      }

      localStorage.setItem('mc_current_user', JSON.stringify({
        email: String(user.email).trim().toLowerCase(),
        name: String(user.name || user.email).trim()
      }));
      window.location.href = 'portal.html';
    }, 250);
  });
})();
