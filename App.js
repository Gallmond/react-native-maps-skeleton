import React, {useRef, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Button} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import DemoButtons from './Components/DemoButtons';
import TopText from './Components/TopText';
import {MapStyle} from './Data/GoogleMapStyle';

const TEST_LOCATIONS = {
  BUCKINGHAM_PALACE: {
    latitude: 51.50206,
    longitude: -0.140042,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  },
  BIG_BEN: {
    latitude: 51.500914,
    longitude: -0.124703,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  },
  LONDON_EYE: {
    latitude: 51.503301,
    longitude: -0.119369,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  },
};

const App = () => {

  // the list of marker details to be rendered inside the map
  const [mapMarkers, setMapMarkers] = useState([
    {
      coordinate: {
        latitude: TEST_LOCATIONS.BUCKINGHAM_PALACE.latitude,
        longitude: TEST_LOCATIONS.BUCKINGHAM_PALACE.longitude,
      },
      callout: {
        text: `lat: ${TEST_LOCATIONS.BUCKINGHAM_PALACE.latitude}, lon: ${TEST_LOCATIONS.BUCKINGHAM_PALACE.longitude}`,
      },
    },
  ]);

  // the current camera position
  const [cameraPosition, setCameraPosition] = useState({
    center: {
      latitude: TEST_LOCATIONS.BUCKINGHAM_PALACE.latitude,
      longitude: TEST_LOCATIONS.BUCKINGHAM_PALACE.longitude,
    },
  });

  // the current map region. Note this is different from camera position
  // we need to track and set this as the map will 'snap' back to here 
  // which can 'disconnect' it from the camera position
  const [mapRegion, setMapRegion] = useState(TEST_LOCATIONS.BUCKINGHAM_PALACE)

  const [mapType, setMapType] = useState('standard');

  // the map itself, use this to call map methods
  const mapRef = useRef(null);

  // update the state of the camera position, and animate to it
  const moveCameraTo = (latitude, longitude, durationMs = 500) => {
    const newCameraPosition = {
      ...cameraPosition,
      center: {
        latitude: latitude,
        longitude: longitude,
      },
    };
    setCameraPosition(newCameraPosition);
    mapRef.current.animateCamera(newCameraPosition, {duration: durationMs});
  };

  // add a new marker at the given coordinate
  const addMarkerAtCoordinate = (latitude, longitude) => {
    setMapMarkers(markers => {
      return [
        ...markers,
        {
          coordinate: {
            latitude: latitude,
            longitude: longitude,
          },
          callout: {
            text: `lat: ${latitude.toFixed(4)}, lon: ${longitude.toFixed(4)}`,
          },
        },
      ];
    });
  };

  // remove a marker at the given coordinate
  const removeMarkerAtCoordinate = (latitude, longitude) => {
    const newMarkers = [];
    mapMarkers.forEach(existingMarkerObject => {
      if (
        existingMarkerObject.coordinate.latitude != latitude &&
        existingMarkerObject.coordinate.longitude != longitude
      ) {
        newMarkers.push(existingMarkerObject);
      }
    });
    setMapMarkers(() => {
      return newMarkers;
    });
  };

  // remove all markers
  const clearMarkers = () => {
    setMapMarkers(() => {
      return [];
    });
  };

  // toggle map type between satellite and standard
  const toggleMapType = () => {
    setMapType(val => {
      return val === 'satellite' ? 'standard' : 'satellite'
    })
  }

  /**
   * Move the camera between the TEST_LOCATIONs
   */
  const moveCameraDemoTimeouts = [];
  const moveCameraDemo = () => {
    moveCameraDemoTimeouts.map(val => {
      clearTimeout(val);
    });

    moveCameraTo(
      TEST_LOCATIONS.BUCKINGHAM_PALACE.latitude,
      TEST_LOCATIONS.BUCKINGHAM_PALACE.longitude,
      2000,
    );

    const timeout1 = setTimeout(() => {
      moveCameraTo(
        TEST_LOCATIONS.BIG_BEN.latitude,
        TEST_LOCATIONS.BIG_BEN.longitude,
        2000,
      );
    }, 2000 + 1000);

    const timeout2 = setTimeout(() => {
      moveCameraTo(
        TEST_LOCATIONS.LONDON_EYE.latitude,
        TEST_LOCATIONS.LONDON_EYE.longitude,
        2000,
      );
    }, 2000 + 1000 + 2000 + 1000);

    moveCameraDemoTimeouts.push(timeout1, timeout2);
  };

  // MapView onPress event handler
  const onPressHandler = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    addMarkerAtCoordinate(latitude, longitude);
  };

  // MapView onRegionChangeComplete event handler
  const onRegionChangeCompleteHandler = event => {
    setMapRegion(event);
  }

  // helper to render Marker with appropriate props
  const renderMarker = newMarkerObject => {
    const markerProps = {
      key: `${newMarkerObject.coordinate.latitude}:${newMarkerObject.coordinate.longitude}`,
      coordinate: newMarkerObject.coordinate,
    };
    return (
      <Marker {...markerProps}>
        <Callout
          onPress={event => {
            const {latitude, longitude} = event.nativeEvent.coordinate;
            removeMarkerAtCoordinate(latitude, longitude);
          }}>
          <Text style={styles.calloutText}>{newMarkerObject.callout.text}</Text>
        </Callout>
      </Marker>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.textContainer}>
        <TopText />
      </View>
      

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          customMapStyle={MapStyle}
          region={mapRegion}
          mapType={mapType}
          
          onRegionChangeComplete={onRegionChangeCompleteHandler}
          onPress={onPressHandler}
          >
          {mapMarkers.map(marker => renderMarker(marker))}
        </MapView>
      </View>

      <View style={styles.buttonsContainer}>
        <DemoButtons
          onMoveCameraPress={()=>{moveCameraDemo();}}
          onClearMarkersPress={()=>{clearMarkers();}}
          onToggleMapTypePress={()=>{toggleMapType();}}
        />
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    flex: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  calloutText: {
    color: 'black',
  },
});

export default App;
