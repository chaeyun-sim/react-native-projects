export const getNumberBackgroundColor = () => {
  const randomNumber = Math.floor(Math.random() * 10) % 6;
  if (randomNumber === 0) return 'red';
  if (randomNumber === 1) return 'blue';
  if (randomNumber === 2) return 'gray';
  if (randomNumber === 3) return 'green';
  if (randomNumber === 4) return 'purple';
  return 'black';
};
