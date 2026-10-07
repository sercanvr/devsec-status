/**
 * Helper to localize dates containing Turkish month names into English or German
 */
const MONTH_MAP: Record<string, { en: string; de: string }> = {
  Ocak: { en: 'January', de: 'Januar' },
  Şubat: { en: 'February', de: 'Februar' },
  Mart: { en: 'March', de: 'März' },
  Nisan: { en: 'April', de: 'April' },
  Mayıs: { en: 'May', de: 'Mai' },
  Haziran: { en: 'June', de: 'Juni' },
  Temmuz: { en: 'July', de: 'Juli' },
  Ağustos: { en: 'August', de: 'August' },
  Eylül: { en: 'September', de: 'September' },
  Ekim: { en: 'October', de: 'Oktober' },
  Kasım: { en: 'November', de: 'November' },
  Aralık: { en: 'December', de: 'Dezember' },
};

export function localizeDate(dateStr?: string, lang: string = 'tr'): string {
  if (!dateStr) return '';
  if (lang.startsWith('tr')) return dateStr;

  const targetLang = lang.startsWith('de') ? 'de' : 'en';

  let result = dateStr;
  for (const [trMonth, translations] of Object.entries(MONTH_MAP)) {
    if (result.includes(trMonth)) {
      result = result.replace(new RegExp(trMonth, 'g'), translations[targetLang]);
    }
  }
  return result;
}
