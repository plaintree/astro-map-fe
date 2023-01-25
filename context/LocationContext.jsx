import { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

const LocationContextProvider = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLocation, setUserLocation] = useState({});
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getLastKnownPositionAsync();
      setUserLocation(location.coords);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (userLocation) {
    text = JSON.stringify(userLocation);
  }

  return (
    <LocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
export default LocationContextProvider;
