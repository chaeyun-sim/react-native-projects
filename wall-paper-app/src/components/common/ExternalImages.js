import { Image } from 'react-native';

export default function ExternalImages({ url, style, width, height }) {
  return (
    <Image
      source={{ uri: url }}
      style={style}
      width={width}
      height={height}
    />
  );
}
