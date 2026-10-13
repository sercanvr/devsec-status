/**
 * Localized Number and Percentage formatters adhering to the active UI language.
 */

export function formatNumber(value: number, lang: string = 'en'): string {
  if (typeof value !== 'number' || isNaN(value)) return '0';
  try {
    return new Intl.NumberFormat(lang).format(value);
  } catch {
    return new Intl.NumberFormat('en').format(value);
  }
}

export function formatPercent(
  ratioOrPercent: number,
  lang: string = 'en',
  options?: { sign?: boolean; decimals?: number; isRatio?: boolean }
): string {
  if (typeof ratioOrPercent !== 'number' || isNaN(ratioOrPercent)) return '0%';

  // If ratio (e.g. 0.255 for 25.5%), convert to percent ratio; if given as percentage (e.g. 25.5), divide by 100
  const ratio =
    options?.isRatio === true
      ? ratioOrPercent
      : options?.isRatio === false
      ? ratioOrPercent / 100
      : ratioOrPercent > 1
      ? ratioOrPercent / 100
      : ratioOrPercent;

  const percentVal = ratio * 100;
  const hasDecimals = Math.round(percentVal * 10) % 10 !== 0;
  const dec = options?.decimals !== undefined ? options.decimals : hasDecimals ? 1 : 0;

  try {
    return new Intl.NumberFormat(lang, {
      style: 'percent',
      signDisplay: options?.sign ? 'always' : 'auto',
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    }).format(ratio);
  } catch {
    return `${options?.sign && percentVal > 0 ? '+' : ''}${percentVal.toFixed(dec)}%`;
  }
}
