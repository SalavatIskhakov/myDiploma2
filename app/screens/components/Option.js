import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS } from '../../constants/theme';

const Option = ({ iconName, text, cb, arrow }) => (
  <TouchableOpacity
    onPress={cb}
    style={styles.option}
  >
    <Ionicons name={iconName} style={styles.icon} />
    <Text style={styles.buttonText}>{text}</Text>
    {
      arrow ?
        <Ionicons name='arrow-forward' />
        : null
    }
  </TouchableOpacity>
)

export default Option;

const styles = StyleSheet.create({
  option: {
    padding: 7,
    width: '100%',
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    elevation: 2,
  },
  icon: {
    fontSize: 25,
    color: COLORS.black,
    padding: 10,
    backgroundColor: '#53A7FB',
    borderRadius: 15,
    color: COLORS.white,
  },
  buttonText: {
    flex: 1,
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 16,
    margin: 20,
  },
})

