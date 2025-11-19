import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { COLORS } from '../../constants/theme';

const Map = ({ point }) => {
  const latitude = +point.latitude;
  const longitude = +point.longitude;
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          // image={{uri: 'custom_pin'}}
          pinColor="blue"
        >
          <Callout>
            <Text>{point.title}</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 100 * 83,
  },
});
