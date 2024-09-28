import { Image, Text, View } from 'react-native';
import Margin from './Margin';

interface ProfileProps {
  name: string;
  introduction: string;
  uri: string;
  isMe?: boolean;
}

export default ({ name, introduction, uri, isMe }: ProfileProps) => {
  const size = isMe ? 55 : 45;

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
      <Image
        source={{ uri: uri }}
        style={{ width: size, height: size, borderRadius: size * 0.4 }}
      />
      <View style={{ justifyContent: 'center', marginLeft: 10 }}>
        <Text style={{ fontWeight: isMe ? 'bold' : undefined, fontSize: 16 }}>{name}</Text>
        {!!introduction && (
          <View>
            <Margin height={isMe ? 6 : 2} />
            <Text style={{ fontSize: isMe ? 12 : 11, color: 'grey' }}>{introduction}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
