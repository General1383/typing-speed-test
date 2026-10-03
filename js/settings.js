// settings.js — ذخیره/بازیابی تنظیمات در localStorage

import { setState } from './state.js';

const STORAGE_KEY = 'typing-settings';

const DEFAULT_SETTINGS = {
  language: 'fa',
  duration: 30,
  theme: 'light',
  sound: 'on'
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };

    const parsed = JSON.parse(raw);

    return {
      language: parsed.language || DEFAULT_SETTINGS.language,
      duration: parsed.duration || DEFAULT_SETTINGS.duration,
      theme: parsed.theme || DEFAULT_SETTINGS.theme,
      sound: parsed.sound || DEFAULT_SETTINGS.sound
    };
  } catch (error) {
    console.error('Settings load error:', error);
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Settings save error:', error);
  }
}

function applySettings() {
  const settings = loadSettings();
  setState(settings);
  return settings;
}

export {
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
  applySettings
};