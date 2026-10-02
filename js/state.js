// state.js — State مرکزی + subscription + setState

const initialState = {
  status: 'idle',

  // settings
  language: 'fa',
  duration: 30,
  theme: 'light',
  sound: 'on',

  // text
  text: '',
  chars: [],
  input: '',
  currentIndex: 0,

  // stats
  correct: 0,
  wrong: 0,
  wpm: 0,
  cpm: 0,
  accuracy: 0,

  // time
  startedAt: null,
  remaining: 30,

  // history
  history: []
};

let state = { ...initialState };
let listeners = [];

export function getState() {
  return { ...state };
}

export function setState(patch) {
  state = { ...state, ...patch };

  listeners.forEach((callback) => {
    try {
      callback(state);
    } catch (error) {
      console.error('Listener error:', error);
    }
  });
}

export function subscribe(callback) {
  listeners.push(callback);

  return function unsubscribe() {
    listeners = listeners.filter((cb) => cb !== callback);
  };
}

export function resetState() {
  const { theme, language, duration, sound, history } = state;

  state = {
    ...initialState,
    theme,
    language,
    duration,
    sound,
    history
  };

  listeners.forEach((callback) => callback(state));
}