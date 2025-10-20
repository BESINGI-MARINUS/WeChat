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

const socket = io();
