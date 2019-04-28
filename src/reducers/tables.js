import { GET_TABLES, CLOSE_TABLE, OPEN_TABLE } from "../actions/types";

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
      const newState = { ...state };
      newState.openTables.splice(action.index, 1);
      newState.closedTables = [...state.closedTables, action.table];
      return newState;

    case OPEN_TABLE:
      const newTableState = { ...state };
      const indexToDelete = state.closedTables.findIndex(
        i => i.id === action.table.id
      );
      newTableState.closedTables.splice(indexToDelete, 1);
      newTableState.openTables = [action.table, ...state.openTables];
      return newTableState;

    default:
      return {
        ...state
      };
  }
}
