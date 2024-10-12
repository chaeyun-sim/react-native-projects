import Button from '../common/Button';
import Icons from '../common/Icons';

export default function HeaderButton({ onPress, iconName, iconSize }) {
  return (
    <Button onPress={onPress}>
      <Icons
        name={iconName}
        size={iconSize || 28}
        color='black'
      />
    </Button>
  );
}
