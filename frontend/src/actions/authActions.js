import axios from "axios";
import { AUTH_USER, NEW_USER } from "./types";

export const authenticateUser = userData => dispatch => {
  console.log("action called");
  dispatch({
    type: AUTH_USER,
    payload: userData
  });
};

export const createUser = userData => dispatch => {
  console.log("action called");
  dispatch({
    type: NEW_USER,
    payload: userData
  });
  //   axios
  //     .post("http://jsonplaceholder.typicode.com/posts", JSON.stringify(userData))
  //     .then(res => res.JSON)
  //     .then(userData => {
  //       {
  //         dispatch({
  //           type: AUTH_USER,
  //           payload: userData
  //         });
  //       }
  //     });
};