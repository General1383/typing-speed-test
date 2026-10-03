 // Aria و کیبورد و Focus


import { getState } from './state.js';
import { restart } from './typing.js';

function announce(message) {
  const live = document.getElementById('aria-live');
  if (live) live.textContent = message;
}

function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Tab → ریستارت
    if (e.key === 'Tab') {
      e.preventDefault();
      restart();
      announce('تست ریست شد');
    }

    // Escape → اگه تست در حال اجراست، متوقف کن
    if (e.key === 'Escape') {
      const state = getState();
      if (state.status === 'running') {
        announce('تست متوقف شد');
      }
    }
  });
}

function setupAriaLive() {
  if (!document.getElementById('aria-live')) {
    const div = document.createElement('div');
    div.id = 'aria-live';
    div.setAttribute('aria-live', 'polite');
    div.setAttribute('aria-atomic', 'true');
    div.style.position = 'absolute';
    div.style.left = '-9999px';
    div.style.width = '1px';
    div.style.height = '1px';
    div.style.overflow = 'hidden';
    document.body.appendChild(div);
  }
}

export {
  announce,
  setupKeyboardShortcuts,
  setupAriaLive
};