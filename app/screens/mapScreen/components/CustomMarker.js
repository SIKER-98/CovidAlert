import React from "react";
import { Marker } from "react-native-maps";
import { Image, StyleSheet, View } from "react-native";
import icons from "../../../assets/icons";
import { COLORS } from "../../../constants/theme";

const CustomMarker = (props) => {
  const select = () => {

    if (props.selected)
      props.selected(props.coords);
  };


  return (
    <Marker coordinate={props.coords}
            onPress={() => select()}
    >
      <View style={styles.markerView}>
        <Image source={props.icon}
               style={styles.markerImage} />
      </View>
    </Marker>
  );
};


export default CustomMarker;

const styles = StyleSheet.create({
  markerView: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  markerImage: {
    width: 30,
    height: 30,
    tintColor: COLORS.primary,
  },
});
