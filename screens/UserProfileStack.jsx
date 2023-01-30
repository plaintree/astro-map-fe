import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "./UserProfile";
import UserRegister from "./UserRegister";

import { UserContext } from "../context/UserContext";

const Stack = createNativeStackNavigator();

const UserProfileStack = () => {
  const { isLogin } = useContext(UserContext)
  
  return (
    <Stack.Navigator>
      {isLogin ? (
        <Stack.Screen
        name="User Profile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      ) : (
        <Stack.Screen
          name="Register"
          component={UserRegister}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
export default UserProfileStack;
