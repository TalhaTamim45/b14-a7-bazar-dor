// বাংলা সংখ্যা ও তারিখ ফরম্যাটিং হেল্পার

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const ENGLISH_DIGITS_MAP: Record<string, string> = {
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
  '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
};

const BENGALI_MONTHS = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const BENGALI_DAYS = [
  'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
];

/**
 * ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর করে (কমা সহ)
 */
export function toBengaliNumber(value: number | string | undefined | null): string {
  if (value === undefined || value === null || isNaN(Number(value))) {
    return '০';
  }

  // পূর্ণসংখ্যা বা দশমিক সংখ্যা ফরম্যাটিং
  const num = typeof value === 'string' ? parseFloat(value) : value;
  const parts = num.toLocaleString('en-IN').split('.');

  const integerPart = parts[0].replace(/[0-9]/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);

  if (parts.length > 1) {
    const decimalPart = parts[1].replace(/[0-9]/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);
    return `${integerPart}.${decimalPart}`;
  }

  return integerPart;
}

/**
 * বাংলা সংখ্যাকে ইংরেজি সংখ্যায় রূপান্তর করে
 */
export function toEnglishNumber(bengaliStr: string): number {
  if (!bengaliStr) return 0;
  const cleaned = bengaliStr.toString().replace(/[০-৯]/g, (d) => ENGLISH_DIGITS_MAP[d] || d);
  const parsed = parseFloat(cleaned.replace(/,/g, ''));
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * মূল্যের সাথে টাকা শব্দ যুক্ত করে
 */
export function formatPrice(price: number | undefined | null): string {
  if (price === undefined || price === null) return '০ টাকা';
  return `${toBengaliNumber(price)} টাকা`;
}

/**
 * পণ্যের একককে বাংলায় রূপান্তর
 */
export function formatUnit(unit: string | undefined | null): string {
  if (!unit) return 'প্রতি একক';
  const u = unit.toLowerCase().trim();
  switch (u) {
    case 'kg':
    case 'কেজি':
      return 'প্রতি কেজি';
    case 'liter':
    case 'litre':
    case 'লিটার':
      return 'প্রতি লিটার';
    case 'dozen':
    case 'ডজন':
      return 'প্রতি ডজন';
    case 'hali':
    case 'হালি':
      return 'প্রতি হালি';
    case 'piece':
    case 'pc':
    case 'পিস':
      return 'প্রতি পিস';
    default:
      return `প্রতি ${unit}`;
  }
}

/**
 * আজকের বাংলা তারিখ প্রস্তুত করে
 */
export function getBengaliDate(): string {
  const now = new Date();
  const dayName = BENGALI_DAYS[now.getDay()];
  const date = toBengaliNumber(now.getDate());
  const month = BENGALI_MONTHS[now.getMonth()];
  const year = toBengaliNumber(now.getFullYear());

  return `${dayName}, ${date} ${month} ${year}`;
}

/**
 * দাম পরিবর্তনের ব্যাজের তথ্য
 */
export function getChangeInfo(change: { dir: string; pct: number } | undefined) {
  if (!change) {
    return {
      symbol: '—',
      text: '— ০.০%',
      textColor: 'text-gray-500',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
      borderColor: 'border-gray-200 dark:border-gray-700',
      isUp: false,
      isDown: false,
    };
  }

  const absPct = Math.abs(change.pct).toFixed(1);
  const formattedPct = toBengaliNumber(absPct);

  if (change.dir === 'up') {
    return {
      symbol: '▲',
      text: `▲ ${formattedPct}%`,
      textColor: 'text-emerald-700 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      isUp: true,
      isDown: false,
    };
  }

  if (change.dir === 'down') {
    return {
      symbol: '▼',
      text: `▼ ${formattedPct}%`,
      textColor: 'text-rose-700 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/40',
      borderColor: 'border-rose-200 dark:border-rose-800',
      isUp: false,
      isDown: true,
    };
  }

  return {
    symbol: '—',
    text: `— ${formattedPct}%`,
    textColor: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-100 dark:bg-slate-800',
    borderColor: 'border-slate-200 dark:border-slate-700',
    isUp: false,
    isDown: false,
  };
}