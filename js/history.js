// history.js — ذخیره/بازیابی تاریخچه‌ی تست‌ها

const STORAGE_KEY = 'typing-history';
const MAX_RECORDS = 50;

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('History load error:', error);
    return [];
  }
}

function saveRecord(record) {
  try {
    const history = loadHistory();
    history.push(record);

    while (history.length > MAX_RECORDS) {
      history.shift();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return history;
  } catch (error) {
    console.error('History save error:', error);
    return [];
  }
}

function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

function getLastN(n) {
  const history = loadHistory();
  return history.slice(-n);
}

export {
  loadHistory,
  saveRecord,
  clearHistory,
  getLastN
};