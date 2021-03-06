import { AUTH_USER, STORE_USER, UNAUTH_USER } from "../actions/types";

const initState = {
  isAuth: false,
  user: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuth: action.payload
      };
    case STORE_USER:
      return {
        ...state,
        user: action.payload
      };
    case UNAUTH_USER:
      return {
        ...state,
        isAuth: action.payload
      };
    default:
      return state;
  }
};
