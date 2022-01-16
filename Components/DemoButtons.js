import React from "react";
import { StyleSheet, View, Button } from "react-native";

const DemoButtons = (props) => {

  return(
    <View style={styles.container}>
      <Button
        style={styles.buttons}
        onPress={() => { props.onMoveCameraPress(); }}
        title="Move Camera"
      />
      <Button
        style={styles.buttons}
        onPress={() => { props.onClearMarkersPress(); }}
        title="Clear Markers"
      />
      <Button
        style={styles.buttons}
        onPress={() => { props.onToggleMapTypePress(); }}
        title="Change Map Type"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'row'
  },
  buttons:{
    flex:1
  }
})

export default DemoButtons;