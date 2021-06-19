import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ReportInfo = ({selectedReport}) =>{

  return(
    <View style={styles.infoContainer}>
      <Text>TEST</Text>
    </View>
  )
}

export default ReportInfo

const styles = StyleSheet.create({
  infoContainer:{
    position:'absolute',
    bottom:50,
    left:'50%',
    width:30,
    height:30,
    backgroundColor:'#eeeeee',
  }
})
