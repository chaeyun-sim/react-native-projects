import dayjs, { Dayjs } from 'dayjs';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, getCalendarColumns, getDayColor, getDayText } from '@/utils/utils';
import Column from './Column';
import Margin from './Margin';
import ArrowButton from './ArrowButton';
import { TodoItem } from '@/hooks/useTodoList';

interface CalendarProps {
  selectedDate: Dayjs;
  onPressLeftArrow: () => void;
  onPressRightArrow: () => void;
  onPressHeaderDate: () => void;
  onPressDate: (date: Dayjs) => void;
  todoList: TodoItem[];
}

export default ({
  selectedDate,
  onPressLeftArrow,
  onPressRightArrow,
  onPressHeaderDate,
  onPressDate,
  todoList,
}: CalendarProps) => {
  const columns = getCalendarColumns(selectedDate);

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD');

    return (
      <View>
        <Margin height={15} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <ArrowButton
            name='arrow-left'
            onPress={onPressLeftArrow}
          />
          <TouchableOpacity onPress={onPressHeaderDate}>
            <Text style={{ fontSize: 20, color: '#404040' }}>{currentDateText}</Text>
          </TouchableOpacity>
          <ArrowButton
            name='arrow-right'
            onPress={onPressRightArrow}
          />
        </View>
        <Margin height={15} />

        <View style={{ flexDirection: 'row' }}>
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const color = getDayColor(day);

            return (
              <Column
                key={day}
                text={getDayText(day)}
                color={color}
                disabled
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: { item: { date: Date } }) => {
    const itemDate = dayjs(item.date);
    const dateText = itemDate.get('date');
    const isCurrentMonth = itemDate.isSame(selectedDate, 'month');
    const dayOfWeek = itemDate.get('day');

    return (
      <Column
        text={String(dateText)}
        color={isCurrentMonth ? getDayColor(dayOfWeek) : COLORS['DEFAULT'] + '50'}
        onPress={() => onPressDate(itemDate)}
        isSelected={itemDate.isSame(selectedDate, 'day')}
        hasTodo={!!todoList.find(todo => dayjs(todo.date).isSame(dayjs(item.date), 'day'))}
      />
    );
  };

  return (
    <FlatList
      scrollEnabled={false}
      data={columns.map(dayjs => ({ date: dayjs.toDate() }))}
      renderItem={renderItem}
      numColumns={7}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};
