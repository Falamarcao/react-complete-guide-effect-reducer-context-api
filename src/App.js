import React, { useContext } from "react";

import Login from "./components/Login";
import Home from "./components/Home";
import MainHeader from "./components/MainHeader";
import AuthContext from "./context/auth-context";

function App() {
  const authContext = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!authContext.isLoggedIn && <Login />}
        {authContext.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
