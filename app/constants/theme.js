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

  background: '#f4f4f4',
  border: '#F5F5F7',
};

export const SIZES = {
  base: 10,
  width,
  height,
};

export const IMAGES = {
  noAvatar: 'https://avatars.mds.yandex.net/i?id=151466b6e2052cdeed45a0ad67beebec-5869219-images-thumbs&ref=rim&n=33&w=225&h=225',
  noImage: 'https://img3.stcrm.it/images/22898928/2500x/annunciomymoto.jpeg',
}
