// main.js — اتصال همه‌ی ماژول‌ها و راه‌اندازی اپ

import { getState, setState } from './state.js';
import { generateText, getWordCountForDuration } from './textbank.js';
import { render } from './ui.js';
import { handleInput, restart } from './typing.js';
import { applySettings } from './settings.js';
import { loadHistory } from './history.js';

function setupInput() {
  const input = document.getElementById('hidden-input');
  const textSection = document.querySelector('.text-section');

  // کلیک روی ظرف متن → فوکوس اینپوت
  textSection.addEventListener('click', () => {
    input.focus();
  });

  // گرفتن ورودی
  input.addEventListener('input', (e) => {
    const value = e.target.value;
    if (!value) return;

    const char = value[value.length - 1];
    handleInput(char);
    e.target.value = '';
  });

  // اگه فوکوس از دست رفت، برگردون
  input.addEventListener('blur', () => {
    if (getState().status === 'running') {
      input.focus();
    }
  });

  // فوکوس اولیه
  input.focus();
}

function setupControls() {
  // دکمه‌ی «دوباره»
  const restartBtn = document.getElementById('restart-btn');
  restartBtn.addEventListener('click', restart);

  // کلید Tab برای ریستارت
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      restart();
    }
  });
}

function init() {
  // ۱. تنظیمات رو از localStorage لود کن
  applySettings();

  // ۲. تاریخچه رو لود کن
  const history = loadHistory();
  setState({ history });

  // ۳. متن بساز
  const state = getState();
  const wordCount = getWordCountForDuration(state.duration);
  const text = generateText(state.language, wordCount);

  setState({
    text: text,
    chars: text.split(''),
    currentIndex: 0,
    remaining: state.duration
  });

  // ۴. UI
  render();
  setupInput();
  setupControls();
}

init();