export interface RukuData {
  rukuIndex: number;
  parah: number;
  surahNameEnglish: string;
  surahNameArabic: string;
  rukuInSurah: number;
  manzil: number;
  ayahStart: number;
  ayahEnd: number;
}

// Partial sample (you’ll eventually have 540 total)
export const QURAN_DATA: RukuData[] = [
  {
    rukuIndex: 1,
    parah: 1,
    surahNameEnglish: "Al-Fatihah",
    surahNameArabic: "الفاتحة",
    rukuInSurah: 1,
    manzil: 1,
    ayahStart: 1,
    ayahEnd: 7,
  },
  {
    rukuIndex: 2,
    parah: 1,
    surahNameEnglish: "Al-Baqarah",
    surahNameArabic: "البقرة",
    rukuInSurah: 1,
    manzil: 1,
    ayahStart: 1,
    ayahEnd: 5,
  },
  {
    rukuIndex: 3,
    parah: 1,
    surahNameEnglish: "Al-Baqarah",
    surahNameArabic: "البقرة",
    rukuInSurah: 2,
    manzil: 1,
    ayahStart: 6,
    ayahEnd: 16,
  },
  {
    rukuIndex: 4,
    parah: 1,
    surahNameEnglish: "Al-Baqarah",
    surahNameArabic: "البقرة",
    rukuInSurah: 3,
    manzil: 1,
    ayahStart: 17,
    ayahEnd: 24,
  },
  {
    rukuIndex: 5,
    parah: 1,
    surahNameEnglish: "Al-Baqarah",
    surahNameArabic: "البقرة",
    rukuInSurah: 4,
    manzil: 1,
    ayahStart: 25,
    ayahEnd: 29,
  },
];
