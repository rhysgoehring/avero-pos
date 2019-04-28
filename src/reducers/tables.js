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
      return {
        ...state,
        // Remove table from open tables
        openTables: state.openTables.filter(
          table => table.id !== action.table.id
        ),
        // Add table to closed tables
        closedTables: [action.table, ...state.closedTables]
      };
    case OPEN_TABLE:
      return {
        ...state,
        // Remove table from closedTables
        closedTables: state.closedTables.filter(
          table => table.id !== action.table.id
        ),
        // Add table to openTables
        openTables: [action.table, ...state.openTables]
      };

    default:
      return {
        ...state
      };
  }
}
