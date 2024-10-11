import { useState } from 'react';
import { ActivityIndicator, Alert, useWindowDimensions, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header/Header';
import ExternalImages from '../components/common/ExternalImages';
import Button from '../components/common/Button';
import Typography from '../components/common/Typography';
import Icons from '../components/common/Icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from 'react-redux';
import { onClickFavorite } from '../actions/favorite';

export default () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [isDownloading, setIsDownloading] = useState(false);

  const isFavorite = useSelector(state => {
    return state.favorite.favoriteList.filter(item => item === route.params.url).length > 0;
  });
  const onPressFavorite = () => dispatch(onClickFavorite(route.params.url));
  const onPressBack = () => navigation.goBack();

  const onPressDownload = async () => {
    setIsDownloading(true);
    const downloadResumable = FileSystem.createDownloadResumable(
      route.params.url,
      `${FileSystem.documentDirectory}${new Date().getMilliseconds()}.jpg`
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      const permissionResult = await MediaLibrary.getPermissionsAsync(true);

      if (permissionResult.status === 'denied') {
        setIsDownloading(false);
        return;
      }

      if (permissionResult.status === 'undetermined') {
        const requestResult = await MediaLibrary.requestPermissionsAsync();
        if (requestResult.status === 'denied') {
          setIsDownloading(false);
          return;
        }
      }

      await MediaLibrary.createAssetAsync(uri).then(() => Alert.alert('저장되었습니다.'));
    } catch (err) {
      console.error(err);
    }
    setIsDownloading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Icon
          iconName='arrow-back'
          onPress={onPressBack}
        />
        <Header.Title title='IMAGE DETAIL' />
        <Header.Icon
          iconName={isFavorite ? 'heart' : 'heart-outline'}
          iconSize={24}
          onPress={onPressFavorite}
        />
      </Header>
      <View style={{ flex: 1 }}>
        <ExternalImages
          url={route.params.url}
          style={{ flex: 1 }}
        />
      </View>

      <Button
        onPress={onPressDownload}
        opacity={0.9}
      >
        <View style={{ paddingBottom: 24, backgroundColor: 'black' }}>
          <View
            style={{
              height: 52,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isDownloading ? (
              <ActivityIndicator color='white' />
            ) : (
              <>
                <Typography color='white'>DOWNLOAD</Typography>
                <Icons
                  name='download-outline'
                  size={24}
                  color='white'
                />
              </>
            )}
          </View>
        </View>
      </Button>
    </View>
  );
};
