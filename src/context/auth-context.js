// React Context is NOT optimized for high frequency changes (changing values a lot),
// but it's not the case here for authentication.

import React, { useState, useEffect } from "react";

// setting default values for context help with IDE auto completion.
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (email, password) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // By default, effects run after every completed render,
    // but you can choose to fire them only when certain values have changed.
    const isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");

    if (isLoggedInLocalStorage === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const LoginHandler = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: LoginHandler,
        onLogout: logoutHandler,
      }}
    >
      {" "}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
