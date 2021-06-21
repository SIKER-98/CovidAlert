import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import findCoordinates from "../../functions/findCoordinates";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import reportActions from "../../redux/actions/reportActions";
import { GetUserReport } from "../../redux/operations/reportOperations";
import axios from "../../api/axiosHelper";

const ReportScreen = ({ route, navigation, endReport, deleteReport, reports, addReport, resetReport, user }) => {
  const [archiveReport, setArchiveReport] = useState([]);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  const getReports = async (id) => {
    axios.get("activeRequests/byUser", { params: { userId: id } })
      .then(res => {
        console.log(res.data);
        res.data.map(item => addReport(item));
      });

  };

  const archiveRequest = async (requestId) => {
    const api = "activeRequests/archive";

    let status = -1;
    const params = new URLSearchParams({
      requestId,
      performerId: user.userId,
    });

    await axios.get(api + "?" + params)
      .then(res => {
        console.log("DELETE:", res.status);
        status = res.status;
      });

    if (status === 200) {
      await getArchiveRequests();
      endReport(requestId);
    }
  };

  const deleteRequest = async (requestId) => {
    const api = "activeRequests/delete";

    let status = -1;
    const params = new URLSearchParams({
      requestId,
    });

    await axios.delete(api + "?" + params)
      .then(res => {
        console.log("DELETE:", res.status);
        status = res.status;
      });

    if (status === 200)
      deleteReport(requestId);
  };

  const getArchiveRequests = async () => {
    const api = "archivisedRequests?";

    const params = new URLSearchParams({ userId: user.userId });

    await axios.get(api + params)
      .then(res => {
        console.log("archive: ", res.data);
        setArchiveReport(res.data);
      });
  };


  useEffect(async () => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    console.log(user);
    resetReport();
    await getReports(user.userId);
    await getArchiveRequests();

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>REPORTS:</Text>

      <ScrollView style={{ width: "100%" }}>
        <View style={styles.scrollContainer}>
          {reports.reportList.map(report => (
            <View style={styles.inputView}>
              <Text style={styles.inputText}>{report.message}</Text>
              <Text style={styles.dateText}>Date:{report.creationTime.slice(0, 10)}</Text>
              <Text style={styles.dateText}>Time:{report.creationTime.slice(11, 19)}</Text>

              <View style={styles.verticalList}>
                <TouchableOpacity onPress={() => archiveRequest(report.id)}>
                  <Text style={styles.errorMessage}>End</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteRequest(report.id)}>
                  <Text style={styles.errorMessage}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/*  wygasle*/}
          {archiveReport.map((item, key) => (
            <View style={styles.archiveView} key={key}>
              <Text style={styles.inputText}>{item.message}</Text>
              <Text style={styles.dateText}>Post Date:{item.creationTime.slice(0, 10)}</Text>
              <Text style={styles.dateText}>{item.creationTime.slice(11, 19)}</Text>

              <Text style={styles.dateTextWhite}>End Date:{item.archivisationTime.slice(0, 10)}</Text>
              <Text style={styles.dateTextWhite}>{item.archivisationTime.slice(11, 19)}</Text>
            </View>
          ))}

        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  reports: state.reports,
  user: state.users,
});

const mapDispatchToProps = dispatch => ({
  resetReport: () => dispatch(reportActions.resetReport()),
  endReport: item => dispatch(reportActions.endReport(item)),
  deleteReport: item => dispatch(reportActions.deleteReport(item)),
  addReport: item => dispatch(reportActions.addReport(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);

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

  archiveView: {
    width: "80%",
    backgroundColor: COLORS.secondary2,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 2,
    paddingTop: SIZES.padding,
  },

  dateText: {
    ...FONTS.h3,
    color: COLORS.onSurface,
    textAlign: "center",
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
    marginBottom: 10,
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

  dateTextWhite: {
    ...FONTS.h3,
    color: COLORS.surface,
    textAlign: "center",
  },


});
