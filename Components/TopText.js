import React from "react";
import { StyleSheet, View, Text } from "react-native";

const TopText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tap map to add Markers</Text>
      <Text style={styles.text}>Tap Marker to show Callout.</Text>
      <Text style={styles.text}>Tap Callout to remove Marker.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column'
  },
  text:{
    flex: 1
  }
})

export default TopText;