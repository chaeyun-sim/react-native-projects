import { useEffect } from 'react';
import { View } from 'react-native';

import Typography from './components/common/Typography';

interface SplashViewProps {
  onFinishLoad: () => void;
}

export default function SplashView(props: SplashViewProps) {
  useEffect(() => {
    setTimeout(() => {
      props.onFinishLoad();
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Typography fontSize={36}>SPLASH</Typography>
    </View>
  );
}
