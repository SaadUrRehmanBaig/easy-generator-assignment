import {
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import SnackBarNotification from "../components/snackbar/Snackbar";
import { SetloginUser } from "../helpers/storage";
import "./Login.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  subHeader: {
    color: "#66759c",
    fontSize: "14px",
    marginLeft: "15px",
  },
}));

export default function Login(props) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [snackBar, openSnackBar] = React.useState(false);
  const [notificationMsg, setNotifificationMsg] = React.useState({
    msg: "",
    severity: "error",
  });
  const [signupScreen, openSignUpScreen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [pwdError, setPwdError] = React.useState({
    error: false,
    errorType: "",
  });
  const [showPwd, setShowPwd] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState({
    error: false,
    errorType: "",
  });

  const signIn = async (email, password) => {
    if (!email) {
      validateAndSetInputFields(email, "email");
      return null;
    }
    if (!password) {
      validateAndSetInputFields(password, "loginpwd");
      return null;
    }

    if (email && emailValidator(email).error) {
      return null;
    }

    try {
      let payload = {
        email: email,
        password: password,
      };
      const result = await axios.post(
        process.env.REACT_APP_BASE_URL + "/auth/signin",
        payload
      );
      if (result.data.success === true) {
        openSnackBar(true);
        SetloginUser(result?.data);
        let msg = {
          msg: `Login Successfull welcome ${
            result?.data?.token || ""
          }`,
          severity: "success",
        };
        setNotifificationMsg(msg);
        navigate("/welcome");
      } else {
        openSnackBar(true);
        let msg = {
          msg: result.data.message,
          severity: "error",
        };
        setNotifificationMsg(msg);
      }
      resetStates();
    } catch (err) {
      let msg = {
        msg: "Oops Something Went Wrong!",
        severity: "error",
      };
      if (err?.response.status === 400) {
        msg.msg = err.response.data.message;
      }
      openSnackBar(true);
      setNotifificationMsg(msg);
    }
  };

  const createAccount = async (email, password, name) => {
    if (!name) {
      validateAndSetInputFields(password, "name");
      return null;
    }
    if (!email) {
      validateAndSetInputFields(email, "email");
      return null;
    }
    if (!password) {
      validateAndSetInputFields(password, "pwd");
      return null;
    }

    if (password && passwordValidator(password).error) {
      return null;
    }

    if (email && emailValidator(email).error) {
      return null;
    }

    try {
      let payload = {
        email: email,
        password: password,
        name: name,
      };
      const result = await axios.post(
        process.env.REACT_APP_BASE_URL + "/auth/signup",
        payload
      );
      if (result.data.success === true) {
        openSnackBar(true);
        let msg = {
          msg: `User ${
            result?.data?.data?.userName || ""
          } created successfully!`,
          severity: "success",
        };
        setTimeout(openSignUpScreen(false), 5000);
        setNotifificationMsg(msg);
      } else {
        openSnackBar(true);
        let msg = {
          msg: result.data.message,
          severity: "error",
        };
        setNotifificationMsg(msg);
      }
      resetStates();
    } catch (err) {
      let msg = {
        msg: "Oops Something Went Wrong!",
        severity: "error",
      };
      if (err?.response.status === 400) {
        msg.msg = err.response.data.message;
      }
      openSnackBar(true);
      setNotifificationMsg(msg);
    }
  };

  const passwordValidator = (pwd, type) => {
    const validation = {
      error: false,
      errorType: "",
    };

    if (type === "loginpwd") {
      if (!pwd) {
        validation.error = true;
        validation.errorType = "Password Required!";
      }
    } else {
      if (!pwd) {
        validation.error = true;
        validation.errorType = "Password Required!";
        return validation;
      }
      const minLength = pwd?.length < 8 ? false : true;
      const hasLetter = pwd.match(/[a-zA-Z]/);
      const hasNumber = pwd.match(/\d/);
      const hasSpecialChar = pwd.match(/[!@#$%^&*(),.?":{}|<>]/);

      if (!minLength) {
        validation.error = true;
        validation.errorType = "minimum 8 characters required!";
      }

      if (!hasLetter) {
        validation.error = true;
        validation.errorType = "Atleast one character required [a-zA-Z]!";
      }

      if (!hasNumber) {
        validation.error = true;
        validation.errorType = "Atleast one number required 0-9!";
      }

      if (!hasSpecialChar) {
        validation.error = true;
        validation.errorType =
          "atleast one special character required !@#$%^&*(),.?:{}|<></>";
      }
    }

    return validation;
  };

  const emailValidator = (email) => {
    const validation = {
      error: false,
      errorType: "",
    };

    if (!email) {
      validation.error = true;
      validation.errorType = "Email Required!";
      return validation;
    }
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!email.match(emailRegex)) {
      validation.error = true;
      validation.errorType = "Invalid Email Format!";
    }

    return validation;
  };

  const validateAndSetInputFields = (value, type) => {
    if (type === "name") {
      setName(value);
      value ? setNameError(false) : setNameError(true);
    }
    if (type === "loginpwd") {
      setPassword(value);
      const ispasswordValidated = passwordValidator(value, type);
      setPwdError(ispasswordValidated);
    }
    if (type === "pwd") {
      setPassword(value);
      const ispasswordValidated = passwordValidator(value, type);
      setPwdError(ispasswordValidated);
    }
    if (type === "email") {
      setEmail(value);
      const isEmailValidated = emailValidator(value);
      setEmailError(isEmailValidated);
    }
  };

  const resetStates = () => {
    setName("");
    setEmailError({
      error: false,
      errorType: "",
    });
    setNameError(false);
    setPwdError({
      error: false,
      errorType: "",
    });
  };

  return (
    <div className="login_container container-fluid">
      <SnackBarNotification
        openNotification={snackBar}
        closeSnackbar={() => {
          openSnackBar(false);
        }}
        severity={notificationMsg.severity}
        message={notificationMsg.msg}
      />

      <div className="login-card">
        <div className="login-logo">
          <img
            alt="login_logo"
            className="logo"
            src="images/easygenerator.jpeg"
          />
        </div>
        <div className="content">
          <form
            className={classes.root}
            noValidate
            autoComplete="current-password"
          >
            <Fragment>
              {signupScreen ? (
                <Fragment>
                  <div>
                    <TextField
                      error={nameError}
                      id="outlined-error-helper-text-otpEmail"
                      label="Name"
                      helperText={nameError ? "Name Required." : ""}
                      variant="outlined"
                      fullWidth
                      value={name}
                      style={{ width: 350 }}
                      onChange={(e) =>
                        validateAndSetInputFields(e.target.value, "name")
                      }
                    />
                  </div>

                  <div>
                    <TextField
                      error={emailError.error}
                      id="outlined-error-helper-text-otpEmail"
                      label="Email"
                      helperText={emailError.error ? emailError.errorType : ""}
                      variant="outlined"
                      fullWidth
                      value={email}
                      style={{ width: 350 }}
                      onChange={(e) =>
                        validateAndSetInputFields(e.target.value, "email")
                      }
                    />
                  </div>

                  <div>
                    <TextField
                      error={pwdError.error}
                      id="current-password"
                      label="password"
                      type={showPwd ? null : "password"}
                      helperText={pwdError.error ? pwdError.errorType : ""}
                      variant="outlined"
                      fullWidth
                      value={password}
                      style={{ width: 350 }}
                      onChange={(e) =>
                        validateAndSetInputFields(e.target.value, "pwd")
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                setShowPwd((itr) => !itr);
                              }}
                            >
                              {showPwd ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div>
                    <TextField
                      error={emailError.error}
                      id="outlined-error-helper-text-otpEmail"
                      label="Email"
                      helperText={emailError.error ? emailError.errorType : ""}
                      variant="outlined"
                      fullWidth
                      value={email}
                      style={{ width: 350 }}
                      onChange={(e) =>
                        validateAndSetInputFields(e.target.value, "email")
                      }
                    />
                  </div>

                  <div>
                    <TextField
                      error={pwdError.error}
                      id="current-password"
                      label="Password"
                      type={showPwd ? null : "password"}
                      helperText={pwdError.error ? pwdError.errorType : ""}
                      variant="outlined"
                      fullWidth
                      value={password}
                      style={{ width: 350 }}
                      onChange={(e) =>
                        validateAndSetInputFields(e.target.value, "loginpwd")
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                setShowPwd((itr) => !itr);
                              }}
                            >
                              {showPwd ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </Fragment>
              )}
            </Fragment>
          </form>
        </div>
        <Fragment>
          {signupScreen ? (
            <div className="footer">
              <Button
                variant="contained"
                className="login-button"
                style={{ width: "100%" }}
                color="secondary"
                onClick={() => createAccount(email, password, name)}
              >
                Create
              </Button>

              <div className="break-line"></div>

              <Button
                variant="contained"
                className="signup-button"
                style={{ width: "50%" }}
                color="secondary"
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                  openSignUpScreen(false);
                  resetStates();
                }}
              >
                Goback
              </Button>
            </div>
          ) : (
            <div className="footer">
              <Button
                variant="contained"
                className="login-button"
                style={{ width: "100%" }}
                color="secondary"
                onClick={() => signIn(email, password)}
              >
                Login
              </Button>

              <div className="break-line"></div>

              <Button
                variant="contained"
                className="signup-button"
                style={{ width: "50%" }}
                color="secondary"
                onClick={() => {
                  openSignUpScreen(true);
                  setPassword("");
                  resetStates();
                }}
              >
                Create account
              </Button>
            </div>
          )}
        </Fragment>
      </div>
    </div>
  );
}
