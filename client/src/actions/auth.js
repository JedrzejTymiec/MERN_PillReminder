import axios from "axios";
import setToken from "../utilities/setToken";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_FAIL,
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types.js";

//Load logged user

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/user");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};

//Login

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = { email, password };

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response);
    dispatch({ type: LOGIN_FAIL });
  }
};

// Register user

export const register = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = { email, password };

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
