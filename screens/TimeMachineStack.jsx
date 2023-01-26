import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TimeMachine from "./TimeMachine";
import SingleEvent from "./SingleEvent";

const Stack = createNativeStackNavigator();

const TimeMachineStack = () => {
  return (
    <Stack.Navigator initialRouteName="TimeMachine">
      <Stack.Screen
        name="Time Machine"
        component={TimeMachine}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Single Event"
        component={SingleEvent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default TimeMachineStack;
