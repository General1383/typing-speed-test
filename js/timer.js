// timer.js — تایمر بر اساس Date.now()

import { getState, setState } from './state.js';
import { calcWPM, calcCPM, calcAccuracy, getElapsedSeconds } from './stats.js';

let intervalId = null;

function getRemainingSeconds() {
  const state = getState();
  if (!state.startedAt) return state.duration;

  const elapsed = (Date.now() - state.startedAt) / 1000;
  const remaining = Math.max(0, state.duration - elapsed);
  return Math.ceil(remaining);
}

function tick() {
  const remaining = getRemainingSeconds();
  setState({ remaining });

  // محاسبه‌ی آمار
  const state = getState();
  const elapsed = getElapsedSeconds(state.startedAt);
  const wpm = calcWPM(state.correct, elapsed);
  const cpm = calcCPM(state.correct, elapsed);
  const accuracy = calcAccuracy(state.correct, state.wrong);

  setState({ wpm, cpm, accuracy });

  // نمایش آمار
  const wpmDisplay = document.getElementById('wpm-display');
  const cpmDisplay = document.getElementById('cpm-display');
  const accuracyDisplay = document.getElementById('accuracy-display');
  if (wpmDisplay) wpmDisplay.textContent = wpm;
  if (cpmDisplay) cpmDisplay.textContent = cpm;
  if (accuracyDisplay) accuracyDisplay.textContent = accuracy + '%';

  // نوار پیشرفت
  const progress = ((state.duration - remaining) / state.duration) * 100;
  const progressFill = document.getElementById('progress-fill');
  if (progressFill) progressFill.style.width = progress + '%';

  // نمایشگر تایمر
  const timerDisplay = document.getElementById('timer-display');
  if (timerDisplay) timerDisplay.textContent = remaining;

  // پایان
  if (remaining <= 0) {
    stopTimer();
  }
}

function startTimer() {
  if (intervalId) return;
  intervalId = setInterval(tick, 1000);
  tick();
}

function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

export {
  startTimer,
  stopTimer,
  getRemainingSeconds
};