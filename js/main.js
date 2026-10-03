// main.js — اتصال همه‌ی ماژول‌ها و راه‌اندازی اپ

import { getState, setState } from './state.js';
import { generateText, getWordCountForDuration } from './textbank.js';
import { render } from './ui.js';
import { handleInput, restart } from './typing.js';
import { applySettings, updateSetting } from './settings.js';
import { loadHistory } from './history.js';
import { setupKeyboardShortcuts, setupAriaLive } from './a11y.js';

function setupInput() {
  const input = document.getElementById('hidden-input');
  const textSection = document.querySelector('.text-section');

  textSection.addEventListener('click', () => {
    input.focus();
  });

  input.addEventListener('input', (e) => {
    const value = e.target.value;
    if (!value) return;

    const char = value[value.length - 1];
    handleInput(char);
    e.target.value = '';
  });

  input.addEventListener('blur', () => {
    if (getState().status === 'running') {
      input.focus();
    }
  });

  input.focus();
}

function setupControls() {
  // دکمه‌ی «دوباره»
  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) restartBtn.addEventListener('click', restart);

  // دکمه‌ی «شروع»
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      document.getElementById('hidden-input').focus();
    });
  }

  // دکمه‌ی تم
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = getState().theme;
      const newTheme = current === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', newTheme);
      updateSetting('theme', newTheme);

      // آیکون
      themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });
  }

  // دراپ‌داون زبان
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.value = getState().language;
    languageSelect.addEventListener('change', (e) => {
      updateSetting('language', e.target.value);
      restart();
    });
  }

  // دراپ‌داون زمان
  const durationSelect = document.getElementById('duration-select');
  if (durationSelect) {
    durationSelect.value = getState().duration;
    durationSelect.addEventListener('change', (e) => {
      updateSetting('duration', Number(e.target.value));
      restart();
    });
  }

  // سوییچ صدا
  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle) {
    soundToggle.checked = getState().sound === 'on';
    soundToggle.addEventListener('change', (e) => {
      const value = e.target.checked ? 'on' : 'off';
      updateSetting('sound', value);
    });
  }
}

function applyTheme() {
  const theme = getState().theme;
  document.documentElement.setAttribute('data-theme', theme);

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}

function init() {
  // ۱. تنظیمات رو لود کن
  applySettings();

  // ۲. تم رو اعمال کن
  applyTheme();

  // ۳. تاریخچه رو لود کن
  const history = loadHistory();
  setState({ history });

  // ۴. متن بساز
  const state = getState();
  const wordCount = getWordCountForDuration(state.duration);
  const text = generateText(state.language, wordCount);

  setState({
    text: text,
    chars: text.split(''),
    currentIndex: 0,
    remaining: state.duration
  });

  // ۵. UI
  render();
  setupInput();
  setupControls();
  setupKeyboardShortcuts();
  setupAriaLive();
}

init();