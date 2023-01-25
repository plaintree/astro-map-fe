import { NavigationContainer } from "@react-navigation/native";
import { MD3DarkTheme } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import UserProfile from "./screens/UserProfile";
import LocationFinder from "./screens/LocationFinder";
import Globe from "./screens/Globe";
import TimeMachine from "./screens/TimeMachine";
import LocationContextProvider from "./context/LocationContext";

export default function App() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <LocationContextProvider>
        <PaperProvider theme={MD3DarkTheme}>
          <NavigationContainer theme={MD3DarkTheme}>
            <Tab.Navigator initialRouteName="Home">
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="home" size={20} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Location"
                component={LocationFinder}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="location" size={20} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="User"
                component={UserProfile}
                options={{
                  tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="user-alt" size={20} color={color} />
                  ),
                }}
              />

              <Tab.Screen
                name="Globe"
                component={Globe}
                options={{
                  tabBarIcon: ({ color }) => (
                    <FontAwesome5
                      name="globe-americas"
                      size={20}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Time Machine"
                component={TimeMachine}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="timer" size={20} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </LocationContextProvider>
    </SafeAreaProvider>
  );
}
