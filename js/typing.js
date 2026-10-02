// typing.js — منطق تایپ + ورودی + هایلایت

import { getState, setState } from './state.js';
import { normalizeChar } from './normalize.js';
import { updateCharHighlight, setCurrentChar } from './ui.js';

function startTyping() {
  const state = getState();
  if (state.status === 'running') return;

  setState({
    status: 'running',
    startedAt: Date.now()
  });
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
}

export {
  startTyping,
  handleInput
};
