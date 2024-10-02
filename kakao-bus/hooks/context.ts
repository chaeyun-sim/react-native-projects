import { createContext } from 'react';

type ColorType = {
  WHITE: string;
  BLACK: string;
  GRAY: { [key: string]: string };
  BUS: { [key: string]: string };
  YELLOW: string;
  CORAL: string;
};

export const ThemeContext = createContext<ColorType>({
  WHITE: '',
  BLACK: '',
  GRAY: {},
  BUS: {},
  YELLOW: '',
  CORAL: '',
});
