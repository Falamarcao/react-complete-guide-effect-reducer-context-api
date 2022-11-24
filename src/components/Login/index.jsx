import { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";
import AuthContext from "../../context/auth-context";
import styles from "./Login.module.css";

const emailReducer = (state, action) => {
  if (action.type === "EMAIL_CHANGE") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "EMAIL_VALIDATION") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_CHANGE") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "PASSWORD_VALIDATION") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const authContext = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const { isValid: isEmailValid } = emailState; // Object destructuring and aliasing
  const { isValid: isPasswordValid } = passwordState;

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setFormIsValid(isEmailValid && isPasswordValid),
      200
    );

    return () => clearTimeout(timeoutId);
  }, [isEmailValid, isPasswordValid]); // Or [emailState.isValid, passwordState.isValid]

  const emailChangeHandler = (event) =>
    dispatchEmail({ type: "EMAIL_CHANGE", value: event.target.value });

  const passwordChangeHandler = (event) =>
    dispatchPassword({ type: "PASSWORD_CHANGE", value: event.target.value });

  const validateEmailHandler = () =>
    dispatchEmail({ type: "EMAIL_VALIDATION" });

  const validatePasswordHandler = () =>
    dispatchPassword({ type: "PASSWORD_VALIDATION" });

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          valid={isEmailValid}
          label="E-mail"
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          valid={isPasswordValid}
          label="Password"
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
