import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { COLORS, IMAGES } from '../constants/theme';

const UserScreen = ({ route, navigation }) => {
  const user = route.params;

  useEffect(() => {
    navigation.setOptions({ title: "Пользователь" })
  }, []);

  return (
     <View
      style={styles.container}
      behavior="padding"
    >
      <Image
        source={{ uri: user.imageUrl ? user.imageUrl : IMAGES.noAvatar }}
        style={styles.img}
      />

      <View style={styles.textWrapper}>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.text}>{user.uid}</Text>
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.label}>Имя</Text>
        <Text style={styles.text}>{user.name}</Text>
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.label}>XP</Text>
        <Text style={styles.text}>{user.xp}</Text>
      </View>
    </View>
  )
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120,
    marginHorizontal: 40,
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  textWrapper: {
    marginTop: 10,
    width: '100%'
  },
  label: {
    color: COLORS.grey,
  },
  text: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
});
