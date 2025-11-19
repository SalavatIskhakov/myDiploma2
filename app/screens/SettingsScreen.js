import { useNavigation } from '@react-navigation/core';
import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Option from './components/Option';

import { getUserById } from '../utils/database';
import { auth } from '../utils/firebase';

import { COLORS, IMAGES, SIZES } from '../constants/theme';

const SettingsScreen = () => {
  const [user, setUser] = useState({})
  const navigation = useNavigation()
  const getUserInfo = async () => {
  console.log("change SettingsScreen");
  const email = auth.currentUser?.email;
  const userRef = getUserById(auth.currentUser?.uid); // это doc(db, "Users", uid)
  onSnapshot(userRef, (snapshot) => {
    if (!snapshot.exists()) return;

    const userData = snapshot.data();
    const merged = { ...userData, email };

    setUser(merged);
  });
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ScrollView>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri:
              user.imageUrl ? user.imageUrl : IMAGES.noAvatar
          }}
          style={styles.img}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={{ color: COLORS.white, opacity: 0.7 }}>
          ID: {user.uid}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <Option
          iconName='person'
          text='Профиль'
          cb={() => navigation.navigate('EditProfileScreen', user)}
          arrow={true}
        />
        <Option
          iconName='mail'
          text='Email адрес'
          cb={() => navigation.navigate('ChangeEmailScreen')}
          arrow={true}
        />
        <Option
          iconName='lock-open'
          text='Пароль'
          cb={() => navigation.navigate('ChangePasswordScreen')}
          arrow={true} />
        <Option
          iconName='log-out'
          text='Выйти'
          cb={handleSignOut}
        />
      </View>
    </ScrollView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  imgContainer: {
    width: SIZES.width,
    height: SIZES.width * 2.5 / 4,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
    elevation: 2,
  },
  name: {
    color: COLORS.white,
    fontSize: 25,
    marginTop: 5,
  },
  optionsContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 30,
  },
})
