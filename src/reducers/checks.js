import { START_NEW_CHECK, ADD_MENU_ITEM, CLOSE_CHECK } from "../actions/types";

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
    case ADD_MENU_ITEM:
      // TODO: Update Check:
      return { ...state };
    case CLOSE_CHECK: {
      const newState = { ...state };
      const indexToDelete = newState.openChecks.findIndex(
        i => i.id === action.openCheck.id
      );
      newState.openChecks.splice(indexToDelete, 1);
      newState.closedChecks = [action.closedCheck, ...state.closedChecks];
      return newState;
    }
    default:
      return {
        ...state
      };
  }
}
