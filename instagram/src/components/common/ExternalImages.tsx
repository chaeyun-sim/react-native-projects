import { Image, ImageStyle, StyleProp } from 'react-native';

interface ExternalImagesProps {
  url: string;
  style?: StyleProp<ImageStyle>;
  width: number;
  height: number;
}

export default function ExternalImages({ url, style, width, height }: ExternalImagesProps) {
  return (
    <Image
      source={{ uri: url }}
      style={style}
      width={width}
      height={height}
    />
  );
}
