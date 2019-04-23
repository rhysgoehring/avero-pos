import { GET_TABLES } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_TABLES:
      return {
        ...state,
        ...action.data
      };
    default:
      return {
        ...state
      };
  }
}
