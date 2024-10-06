import { DefaultTheme } from 'styled-components';

const colors = {
  green1: '#00BDC7',
  green2: '#EDF9FB',
};
//타입 추론
export type ColorsTypes = typeof colors;

export const theme: DefaultTheme = {
  colors,
};

export default theme;
