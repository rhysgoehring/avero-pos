import axios from "axios";
import {
  GET_TABLES,
  CLOSE_TABLE,
  START_NEW_CHECK,
  ADD_MENU_ITEM,
  CLOSE_CHECK,
  OPEN_TABLE
} from "./types";
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

    await dispatch({
      type: CLOSE_TABLE,
      index,
      table
    });

    return dispatch({
      type: START_NEW_CHECK,
      data
    });
  } catch (error) {
    console.error("startNewCheck error", error);
  }
};

const addMenuItem = (item, tableId) => async (dispatch, getState) => {
  // TODO: Make a function that filters checks by tableId, using this code twice:
  const { checks } = getState();
  const { openChecks } = checks;
  const currentCheckArr = await openChecks.filter(
    check => check.tableId === tableId
  );
  const currentCheck = currentCheckArr[0];
  const checkId = currentCheck.id;
  const itemId = item.id;
  // Find Index of current check
  try {
    const response = await axios.put(
      `${BASE_URL}/checks/${checkId}/addItem`,
      { itemId },
      requestConfig
    );

    const checkUpdates = response.data;

    return dispatch({
      type: ADD_MENU_ITEM,
      checkId,
      checkUpdates,
      item
    });
  } catch (error) {
    console.error("addMenuItem", error);
  }
};

const closeCheck = table => async (dispatch, getState) => {
  const { checks } = await getState();

  const { openChecks } = checks;
  const currentTableId = table.id;
  const currentCheckArr = await openChecks.filter(
    check => check.tableId === currentTableId
  );

  const openCheck = currentCheckArr[0];
  const checkId = openCheck.id;
  const response = await axios.put(
    `${BASE_URL}/checks/${checkId}/close`,
    {},
    requestConfig
  );
  const closedCheck = response.data;

  dispatch({
    type: CLOSE_CHECK,
    openCheck,
    closedCheck
  });

  dispatch({
    type: OPEN_TABLE,
    table
  });
};

export { getTables, startNewCheck, addMenuItem, closeCheck };
