import React, { useEffect, useState } from 'react'
import {
  StyleSheet, Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { auth } from '../utils/firebase'

import { COLORS } from '../constants/theme'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ title: 'Авторизация' });
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Main")
      }
    })

    return unsubscribe
  }, [])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with: ', user.email);
        console.log('uid:', user.uid);
      })
      .catch(error => ToastAndroid.show(error.message, ToastAndroid.SHORT))
  }

  return (
    <View
      style={styles.container}
      behavior="padding"
    >
    {/* Inputs */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email адрес'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Пароль'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>

      {/* Sing up */}
      </View>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>Нет аккаунта?
          <Text onPress={() => navigation.navigate('Registration')} style={styles.footerLink}> Создать</Text>
        </Text>
      </View>
    </View >
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  footerView: {
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 15,
  },
  footerText: {
    fontSize: 16,
    color: COLORS.black,
  },
  footerLink: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16
  },
})
