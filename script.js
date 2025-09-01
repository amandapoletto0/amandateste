document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const registro = document.getElementById('register');
  const login = document.getElementById('login');

  registro.addEventListener('click', () => container.classList.add('active'));
  login.addEventListener('click', () => container.classList.remove('active'));

  const USERS_KEY = 'consultorio.users';
  const SESSION_KEY = 'consultorio.session';

  function safeGet(key){ try { return localStorage.getItem(key); } catch { return null; } }
  function safeSet(key, val){ try { localStorage.setItem(key, val); } catch {} }
  function getUsers(){ return JSON.parse(safeGet(USERS_KEY) || '[]'); }
  function saveUsers(list){ safeSet(USERS_KEY, JSON.stringify(list)); }
  function setSession(email){ safeSet(SESSION_KEY, JSON.stringify({ email })); }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  document.querySelector('.sign-up form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    if (!name || !email || !password) {
      alert('Por favor, preencha Nome, Email e Senha.');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Informe um email válido.');
      return;
    }
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    const users = getUsers();
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      alert('Este email já está cadastrado.');
      return;
    }
    users.push({ name, email, password });
    saveUsers(users);
    alert('Cadastro realizado com sucesso!');
    setSession(email);
    window.location.href = 'index2.html';
  });

  document.querySelector('.sign-in form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    if (!email || !password) {
      alert('Informe seu Email e Senha.');
      return;
    }
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && user.password === password) {
      alert('Login realizado com sucesso!');
      setSession(user.email);
      window.location.href = 'index2.html';
    } else {
      alert('Email ou senha incorretos!');
    }
  });
  
  document.querySelectorAll('.social-icons button').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('google')) {
        window.open('https://accounts.google.com/', '_blank');
      } else if (button.classList.contains('facebook')) {
        window.open('https://www.facebook.com/', '_blank');
      } else if (button.classList.contains('github')) {
        window.open('https://github.com/login', '_blank');
      } else if (button.classList.contains('linkedin')) {
        window.open('https://www.linkedin.com/login', '_blank');
      }
    });
  });
});