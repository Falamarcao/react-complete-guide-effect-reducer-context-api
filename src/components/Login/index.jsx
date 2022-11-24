import { useContext, useEffect, useReducer, useState, useRef } from "react";

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

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });
  const [isFormValid, setFormIsValid] = useState(false);

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

    if (isFormValid) {
      authContext.onLogin(emailState.value, passwordState.value);
    } else if (!isEmailValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          type="email"
          label="E-mail"
          value={emailState.value}
          isValid={isEmailValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          ref={emailInputRef}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          value={passwordState.value}
          isValid={isPasswordValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          ref={passwordInputRef}
        />
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
