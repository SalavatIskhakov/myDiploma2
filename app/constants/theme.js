import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#0782F9',
  secondary: '#000020',

  success: '#00C851',
  error: '#ff4444',

  black: '#171717',
  white: '#FFFFFF',
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#8C7853',
  grey: 'grey',

  background: '#f4f4f4',
  border: '#F5F5F7',
};

export const SIZES = {
  base: 10,
  width,
  height,
};

export const IMAGES = {
  noAvatar: 'https://avatars.mds.yandex.net/get-yapic/26057/tXrD9gTYvqlx14J8K0wwHsyJvUY-1/orig',
  noImage: 'https://api.chief18.dev.ceratex.ru/storage/no_photo.png',
}
