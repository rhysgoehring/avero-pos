import {
  START_NEW_CHECK,
  ADD_MENU_ITEM,
  CLOSE_CHECK,
  VOID_ITEM,
  GET_SERVER_CHECKS,
  GET_CLOSED_CHECK_BY_ID,
  GET_OPEN_CHECK_BY_ID
} from "../actions/types";

export default function(
  state = {
    openChecks: [],
    closedChecks: [],
    checksFromServer: {
      openChecks: [],
      closedChecks: []
    }
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
              orderedItems: [...check.orderedItems, action.newItem],
              tableNumber: action.tableNumber
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
              orderedItems: check.orderedItems.map((item, index) => {
                if (index === action.index) {
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
    case GET_SERVER_CHECKS:
      return {
        ...state,
        checksFromServer: {
          openChecks: action.openChecks,
          closedChecks: action.closedChecks
        }
      };
    case GET_CLOSED_CHECK_BY_ID:
      return {
        ...state,
        checksFromServer: {
          closedChecks: state.checksFromServer.closedChecks.map(check => {
            if (check.id === action.currentCheck.id) {
              return action.currentCheck;
            }
            return check;
          }),
          openChecks: [...state.checksFromServer.openChecks]
        }
      };
    case GET_OPEN_CHECK_BY_ID:
      return {
        ...state,
        checksFromServer: {
          openChecks: state.checksFromServer.openChecks.map(check => {
            if (check.id === action.currentCheck.id) {
              return action.currentCheck;
            }
            return check;
          }),
          closedChecks: [...state.checksFromServer.closedChecks]
        }
      };
    default:
      return {
        ...state
      };
  }
}
