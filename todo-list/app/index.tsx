import dayjs from 'dayjs';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useCalendar } from '@/hooks/useCalendar';
import Calendar from '@/components/Calendar';
import { TodoItem, useTodoList } from '@/hooks/useTodoList';
import { Ionicons } from '@expo/vector-icons';
import Margin from '@/components/Margin';
import AddTodoInput, { ITEM_WIDTH } from '@/components/AddTodoInput';
import { useRef } from 'react';

dayjs.locale('ko');

export default function HomeScreen() {
  const now = dayjs();
  const flatListRef = useRef<FlatList>(null);

  const {
    selectedDate,
    setSelectedDate,
    showDatePicker,
    hideDatePicker,
    isModalOpen,
    onPressLeftArrow,
    onPressRightArrow,
  } = useCalendar(now);
  const { todoList, originTodoList, addTodo, removeTodo, toggleTodo, resetInput, input, setInput } =
    useTodoList(selectedDate);

  const ListHeaderComponent = () => {
    const size = 4;
    return (
      <View>
        <Calendar
          selectedDate={selectedDate}
          onPressHeaderDate={showDatePicker}
          onPressLeftArrow={onPressLeftArrow}
          onPressRightArrow={onPressRightArrow}
          onPressDate={setSelectedDate}
          todoList={originTodoList}
        />

        <Margin height={25} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
          {[1, 2, 3].map(item => (
            <View
              key={item}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: '#a3a3a3',
                alignSelf: 'center',
              }}
            />
          ))}
        </View>
        <Margin height={20} />
      </View>
    );
  };

  const renderItem = ({ item }: { item: TodoItem }) => {
    return (
      <Pressable
        onPress={() => toggleTodo(item.id)}
        onLongPress={() => {
          Alert.alert('삭제하시겠어요?', '', [
            {
              style: 'cancel',
              text: '아니오',
            },
            {
              text: '네',
              onPress: () => removeTodo(item.id),
            },
          ]);
        }}
        style={{
          width: ITEM_WIDTH,
          alignSelf: 'center',
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderBottomColor: '#a6a6a6',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={{ flex: 1, fontSize: 14, color: '#595959' }}>{item.content}</Text>
        <Ionicons
          name='checkmark'
          size={17}
          color={item.isSuccess ? '#595959' : '#bfbfbf'}
        />
      </Pressable>
    );
  };

  const onFocus = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 150);
  };

  const onBlur = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 150);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 20}
      >
        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c',
          }}
          style={{
            width: '100%',
            height: Dimensions.get('window').height,
            position: 'absolute',
            flex: 1,
            objectFit: 'cover',
          }}
        />

        <Pressable
          onPress={Keyboard.dismiss}
          style={{ flex: 1, alignItems: 'center' }}
        >
          <FlatList
            ref={flatListRef}
            data={todoList}
            renderItem={renderItem}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={<View style={{ height: 30 }} />}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          />
        </Pressable>

        <AddTodoInput
          value={input}
          onChangeText={setInput}
          placeholder={`${dayjs(selectedDate).format('MM.DD')}에 추가할 투두`}
          onPressAdd={() => {
            if (input) {
              addTodo();
              resetInput();
            }
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <Margin height={20} />
      </KeyboardAvoidingView>
      <DateTimePickerModal
        isVisible={isModalOpen}
        mode='date'
        onConfirm={date => {
          setSelectedDate(dayjs(date));
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
