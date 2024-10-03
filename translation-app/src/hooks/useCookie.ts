import { useEffect, useState } from 'react';

const getRandomCookie = () => {
  const cookieLength = 15;
  const randomNum = Math.floor(Math.random() * cookieLength);
  return `cookie_${randomNum + 1}`;
};

export const useCookie = () => {
  const [cookie, setCookie] = useState('');

  useEffect(() => {
    const randomCookie = getRandomCookie();
    setCookie(randomCookie);
  }, []);

  return {
    cookie,
  };
};
