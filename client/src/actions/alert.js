import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuid } from "uuid";

export const setFormAlert =
  (msg, type, timeout = 2000) =>
  (dispatch) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
