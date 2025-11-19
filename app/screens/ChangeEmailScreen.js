import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';

import FormButton from './components/FormButton';
import FormInput from './components/FormInput';

import { auth } from '../utils/firebase';

import { COLORS } from '../constants/theme';

const ChangeDataScreen = ({ navigation }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [email, setEmail] = useState(user.email)

  const update = () => {
    if (email == '') {
      ToastAndroid.show('Ошибка ввода', ToastAndroid.SHORT);
      return;
    }
    if (email == user.email) { return; }

    user
      .updateEmail(email)
      .then(() => {
        ToastAndroid.show('Успешно', ToastAndroid.SHORT);
        navigation.goBack()
      })
      .catch(error => {
        console.log(error.message)
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      })
  }

  const clear = () => {
    setEmail(user.email);
  }

  useEffect(() => {
    navigation.setOptions({ title: 'Изменить Email' })
  }, []);

  return (
    <View
      style={styles.container}
      behavior="padding"
    >

      {/* Input */}
      <View style={styles.inputContainer}>
        <FormInput
          labelText="Ваш Email"
          textColor='gray'
          onChangeText={val => setEmail(val)}
          value={email}
          style={styles.input}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <FormButton
          labelText="Отмена"
          style={{ width: '45%' }}
          isPrimary={false}
          handleOnPress={clear}
        />
        <FormButton
          labelText="Сохранить"
          handleOnPress={update}
          style={{ width: '45%' }}
        />
      </View>
    </View>
  )
}

export default ChangeDataScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 30,
    width: '80%',
  },
  input: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
