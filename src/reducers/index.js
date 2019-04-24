import { combineReducers } from "redux";
import tables from "./tables";
import checks from "./checks";

const rootReducer = combineReducers({
  tables,
  checks
});

export default rootReducer;
