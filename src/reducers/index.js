import { combineReducers } from "redux";
import tables from "./tables";
import checks from "./checks";
import menu from "./menu";

const rootReducer = combineReducers({
  tables,
  checks,
  menu
});

export default rootReducer;
