import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackActions } from "@react-navigation/native";
import UserProfile from "./UserProfile";
import UserRegister from "./UserRegister";

const Stack = createNativeStackNavigator();

const UserProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Register">
      <Stack.Screen
        name="User Profile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={UserRegister}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default UserProfileStack;
