import { useState, useContext } from "react";
import { View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserContext } from "../context/UserContext";
const UserRegister = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [invalidMsg, setInvalidMsg] = useState(null);

  const { setPassword, setUserName, setIsLogin, isLogin } =
    useContext(UserContext);

  const handleRegister = () => {
    const regPassword =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
    const regUsername = /^(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,}$/;
    if (regPassword.test(passwordInput) && regUsername.test(usernameInput)) {
      setPassword(passwordInput);
      setUserName(usernameInput);
      setIsLogin(true);
      setInvalidMsg(null);
    } else if (!regUsername.test(usernameInput.trim())) {
      setInvalidMsg(
        "Username must be at least 8 characters long with one uppercase"
      );
    } else if (!regPassword.test(passwordInput)) {
      setInvalidMsg(
        "Password must contain one digit, one lowercase letter, one uppercase letter, one special character, no space, and it must be at least 8 characters long."
      );
    }
    setPasswordInput("");
    setUsernameInput("");
  };

  // ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text
        variant="displaySmall"
        style={{ fontWeight: "700", textAlign: "center", marginBottom: 40 }}
      >
        Welcome Back
      </Text>
      <TextInput
        mode="outlined"
        label="Username"
        style={{ width: "80%" }}
        value={usernameInput}
        onChangeText={(text) => setUsernameInput(text)}
      />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry={showPassword ? false : true}
        value={passwordInput}
        onChangeText={(text) => setPasswordInput(text)}
        style={{ width: "80%" }}
        right={
          showPassword ? (
            <TextInput.Icon icon="eye" onPress={() => setShowPassword(false)} />
          ) : (
            <TextInput.Icon
              icon="eye-off"
              onPress={() => setShowPassword(true)}
            />
          )
        }
      />
      {invalidMsg && (
        <Text
          variant="bodyMedium"
          style={{
            color: "#ef5350",
            textAlign: "justify",
            paddingTop: 10,
            paddingHorizontal: 20,
          }}
        >
          {invalidMsg}
        </Text>
      )}
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Button mode="contained" style={{ marginRight: 10 }}>
          Sign In
        </Button>
        <Button mode="contained-tonal" onPress={handleRegister}>
          Register
        </Button>
      </View>
      <Text
        variant="bodyMedium"
        style={{
          color: "#ef5350",
          textAlign: "justify",
          paddingTop: 10,
          paddingHorizontal: 20,
        }}
      >
        {usernameInput} {passwordInput}
      </Text>
    </SafeAreaView>
  );
};
export default UserRegister;
