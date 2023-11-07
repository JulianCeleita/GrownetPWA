import { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useTokenStore from "../store/useTokenStore";
import { useEffect } from "react";
import routes from "../helpers/routes";

export const  AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, countryCode } = useTokenStore();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (token) {
      login();
    }
  }, [token]);

  const login = () => {
    setUser({
      token: token,
    });
    if (location.pathname === routes.chat) {
      navigate("/chat");
    } else {
      navigate("/restaurants");
    }
  };

  const logout = () => {
    useTokenStore.getState().setToken('');
    useTokenStore.getState().setCountryCode(null);
    setUser(null);
  };

  // TODO CUANDO SE TENGAN LOS ROLES, USAR ESTE CODIGO
  const isLogged = () => !!user;
  const hasRole = (role) => user?.role === role;

  const contextValue = {
    user,
    isLogged,
    hasRole,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
