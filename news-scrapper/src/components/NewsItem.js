import { removeKeywordTag } from '../utils/removeTags';
import Button from './common/Button';
import Spacer from './common/Spacer';
import Typography from './common/Typography';

export default ({ item, onPressItem }) => {
  const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

  const getDate = pubDate => {
    const date = new Date(pubDate);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()} ${
      WEEK[date.getDay()]
    }요일 ${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <Button
      style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 12 }}
      onPress={onPressItem}
    >
      <Typography
        fontSize={20}
        numberOfLines={1}
      >
        {removeKeywordTag(item.title)}
      </Typography>
      <Typography
        fontSize={16}
        numberOfLines={2}
        color='gray'
      >
        {removeKeywordTag(item.description)}
      </Typography>
      <Spacer space={6} />
      <Typography
        fontSize={13}
        color='gray'
      >
        {getDate(item.pubDate)}
      </Typography>
    </Button>
  );
};
