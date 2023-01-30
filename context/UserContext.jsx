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
  const [userName, setUserName] = useState("sadPug001");
  const [favoriteType, setFavoriteType] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-4.0.3&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80");
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
