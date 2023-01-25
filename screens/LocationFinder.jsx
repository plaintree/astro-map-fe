import { useState, useEffect, useContext } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  SegmentedButtons,
  List,
  useTheme,
  FAB,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { MarkerAnimated, Circle } from "react-native-maps";
import worldLocations from "../data/worldLocations";
import { LocationContext } from "../context/LocationContext";

const LocationFinder = ({ navigation }) => {
  const [pin, setPin] = useState({});
  const [region, setRegion] = useState({});
  const [continent, setContinent] = useState("asia");
  const [locations, setLocations] = useState([]);
  const [value, setValue] = useState("");
  const theme = useTheme();
  const { userLocation, setUserLocation } = useContext(LocationContext);
  useEffect(() => {
    setPin({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    });
    setRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 200,
    });
  }, []);

  useEffect(() => {
    const filteredLocations = worldLocations.filter(
      (location) => location.continent === continent
    );
    setLocations(filteredLocations);
  }, [continent]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        provider="google"
        region={region}
        initialRegion={region}
        style={{ width: "100%", height: "50%" }}
      >
        <MarkerAnimated
          coordinate={pin}
          draggable={true}
          onDragEnd={(e) =>
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }
          title="Upcoming Events"
          description="Click to see more..."
          onCalloutPress={() =>
            navigation.navigate("Home", { params: "london" })
          }
        />
      </MapView>
      <View style={{ paddingTop: 10 }}>
        <Text
          variant="headlineLarge"
          style={{ textAlign: "center", fontWeight: "700" }}
        >
          Select Location
        </Text>
      </View>
      <ScrollView>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          density="small"
          style={{ margin: 10 }}
          buttons={[
            {
              value: "europe",
              label: "Europe",
              onPress: () => {
                setContinent("europe");
                setPin({
                  latitude: 48.864716,
                  longitude: 2.349014,
                });
                setRegion({
                  latitude: 48.864716,
                  longitude: 2.349014,
                  latitudeDelta: 0.05,
                  longitudeDelta: 50,
                });
              },
            },
            {
              value: "africa",
              label: "Africa",
              onPress: () => {
                setContinent("africa");
                setPin({
                  latitude: 4.37333,
                  longitude: 18.56278,
                });
                setRegion({
                  latitude: 4.37333,
                  longitude: 18.56278,
                  latitudeDelta: 0.05,
                  longitudeDelta: 100,
                });
              },
            },
            {
              value: "asia",
              label: "Asia",
              onPress: () => {
                setContinent("asia");
                setPin({
                  latitude: 27.47222,
                  longitude: 89.63611,
                });
                setRegion({
                  latitude: 27.47222,
                  longitude: 89.63611,
                  latitudeDelta: 0.05,
                  longitudeDelta: 75,
                });
              },
            },
          ]}
        />
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          density="small"
          buttons={[
            {
              value: "north-america",
              label: "North America",
              onPress: () => {
                setContinent("north-america");
                setPin({
                  latitude: 35.481918,
                  longitude: -97.508469,
                });
                setRegion({
                  latitude: 35.481918,
                  longitude: -97.508469,
                  latitudeDelta: 0.05,
                  longitudeDelta: 75,
                });
              },
            },
            {
              value: "south-america",
              label: "South America",
              onPress: () => {
                setContinent("south-america");
                setPin({
                  latitude: -25.3,
                  longitude: -57.633,
                });
                setRegion({
                  latitude: -25.3,
                  longitude: -57.633,
                  latitudeDelta: 0.05,
                  longitudeDelta: 90,
                });
              },
            },
          ]}
        />
        <List.Section style={{ alignItems: "center" }}>
          {locations.map((location) => {
            return (
              <List.Item
                key={location.id}
                title={location.countries}
                titleEllipsizeMode="head"
                titleStyle={{ textAlign: "center" }}
                onPress={() => {
                  setPin(location.coordinate);
                  setRegion({
                    latitude: location.coordinate.latitude,
                    longitude: location.coordinate.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 15,
                  });
                }}
                style={{
                  marginBottom: 5,
                  paddingVertical: 0,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: theme.colors.outline,
                  backgroundColor: theme.colors.surfaceVariant,
                  borderRadius: 10,
                  width: "50%",
                }}
              />
            );
          })}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LocationFinder;
