/**
 * Helper to localize dates containing Turkish month names into all supported languages
 */
const MONTH_MAP: Record<string, Record<string, string>> = {
  Ocak: { en: 'January', de: 'Januar', fr: 'Janvier', es: 'Enero', it: 'Gennaio', pt: 'Janeiro', ru: 'Январь', zh: '1月' },
  Şubat: { en: 'February', de: 'Februar', fr: 'Février', es: 'Febrero', it: 'Febbraio', pt: 'Fevereiro', ru: 'Февраль', zh: '2月' },
  Mart: { en: 'March', de: 'März', fr: 'Mars', es: 'Marzo', it: 'Marzo', pt: 'Março', ru: 'Март', zh: '3月' },
  Nisan: { en: 'April', de: 'April', fr: 'Avril', es: 'Abril', it: 'Aprile', pt: 'Abril', ru: 'Апрель', zh: '4月' },
  Mayıs: { en: 'May', de: 'Mai', fr: 'Mai', es: 'Mayo', it: 'Maggio', pt: 'Maio', ru: 'Май', zh: '5月' },
  Haziran: { en: 'June', de: 'Juni', fr: 'Juin', es: 'Junio', it: 'Giugno', pt: 'Junho', ru: 'Июнь', zh: '6月' },
  Temmuz: { en: 'July', de: 'Juli', fr: 'Juillet', es: 'Julio', it: 'Luglio', pt: 'Julho', ru: 'Июль', zh: '7月' },
  Ağustos: { en: 'August', de: 'August', fr: 'Août', es: 'Agosto', it: 'Agosto', pt: 'Agosto', ru: 'Август', zh: '8月' },
  Eylül: { en: 'September', de: 'September', fr: 'Septembre', es: 'Septiembre', it: 'Settembre', pt: 'Setembro', ru: 'Сентябрь', zh: '9月' },
  Ekim: { en: 'October', de: 'Oktober', fr: 'Octobre', es: 'Octubre', it: 'Ottobre', pt: 'Outubro', ru: 'Октябрь', zh: '10月' },
  Kasım: { en: 'November', de: 'November', fr: 'Novembre', es: 'Noviembre', it: 'Novembre', pt: 'Novembro', ru: 'Ноябрь', zh: '11月' },
  Aralık: { en: 'December', de: 'Dezember', fr: 'Décembre', es: 'Diciembre', it: 'Dicembre', pt: 'Dezembro', ru: 'Декабрь', zh: '12月' },
};

export function localizeDate(dateStr?: string, lang: string = 'en'): string {
  if (!dateStr) return '';
  if (lang.startsWith('tr')) return dateStr;

  const code = lang.slice(0, 2).toLowerCase();
  const targetLang = ['de', 'fr', 'es', 'it', 'pt', 'ru', 'zh'].includes(code) ? code : 'en';

  let result = dateStr;
  for (const [trMonth, translations] of Object.entries(MONTH_MAP)) {
    if (result.includes(trMonth)) {
      result = result.replace(new RegExp(trMonth, 'g'), translations[targetLang] || translations.en);
    }
  }
  return result;
}
