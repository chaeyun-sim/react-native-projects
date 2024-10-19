import { Image, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

interface LocalImagesProps {
  localAsset: ImageSourcePropType;
  style: StyleProp<ImageStyle>;
}

export default function LocalImages({ localAsset, style }: LocalImagesProps) {
  return (
    <Image
      source={localAsset}
      style={style}
    />
  );
}
