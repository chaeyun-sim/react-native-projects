import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TodoItem = {
  id: number;
  content: string;
  date: Dayjs;
  isSuccess: boolean;
};

export const useTodoList = (selectedDate: Dayjs) => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [input, setInput] = useState('');

  const TODO_LIST_KEY = '@todoList';

  const saveTodoList = (newTodoList: TodoItem[]) => {
    setTodoList(newTodoList);
    AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList));
  };

  const addTodo = () => {
    const newTodoList = [
      ...todoList,
      {
        id: todoList.length + 1,
        content: input,
        date: selectedDate,
        isSuccess: false,
      },
    ];
    saveTodoList(newTodoList);
  };

  const removeTodo = (todoId: number) => {
    const newTodoList = todoList.filter(el => el.id !== todoId);
    saveTodoList(newTodoList);
  };

  const toggleTodo = (todoId: number) => {
    const newTodoList = todoList.map(todo => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        isSuccess: !todo.isSuccess,
      };
    });
    saveTodoList(newTodoList);
  };

  const resetInput = () => setInput('');

  const filteredTodoList = todoList
    .filter(todo => dayjs(todo.date).isSame(selectedDate, 'day'))
    .sort((a, b) => Number(a.isSuccess) - Number(b.isSuccess) || dayjs(a.date).diff(dayjs(b.date)));

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const result = await AsyncStorage.getItem(TODO_LIST_KEY);

    if (result) {
      const newTodoList = JSON.parse(result);
      setTodoList(newTodoList);
    }
  };

  return {
    todoList: filteredTodoList,
    originTodoList: todoList,
    addTodo,
    removeTodo,
    toggleTodo,
    resetInput,
    input,
    setInput,
  };
};
