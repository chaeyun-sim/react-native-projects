import { useWindowDimensions, View } from 'react-native';

import Button from './common/Button';
import ExternalImages from './common/ExternalImages';
import Icons from './common/Icons';
import Spacer from './common/Spacer';
import Typography from './common/Typography';

interface FeedListItemProps {
  image: string;
  isLiked: boolean;
  likeCount: number;
  writer: string;
  comment: string;
  onPressFeed: () => void;
}

export default function FeedListItem(props: FeedListItemProps) {
  const { width } = useWindowDimensions();

  return (
    <Button
      onPress={props.onPressFeed}
      opacity={0.9}
    >
      <View>
        <ExternalImages
          url={props.image}
          width={width}
          height={width}
        />
        <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
          <Icons
            name={props.isLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={props.isLiked ? 'red' : 'black'}
          />
        </View>

        <View style={{ paddingHorizontal: 12 }}>
          <Typography fontSize={16}>{`좋아요 ${props.likeCount}개`}</Typography>
          <Spacer space={4} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Typography fontSize={16}>{props.writer}</Typography>
            <Spacer space={8} />
            <Typography fontSize={16}>{props.comment}</Typography>
          </View>
        </View>
      </View>
    </Button>
  );
}
