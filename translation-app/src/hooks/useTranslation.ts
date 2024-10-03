import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'react-string-format';

import ko from '../constants/lang/lang.ko.json';
import en from '../constants/lang/lang.en.json';
import ja from '../constants/lang/lang.ja.json';
import zh from '../constants/lang/lang.zh.json';
import es from '../constants/lang/lang.es.json';

const i18n: I18n = new I18n({
  ko,
  en,
  ja,
  zh,
  es,
});
i18n.enableFallback = true;
i18n.defaultLocale = 'ko';

const deviceLanguage = getLocales()[0].languageCode;
const LOCALE_KEY = '@locale';

export const useTranslation = () => {
  const [locale, setLocale] = useState<string | null>(null);

  const _setLocale = (v: string) => {
    setLocale(v);
    AsyncStorage.setItem(LOCALE_KEY, v);
  };

  const init = async () => {
    const fs = await AsyncStorage.getItem(LOCALE_KEY);
    _setLocale(fs || deviceLanguage!);
  };

  useEffect(() => {
    init();
  }, []);

  return {
    t: (key: string) => i18n.t(key, { locale: locale || i18n.defaultLocale }),
    locale,
    setLocale: _setLocale,
    format,
  };
};
