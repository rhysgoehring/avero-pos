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
      return {
        ...state,
        // Remove check from openChecks
        openChecks: state.openChecks.filter(
          check => check.id !== action.checkId
        ),
        // Add check to closedChecks
        closedChecks: [action.closedCheck, ...state.closedChecks]
      };
    }
    default:
      return {
        ...state
      };
  }
}
