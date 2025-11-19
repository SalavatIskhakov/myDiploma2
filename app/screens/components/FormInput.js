import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import { COLORS } from '../../constants/theme';

const FormInput = ({
  labelText = '',
  placeholderText = '',
  textColor = COLORS.black,
  onChangeText = null,
  value = null,
  ...more
}) => {
  return (
    <View style={styles.view}>
      <Text style={{color: textColor}}>{labelText}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholderText}
        onChangeText={onChangeText}
        value={value}
        {...more}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  view: {
    width: '100%',
  },
  textInput: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.black + '20',
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20
  },
});
