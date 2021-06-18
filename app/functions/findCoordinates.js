import Geolocation from "@react-native-community/geolocation";
import { Alert } from "react-native";

const findCoordinates = (setCoords) => {
  Geolocation.getCurrentPosition(position => {
      const location = JSON.stringify(position);
      console.log("My location: ", location);

      // setLatitude(position.coords.latitude)
      // setLongitude(position.coords.longitude)
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCoords({ latitude, longitude });

    }, error => Alert.alert("GPS error: ", error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  );
};

export default findCoordinates;
