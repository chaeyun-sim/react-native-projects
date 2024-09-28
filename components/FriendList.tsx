import { Friend } from '@/types/types';
import { ScrollView, View } from 'react-native';
import Profile from './Profile';
import Margin from './Margin';

export default (props: { data: Friend[]; isClosed: boolean }) => {
  if (props.isClosed) return null;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {props.data.map(item => (
        <View key={item.name}>
          <Profile {...item} />
          <Margin height={13} />
        </View>
      ))}
    </ScrollView>
  );
};
