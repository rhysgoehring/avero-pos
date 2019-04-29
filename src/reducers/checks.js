import {
  START_NEW_CHECK,
  ADD_MENU_ITEM,
  CLOSE_CHECK,
  VOID_ITEM
} from "../actions/types";

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
              orderedItems: [...check.orderedItems, action.newItem]
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
        closedChecks: [...state.closedChecks, action.closedCheck]
      };
    }
    case VOID_ITEM: {
      return {
        ...state,
        openChecks: state.openChecks.map(check => {
          if (check.id === action.checkId) {
            return {
              ...check,
              dateUpdated: action.checkUpdates.dateUpdated,
              orderedItems: check.orderedItems.map(item => {
                if (item.id === action.checkUpdates.itemId) {
                  return {
                    ...item,
                    voided: true
                  };
                }
                return item;
              })
            };
          }
          return check;
        })
      };
    }
    default:
      return {
        ...state
      };
  }
}
