import { useState } from "react";
import { View } from "react-native";
import { Text, SegmentedButtons } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { MarkerAnimated, Circle } from "react-native-maps";

const LocationFinder = ({ navigation }) => {
  const [pin, setPin] = useState({ latitude: 51.50722, longitude: -0.1275 });
  const [continent, setContinent] = useState("");
  const [value, setValue] = useState("");

  console.log(continent)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        initialRegion={{
          latitude: 51.50722,
          longitude: -0.1275,
          latitudeDelta: 0.05,
          longitudeDelta: 200,
        }}
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
          title="London"
          description="Upcoming Events"
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
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        density="small"
        style={{margin: 10}}
        buttons={[
          {
            value: "europe",
            label: "Europe",
            onPress: () => setContinent("europe"),
          },
          {
            value: "africa",
            label: "Africa",
            onPress: () => setContinent("africa"),
          },
          {
            value: "asia",
            label: "Asia",
            onPress: () => setContinent("asia"),
          },
        ]}/>
        <SegmentedButtons
        value={value}
        onValueChange={setValue}
        density="small"
        buttons={[
          {
            value: "north-america",
            label: "North America",
            onPress: () => setContinent("north-america"),
          },
          {
            value: "south-america",
            label: "South America",
            onPress: () => setContinent("south-america"),
          },
        ]}/>
    </SafeAreaView>
  );
};
export default LocationFinder;
