// ui.js — رندر DOM و صفحه‌ی نتیجه

import { getState } from './state.js';

function renderText(text) {
  const container = document.getElementById('text-display');
  container.innerHTML = '';

  const chars = text.split('');
  chars.forEach((char, index) => {
    const span = document.createElement('span');
    span.className = 'char pending';
    if (char === ' ') span.classList.add('space');
    span.textContent = char;

    if (index === 0) {
      span.classList.remove('pending');
      span.classList.add('current');
    }

    container.appendChild(span);
  });
}

function setDirection(language) {
  const el = document.getElementById('text-display');
  el.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
}

function render() {
  const state = getState();
  if (!state.text) return;
  setDirection(state.language);
  renderText(state.text);
}

function updateCharHighlight(index, isCorrect) {
  const container = document.getElementById('text-display');
  const span = container.children[index];
  if (!span) return;

  span.classList.remove('pending', 'current');
  span.classList.add(isCorrect ? 'correct' : 'wrong');
}

function setCurrentChar(index) {
  const container = document.getElementById('text-display');
  const span = container.children[index];
  if (!span) return;

  span.classList.add('current');
}

export {
  render,
  renderText,
  setDirection,
  updateCharHighlight,
  setCurrentChar
};