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
      return {
        ...state,
        openChecks: state.openChecks.map(check => {
          if (check.id === action.checkId) {
            return {
              ...check,
              dateUpdated: action.checkUpdates.dateUpdated,
              orderedItems: [action.item, ...check.orderedItems]
            };
          }
          return check;
        })
      };
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
