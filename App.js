import React, {useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {MapStyle} from './Data/GoogleMapStyle';

import EventsList from './Components/EventsList';

const initialLocation = () => {
  return {
    latitude: 51.513165,
    longitude: -0.117582, 
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  }
}


const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Above</Text>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          customMapStyle={MapStyle}
          region={initialLocation()}
          ></MapView>
      </View>

      <View style={styles.eventsListContainer}>
        <EventsList />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject
  },
  mapContainer: {
    flex: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    flex: 1,
  },
  eventsListContainer:{
    flex: 1
  }
});

export default App;
