import Division from '@/components/Division';
import FriendList from '@/components/FriendList';
import FriendSection from '@/components/FriendSection';
import Header from '@/components/Header';
import Margin from '@/components/Margin';
import Profile from '@/components/Profile';
import TabBar from '@/components/TabBar';
import { friendProfiles, myProfile } from '@/constants/data';
import { Friend } from '@/types/types';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const [isClosed, setIsClosed] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const onPressArrow = () => setIsClosed(!isClosed);

  const ItemSeparatorComponent = () => <Margin height={13} />;
  const RenderItem = (data: { item: Friend }) => (
    <View>
      <Profile {...data.item} />
    </View>
  );

  const ListHeaderComponent = () => {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <Header />
        <Profile
          isMe
          {...myProfile}
        />
        <Division />
        <FriendSection
          friendProfileLen={friendProfiles.length}
          onPress={onPressArrow}
          isClosed={isClosed}
        />
      </View>
    );
  };
  const ListFooterComponent = () => <Margin height={20} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={isClosed ? [] : friendProfiles.sort((a, b) => a.name.localeCompare(b.name))}
        keyExtractor={item => item.name}
        contentContainerStyle={{ paddingHorizontal: 18 }}
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={RenderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
      />
      <TabBar
        selectedTabIndex={selectedTabIndex}
        setSelectedTabIndex={setSelectedTabIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
