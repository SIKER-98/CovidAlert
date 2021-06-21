import reportActions from "../actions/reportActions";
import { Alert } from "react-native";
import axios from "axios";

// Dodawanie zgloszenia

const pushReport = async (item) => {
  const response = await fetch(
    "https://mobilki-backend.herokuapp.com/activeRequests/add", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Success", data);
    })
    .catch(error => {
      console.log("Error", error);
    });

  const json = await response.json();
  return json;
};

export const addReport = (item) =>
  async (dispatch) => {
    console.log("AddReport");
    const report = await pushReport(item);
    console.log("Repor: ", report);
    // dispatch(reportActions.addReport(report))
  };

// export const getUserReport = async (id) => {
//   const url = new URL("https://mobilki-backend.herokuapp.com/activeRequests/byUser");
//   const params = { userId: id };
//   url.search = new URLSearchParams(params).toString();
//
//   const response = await fetch(url);
//   const json = await response.json()
//   console.log(response);
//
//   return json;
// };
//
// export const GetUserReport = (id) =>{
//   return async (dispatch) => {
//     const request = await getUserReport(id);
//
//     request.map(item=>dispatch(reportActions.addReport(item)))
//   }
//   };


export const GetUserReport = (id) => {
  return (dispatch) => {
    console.log("here2");
    axios.get("https://mobilki-backend.herokuapp.com/activeRequests/byUser", { params: { userId: id } })
      .then(res => {
        console.log(res);
        res.data.map(item => dispatch(reportActions.addReport(item)));
      });
  };
};
