import { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

import testData from "../data/testData";

export const LocationContext = createContext({
  userLocation: {},
  setUserLocation: () => {},
  userCountry: "",
  setUserCountry: () => {},
});

const LocationContextProvider = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLocation, setUserLocation] = useState({
    latitude: 53.47944,
    longitude: -2.24528,
  });
  const [userCountry, setUserCountry] = useState("United Kingdom");

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getLastKnownPositionAsync();
  //     setUserLocation(location.coords);
  //   })();
  // }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (userLocation) {
  //   text = JSON.stringify(userLocation);
  // }

  return (
    <LocationContext.Provider
      value={{ userLocation, setUserLocation, userCountry, setUserCountry }}
    >
      {children}
    </LocationContext.Provider>
  );
};
export default LocationContextProvider;
