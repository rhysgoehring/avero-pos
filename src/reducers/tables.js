import { GET_TABLES, CLOSE_TABLE } from "../actions/types";

export default function(
  state = {
    openTables: [],
    closedTables: [],
    allTables: []
  },
  action
) {
  switch (action.type) {
    case GET_TABLES:
      return {
        ...state,
        openTables: [...action.data],
        allTables: [...action.data]
      };
    case CLOSE_TABLE:
      // Remove table from openTables
      const newState = { ...state };
      newState.openTables.splice(action.index, 1);
      // Add table to closedTables
      newState.closedTables = [action.table, ...state.closedTables];
      return newState;
    default:
      return {
        ...state
      };
  }
}
