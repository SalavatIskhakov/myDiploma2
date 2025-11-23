import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { deleteQuestion } from '../../utils/database';

import { COLORS, SIZES } from '../../constants/theme';

const Img = ({ point, user, quizId }) => {
  const navigation = useNavigation()
  return (
    <>
      <View style={{ flexDirection: 'row', }}>

        <TouchableOpacity
          onPress={() => navigation.navigate('ImgScreen', point)}
          style={styles.container}
        >
          <Image
            source={{ uri: point.imageUrl }}
            style={styles.img}
          />
        </TouchableOpacity>

        {
          user.role == 'admin' ?
            <TouchableOpacity 
            style={{ position: 'absolute', right: SIZES.width / 2 - 70 }}
            onPress={() => deleteQuestion(quizId, point.id)}
            >
              <Ionicons name='close-circle' style={{ fontSize: 35, color: COLORS.error }} />
            </TouchableOpacity>
            : null
        }

      </View>
      <Text style={{ fontSize: 22, textAlign: 'center' }}>{point.title}</Text>
    </>
  )
};

export default Img;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  img: {
    width: 100,
    height: 100,
    borderColor: 'grey',
    borderWidth: 3,
    borderRadius: 50,
  }
});
