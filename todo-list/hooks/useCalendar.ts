import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

export const useCalendar = (now: Dayjs) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(now);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showDatePicker = () => setIsModalOpen(true);
  const hideDatePicker = () => setIsModalOpen(false);

  const onPressLeftArrow = () => {
    setSelectedDate(dayjs(selectedDate).subtract(1, 'month'));
  };

  const onPressRightArrow = () => {
    setSelectedDate(dayjs(selectedDate).add(1, 'month'));
  };

  return {
    selectedDate,
    setSelectedDate,
    isModalOpen,
    showDatePicker,
    hideDatePicker,
    onPressLeftArrow,
    onPressRightArrow,
  };
};
