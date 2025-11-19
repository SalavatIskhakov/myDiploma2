import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { COLORS } from '../../constants/theme';

const FormButton = ({
  labelText = '',
  handleOnPress = null,
  style,
  isPrimary = true,
  ...more
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[
        styles.touchableOpacity,
        {
          backgroundColor: isPrimary ? COLORS.primary : COLORS.white,
          ...style,
        }
      ]}
      activeOpacity={0.7}
      onPress={() => {
        setIsDisabled(true)
        handleOnPress()
        setIsDisabled(false)
      }}
      {...more}>
      <Text
        style={[
          styles.text,
          { color: isPrimary ? COLORS.white : COLORS.primary }
        ]}>
        {labelText}
      </Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  touchableOpacity: {
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
