import { GET_TABLES } from "../actions/types";

export default function(
  state = {
    openTables: [],
    closedTables: []
  },
  action
) {
  switch (action.type) {
    case GET_TABLES:
      return { ...state, openTables: [...action.data] };
    default:
      return {
        ...state
      };
  }
}
