import { START_NEW_CHECK } from "../actions/types";

export default function(
  state = {
    openChecks: [],
    closedChecks: []
  },
  action
) {
  switch (action.type) {
    case START_NEW_CHECK:
      return {
        ...state,
        openChecks: [...state.openChecks, action.data]
      };
    default:
      return {
        ...state
      };
  }
}
