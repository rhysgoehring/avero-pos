import axios from "axios";
import { GET_TABLES, CLOSE_TABLE, START_NEW_CHECK } from "./types";
import { BASE_URL, requestConfig } from "../config";

const getTables = () => async dispatch => {
  try {
    const { data } = await axios.get(`${BASE_URL}/tables`, requestConfig);

    return dispatch({
      type: GET_TABLES,
      data
    });
  } catch (error) {
    console.error("get tables error", error);
  }
};

const startNewCheck = (table, index) => async dispatch => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/checks`,
      { tableId: table.id },
      requestConfig
    );
    console.log("startNewCheck data", data);

    await dispatch({
      type: START_NEW_CHECK,
      data
    });

    return dispatch({
      type: CLOSE_TABLE,
      index,
      table
    });
  } catch (error) {
    console.error("startNewCheck error", error);
  }
};

export { getTables, startNewCheck };
