// src/data/references.ts
// Placeholder reference entries [1]-[52]. Fill text later.
export interface Reference {
  key: number;
  shortLabel: string;
  text: string;
}

export const references: Reference[] = [
  { key: 1, shortLabel: '[1]', text: '[1] Placeholder reference 1. To be filled.' },
  { key: 2, shortLabel: '[2]', text: '[2] Placeholder reference 2. To be filled.' },
  { key: 3, shortLabel: '[3]', text: '[3] Placeholder reference 3. To be filled.' },
  { key: 4, shortLabel: '[4]', text: '[4] Placeholder reference 4. To be filled.' },
  { key: 5, shortLabel: '[5]', text: '[5] Placeholder reference 5. To be filled.' },
  { key: 6, shortLabel: '[6]', text: '[6] Placeholder reference 6. To be filled.' },
  { key: 7, shortLabel: '[7]', text: '[7] Placeholder reference 7. To be filled.' },
  { key: 8, shortLabel: '[8]', text: '[8] Placeholder reference 8. To be filled.' },
  { key: 9, shortLabel: '[9]', text: '[9] Placeholder reference 9. To be filled.' },
  { key: 10, shortLabel: '[10]', text: '[10] Placeholder reference 10. To be filled.' },
  { key: 11, shortLabel: '[11]', text: '[11] Placeholder reference 11. To be filled.' },
  { key: 12, shortLabel: '[12]', text: '[12] Placeholder reference 12. To be filled.' },
  { key: 13, shortLabel: '[13]', text: '[13] Placeholder reference 13. To be filled.' },
  { key: 14, shortLabel: '[14]', text: '[14] Placeholder reference 14. To be filled.' },
  { key: 15, shortLabel: '[15]', text: '[15] Placeholder reference 15. To be filled.' },
  { key: 16, shortLabel: '[16]', text: '[16] Placeholder reference 16. To be filled.' },
  { key: 17, shortLabel: '[17]', text: '[17] Placeholder reference 17. To be filled.' },
  { key: 18, shortLabel: '[18]', text: '[18] Placeholder reference 18. To be filled.' },
  { key: 19, shortLabel: '[19]', text: '[19] Placeholder reference 19. To be filled.' },
  { key: 20, shortLabel: '[20]', text: '[20] Placeholder reference 20. To be filled.' },
  { key: 21, shortLabel: '[21]', text: '[21] Placeholder reference 21. To be filled.' },
  { key: 22, shortLabel: '[22]', text: '[22] Placeholder reference 22. To be filled.' },
  { key: 23, shortLabel: '[23]', text: '[23] Placeholder reference 23. To be filled.' },
  { key: 24, shortLabel: '[24]', text: '[24] Placeholder reference 24. To be filled.' },
  { key: 25, shortLabel: '[25]', text: '[25] Placeholder reference 25. To be filled.' },
  { key: 26, shortLabel: '[26]', text: '[26] Placeholder reference 26. To be filled.' },
  { key: 27, shortLabel: '[27]', text: '[27] Placeholder reference 27. To be filled.' },
  { key: 28, shortLabel: '[28]', text: '[28] Placeholder reference 28. To be filled.' },
  { key: 29, shortLabel: '[29]', text: '[29] Placeholder reference 29. To be filled.' },
  { key: 30, shortLabel: '[30]', text: '[30] Placeholder reference 30. To be filled.' },
  { key: 31, shortLabel: '[31]', text: '[31] Placeholder reference 31. To be filled.' },
  { key: 32, shortLabel: '[32]', text: '[32] Placeholder reference 32. To be filled.' },
  { key: 33, shortLabel: '[33]', text: '[33] Placeholder reference 33. To be filled.' },
  { key: 34, shortLabel: '[34]', text: '[34] Placeholder reference 34. To be filled.' },
  { key: 35, shortLabel: '[35]', text: '[35] Placeholder reference 35. To be filled.' },
  { key: 36, shortLabel: '[36]', text: '[36] Placeholder reference 36. To be filled.' },
  { key: 37, shortLabel: '[37]', text: '[37] Placeholder reference 37. To be filled.' },
  { key: 38, shortLabel: '[38]', text: '[38] Placeholder reference 38. To be filled.' },
  { key: 39, shortLabel: '[39]', text: '[39] Placeholder reference 39. To be filled.' },
  { key: 40, shortLabel: '[40]', text: '[40] Placeholder reference 40. To be filled.' },
  { key: 41, shortLabel: '[41]', text: '[41] Placeholder reference 41. To be filled.' },
  { key: 42, shortLabel: '[42]', text: '[42] Placeholder reference 42. To be filled.' },
  { key: 43, shortLabel: '[43]', text: '[43] Placeholder reference 43. To be filled.' },
  { key: 44, shortLabel: '[44]', text: '[44] Placeholder reference 44. To be filled.' },
  { key: 45, shortLabel: '[45]', text: '[45] Placeholder reference 45. To be filled.' },
  { key: 46, shortLabel: '[46]', text: '[46] Placeholder reference 46. To be filled.' },
  { key: 47, shortLabel: '[47]', text: '[47] Placeholder reference 47. To be filled.' },
  { key: 48, shortLabel: '[48]', text: '[48] Placeholder reference 48. To be filled.' },
  { key: 49, shortLabel: '[49]', text: '[49] Placeholder reference 49. To be filled.' },
  { key: 50, shortLabel: '[50]', text: '[50] Placeholder reference 50. To be filled.' },
  { key: 51, shortLabel: '[51]', text: '[51] Placeholder reference 51. To be filled.' },
  { key: 52, shortLabel: '[52]', text: '[52] Placeholder reference 52. To be filled.' },
];

export const referenceMap = new Map<number, Reference>(
  references.map((r) => [r.key, r]),
);
