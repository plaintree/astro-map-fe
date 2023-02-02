import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SingleEvent from "./SingleEvent";

const Stack = createNativeStackNavigator();

const HomeScreenStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
              name="Home Screen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Single Event"
              component={SingleEvent}
              options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default HomeScreenStack;