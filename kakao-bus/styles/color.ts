const COMMON_COLORS = Object.freeze({
  BUS: {
    B: '#3e589d',
    G: '#72b33e',
    R: '#e44124',
  },
  YELLOW: '#f7d14a',
  CORAL: '#dd6247',
});

const OTHER_COLORS = Object.freeze({
  WHITE: '#fefefe',
  BLACK: '#333333',
  GRAY: {
    100: '#eeeeee',
    200: '#c3c4c6',
    300: '#969b9e',
    400: '#888789',
  },
});

export const LIGHT_COLOR = Object.freeze({
  ...COMMON_COLORS,
  WHITE: OTHER_COLORS.WHITE,
  BLACK: OTHER_COLORS.BLACK,
  GRAY: {
    100: OTHER_COLORS.GRAY[100],
    200: OTHER_COLORS.GRAY[200],
    300: OTHER_COLORS.GRAY[300],
    400: OTHER_COLORS.GRAY[400],
  },
});

export const DARK_COLOR = Object.freeze({
  ...COMMON_COLORS,
  WHITE: OTHER_COLORS.BLACK,
  BLACK: OTHER_COLORS.WHITE,
  GRAY: {
    100: OTHER_COLORS.GRAY[400],
    200: OTHER_COLORS.GRAY[300],
    300: OTHER_COLORS.GRAY[200],
    400: OTHER_COLORS.GRAY[200],
  },
});
