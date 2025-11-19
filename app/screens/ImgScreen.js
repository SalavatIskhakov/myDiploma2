import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Map from './components/Map';

import { COLORS, SIZES } from '../constants/theme';

const ImgScreen = ({ route, navigation }) => {
  const point = route.params;

  useEffect(() => {
    navigation.setOptions({ title: point.title })
  }, []);

  return (
    <ScrollView>
      <Image
        source={{ uri: point.imageUrl }}
        style={styles.img}
      />
      <View style={styles.container}>
        <Text style={{ textAlign: 'justify', fontSize: 18 }}>{point.description}</Text>

        <View
          style={styles.option}
        >
          <Ionicons name='help' style={styles.icon} />
          <Text style={styles.text}>{point.question}</Text>
        </View>

        <Map point={point} />
      </View>
    </ScrollView>
  )
};

export default ImgScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.border,
    padding: 10,
    paddingTop: 0,
  },
  img: {
    width: SIZES.width,
    height: SIZES.width / 4 * 3,
    marginBottom: 15,
  },
  option: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    elevation: 2,
  },
  icon: {
    fontSize: 25,
    color: COLORS.black,
    padding: 23,
    borderTopLeftRadius: 20,
    backgroundColor: '#53A7FB',
    color: COLORS.white,
  },
  text: {
    flex: 1,
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'justify'
  },
});
