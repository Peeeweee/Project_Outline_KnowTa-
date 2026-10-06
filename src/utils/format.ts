// src/utils/format.ts
// Number formatting with Intl.NumberFormat (thousands separators).

const nf = new Intl.NumberFormat('en-US');

/** Format a number with thousands separators. */
export function formatNumber(n: number): string {
  return nf.format(n);
}
