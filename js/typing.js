// typing.js — منطق تایپ + ورودی + هایلایت

import { getState, setState, resetState } from './state.js';
import { normalizeChar } from './normalize.js';
import { updateCharHighlight, setCurrentChar, showResult, hideResult, render } from './ui.js';
import { startTimer, stopTimer } from './timer.js';
import { generateText, getWordCountForDuration } from './textbank.js';

function startTyping() {
  const state = getState();
  if (state.status === 'running') return;

  setState({
    status: 'running',
    startedAt: Date.now()
  });

  startTimer();
}

function handleInput(char) {
  
  const state = getState();
  if (state.status === 'finished') return;

  if (state.status === 'idle') {
    startTyping();
  }

  const current = getState();
  const expected = current.chars[current.currentIndex];
  if (!expected) return;

  const normalizedInput = normalizeChar(char, current.language);
  const normalizedExpected = normalizeChar(expected, current.language);
  const isCorrect = normalizedInput === normalizedExpected;

  setState({
    correct: current.correct + (isCorrect ? 1 : 0),
    wrong: current.wrong + (isCorrect ? 0 : 1),
    currentIndex: current.currentIndex + 1
  });

  updateCharHighlight(current.currentIndex, isCorrect);
  setCurrentChar(current.currentIndex + 1);

  // اگه متن تموم شد
  if (current.currentIndex + 1 >= current.chars.length) {
    finish();
  }
}

function finish() {
  const state = getState();
  if (state.status === 'finished') return;

  setState({ status: 'finished' });

  stopTimer();
  showResult();
}

function restart() {
  stopTimer();
  resetState();

  const state = getState();
  const wordCount = getWordCountForDuration(state.duration);
  const text = generateText(state.language, wordCount);

  setState({
    text: text,
    chars: text.split(''),
    currentIndex: 0,
    remaining: state.duration
  });

  hideResult();
  render();

  const progressFill = document.getElementById('progress-fill');
  if (progressFill) progressFill.style.width = '0%';

  const timerDisplay = document.getElementById('timer-display');
  if (timerDisplay) timerDisplay.textContent = state.duration;

  document.getElementById('wpm-display').textContent = '0';
  document.getElementById('cpm-display').textContent = '0';
  document.getElementById('accuracy-display').textContent = '100%';
}

export {
  startTyping,
  handleInput,
  finish,
  restart
};