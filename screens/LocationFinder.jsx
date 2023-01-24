import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { MarkerAnimated, Circle } from "react-native-maps";

const LocationFinder = ({ navigation }) => {
  const [pin, setPin] = useState({ latitude: 51.50722, longitude: -0.1275 });
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
    </SafeAreaView>
  );
};
export default LocationFinder;
