import BookmarkButton from '@/components/BookmarkButton';
import BusInfo from '@/components/BusInfo';
import { getBusNumColorByType, getSections } from '@/constants/data';
import { ThemeContext } from '@/hooks/context';
import { useProcessedBusInfo } from '@/hooks/useProcessedNextBusInfo';
import { useTheme } from '@/hooks/useTheme';
import { busStop } from '@/mock/data';
import { BusData } from '@/types/types';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  SectionList,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [isRefreshed, setIsRefreshed] = useState(false);

  const { COLOR, isDark, toggleIsDark } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderItem = ({ item: bus }: { item: BusData }) => {
    const processedNextBusInfo = useProcessedBusInfo(now, bus);

    return (
      <BusInfo
        isBookmarked={bus.isBookmarked}
        busNum={bus.num}
        directionDescription={bus.directionDescription}
        busNumColor={getBusNumColorByType(bus.type)}
        processedNextBusInfo={processedNextBusInfo}
      />
    );
  };

  const renderSectionHeader = ({ section }: { section: { title: string; data: BusData[] } }) => (
    <View
      style={{
        borderTopWidth: 0.4,
        borderBottomWidth: 0.4,
        borderTopColor: COLOR.GRAY[200],
        borderBottomColor: COLOR.GRAY[200],
        paddingLeft: 13,
        paddingVertical: 3,
        backgroundColor: COLOR.GRAY[100],
      }}
    >
      <Text style={{ fontSize: 12, color: COLOR.GRAY[400] }}>{section.title}</Text>
    </View>
  );

  const ListHeaderComponent = () => {
    return (
      <View
        style={{
          backgroundColor: COLOR.GRAY[300],
          width: '100%',
          height: 170,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: COLOR.WHITE, fontSize: 13, marginBottom: 4, marginTop: 10 }}>
          {busStop.id}
        </Text>
        <Text style={{ color: COLOR.WHITE, fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
          {busStop.name}
        </Text>
        <Text style={{ color: COLOR.GRAY[100], fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
          {busStop.directionDescription}
        </Text>
        <BookmarkButton
          size={20}
          isBookmarked={busStop.isBookmarked}
          style={{
            borderWidth: 0.3,
            borderColor: COLOR.GRAY[100],
            borderRadius: 35 / 2,
            padding: 5,
            marginBottom: 25,
          }}
        />
      </View>
    );
  };

  const ItemSeparatorComponent = () => {
    return <View style={{ width: '100%', height: 1, backgroundColor: COLOR.GRAY[100] }} />;
  };

  const onRefresh = () => setIsRefreshed(true);

  useEffect(() => {
    if (isRefreshed) {
      setNow(dayjs());
      setIsRefreshed(false);
    }
  }, [isRefreshed]);

  return (
    <ThemeContext.Provider value={COLOR}>
      <View style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
        <View style={{ backgroundColor: COLOR.GRAY[300], width: '100%' }}>
          <SafeAreaView style={{ zIndex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity style={{ padding: 10 }}>
                <SimpleLineIcons
                  name='arrow-left'
                  size={20}
                  color={COLOR.WHITE}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={toggleIsDark}
                >
                  <Ionicons
                    name={isDark ? 'moon-outline' : 'sunny-outline'}
                    size={24}
                    color={COLOR.WHITE}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }}>
                  <SimpleLineIcons
                    name='home'
                    size={20}
                    color={COLOR.WHITE}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>

          {/* safe area top 외부 */}
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: 500,
              zIndex: 0,
              backgroundColor: COLOR.GRAY[300],
              top: -50,
            }}
          />
        </View>
        <SectionList
          style={{ flex: 1, width: '100%' }}
          sections={sections}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ItemSeparatorComponent={ItemSeparatorComponent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshed}
              onRefresh={onRefresh}
            />
          }
        />
        {/* safe area bottom 외부 */}
        <View
          style={{
            height: 35,
            position: 'absolute',
            bottom: -35,
            width: '100%',
            backgroundColor: COLOR.WHITE,
          }}
        />
      </View>
    </ThemeContext.Provider>
  );
}
