import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import icons from "../../../assets/icons";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const ReportInfo = ({selectedReport, makeCall,setSelectedReport}) =>{

  return(
    <View style={styles.infoContainer}>
      <Text style={styles.usernameText}>{selectedReport.creationTime.slice(11,19)}</Text>
      <Text style={styles.messageText}>{selectedReport.message}</Text>
      <TouchableOpacity style={styles.callButton}
                        onPress={() => makeCall()}
      >
        <Text style={styles.callText}>CALL TO HE/SHE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeButton}
                        onPress={() => setSelectedReport(null)}
      >
        <Image source={icons.close}
               style={styles.closeIcon}
        />
      </TouchableOpacity>
    </View>
  )
}

export default ReportInfo

const styles = StyleSheet.create({
  infoContainer: {
    position: "absolute",
    backgroundColor: COLORS.surface,
    width: "80%",
    // height: 100,
    bottom: 30,
    marginHorizontal: "10%",
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: SIZES.padding,
    alignItems: "center",
    justifyContent: "center",
  },
  usernameText: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  messageText: {
    ...FONTS.body3,
  },

  callButton: {
    marginTop: 10,
    padding: SIZES.padding,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },

  callText: {
    ...FONTS.body2,
    color: COLORS.onPrimary,
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,

    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 30,

  },
  closeIcon: {
    width: "70%",
    height: "70%",
    tintColor: COLORS.primary,

  },

});
