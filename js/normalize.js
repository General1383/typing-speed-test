// normalize.js — نرمال‌سازی حروف فارسی و انگلیسی

const PERSIAN_MAP = {
  'ي': 'ی',
  'ك': 'ک',
  'ۀ': 'ه',
  'ة': 'ه',
  '٠': '۰',
  '١': '۱',
  '٢': '۲',
  '٣': '۳',
  '٤': '۴',
  '٥': '۵',
  '٦': '۶',
  '٧': '۷',
  '٨': '۸',
  '٩': '۹'
};

function normalizeChar(char, language) {
  if (language === 'en') {
    return char;
  }

  if (PERSIAN_MAP[char]) {
    return PERSIAN_MAP[char];
  }

  return char;
}



function normalizeText(text, language) {


  if (language === 'en') {
    return text;
  }

  return text


    .split('')
    .map((char) => normalizeChar(char, language))
    .join('');
}

export {
    
  PERSIAN_MAP,
  normalizeChar,
  normalizeText
};