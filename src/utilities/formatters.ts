export function formatNumber(number: number, format: string): string {
  const locale = "en-US";
  return new Intl.NumberFormat(locale, { style: format, useGrouping: true, maximumFractionDigits: 0 }).format(number);
}

export function formatToDecimal(number: number): string {
  const locale = "en-US";
  return new Intl.NumberFormat(locale, { style: "decimal", useGrouping: true, maximumFractionDigits: 2 }).format(number);
}
