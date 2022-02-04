import { useContext } from "react";
import { AppContext } from "./AppContextProvider";

const useAppContext = () => {
  const { user, setUser, login, logout } = useContext(AppContext);

  return { user, setUser, login, logout };
};

export default useAppContext;
