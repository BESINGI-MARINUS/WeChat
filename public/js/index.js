// "use strict";

// ELEMENTS
const leftIconsContainer = document.querySelector('.side-icons');
const sideIconContainers = document.querySelectorAll('.side-icon');
const sideLeftIcons = document.querySelectorAll('.nav-icon');
const settingsContainer = document.querySelector('.setting-items');
const settingsItem = document.querySelector('.setting-item');
const middleSection = document.querySelector('.friends-pane');

// ==================== EVENT HANDLERS =======================

leftIconsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.side-icon');
  if (!clicked) return;
  if (e.target.classList.contains('profile-img')) return;
  if (clicked.classList.contains('side-icon-1')) return;
  sideIconContainers.forEach((c) => c.classList.remove('side-nav-active'));
  sideLeftIcons.forEach((i) => i.classList.remove('side-nav-active-icon'));
  clicked.classList.add('side-nav-active');
  clicked.firstElementChild.classList.add('side-nav-active-icon');

  const id = clicked.dataset.tab;
  if (!id) return;

  document
    .querySelectorAll('.middle-content')
    .forEach((s) => s.classList.add('hidden'));

  document.getElementById(`content--${id}`).classList.remove('hidden');
});

// MANAGING ACCOUNT SETTINGS

settingsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.setting-item');
  const icon = clicked.querySelector('.icon-right');
  icon.classList.toggle('rotate-icon');
  icon.style.transition = 'all .5s';
  const id = document
    .querySelector(`#hidden--${clicked.dataset.val}`)
    .classList.toggle('hidden');
});

//Send message with Socket.io
const formMsg = document.querySelector('.form-msg');
const inputMsg = document.querySelector('.input-msg');

const socket = io();

formMsg.addEventListener('submit', function (e) {
  e.preventDefault();
  const msg = inputMsg.value.trim();
  if (!msg) return;
  socket.emit('chat message', msg);
  inputMsg.value = '';
});

const messages = document.querySelector('.section-messages-box');
socket.on('chat message', (msg) => {
  let hours = `${new Date().getHours()}`.padStart(2, '0');
  let mins = `${new Date().getMinutes()}`.padStart(2, '0');
  const time =
    +hours < 12 ? `${hours}:${mins} AM` : `${+hours - 12}:${mins} PM`;

  const markup = `
    <div class="sender-message-box">
    <p class="message-reciever">${msg}</p>
    <p><span>&#10004</span>${time}</p>
  </div>
    `;
  messages.insertAdjacentHTML('beforeend', markup);

  window.scrollTo(0, document.body.scrollHeight);
});
