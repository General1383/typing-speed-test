// اتصال همه به هم + init

import { getState, setState } from './state.js';
import { generateText, getWordCountForDuration } from './textbank.js';
import { render } from './ui.js';

function init() {
  const state = getState();
  const wordCount = getWordCountForDuration(state.duration);
  const text = generateText(state.language, wordCount);

  setState({
    text: text,
    chars: text.split(''),
    currentIndex: 0
  });

  render();
}

init();