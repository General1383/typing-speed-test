// timer.js — تایمر بر اساس Date.now()

import { getState, setState } from './state.js';

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

  const state = getState();
  const progress = ((state.duration - remaining) / state.duration) * 100;
  const progressFill = document.getElementById('progress-fill');
  if (progressFill) progressFill.style.width = progress + '%';

  const timerDisplay = document.getElementById('timer-display');
  if (timerDisplay) timerDisplay.textContent = remaining;

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