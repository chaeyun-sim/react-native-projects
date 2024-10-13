import { Image } from 'react-native';

export default function LocalImages({ localAsset, style }) {
  return (
    <Image
      source={localAsset}
      style={style}
    />
  );
}
