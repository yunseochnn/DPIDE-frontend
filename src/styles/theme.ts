import { DefaultTheme } from 'styled-components';

const colors = {
  green1: '#00BDC7',
  green2: '#EDF9FB',
};

export type ColorsTypes = typeof colors;

export const theme: DefaultTheme = {
  colors,
};

export default theme;
