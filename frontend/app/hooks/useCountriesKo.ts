import enCountries from 'world-countries';
import koCountries from '@/public/data/countries-ko.json';

export type SelectCountryValue = {
  label: string;
  value: string;
  region: string;
  flag: string; // emoji
};

const formatCountries = (data: any[], lang: 'en' | 'ko') =>
  data.map((c) => ({
    value: c.cca2,
    label:
      lang === 'ko'
        ? c.translations.kor?.common || c.name.common
        : c.name.common,
    region: c.region,
    flag: c.flag, // 🇰🇷
  }));

const useCountriesKo = (language: 'en' | 'ko' = 'en') => {
  const source = language === 'ko' ? koCountries : enCountries;
  const formattedCountries = formatCountries(source, language);

  const getAll = () => formattedCountries;

  const getByValue = (value: string) =>
    formattedCountries.find((item) => item.value === value);

  return { getAll, getByValue };
};

export default useCountriesKo;