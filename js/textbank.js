// کلمات فارسی/انگلیسی + تولید متن

const WORDS_EN = [
  'the', 'and', 'house', 'tree', 'water', 'light', 'happy', 'world',
  'book', 'phone', 'write', 'speak', 'listen', 'friend', 'mother',
  'school', 'travel', 'garden', 'music', 'window', 'orange', 'summer',
  'winter', 'spring', 'morning', 'night', 'star', 'moon', 'sun', 'cloud',
  'river', 'mountain', 'forest', 'flower', 'animal', 'bird', 'fish',
  'bread', 'coffee', 'table', 'chair', 'door', 'wall', 'floor', 'ceiling',
  'city', 'village', 'road', 'street', 'car', 'train', 'plane', 'ship',
  'family', 'father', 'sister', 'brother', 'child', 'baby', 'people',
  'time', 'year', 'month', 'week', 'day', 'hour', 'minute', 'second',
  'work', 'study', 'learn', 'teach', 'play', 'laugh', 'smile', 'cry',
  'walk', 'run', 'jump', 'swim', 'read', 'draw', 'paint', 'sing',
  'dance', 'cook', 'clean', 'build', 'create', 'think', 'dream',
  'love', 'hope', 'peace', 'joy', 'color', 'red', 'blue', 'green'
];

const WORDS_FA = [
     'خانه', 'درخت', 'آب', 'نور', 'شاد', 'دنیا', 'کتاب', 'تلفن',
  'نوشتن', 'صحبت', 'گوش', 'دوست', 'مادر', 'مدرسه', 'سفر', 'باغ',
  'موسیقی', 'پنجره', 'نارنج', 'تابستان', 'زمستان', 'بهار', 'صبح',
  'شب', 'ستاره', 'ماه', 'خورشید', 'ابر', 'رود', 'کوه', 'جنگل',
  'گل', 'حیوان', 'پرنده', 'ماهی', 'نان', 'قهوه', 'میز', 'صندلی',
  'در', 'دیوار', 'زمین', 'سقف', 'شهر', 'روستا', 'جاده', 'خیابان',
  'ماشین', 'قطار', 'هواپیما', 'کشتی', 'خانواده', 'پدر', 'خواهر',
  'برادر', 'بچه', 'نوزاد', 'مردم', 'زمان', 'سال', 'ماه', 'هفته',
  'روز', 'ساعت', 'دقیقه', 'ثانیه', 'کار', 'درس', 'یاد', 'آموزش',
  'بازی', 'خنده', 'لبخند', 'گریه', 'راه', 'دویدن', 'پریدن', 'شنا',
  'خواندن', 'نقاشی', 'آواز', 'رقص', 'آشپزی', 'نظافت', 'ساختن',
  'فکر', 'رویا', 'عشق', 'امید', 'آرامش', 'شادی', 'رنگ', 'سرخ',
  'آبی', 'سبز', 'زرد', 'سفید', 'سیاه'
];

function pickRandomWords(list, count) {     
  const result = [];
  let lastPicked = null;

  for (let i = 0; i < count; i++) {
    let word;

    do {
      const randomIndex = Math.floor(Math.random() * list.length);
      word = list[randomIndex];
    } while (word === lastPicked);

    result.push(word);
    lastPicked = word;
  }

  return result;
}

function getWordCountForDuration(duration) {
  switch (duration) {
    case 15: return 30;
    case 30: return 60;
    case 60: return 120;
    default: return 60;
  }
}

function generateText(language, wordCount) { 
  let list;

  if (language === 'en') {
    list = WORDS_EN;
  } else {
    list = WORDS_FA;
  }

  const words = pickRandomWords(list, wordCount);  
  return words.join(' ');
}

export {
  WORDS_EN,
  WORDS_FA,
  pickRandomWords,
  getWordCountForDuration,
  generateText
};