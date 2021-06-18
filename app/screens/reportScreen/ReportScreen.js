import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import findCoordinates from "../../functions/findCoordinates";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import reportActions from "../../redux/actions/reportActions";

const ReportScreen = ({ route, navigation, endReport, deleteReport }) => {
  const reports = useSelector(state => state.reports);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>REPORTS:</Text>

      <ScrollView style={{width:'100%'}}>
        <View style={styles.scrollContainer}>
          {reports.reportList.map(report => (
            <View style={styles.inputView}>
              <Text style={styles.inputText}>{report.message}</Text>

              <View style={styles.verticalList}>
                <TouchableOpacity onPress={() => endReport(report)}>
                  <Text style={styles.errorMessage}>End</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteReport(report)}>
                  <Text style={styles.errorMessage}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  endReport: item => dispatch(reportActions.endReport(item)),
  deleteReport: item => dispatch(reportActions.deleteReport(item)),
});

export default connect(null, mapDispatchToProps)(ReportScreen);

const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZES.padding * 3,
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  scrollContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: SIZES.padding * 3,
  },

  verticalList: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  logo: {
    ...FONTS.largeTitle,
    fontWeight: "bold",
    color: COLORS.primary2,
    marginBottom: SIZES.padding * 3,
  },

  inputView: {
    width: "80%",
    backgroundColor: COLORS.primary2,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 2,
    paddingTop: SIZES.padding,
  },

  inputViewMulti: {
    width: "80%",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 2,
  },

  inputText: {
    ...FONTS.h3,
    color: COLORS.onPrimary,
    textAlign: "center",
  },

  loginBtn: {
    width: "80%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding * 4,
    marginBottom: SIZES.padding,
  },

  loginText: {
    ...FONTS.h3,
    color: COLORS.onPrimary,
  },

  errorMessage: {
    ...FONTS.body2,
    color: COLORS.error,
    // marginBottom: SIZES.padding,
  },


});
