import { GET_MENU_ITEMS } from "../actions/types";

export default function(state = { menuItems: [] }, action) {
  switch (action.type) {
    case GET_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.data
      };
    default:
      return {
        ...state
      };
  }
}
