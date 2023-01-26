import { createContext, useState } from "react";

export const UserContext = createContext({
  userName: "",
  setUserName: () => {},
  password: "",
  setPassword: () => {},
  favoriteType: "",
  setFavoriteType: () => {},
  avatarUrl: "",
  setAvatarUrl: () => {},
  isLogin: false,
  setIsLogin: () => {},
});

const UserContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [favoriteType, setFavoriteType] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <UserContext.Provider
      value={{
        avatarUrl,
        setAvatarUrl,
        userName,
        setUserName,
        favoriteType,
        setFavoriteType,
        password,
        setPassword,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
