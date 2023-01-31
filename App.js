import { NavigationContainer } from "@react-navigation/native";
import { MD3DarkTheme } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import UserProfileStack from "./screens/UserProfileStack";
import TimeMachineStack from "./screens/TimeMachineStack";
import HomeScreenStack from "./screens/HomeScreenStack";
import LocationFinder from "./screens/LocationFinder";

import LocationContextProvider from "./context/LocationContext";
import EventContextProvider from "./context/EventContext";
import UserContextProvider from "./context/UserContext";

export default function App() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <LocationContextProvider>
        <EventContextProvider>
          <UserContextProvider>
            <PaperProvider theme={MD3DarkTheme}>
              <NavigationContainer theme={MD3DarkTheme}>
                <Tab.Navigator initialRouteName="Home">
                  <Tab.Screen
                    name="Home"
                    component={HomeScreenStack}
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
                    component={UserProfileStack}
                    options={{
                      tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="user-alt" size={20} color={color} />
                      ),
                    }}
                  />

                  <Tab.Screen
                    name="Events"
                    component={TimeMachineStack}
                    options={{
                      tabBarIcon: ({ color }) => (
                        <Ionicons name="timer" size={20} color={color} />
                      ),
                    }}
                  />
                </Tab.Navigator>
              </NavigationContainer>
            </PaperProvider>
          </UserContextProvider>
        </EventContextProvider>
      </LocationContextProvider>
    </SafeAreaProvider>
  );
}
