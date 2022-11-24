import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";

import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Home.module.css";

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <Card className={styles.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authContext.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
