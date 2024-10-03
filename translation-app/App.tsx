import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from './src/hooks/useTranslation';
import Button from './src/components/Button';
import { useCookie } from './src/hooks/useCookie';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import LoadingView from './src/components/LoadingView';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';

const LANGUAGES = ['ko', 'en', 'ja', 'zh', 'es'];

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { t, locale, setLocale, format } = useTranslation();
  const { cookie } = useCookie();
  const [loaded] = useFonts({
    RIDIBatang: require('./assets/fonts/RIDIBatang.otf'),
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (cookie !== '') {
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }
  }, [cookie]);

  useEffect(() => {
    if (locale !== null && loaded) {
      SplashScreen.hideAsync();
    }
  }, [locale, loaded]);

  if (!isLoaded || !loaded) return <LoadingView />;

  const todayText = format(
    t('today_is'),
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        resizeMode='cover'
        source={require('./assets/background.json')}
        style={{ width: '100%', height: '100%', position: 'absolute', zIndex: -1 }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.top_container}>
          <Text style={styles.today_text}>{todayText}</Text>
          <Text style={styles.cookie_text}>{t(cookie)}</Text>
        </View>
        <View style={styles.bottom_container}>
          <View style={styles.button_group}>
            {LANGUAGES.map(lang => (
              <Button
                key={lang}
                onPress={() => setLocale(lang)}
                isSelected={locale === lang}
                text={lang.toUpperCase()}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button_group: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 25,
  },
  top_container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom_container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  today_text: {
    position: 'absolute',
    top: 70,
    fontSize: 13,
    color: '#8b658f',
    fontFamily: 'RIDIBatang',
  },
  cookie_text: {
    fontSize: 20,
    color: '#372538',
    textAlign: 'center',
    marginHorizontal: 30,
    fontFamily: 'RIDIBatang',
    lineHeight: 30,
  },
});
