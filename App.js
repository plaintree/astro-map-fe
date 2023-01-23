import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Text, MD3DarkTheme, Button } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import UserProfile from "./screens/UserProfile";

export default function App() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <SafeAreaProvider>
      <PaperProvider theme={MD3DarkTheme}>
        <NavigationContainer theme={MD3DarkTheme}>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="User" component={UserProfile} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
