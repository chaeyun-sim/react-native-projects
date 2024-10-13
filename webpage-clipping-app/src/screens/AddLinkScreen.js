import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header/Header';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import SingleLineInput from '../components/SingleLineInput';
import { useState, useCallback, useEffect } from 'react';
import Button from '../components/common/Button';
import Typography from '../components/common/Typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Spacer from '../components/common/Spacer';
import { useSetRecoilState } from 'recoil';
import { atomLinkList } from '../states/atomLinkList';
import { getOpenGraphData } from 'src/utils/OpenGraphTagUtils';
import ExternalImages from 'src/components/common/ExternalImages';
import { getClipboardString } from 'src/utils/ClipboardUtils';
import Icons from 'src/components/common/Icons';

export default () => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [url, setUrl] = useState('');
  const [metaData, setMetaData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const updateList = useSetRecoilState(atomLinkList);

  useEffect(() => {
    onGetClipboardString();
  }, []);

  const onGetClipboardString = async () => {
    const result = await getClipboardString();
    if (result.startsWith('http://') || result.startsWith('https://')) {
      setUrl(result);
      const ogResult = await getOpenGraphData(result);
      setMetaData(ogResult);
    }
  };

  const onPressClose = () => navigation.goBack();
  const onPressSave = () => {
    if (!url) return;
    updateList(prev => {
      const list = {
        title: metaData.title,
        image: metaData.image,
        link: url,
        createdAt: new Date().toISOString(),
      };
      return {
        list: [...prev.list, list],
      };
    });
    setUrl('');
    navigation.goBack();
  };

  const onSubmitEditing = useCallback(async () => {
    setIsLoading(true);

    const result = await getOpenGraphData(url);
    setMetaData(result);

    setIsLoading(false);
    setIsSubmitted(true);
  }, [url]);

  const onPressReset = () => {
    setUrl('');
    setMetaData(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='ADD LINK' />
        <Header.Icon
          iconName='close'
          onPress={onPressClose}
        />
      </Header>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          paddingTop: 32,
          paddingHorizontal: 24,
        }}
      >
        <View>
          <SingleLineInput
            value={url}
            onChangeText={setUrl}
            placeholder='https://example.com'
            onSubmitEditing={onSubmitEditing}
          />
          {url && (
            <View style={{ position: 'absolute', top: 10, right: 10 }}>
              <Button onPress={onPressReset}>
                <Icons
                  name='close'
                  color='black'
                  size={23}
                />
              </Button>
            </View>
          )}
        </View>
        <Spacer space={20} />
        {isLoading && (
          <View
            style={{
              width: width - 48,
              height: (width - 48) * 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size='large' />
          </View>
        )}
        {metaData && !isLoading && (
          <View style={{ borderWidth: 1, borderRadius: 4, borderColor: 'gray' }}>
            <ExternalImages
              url={metaData.image}
              width={width - 48}
              height={(width - 48) * 0.5}
            />
            <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
              <Spacer space={10} />
              <Typography
                fontSize={20}
                color='black'
              >
                {metaData.title}
              </Typography>
              <Spacer space={10} />
              <Typography
                fontSize={16}
                color='gray'
              >
                {metaData.description}
              </Typography>
            </View>
          </View>
        )}
      </View>
      <Button onPress={onPressSave}>
        <View style={{ backgroundColor: url.length ? 'black' : 'gray' }}>
          <View style={{ height: 52, alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              color='white'
              fontSize={18}
            >
              저장하기
            </Typography>
          </View>
          <Spacer space={safeAreaInsets.bottom} />
        </View>
      </Button>
    </View>
  );
};
